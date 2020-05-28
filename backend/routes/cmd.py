from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

cmd = Blueprint('cmd',__name__)


# REAL MINIONS FUNCTION
# @app.route("/get_connected_minions")
# # @jwt_required
# def get_connected_minions():
#
#     return local.cmd_async('*','state.apply')
#
# @app.route("/saltstack_cmd" ,methods=["POST"])



@cmd.route("/get_connected_minions")
@jwt_required
def get_connected_minions():

    return jsonify(result=['sm-stud.jce.ac.il','sm-stud01.jce.ac.il','sm-stud02.jce.ac.il'])

@cmd.route("/saltstack_cmd" ,methods=["POST"])
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
    #
    # p = subprocess.Popen(cmd, # <----
    #                  stdout=subprocess.PIPE,
    #                  stderr=subprocess.PIPE,
    #                  stdin=subprocess.PIPE)
    # out, err = p.communicate()
    # print("a")
    # if len(err) > 0:
    #     return err
    return cmd


# REAL COMMANDS FUNCTION
# @cmd.route("/saltstack_cmd" ,methods=["POST"])
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

