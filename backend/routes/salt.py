from flask import jsonify, Blueprint
from flask_jwt_extended import jwt_required

from backend.app import db

bp = Blueprint('api',__name__)


@bp.route("/api/saltReturns/apply")
@jwt_required
def get_salt_applies():
    """

    :return:
    """
    saltReturns = db.saltReturns
    # print(saltReturns)
    res = []
    saltReturns = saltReturns.find({"fun": "state.apply"})
    for j in saltReturns:
        jid = j["jid"]
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)


@bp.route("/api/saltReturns/apply/<date_url>")
@jwt_required
def get_daily_applies(date_url):
    """

    :param date_url:
    :return:
    """
    saltReturns = db.saltReturns
    date = date_url
    # print(date)
    # print(saltReturns)
    res = []
    saltReturns = saltReturns.find(
        {"fun": "state.apply", "jid": {"$regex": "%s.*" % (date)}}
    )
    for j in saltReturns:
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)


@bp.route("/api/saltReturns/apply/month/<month>")
@jwt_required
def get_monthly_applies(month):
    """

    :param month:
    :return:
    """
    saltReturns = db.saltReturns
    date = month
    # print(date)
    # print(saltReturns)
    res = []
    saltReturns = saltReturns.find(
        {"fun": "state.apply", "jid": {"$regex": "%s.*" % (date)}}
    )
    for j in saltReturns:
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)


@bp.route("/api/saltReturns/apply/year/<year>")
@jwt_required
def get_yearly_applies(year):
    """

    :param year:
    :return:
    """
    saltReturns = db.saltReturns
    year = year
    # print(year)
    # print(saltReturns)
    res = []
    saltReturns = saltReturns.find(
        {"fun": "state.apply", "jid": {"$regex": "%s.*" % (year)}}
    )
    for j in saltReturns:
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)



@bp.route("/api/saltReturns/apply/<start_date>/<end_date>")
@jwt_required
def get_table_returns(start_date,end_date):
    """

    :param year:
    :return:
    """
    saltReturns = db.saltReturns

    # print(year)
    # print(saltReturns)
    res = []
    saltReturns = saltReturns.find(
        {"fun": "test.ping",
         "jid": { "$gte": start_date, "$lte": end_date }
         },{ "minion": 1, "jid": 1}
    )

    for j in saltReturns:
        j["_id"] = str(j["_id"])
        res.append(j)
    return jsonify(res)


