from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('itineraries', views.ItineraryViewSet, basename='itineraries')
router.register('attractions', views.AttractionViewSet, basename='attractions')
router.register('flights',  views.FlightViewSet, basename='flights')
# urlpatterns = router.urls

urlpatterns = [
    #Router
    path('', include(router.urls)),

    # #External APIs
    path('ext/flights/', views.FindFlightsView.as_view()),
    path('ext/attractions/', views.FindAttractionsView.as_view()),
]
