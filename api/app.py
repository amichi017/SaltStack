from bson.objectid import ObjectId
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from pymongo import MongoClient

import urllib.parse

#from pprint import pprint

app = Flask(__name__)
#mongo = PyMongo(app)
username = urllib.parse.quote_plus('username')
#print(username)
pwd = urllib.parse.quote_plus('password')
#print(pwd)
uri = 'mongodb://%s:%s@localhost:27017/salt' % (username,pwd)
print(uri)
client = MongoClient(uri)
db = client.salt
print(db)


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



@app.route("/api/saltReturns/apply")
def get_salt_applies():
    saltReturns = db.saltReturns
    print(saltReturns)
    res = []
    saltReturns = saltReturns.find({'fun':'state.apply'})
    for j in saltReturns:
        jid = j['jid']
        print(jid.Dat)
        j['_id'] = str(j['_id'])
        res.append(j)
    return jsonify(res)


@app.route("/api/saltReturns/apply/<date_url>")
def get_daily_applies(date_url):
    saltReturns = db.saltReturns
    date = date_url
    print(date)
    print(saltReturns)
    res = []
    saltReturns = saltReturns.find({
        'fun':'state.apply',
        'jid': {'$regex':"%s.*" % (date)}})
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
