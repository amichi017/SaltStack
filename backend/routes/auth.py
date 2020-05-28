from flask import Blueprint, request, jsonify
from flask_bcrypt import check_password_hash, bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

from backend.database import db

auth = Blueprint('auth',__name__)

@auth.route("/auth", methods=["POST"])
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

    test = db.users.find_one({"email": email})
    if test:
        if check_password_hash(test["password"], password):
            access_token = create_access_token(identity=email)
            # refresh_token = create_refresh_token(identity=email)
            return (
                jsonify(
                    message="Login Succeeded!",
                    access_token=access_token,
                    # refresh_token=refresh_token,
                ),
                201,
            )
    return jsonify(message="Bad Email or Password"), 401

#
# @auth.route("/auth/refresh", methods=["POST"])
# @jwt_refresh_token_required
# def refresh():
#     """
#
#     :return:
#     """
#     current_user = get_jwt_identity()
#     ret = {"access_token": create_access_token(identity=current_user)}
#     return jsonify(ret), 200


@auth.route("/auth/user", methods=["GET"])
@jwt_required
def user():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@auth.route("/register", methods=["POST"])
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
    test = db.users.find_one({"email": email})
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
        db.users.insert_one(user_info)
        return jsonify(message="User added sucessfully"), 201

