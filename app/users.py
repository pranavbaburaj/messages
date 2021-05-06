from app import database

class Users(database.Model):
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(15), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(12), nullable=False)
    avatar = db.Column(db.String(500))
    banner = db.Column(db.String(500))

    def __repr__(self):
        return "<Users>"