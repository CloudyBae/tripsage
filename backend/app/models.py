from django.db import models
from django.conf import settings

class Itinerary(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = "itineraries"
        unique_together = ['owner', 'name']

    def __str__(self):
        return self.name

class Attraction(models.Model):
    name = models.CharField(max_length=300)
    itinerary = models.ForeignKey("Itinerary", related_name="attractions", on_delete=models.CASCADE)

class Flight(models.Model):
    FLIGHT_TYPES = [("departing", "departing"),("return", "return") ]
    
    itinerary = models.ForeignKey("Itinerary", related_name="flights", on_delete=models.CASCADE)
    origin_airport_code = models.CharField(max_length=3)
    destination_airport_code = models.CharField(max_length=3)
    departure_datetime = models.DateTimeField()
    arrival_datetime = models.DateTimeField()
    airline = models.CharField(max_length=200)
    type = models.CharField(max_length=10, choices=FLIGHT_TYPES)