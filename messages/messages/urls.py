from django.contrib import admin
from django.urls import path
from authentication.views import *
from inbox.views import *
from django.http import *


def logout(request):
    del request.session['user']
    return HttpResponseRedirect("/")


def hello(request, drs):
    return HttpResponse(drs)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', register),
    path('login/', login),
    path('register/', index),
    path('save/', save),
    path('logout/', logout),
    path('inbox/', inbox),
    path('compose/', compose),
    path('view/from/<from_person>/<to_person>/<id>/', view),
    path('delete/<to_person>/<id>/', delete),
    path('user/exists/<username>/', has_user),
    path('is_valid_user/', login_api),
]
