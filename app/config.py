import os

database = "databases"
basedir = os.path.join(os.path.abspath(os.path.dirname(__file__)), database)

class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False