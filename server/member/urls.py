from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import login, signup, id_check, deleteUser

urlpatterns =[
    path('login/', login, name='login'),
    path('signup/', signup, name='signup'),
    path('id_check/', id_check, name='id_check'),
    path('deleteUser/', deleteUser, name='deleteUser')
]