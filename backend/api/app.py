from bson.objectid import ObjectId
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, jwt_refresh_token_required

from flask_bcrypt import Bcrypt
from flask_cors import CORS


from pymongo import MongoClient

import subprocess


import urllib.parse


from flask import Flask, jsonify, request
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    jwt_refresh_token_required,
    create_refresh_token,
    get_jwt_identity,
)

from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from flask_cors import CORS


from flask_pymongo import PyMongo
from pymongo import MongoClient

import pprint
import urllib.parse

from flask_mail import Mail, Message

# from pprint import pprint


mongo_username = urllib.parse.quote_plus('saltstack')
mongo_pwd = urllib.parse.quote_plus('Salt5t@ck')

uri = 'mongodb://%s:%s@localhost:27017/salt' % (mongo_username,mongo_pwd)
client = MongoClient(uri)
db = client.salt
users = db.users
print(db)


app = Flask(__name__)
app.debug = True
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


# JWT Config
app.config["JWT_SECRET_KEY"] = "this-is-secret-key" #change it
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False


@app.route("/auth", methods=["POST"])
def login():
    """

    :return:
    """
    if request.is_json:
        email = request.json["email"]
        password = request.json["password"]
    else:
        email = request.form["email"]
        password = request.form["password"]

    test = users.find_one({"email": email})
    if test:
        if check_password_hash(test["password"], password):
            access_token = create_access_token(identity=email)
            refresh_token = create_refresh_token(identity=email)
            return (
                jsonify(
                    message="Login Succeeded!",
                    access_token=access_token,
                    refresh_token=refresh_token,
                ),
                201,
            )
    return jsonify(message="Bad Email or Password"), 401


@app.route("/auth/refresh", methods=["POST"])
@jwt_refresh_token_required
def refresh():
    """

    :return:
    """
    current_user = get_jwt_identity()
    ret = {"access_token": create_access_token(identity=current_user)}
    return jsonify(ret), 200


@app.route("/auth/user", methods=["GET"])
@jwt_required
def user():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route("/register", methods=["POST"])
def register():
    """

    :return:
    """
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
        user_info = dict(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=bcrypt.generate_password_hash(password),
        )
        print(user_info)
        users.insert_one(user_info)
        return jsonify(message="User added sucessfully"), 201



@app.route("/")
def hello_www():
    print(request.headers)
    return "Hello World!"



@app.route("/api/saltReturns")
@jwt_required
def get_SaltReturns():
    """

    :return:
    """
    saltReturns = db.saltReturns
    print(saltReturns)
    res = []
    saltReturns = saltReturns.find()
    for j in saltReturns:
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)



@app.route("/api/saltReturns/apply")
@jwt_required
def get_salt_applies():
    """

    :return:
    """
    saltReturns = db.saltReturns
    print(saltReturns)
    res = []
    saltReturns = saltReturns.find({"fun": "state.apply"})
    for j in saltReturns:
        jid = j["jid"]
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)


@app.route("/api/saltReturns/apply/<date_url>")
@jwt_required
def get_daily_applies(date_url):
    """

    :param date_url:
    :return:
    """
    saltReturns = db.saltReturns
    date = date_url
    print(date)
    print(saltReturns)
    res = []
    saltReturns = saltReturns.find(
        {"fun": "state.apply", "jid": {"$regex": "%s.*" % (date)}}
    )
    for j in saltReturns:
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)

@app.route("/api/saltReturns/apply/month/<month>")
@jwt_required
def get_monthly_applies(month):
    """

    :param month:
    :return:
    """
    saltReturns = db.saltReturns
    date = month
    print(date)
    print(saltReturns)
    res = []
    saltReturns = saltReturns.find(
        {"fun": "state.apply", "jid": {"$regex": "%s.*" % (date)}}
    )
    for j in saltReturns:
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)


@app.route("/api/saltReturns/apply/year/<year>")
@jwt_required
def get_yearly_applies(year):
    """

    :param year:
    :return:
    """
    saltReturns = db.saltReturns
    year = year
    print(year)
    print(saltReturns)
    res = []
    saltReturns = saltReturns.find(
        {"fun": "state.apply", "jid": {"$regex": "%s.*" % (year)}}
    )
    for j in saltReturns:
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)




@app.route("/api/jobs")
@jwt_required
def get_jobs():
    """

    :return:
    """
    jobs = db.jobs
    res = []
    jobs = jobs.find()
    for j in jobs:
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)


@app.route("/api/events")
@jwt_required
def get_events():
    """

    :return:
    """
    events = db.events
    res = []
    events = events.find()
    for j in events:
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)



# ----------- Mail Notifications Section--------------

# def check_updates():
#     pass
# def get_priority_deamons():
#     pass

# def set_priority_deamons():
#     pass

# def get_priority_mails():
#     pass

# def set_priority_mails():
#     pass




# def send_mails():
#     # Mail config
#     app.config['MAIL_SERVER'] = 'smtp.gmail.com'
#     app.config['MAIL_PORT'] = 465
#     app.config['MAIL_USERNAME'] = 'notifsalt@gmail.com'
#     app.config['MAIL_PASSWORD'] = 'Salt5t@ck'
#     # app.config['MAIL_USE_TLS'] = True
#     app.config['MAIL_USE_SSL'] = True
#     mail = Mail(app)
#     msg = Message('Hello',sender='notifsalt@gmail.com', recipients=['aviher11@gmail.com'])
#     msg.body = "This is the email body"
#     print(msg)
#     try:
#         mail.send(msg)
#     except ValueError:
#         print(ValueError)
#         return "err"
#     return "Sent"







# @app.route("/mail")
# def mail():
#     return send_mails()


#-------------------Commands Option Section----------------------------------
@app.route("/saltstack_cmd")
def saltstack_cmd():
    cmd = [""]
    p = subprocess.Popen(cmd, # <----
                     stdout=subprocess.PIPE,
                     stderr=subprocess.PIPE,
                     stdin=subprocess.PIPE)
    out, err = p.communicate()
    print(out,err)
    return out




if __name__ == "__main__":
    app.run()
