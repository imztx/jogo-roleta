from django.contrib import admin
from lasvegas import views
from django.urls import path


app_name = 'lasvegas'

urlpatterns = [
    path('me-wallet', views.wallet_detail, name='my-wallet'),
    path('me/movement/', view=views.MovementListView.as_view(), name='my-movement-list'),
    path("roleta", views.roleta, name="roleta"),
    path("login", views.user_login, name="login"),
    path("cadastrar", views.cadastro, name="cadastrar"),
    path('user_logout', views.user_logout, name="user_logout"),
    path('tela_inicial', views.tela_ini, name="tela_inicial"),
    path('rules', views.rules, name="rules"),
    path('about', views.about, name="about"),


]
