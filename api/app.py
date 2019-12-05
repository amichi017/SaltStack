from bson import ObjectId
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import pymongo

from pprint import pprint


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/SaltGUI"
mongo = PyMongo(app)




@app.route("/")
def hello_www():
    return "Hello World Wide Web!"


@app.route("/api/minions/get_all")
def get_all_minions():
    minions = mongo.db.minions
    res = []
    minions = minions.find()
    for j in minions:
        j['_id'] = str(j['_id'])
        res.append(j)
    return jsonify(res)


@app.route("/api/minions/<id>")
def get_minion_by_id(id):
    minions = mongo.db.minions
    res = []
    minions = minions.find({'_id' : ObjectId(id)})
    for j in minions:
        j['_id'] = str(j['_id'])
        res.append(j)
    return jsonify(res)


@app.route("/api/minions/ins", methods=["POST"])
def insert_minion():
    if request.method == 'POST':
        minions = mongo.db.minions
        jsonData = request.get_json()
        inserted_id = minions.insert_one(jsonData).inserted_id
        print(inserted_id)
        return jsonify({"new minion": str(inserted_id)})

    else:
        print(request)
        return jsonify("yabalblooo")

# @app.route("/api/minions/insert_minion" , methods=['POST'])
# def get_minion_by_id(id):
#     print(request)
#     return jsonify({'text', 'yabalooloo'})

