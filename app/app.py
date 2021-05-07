import json

from flask import Flask, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS as cors

from config import Config

app = Flask(__name__)
app.config.from_object(Config)

database = SQLAlchemy(app)
application_cors = cors(app)

app.secret_key = "983mkjc89eic9ic"

@app.route("/current/user")
def get_current_user():
    print(session)
    data = session.get('user')
    if not data:
        return jsonify(status=400, message="No users")

    return json.loads(data)
    