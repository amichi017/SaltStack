import asyncio

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required


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
#     return local.cmd(*cmd_args)
async def run_cmd(*cmd_args):
    print(cmd_args)
    return cmd_args

# REAL MINIONS FUNCTION
@bp.route("/get_connected")
# @jwt_required
def get_connected():
    cmd_args = ['*','test.ping']
    minions = loop.run_until_complete(run_cmd(*cmd_args))
    print(minions)
    return jsonify(res=minions)




@bp.route("/get_connected_minions")
@jwt_required
def get_connected_minions():
    res = loop.run_until_complete(asyncio.sleep(15))
    print(res)
    return jsonify(result=['sm-stud.jce.ac.il','sm-stud01.jce.ac.il','sm-stud02.jce.ac.il'])

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
    if salt_cmd is not None:
        pass

    cmd_args = [func,tgt,salt_cmd]
    res = loop.run_until_complete(run_cmd(*cmd_args))


    return jsonify(res = res)


# REAL COMMANDS FUNCTION
# @bp.route("/saltstack_cmd" ,methods=["POST"])
# # @jwt_required
# def saltstack_cmd():

#
#     local = salt.client.LocalClient()
#     if request.is_json:
#         func = request.json["func"]
#         tgt = request.json["tgt"]
#         salt_cmd = request.json["salt_cmd"]
#     else:
#         func = request.form["func"]
#         tgt = request.form["tgt"]
#         salt_cmd = request.json["salt_cmd"]
#     if salt_cmd is not None:
#         pass
#
#     asc = local.cmd_async('*','state.apply')
#     print("asc")
#     if len(err) > 0:
#         return err
#     return out

