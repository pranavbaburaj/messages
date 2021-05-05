from flask import views

class IndexView(views.MethodView):
    def get(self):
        return "The api is running"

    def post(self):
        return "Post reequests"