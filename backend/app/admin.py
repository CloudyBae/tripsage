from django.contrib import admin
from .models import Itinerary, Flight, Attraction
from users.models import CustomUser

admin.site.register(CustomUser)
admin.site.register(Itinerary)
admin.site.register(Flight)
admin.site.register(Attraction)