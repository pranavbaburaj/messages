import json

from flask import views, jsonify, request, session
from users import Credentials, Users

class AuthenticateUser(object):
    def __init__(self, credentials):
        assert isinstance(credentials, Credentials)

        self.email = credentials.email
        self.password = credentials.password

    def is_registered_user(self):
        registered_users = Users.query.filter_by(email=self.email, password=self.password).all()
        if len(registered_users) == 0:
            return False
        
        user = registered_users[0]
        session['user'] = json.dumps({
            "username" : user.username,
            "uuid" : user.uuid
        })

        print(session)

        return True

class LoginUserView(views.MethodView):
    required = [
        "email",
        "password"
    ]

    def post(self):
        values = dict(request.values)
        if not self.check_required_fields(values):
            return jsonify(status=400, message="No required parameters")
        
        login = AuthenticateUser(Credentials(
            values.get("email"), values.get("password")
        )).is_registered_user()

        if not login:
            return jsonify(status=400, message="Invalid credentials")

        return jsonify(status=200, message="Success")

    def check_required_fields(self, data):
        for required_data in self.required:
            if required_data not in data:
                return False

        return True

