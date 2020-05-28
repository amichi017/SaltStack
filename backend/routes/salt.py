from flask import jsonify, Blueprint
from flask_jwt_extended import jwt_required

from backend.database import db

salt = Blueprint('api',__name__)

@salt.route("/api/saltReturns")
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



@salt.route("/api/saltReturns/apply")
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


@salt.route("/api/saltReturns/apply/<date_url>")
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

@salt.route("/api/saltReturns/apply/month/<month>")
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


@salt.route("/api/saltReturns/apply/year/<year>")
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




@salt.route("/api/jobs")
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


@salt.route("/api/events")
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
