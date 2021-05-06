from users import RegisterUser, Assets, Credentials
from app import database

database.create_all()

register = RegisterUser("prahnavbaburaj", Credentials(
    "tkuikuik",
    "rfe"
), Assets(None, None))

try:
    register.register_new_user(register.username)
except Exception as e:
    print((e))
