from typing import Any
from django.db.models.query import QuerySet
from lasvegas.models import Movement
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.template import loader

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from core.forms import CreateUserForm, LoginForm
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
# Create your views here.

@login_required
def wallet_detail(request):
    wallet = request.user.wallet
    balance = wallet.get_balance()
    return render(request, 'wallet/detail.html', {
        'object': request.user.wallet,
        'balance': balance,
    })

class MovementListView(LoginRequiredMixin, ListView):
    model = Movement
    template_name = 'movement/list.html'

    def get_queryset(self) -> QuerySet[Any]:
        return super().get_queryset() \
            .filter(wallet__owner=self.request.user)
    
@login_required(login_url="login")                        
def roleta(request):
    wallet = request.user.wallet
    balance = wallet.get_balance()
    return render(request, 'roleta/index.html', {'balance': balance})



def user_login(request):
    
    form = LoginForm()
    
    if request.method == 'POST':
        
        form = LoginForm(request, data=request.POST)
        
        if form.is_valid():
            username = request.POST.get('username')
            password = request.POST.get('password')
    
            user = authenticate(request, username=username, password=password)
    
            if user is not None:
                auth.login(request, user)
                
                return redirect("lasvegas:roleta")
        
    context = {'loginform':form}    
    
    return render(request, 'login/login.html', context=context)


def user_logout(request):
    
    logout(request)
    
    return redirect(reverse("lasvegas:login"))    



def cadastro(request):
    
    form = CreateUserForm()
    
    if request.method == "POST":
        form = CreateUserForm(request.POST)
        
        if form.is_valid():
            form.save()
            
            return redirect("lasvegas:login")
        
    
    context = {'cadastroform':form}    
    
    return render(request, 'cadastro/cadastro.html', context=context)


def tela_ini(request):
    template = loader.get_template("tela_inicial/tela.html")
    return HttpResponse(template.render({}, request))