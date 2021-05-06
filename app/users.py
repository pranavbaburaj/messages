import string
import secrets

from app import database

class Users(database.Model):
    id = database.Column(database.Integer, primary_key=True)
    uuid = database.Column(database.String(15), unique=True, nullable=False)
    username = database.Column(database.String(80), unique=True, nullable=False)
    email = database.Column(database.String(120), unique=True, nullable=False)
    password = database.Column(database.String(12), nullable=False)
    avatar = database.Column(database.String(500))
    banner = database.Column(database.String(500))

    def __repr__(self):
        return "<Users>"


class Credentials(object):
    def __init__(self, email, password):
        self.email = email
        self.password = password
    
    def __repr__(self):
        return self.email

class Assets(object):
    def __init__(self, avatar, banner):
        self.avatar = avatar
        self.banner = banner

    def __repr__(self):
        return str(self.avatar)

class UniqueUserIdentifier(object):
    def __init__(self, length=8):
        self.length = length
        self.identifiers = Users.query.order_by(Users.uuid).all()

    def create_unique_identifier(self):
        identifier = self.generate_identifier()
        while self.check_identifier(identifier):
            identifier = self.generate_identifier()

        return identifier

    def check_identifier(self, identifier):
        return identifier in self.identifiers

    def generate_identifier(self):
        alphabet = string.ascii_letters + string.digits
        return ''.join(secrets.choice(alphabet) for i in range(self.length))

class RegisterUser(object):
    def __init__(self, username, credentials, assets):
        self.username = username
        self.credentials = credentials
        self.assets = assets

    def register_new_user(self, username):
        if self.__find_username_availability(username):
            return "User already exist"

        if self.__find_email_availability(self.credentials.email):
            return "Email already taken"

        identifier = UniqueUserIdentifier().create_unique_identifier()
        user = Users(
            uuid=identifier,
            username=self.username,
            email=self.credentials.email,
            password=self.credentials.password,
            avatar=self.assets.avatar,
            banner=self.assets.banner
        )

        database.session.add(user)
        database.session.commit()

        return user

    def __find_username_availability(self, username):
        usernames = [user.username for user in Users.query.order_by(Users.username).all()]

        return username in usernames

    def __find_email_availability(self, email):
        emails = [user.email for user in Users.query.order_by(Users.email).all()]
        return email in emails