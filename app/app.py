from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS as cors

from config import Config

from views import IndexView
from register import RegisterUserView

app = Flask(__name__)
app.config.from_object(Config)

database = SQLAlchemy(app)
application_cors = cors(app)




