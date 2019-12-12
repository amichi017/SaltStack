from bson.objectid import ObjectId
from flask import Flask, jsonify, request
from flask_jwt_extended import create_access_token, JWTManager, jwt_required
from flask_pymongo import PyMongo
from pymongo import MongoClient
from werkzeug.security import safe_str_cmp


import urllib.parse

#from pprint import pprint

#mongo = PyMongo(app)
username = urllib.parse.quote_plus('username')
#print(username)
pwd = urllib.parse.quote_plus('password')
#print(pwd)
uri = 'mongodb://%s:%s@localhost:27017/salt' % (username,pwd)
# print(uri)
client = MongoClient(uri)
db = client.salt
users = db.users
# print(db)

app = Flask(__name__)
jwt = JWTManager(app)

# JWT Config
app.config["JWT_SECRET_KEY"] = "this-is-secret-key" #change it



@app.route("/login", methods=["POST"])
def login():
    if request.is_json:
        user_name = request.json["username"]
        pwd = request.json["password"]
    else:
        user_name = request.form["username"]
        pwd = request.form["password"]

    print(user_name,pwd)
    test = users.find_one({"username": user_name,"password":pwd})
    if test:
        access_token = create_access_token(identity=username)
        return jsonify(message="Login Succeeded!", access_token=access_token), 201
    else:
        return jsonify(message="Bad username or Password"), 401


@app.route("/")
def hello_www():
    print(request.headers)
    return "Hello World!"


@app.route("/api/saltReturns")
@jwt_required
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
@jwt_required
def get_salt_applies():
    saltReturns = db.saltReturns
    print(saltReturns)
    res = []
    saltReturns = saltReturns.find({'fun':'state.apply'})
    for j in saltReturns:
        jid = j['jid']
        j['_id'] = str(j['_id'])
        res.append(j)
    return jsonify(res)


@app.route("/api/saltReturns/apply/<date_url>")
@jwt_required
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
@jwt_required
def get_jobs():
    jobs = db.jobs
    res = []
    jobs = jobs.find()
    for j in jobs:
        j['_id'] = str(j['_id'])
        res.append(j)
    return jsonify(res)


@app.route("/api/events")
@jwt_required
def get_events():
	events = db.events
	res = []
	events = events.find()
	for j in events:
		j['_id'] = str(j['_id'])
		res.append(j)
	return jsonify(res)
