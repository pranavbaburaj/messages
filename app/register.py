from flask import views, request, jsonify

from users import RegisterUser, Credentials, Assets

class RegisterUserView(views.MethodView):
    required_fields = [
        "username",
        "email",
        "password"
    ]
    
    def post(self):
        data = dict(request.values)
        valid = self.search_required_fields(self.required_fields, data)
        if not valid:
            return jsonify(status=404, message="No required fields")

        username, email, password = self.find_credentials(data)
        try:
            register = RegisterUser(
                username,
                Credentials(email, password),
                Assets(str(None), str(None))
            ).register_new_user()

            return jsonify(status=200, message="Success")
        except Exception as exception_message:
            return jsonify(status=404, message=exception_message)
        return jsonify(request.values)

    def search_required_fields(self, required, data):
        for required_field in required:
            if not required_field in data:
                return False

        return True

    def find_credentials(self, data):
        return (data.get("username"), data.get("email"), data.get("password"))
