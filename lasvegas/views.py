from typing import Any
from django.db.models.query import QuerySet
from lasvegas.models import Movement
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.

@login_required
def wallet_detail(request):
    return render(request, 'wallet/detail.html', {
        'object': request.user.wallet,
    })

class MovementListView(LoginRequiredMixin, ListView):
    model = Movement
    template_name = 'movement/list.html'

    def get_queryset(self) -> QuerySet[Any]:
        return super().get_queryset() \
            .filter(wallet__owner=self.request.user)
