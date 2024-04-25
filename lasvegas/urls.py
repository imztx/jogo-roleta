from django.contrib import admin
from lasvegas import views
from django.urls import path


app_name = 'lasvegas'

urlpatterns = [
    path('me-wallet', views.wallet_detail, name='my-wallet'),
    path('me/movement/', view=views.MovementListView.as_view(), name='my-movement-list'),
    path("roleta", views.roleta, name="index"),
    path("login", views.login, name="login"),


]
