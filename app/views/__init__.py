from flask import views, jsonify

class IndexView(views.MethodView):
    def get(self):
        return jsonify({"message" : "The api is running"})

    def post(self):
        return "Post reequests"