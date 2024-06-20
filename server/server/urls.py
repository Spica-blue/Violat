from django.contrib import admin
from django.urls import path, include




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('member.urls')),
    path('asset/', include('asset.urls')),
    path('trade/', include('trade.urls')),
]
