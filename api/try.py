from flask import Flask
from pymongo import MongoClient
import urllib.parse

username = urllib.parse.quote_plus('user')
username
password = urllib.parse.quote_plus('password')
password


app = Flask(__name__)
client = MongoClient("mongodb://%s:%s@localhost:27017/salt" % (username,password))
print(client)


@app.route("/")
def hello_www():
	return "hello fucking world"
