import asyncio

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required


# from backend.app import db
# from salt import local
bp = Blueprint('cmd',__name__)

loop = asyncio.new_event_loop()

# # REAL MINIONS FUNCTION
# @bp.route("/get_connected_minions")
# # @jwt_required
# def get_connected_minions():
#     # return local.cmd_async('*','state.apply')
#



@bp.route("/get_connected_minions")
# @jwt_required
def get_connected_minions():
    loop.run_until_complete(asyncio.sleep(15))
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

    cmd = [func,tgt]
    loop.run_until_complete(asyncio.sleep(15))


    return jsonify(res = cmd)


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

