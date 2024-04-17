from django.shortcuts import render

# Create your views here.


def wallet_detail(request):
    return render(request, 'wallet/detail.html', {
        'object': None
    })
