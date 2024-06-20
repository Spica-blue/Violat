

from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import login, logout, check_login_status, signup, id_check, deleteUser, user_detail

urlpatterns =[
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('signup/', signup, name='signup'),
    path('id_check/', id_check, name='id_check'),
    path('user_detail/', user_detail, name='user_detail'), #session
    path('check_login_status/', check_login_status, name='check_login_status'),
    path('deleteUser/', deleteUser, name='deleteUser'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]