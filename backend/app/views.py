from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Itinerary, Flight, Attraction
from . import serializers
from .external_apis import FlightsAPI, AttractionsAPI
from users.models import CustomUser

User = CustomUser

# Itinerary views

class ItineraryViewSet(viewsets.ModelViewSet):
    queryset = Itinerary.objects.all()
    serializer_class = serializers.ItinerarySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        query_set = queryset.filter(owner=user)
        return query_set

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        new_itinerary = request.data.get('name')
        print(new_itinerary)
        if len(self.queryset.filter(name=new_itinerary)) == 0:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response({"message": "An itinerary with this name already exists for this user"}, status=status.HTTP_400_BAD_REQUEST)

class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = serializers.AttractionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        # list itineraries where user is the owner
        user_owned_itineraries = Itinerary.objects.filter(owner=user)
        # list attractions where attraction's itinerary is in the list of user owned itineraries
        query_set = queryset.filter(itinerary__in=user_owned_itineraries)
        return query_set

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=False)
        print(serializer.data)
        owner_of_itinerary = serializer.validated_data[0]['itinerary'].owner
        if user == owner_of_itinerary:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response({"message": "User does not have access to this itinerary."}, status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, *args, **kwargs):

        # Get requesting user
        user = request.user
        # Get list of itineraries linked to user
        user_owned_itineraries = Itinerary.objects.filter(owner=user)
        # list attractions where attraction's itinerary is in the list of user owned itineraries
        user_owned_attractions = self.queryset.filter(
            itinerary__in=user_owned_itineraries)
        target_attraction = self.queryset.get(id=self.kwargs['pk'])
        serializer = self.get_serializer(
            target_attraction, data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            if target_attraction not in user_owned_attractions:
                return Response({"message": "User does not have access to this itinerary."}, status=status.HTTP_401_UNAUTHORIZED)

            if not serializer.validated_data.get('itinerary'):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            if serializer.validated_data.get('itinerary') in user_owned_itineraries:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({"message": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)


# Flight views
class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = serializers.FlightSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset
        # list itineraries where user is the owner
        user_owned_itineraries = Itinerary.objects.filter(owner=user)
        # list flights where flight's itinerary is in the list of user owned itineraries
        query_set = queryset.filter(itinerary__in=user_owned_itineraries)
        return query_set

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)

        print(request.data)
        serializer.is_valid(raise_exception=True)
        owner_of_itinerary = serializer.validated_data['itinerary'].owner
        if user == owner_of_itinerary:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response({"message": "User does not have access to this itinerary."}, status=status.HTTP_401_UNAUTHORIZED)

    def update(self, request, *args, **kwargs):
        user = request.user
        user_owned_itineraries = Itinerary.objects.filter(owner=user)
        user_owned_flights = self.queryset.filter(
            itinerary__in=user_owned_itineraries)

        target_flight = self.queryset.get(id=self.kwargs['pk'])

        serializer = self.get_serializer(
            target_flight, data=request.data, partial=True)

        if serializer.is_valid(raise_exception=True):
            if target_flight not in user_owned_flights:
                return Response({"message": "User does not have access to this itinerary."}, status=status.HTTP_401_UNAUTHORIZED)

            if not serializer.validated_data.get('itinerary'):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            if serializer.validated_data.get('itinerary') in user_owned_itineraries:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)


# External APIs
class FindFlightsView(APIView):
    queryset = Flight.objects.all()
    permission_classes = [IsAuthenticated]

    def post(self, request):
        origin_city = request.data.get('origin').upper()
        destination_city = request.data.get('destination').upper()
        departure_date = request.data.get('departure_date')
        return_date = request.data.get('return_date')

        if origin_city is None or destination_city is None or departure_date is None or return_date is None:
            return Response({"message": "Origin city, destination city, and date are required."}, status=status.HTTP_400_BAD_REQUEST)

        flights_trimmed = {'departure_flight_plans': [], 'return_flight_plans': []}

        # Get departure flight plans
        departure_req = FlightsAPI.get_flights(
            origin_city, destination_city, departure_date)
        
        
        if not departure_req.ok:
            return Response({"message": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        
        departure_results = departure_req.json()
        if departure_results['getAirFlightRoundTrip'].get('error'):
            if departure_results['getAirFlightRoundTrip'].get('error').get('status'):
                error = departure_results['getAirFlightRoundTrip'].get('error').get('status')
                return Response({"message": error}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"message": "No flights found"}, status=status.HTTP_200_OK)
            
        departure_results_full = departure_results['getAirFlightRoundTrip']['results']['result']['itinerary_data']
        
        flight_plans = {'departure_plans': [departure_results_full[itinerary]['slice_data']
                                            ['slice_0']['flight_data'] for itinerary in departure_results_full]}
        
        for i in range(len(flight_plans['departure_plans'])):
            _flights = []

            for flight in flight_plans['departure_plans'][i]:
                origin_airport_code = flight_plans['departure_plans'][i][flight]['departure']['airport']['code']
                departure_datetime = flight_plans['departure_plans'][i][flight]['departure']['datetime']['date_time']
                destination_airport_code = flight_plans['departure_plans'][i][flight]['arrival']['airport']['code']
                arrival_datetime = flight_plans['departure_plans'][i][flight]['arrival']['datetime']['date_time']
                airline = flight_plans['departure_plans'][i][flight]['info']['marketing_airline']
                city = flight_plans['departure_plans'][i][flight]['arrival']['airport']['city']

                _flights.append(
                    {'origin_airport_code': origin_airport_code, 
                     'departure_datetime': departure_datetime, 
                     'destination_airport_code': destination_airport_code, 
                     'arrival_datetime': arrival_datetime,
                     'airline': airline,
                     'city': city})
                
            flights_trimmed['departure_flight_plans'].append(_flights)

        
        # Get return flight plans
        return_req = FlightsAPI.get_flights(
            destination_city, origin_city, return_date)
        if not return_req.ok:
            return Response({"message": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        
        return_results = return_req.json()
        return_results_full = return_results['getAirFlightRoundTrip']['results']['result']['itinerary_data']
        
        flight_plans = {'return_plans': [return_results_full[itinerary]['slice_data']
                                            ['slice_0']['flight_data'] for itinerary in return_results_full]}
        
        for i in range(len(flight_plans['return_plans'])):
            _flights = []

            for flight in flight_plans['return_plans'][i]:
                origin_airport_code = flight_plans['return_plans'][i][flight]['departure']['airport']['code']
                departure_datetime = flight_plans['return_plans'][i][flight]['departure']['datetime']['date_time']
                destination_airport_code = flight_plans['return_plans'][i][flight]['arrival']['airport']['code']
                arrival_datetime = flight_plans['return_plans'][i][flight]['arrival']['datetime']['date_time']
                airline = flight_plans['return_plans'][i][flight]['info']['marketing_airline']

                _flights.append(
                    {'origin_airport_code': origin_airport_code, 
                     'departure_datetime': departure_datetime, 
                     'destination_airport_code': destination_airport_code, 
                     'arrival_datetime': arrival_datetime,
                     'airline': airline})
                
            flights_trimmed['return_flight_plans'].append(_flights)

        return Response({"data": flights_trimmed}, status=status.HTTP_200_OK)
    
class FindAttractionsView(APIView):
    queryset = Attraction.objects.all()
    permission_classes = [IsAuthenticated]

    def post(self, request):
        city = request.data.get('city')
        if city is None:
            return Response({"message": "Request must include a city to be valid"}, status=status.HTTP_400_BAD_REQUEST)
        
        coords_req = AttractionsAPI.get_coordinates_of_city(city)
        if not coords_req.ok:
            return Response({"message": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)

        coords_data = coords_req.json()
        lat, lon = coords_data['lat'], coords_data['lon']
        radius = 48280 # 4820 km = 30 miles

        attraction_req = AttractionsAPI.get_attractions_of_city(radius, lon, lat)
        if not attraction_req.ok:
            return Response({"message": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
        attraction_data = attraction_req.json()

        return Response({"data": attraction_data}, status=status.HTTP_200_OK)