from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import RequestContext
from .models import Users
from django.contrib import messages
import json as json

from clint.textui import colored


def index(request):
    try:
        data = request.session['user']

        if data:
            return HttpResponseRedirect("/inbox/")
        else:
            return render(request, "auth/register.html")
    except:
        return render(request, "auth/register.html")


def login(request):

    username = request.POST['username']
    password = request.POST['password']

    if Users.objects.filter(username=username, password=password):
        data = Users.objects.get(username=username, password=password)

        saved = request.session['user'] = [data.name, data.username]

        return HttpResponseRedirect("/inbox/")
    else:
        messages.add_message(request, messages.INFO,
                             'Wrong username or password')
        return HttpResponseRedirect("/")


def login_api(request):

    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8')) 
        
        username, password = str(data["username"]), str(data["password"])
        user_data = Users.objects.filter(username=username, password=password)

        if(len(user_data) == 0):return JsonResponse({"status": 404, "error" : "Invalid username or password", "username" : None,
            "name" : None,
            "redirect" : None})
        else:
            real_user = Users.objects.get(username=username, password=password)
            request.session['user'] = [real_user.name, real_user.username]

        return JsonResponse({
            "status" : 200,
            "error" : None,
            "username" : real_user.username,
            "name" : real_user.name,
            "redirect" : "/inbox/"
        })
    else:
        return HttpResponse(json.dumps(
            {"error": f"{request.method} not supported"}),
                            content_type='application/json')


def has_user(request, username):
    return HttpResponse(len(Users.objects.filter(username=username)) is not 0)


def register(request):

    try:
        data = request.session['user']

        if data:
            return HttpResponseRedirect("/inbox/")
        else:
            return render(request, "auth/index.html")
    except:
        return render(request, "auth/index.html")


def save(request):
    name = request.POST['name']
    username = request.POST['username']
    password = request.POST['password']

    if Users.objects.filter(username=username):
        messages.add_message(request, messages.INFO, 'Username taken')
        return HttpResponseRedirect("/register/")
    else:
        data = Users(name=name, username=username, password=password)
        data.save()
        request.session['user'] = [name, username, password]

        return HttpResponseRedirect("/")
