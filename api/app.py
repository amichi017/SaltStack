from bson import ObjectId
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import pymongo

from pprint import pprint


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/salt"
mongo = PyMongo(app)




@app.route("/")
def hello_www():
    return "Hello World Wide Web!"


@app.route("/api/saltReturns")
def get_SaltReturns():
    saltReturns = mongo.db.saltReturns
    res = []
    saltReturns = saltReturns.find()
    for j in saltReturns:
        j['_id'] = str(j['_id'])
        res.append(j)
    return jsonify(res)



@app.route("/api/events")
def get_events():
    events = mongo.db.events
    res = []
    events = events.find()
    for j in events:
        j['_id'] = str(j['_id'])
        res.append(j)
    return jsonify(res)


@app.route("/api/jobs")
def get_events():
    jobs = mongo.db.jobs
    res = []
    jobs = jobs.find()
    for j in jobs:
        j['_id'] = str(j['_id'])
        res.append(j)
    return jsonify(res)


