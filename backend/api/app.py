from bson.objectid import ObjectId
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

from flask_bcrypt import Bcrypt, generate_password_hash,check_password_hash
from flask_cors import CORS


from flask_pymongo import PyMongo
from pymongo import MongoClient

import pprint
import urllib.parse

#from pprint import pprint

#mongo = PyMongo(app)
mongo_username = urllib.parse.quote_plus('saltstack')
# print(mongo_username)
mongo_pwd = urllib.parse.quote_plus('Salt5t@ck')
# print(mongo_pwd)
uri = 'mongodb://%s:%s@localhost:27017/salt' % (mongo_username,mongo_pwd)
# print(uri)
client = MongoClient(uri)
db = client.salt
users = db.users

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


# JWT Config
app.config["JWT_SECRET_KEY"] = "this-is-secret-key" #change it


@app.route("/register", methods=["POST"])
def register():
    if request.is_json:
        first_name = request.json["first_name"]
        last_name = request.json["last_name"]
        email = request.json["email"]
        password = request.json["password"]
    else:
        email = request.form["email"]
        first_name = request.form["first_name"]
        last_name = request.form["last_name"]
        password = request.form["password"]

    # test = User.query.filter_by(email=email).first()
    test = users.find_one({"email": email})
    if test:
        return jsonify(message="User Already Exist"), 409
    
    else:
        user_info = dict(first_name=first_name, last_name=last_name, email=email, password=bcrypt.generate_password_hash(password))
        print(user_info)
        users.insert_one(user_info)
        return jsonify(message="User added sucessfully"), 201
        
@app.route("/login", methods=["POST"])
def login():
    if request.is_json:
        email = request.json["email"]
        password = request.json["password"]
    else:
        email = request.form["email"]
        password = request.form["password"]

       
    test = users.find_one({"email": email})
    if test:
        if check_password_hash(test["password"],password):
            access_token = create_access_token(identity=email)
            return jsonify(message="Login Succeeded!", access_token=access_token), 201
    return jsonify(message="Bad Email or Password"), 401


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


if __name__ == '__main__':
 app.run(debug=True)
