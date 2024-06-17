from django.contrib import admin
from django.urls import path, include
# from . import views
from asset.views import BalanceView
# from rest_framework import DefaultRouter

# router = DefaultRouter()
# router.register(r'')

app_name = 'asset'
urlpatterns = [
       path('balance/', BalanceView.as_view(), name='balance'),
]
