from django.shortcuts import render
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'http://localhost:8000/auth/google/'
    client_class = OAuth2Client


class Callback(APIView):
    permission_classes = [IsAuthenticated]

    # def get(self, request):
    #     print(request)
    #     print(request.data)
    #     print(request.headers)
    #     print(request.user)
    #     return Response({'test': '123'})