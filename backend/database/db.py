import urllib

from flask_pymongo import PyMongo


def initialize_db(app):
    db = PyMongo(app)
    print("==================")
    print(db)
    print("==================\n")
    # db.init_app(app)
