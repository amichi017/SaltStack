import os
import urllib

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail

from .database import db
from .database.db import initialize_db

app = Flask(__name__)
app.config.from_pyfile(os.environ['APP_SETTINGS'])

print("==================")
print(os.environ['APP_SETTINGS'])
print("==================\n")

mail = Mail(app)
print("==================")
print(mail)
print("==================\n")



from .routes import initialize_routes


CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

#
# print("==================")
# print(bcrypt)
# print("==================\n")
#
# print("==================")
# print(jwt)
# print("==================\n")
#
initialize_db(app)
initialize_routes(app)

