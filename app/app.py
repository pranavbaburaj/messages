from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS as cors

from config import Config

app = Flask(__name__)
app.config.from_object(Config)

database = SQLAlchemy(app)
application_cors = cors(app)

app.secret_key = "983mkjc89eic9ic"




