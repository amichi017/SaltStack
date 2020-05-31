import urllib
from flask_pymongo import  MongoClient


def initialize_db(app):
    db = MongoClient().salt
    db.init_app(app)
    # print("================init db================")
    # print(mongo.salt)
    # print("==================\n")
    return db