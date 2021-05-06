from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS as cors

from config import Config
from routes import ApplicationRoutes

from views import IndexView

app = Flask(__name__)
app.config.from_object(Config)

database = SQLAlchemy(app)
application_cors = cors(app)

routes = ApplicationRoutes(app, {
    "/" : IndexView
})


