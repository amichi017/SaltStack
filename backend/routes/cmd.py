from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from datetime import datetime, timedelta, timezone
from backend.app import db

# import salt.config
# import salt.client
import asyncio
import subprocess

# local = salt.client.LocalClient()
#print(local)
loop = asyncio.new_event_loop()
bp = Blueprint('cmd',__name__)


async def run_cmd(*cmd_args):
    '''
    :param list with the command's arguments:
    :return:
    '''
    kwargs = {'tgt_type':'list'}
    #print(cmd_args)
    res = []
    # res=local.cmd(*cmd_args,**kwargs)
    return res

# REAL MINIONS FUNCTION
@bp.route("/get_connected_minions")
@jwt_required
def get_connected_minions():
    """
    :return:
    """
    saltReturns = db.saltReturns
    now = datetime.now(timezone.utc)
    delta = now - timedelta(minutes=5)
    now = now.strftime('%Y%m%d%H%M%S%f')
    delta = delta.strftime('%Y%m%d%H%M%S%f')
    res = []
    saltReturns = saltReturns.find({"fun": "test.ping","jid": { "$gte": delta, "$lte": now }}).distinct("minion")
    for j in saltReturns:
        res.append(j)
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


#@bp.route("/test" ,methods=["GET"])
#@jwt_required
#def test():

    #return local.cmd(['c310-1.academy.jce.ac.il','c310-2.academy.jce.ac.il'],'test.ping', tgt_type='list')


