from django.shortcuts import render
from .models import Messages
import datetime
from django.http import HttpResponseRedirect, HttpResponse


# Create your views here.
def inbox(request):
    if 'user' in request.session:
        data = ""

        if Messages.objects.filter(to_person=request.session['user'][1]):
            data = Messages.objects.filter(
                to_person=request.session['user'][1])
        else:
            data = ""
        return render(request, "inbox/index.html", {"data": data})
    else:
        return HttpResponseRedirect("/")


def compose(request):
    if request.method == "POST":
        to = request.POST['to']
        to = to[1:len(to)]
        title = request.POST['title']
        body = request.POST['body']

        new_message = Messages(
            from_person=request.session['user'][1],
            to_person=to,
            read="False",
            title=title,
            body=body,
            time=datetime.date.today().strftime("%d %m %y").replace(" ", "-"))

        new_message.save()

        return HttpResponseRedirect("/inbox/")
    else:
        return HttpResponseRedirect("/")


def view(request, from_person, to_person, id):
    if request.session['user'][1] == to_person:
        data = Messages.objects.get(from_person=from_person,
                                    to_person=to_person,
                                    id=id)

        return render(request, "inbox/view.html", {"data": data})
    else:
        return HttpResponseRedirect("/")


def delete(request, to_person, id):
    if request.session['user'][1] == to_person:
        d = Messages.objects.filter(to_person=to_person, id=id)

        d.delete()

        return HttpResponseRedirect("/inbox/")
    else:
        return HttpResponseRedirect("/inbox/")
