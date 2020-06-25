import asyncio

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from backend.app import db

# from backend.app import db
# import salt.config
# import salt.client

import asyncio


# local = salt.client.LocalClient()
loop = asyncio.new_event_loop()



bp = Blueprint('cmd',__name__)



# async def run_cmd(*cmd_args):
#     '''
#     :param list with the command's arguments:
#     :return:
#     '''
#     print(cmd_args)
#     res = local.cmd(*cmd_args)
#     return res

# dummy run_cmd
async def run_cmd(*cmd_args):
    print(cmd_args)
    return cmd_args

# REAL MINIONS FUNCTION
@bp.route("/get_connected_minions")
@jwt_required
def get_connected_minions():
    """
    :return:
    """
    saltReturns = db.saltReturns
    # print(saltReturns)
    res = []
    saltReturns = saltReturns.find({"fun": "test.ping","jid": { "$gte": '2020062435', "$lte": '2020062540' }},{ "minion": 1, "jid": 1})
    for j in saltReturns:
        j["_id"] = str(j["_id"])
        res.append(j["minion"])
    return jsonify(result=res)

@bp.route("/saltstack_cmd" ,methods=["POST"])
@jwt_required
def saltstack_cmd():

    if request.is_json:
        func = request.json["func"]
        tgt = request.json["tgt"]
        salt_cmd = request.json["salt_cmd"]
    else:
        func = request.form["func"]
        tgt = request.form["tgt"]
        salt_cmd = request.json["salt_cmd"]

    cmd_args = [tgt,func]
    print(cmd_args)
    if len(salt_cmd) > 0:
        cmd_args.append(salt_cmd)
    res = loop.run_until_complete(run_cmd(*cmd_args))


    return jsonify(res = res)

