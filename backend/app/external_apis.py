import requests
import json

config = {
  "api": {
    "flights": {
      # "api_key": "e5271c74c7msh336578886b36ce5p1b7fb3jsnf74ff4318717",
      "api_key": "cb67d034bdmsh90789df0f78a879p163c14jsn5f70d7a4a62d",
      "api_host": "priceline-com-provider.p.rapidapi.com"
    },
    "attractions": {
      "api_key": "5ae2e3f221c38a28845f05b60ffcf38d0eecc62a698a2c6e2d0c58fe"
    }
  }
}



class FlightsAPI():

    def get_airports_near_city(city):
        # city min length = 3, max length = 50
        url = "https://priceline-com-provider.p.rapidapi.com/v1/flights/locations"
        querystring = {"name": city}

        headers = {
            "X-RapidAPI-Key": config['api']['flights']['api_key'],
            "X-RapidAPI-Host": config['api']['flights']['api_host']
        }

        response = requests.get(url, headers=headers, params=querystring)
        return response

    def get_flights(origin_airport_code, destination_airport_code, departure_date):

        url = "https://priceline-com-provider.p.rapidapi.com/v2/flight/roundTrip"

        querystring = {"sid": "iSiX639", "adults": "1", "departure_date": departure_date,
                       "destination_airport_code": destination_airport_code, "origin_airport_code": origin_airport_code, "results_per_page":"8"}

        headers = {
            "X-RapidAPI-Key": config['api']['flights']['api_key'],
            "X-RapidAPI-Host": config['api']['flights']['api_host']
        }

        response = requests.get(url, headers=headers, params=querystring)

        return response


class AttractionsAPI():

    def get_coordinates_of_city(city):
        attractions_api_key = config['api']['attractions']['api_key']
        get_coordinates_url = f'https://api.opentripmap.com/0.1/en/places/geoname?name={city}&apikey={attractions_api_key}'

        response = requests.get(get_coordinates_url)
        return response


    def get_attractions_of_city(radius, longitude, latitude):
        attractions_api_key = config['api']['attractions']['api_key']
        get_places_url = f'https://api.opentripmap.com/0.1/en/places/radius?radius={radius}&lon={longitude}&lat={latitude}&apikey={attractions_api_key}'
        response = requests.get(get_places_url)
        return response

    def get_attraction_details(xid):
        attractions_api_key = config['api']['attractions']['api_key']
        get_attraction_details_url = f'https://api.opentripmap.com/0.1/en/places/xid/{xid}?apikey={attractions_api_key}'

        response = requests.get(get_attraction_details_url)
        return response