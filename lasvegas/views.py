from typing import Any
from django.db.models.query import QuerySet
from lasvegas.models import Movement, Wallet
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, JsonResponse
from django.template import loader

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from core.forms import CreateUserForm, LoginForm, CreateMov
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.contrib import messages

from django.views.decorators.csrf import csrf_exempt

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
    username = request.user.username
    balance = wallet.get_balance()
    teste = wallet.movement_set.all()[0].value
    if request.method == 'POST':
        form = CreateMov(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Form submitted successfully!'})
        else:
            return JsonResponse({'error': 'Form submission failed.'}, status=400)
    else:
        form = CreateMov()
    return render(request, 'roleta/index.html', {'form': form, 'balance': balance, 'username': username, 'teste': teste})


# @csrf_exempt
# def add_movement(request):
#     if request.method == 'POST':
#         wallet = request.user.wallet
#         descricao = request.POST.get("descricao")
#         valor = request.POST.get("valor")
#         Movement.objects.create(
#             wallet = wallet,
#             description = descricao,
#             value = float(valor)
#         )
#         return JsonResponse({'status': 'success'})
#     return JsonResponse({'status': 'error'})



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
            
            else:
                messages.error(request, 'Usuário ou senha inválido.')

        else:
                messages.error(request, 'Usuário ou senha inválido.')        
        
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
            messages.success(request, 'Cadastro bem-sucedido.')
            
            return redirect("lasvegas:login")
        
    
    context = {'cadastroform':form}    
    
    return render(request, 'cadastro/cadastro.html', context=context)


def tela_ini(request):
    template = loader.get_template("tela_inicial/tela.html")
    return HttpResponse(template.render({}, request))

def rules(request):
    template = loader.get_template("regras/rules.html")
    return HttpResponse(template.render({}, request))

def about(request):
    template = loader.get_template("about/about.html")
    return HttpResponse(template.render({}, request))