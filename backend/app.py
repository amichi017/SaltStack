from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_pymongo import MongoClient

from .database.db import initialize_db


app = Flask(__name__)
app.config.from_pyfile('config.py')
# print(app.config)
app.debug = True
CORS(app)
mail = Mail(app)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db = MongoClient().salt
# print(db)

from .routes import auth
from .routes import forgot_password
from .routes import cmd
from .routes import salt

app.register_blueprint(auth.bp)
app.register_blueprint(cmd.bp)
app.register_blueprint(forgot_password.bp)
app.register_blueprint(salt.bp)

