from rest_framework import serializers
from .models import Itinerary, Attraction, Flight


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ['id', 'itinerary', 'origin_airport_code', 'destination_airport_code', 'departure_datetime', 'arrival_datetime', 'airline', 'type']


class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = ['id', 'name', 'itinerary']


class ItinerarySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Itinerary
        fields = ('id', 'name', 'flights', 'attractions')

    flights = FlightSerializer(many=True, read_only=True)
    attractions = AttractionSerializer(many=True, read_only=True)