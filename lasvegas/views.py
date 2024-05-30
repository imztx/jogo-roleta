from typing import Any
from django.db.models.query import QuerySet
from lasvegas.models import Movement, Wallet
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, JsonResponse
from django.template import loader

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from core.forms import CreateUserForm, LoginForm, CreateBet
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.contrib import messages

from django.views.decorators.csrf import csrf_exempt

from random import randint

# Create your views here.

casa = {0: '0', 1: '32', 2: '15', 3: '19', 4: '4', 5: '21', 6: '2', 7: '25', 8: '17', 9: '34', 10: '6', 11: '27', 12: '13', 13: '36', 14: '11', 15: '30', 16: '8', 17: '23', 18: '10', 19: '5', 20: '24', 21: '16', 22: '33', 23: '1', 24: '20', 25: '14', 26: '31', 27: '9', 28: '22', 29: '18', 30: '29', 31: '7', 32: '28', 33: '12', 34: '35', 35: '3', 36: '26', 37: '0'}

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
    username = request.user.username
    balance = wallet.get_balance()
    teste = wallet.movement_set.all()[0].value
    if request.method == 'POST':
        form = CreateBet(request.POST)
        if form.is_valid():
            bet = form.data
            aposta_total, aposta_vencedora, casa_certa = aposta(bet['bet'], balance)
            casa_certa = int(casa_certa)
            valor = aposta_vencedora - aposta_total
            if valor != 0:
                Movement.objects.create(wallet=wallet, description=f'Resultado da aposta: {valor}',value=valor)
            return JsonResponse({'casa_certa': casa_certa, 'aposta_total': aposta_total, 'aposta_vencedora': aposta_vencedora, 'lucro': valor})
        else:
            return JsonResponse({'error': 'Form submission failed.'}, status=400)
    else:
        form = CreateBet()
    return render(request, 'roleta/index.html', {'form': form, 'balance': balance, 'username': username, 'teste': teste})


def aposta(aposta, balance):
    aposta = aposta.replace('},{', ';')
    aposta = aposta.replace('}', '')
    aposta = aposta.replace('{', '')
    aposta = aposta.replace('[', '')
    aposta = aposta.replace(']', '')
    aposta = aposta.replace(';', ' ; ')
    aposta = aposta.replace('"', '')
    aposta = aposta.replace(', ', ',')
    aposta = aposta.replace(' ', '')

    
    casa_certa = str(randint(0, 37))
    
    aposta = aposta.split(';')
    aposta_total = 0
    aposta_vencedora = 0
    for i in aposta:
        
        
        i = i.replace(',', ';', 3)
        odd = int(i.split(';')[2].split(':')[1])
        aposta_local = int(i.split(';')[0].split(':')[1])
        numeros = i.split(';')[3].split(':')[1].split(',')
        
        
        aposta_total += aposta_local
        
        if casa_certa in numeros and odd == 36/len(numeros) - 1:
            aposta_vencedora += aposta_local * (odd + 1)
        
    print('\n\naposta total:', aposta_total, '\naposta vencedora:', aposta_vencedora, '\ncasa certa:', casa_certa)
    
    key_list = list(casa.keys())
    val_list = list(casa.values())
    
    # print key with val 100
    posit = val_list.index(casa_certa)
    if balance < aposta_total:
        return
    return(aposta_total, aposta_vencedora, key_list[posit])

# ['amt:5,type:inside_whole,odds:35,numbers:11', 'amt:5,type:inside_whole,odds:35,numbers:8', 'amt:5,type:outside_dozen,odds:2,numbers:1,2,3,4,5,6,7,8,9,10,11,12', 'amt:5,type:outside_oerb,odds:1,numbers:2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36', 'amt:5,type:outside_column,odds:2,numbers:1,4,7,10,13,16,19,22,25,28,31,34', 'amt:5,type:zero,odds:1,numbers:19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36', 'amt:5,type:split,odds:17,numbers:27,30', 'amt:5,type:inside_whole,odds:35,numbers:27']

# ['amt:5,type:inside_whole,odds:35,numbers:10 ', ' amt:5,type:outside_dozen,odds:2,numbers:13,14,15,16,17,18,19,20,21,22,23,24 ', ' amt:5,type:outside_oerb,odds:1,numbers:1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36 ', ' amt:5,type:outside_dozen,odds:2,numbers:1,2,3,4,5,6,7,8,9,10,11,12 ', ' amt:5,type:split,odds:17,numbers:13,16 ', ' amt:5,type:split,odds:17,numbers:13,14 ', ' amt:5,type:inside_whole,odds:35,numbers:14']

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