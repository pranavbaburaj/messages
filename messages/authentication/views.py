from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import Users
from django.contrib import messages

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
        messages.add_message(request, messages.INFO, 'Wrong username or password')
        return HttpResponseRedirect("/")

    
                    

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


        