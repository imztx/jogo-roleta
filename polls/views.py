from django.shortcuts import render

from django.http import Http404
from django.http import HttpResponse
from django.template import loader
from .models import Jogo
from django import forms





def index(request):
    latest_question_list = Jogo.objects.order_by("-pub_date")[:5]
    template = loader.get_template("polls/index.html")
    context = {
        "latest_question_list": latest_question_list,
    }
    return HttpResponse(template.render(context, request))


def detail(request, question_id):
    try:
        question = Jogo.objects.get(pk=question_id)
    except Jogo.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, "polls/detail.html", {"question": question})


def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)