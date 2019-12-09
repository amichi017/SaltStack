from bson.objectid import ObjectId
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from pymongo import MongoClient

import urllib.parse

#from pprint import pprint

app = Flask(__name__)
#mongo = PyMongo(app)
username = urllib.parse.quote_plus('user')
#print(username)
pwd = urllib.parse.quote_plus('password')
#print(pwd)
uri = 'mongodb://%s:%s@localhost:27017/salt' % (username,pwd)
#print(uri)
client = MongoClient(uri)
db = client.salt



@app.route("/")
def hello_www():
    return "Hello World!"


@app.route("/api/saltReturns")
def get_SaltReturns():
    saltReturns = db.saltReturns
    print(saltReturns)
    res = []
    saltReturns = saltReturns.find()
    for j in saltReturns:
        j['_id'] = str(j['_id'])
        res.append(j)
    return jsonify(res)



@app.route("/api/jobs")
def get_jobs():
    jobs = db.jobs
    res = []
    jobs = jobs.find()
    for j in jobs:
        j['_id'] = str(j['_id'])
        res.append(j)
    return jsonify(res)


@app.route("/api/events")
def get_events():
	events = db.events
	res = []
	events = events.find()
	for j in events:
		j['_id'] = str(j['_id'])
		res.append(j)
	return jsonify(res)
