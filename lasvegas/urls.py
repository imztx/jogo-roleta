from django.contrib import admin
from lasvegas import views
from django.urls import path


app_name = 'lasvegas'

urlpatterns = [
    path('my-wallet', views.wallet_detail, name='my-wallet'),
]
