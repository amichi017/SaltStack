import datetime

from bson import ObjectId
from flask import Blueprint, request, jsonify
from flask_bcrypt import check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

from backend.app import db, bcrypt

bp = Blueprint('auth',__name__)

@bp.route("/auth", methods=["POST"])
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
            access_token = create_access_token(identity=email,expires_delta=datetime.timedelta(hours=1))
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
# @bp.route("/auth/refresh", methods=["POST"])
# @jwt_refresh_token_required
# def refresh():
#     """
#
#     :return:
#     """
#     current_user = get_jwt_identity()
#     ret = {"access_token": create_access_token(identity=current_user)}
#     return jsonify(ret), 200


@bp.route("/auth/user", methods=["GET"])
@jwt_required
def user():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@bp.route("/register", methods=["POST"])
@jwt_required
def register():
    """

    :return:
    """
    if request.is_json:
        first_name = request.json["first_name"]
        last_name = request.json["last_name"]
        role = request.json["role"]
        email = request.json["email"]
        password = request.json["password"]
    else:
        email = request.form["email"]
        first_name = request.form["first_name"]
        last_name = request.form["last_name"]
        role = request.form["role"]
        password = request.form["password"]

    # test = User.query.filter_by(email=email).first()
    test = db.users.find_one({"email": email})
    if test:
        return jsonify(message="User Already Exist"), 409
    else:
        user_info = dict(
            first_name=first_name,
            last_name=last_name,
            role = role,
            email=email,
            password=bcrypt.generate_password_hash(password),
        )
        # print(user_info)
        db.users.insert_one(user_info)
        return jsonify(message="User added successfully"), 201



@bp.route("/update/<id>", methods=["PUT"])
@jwt_required
def update(id):
    """

    :return:
    """
    if request.is_json:
        first_name = request.json["first_name"]
        last_name = request.json["last_name"]
        role = request.json["role"]
        email = request.json["email"]
        old_password1 = request.json["old_password1"]
        old_password2 = request.json["old_password2"]
        new_password = request.json["new_password"]
    else:
        email = request.form["email"]
        first_name = request.form["first_name"]
        last_name = request.form["last_name"]
        role = request.form["role"]
        old_password1 = request.form["old_password1"]
        old_password2 = request.form["old_password2"]
        new_password = request.form["new_password"]


    test = db.users.find_one({"_id": id})
    if old_password1 != old_password2:
        return jsonify(message="Bad Password Confirmation"), 401
    if test:
        myquery = {"_id": _id}
        newvalues = {"$set": {"password": bcrypt.generate_password_hash(new_password),"email":email,"role":role,"first_name":first_name,"last_name":last_name}}
        try:
            user = db.users.update_one(myquery, newvalues)
            return jsonify(message="User update successfully!"), 201
        except:
            return jsonify(message="Bad Email or Password"), 401

    return jsonify(message="wrong password Password"), 401

@bp.route("/get_users", methods=["GET"])
@jwt_required
def get_users():
    users = db.users.find({},{  "first_name": 1, "last_name": 1,"email":1,"role":1})
    res = []
    for user in users:
        user["_id"] = str(user["_id"])
        res.append(user)
    return jsonify(res)

@bp.route("/delete/<id>", methods=["DELETE"])
@jwt_required
def delete_user(id):
    try:
        user_id = ObjectId(id)
        user = db.users.find_one({"_id": user_id})
        if user:
            db.users.delete_one({"_id": user_id})
            return jsonify(message=user['email'] + " deleted successfully")
        return jsonify(message=user_id + " doesn't exist"), 400
    except:
        return jsonify(message=id + " doesn't exist"), 400



@bp.route("/update_password", methods=["POST"])
def update_password():
    """

    :return:
    """
    if request.is_json:
        email = request.json["email"]
        old_password1 = request.json["old_password1"]
        old_password2 = request.json["old_password2"]
        new_password = request.json["new_password"]

    else:
        email = request.form["email"]
        old_password1 = request.form["old_password1"]
        old_password2 = request.form["old_password2"]
        new_password = request.form["new_password"]

    test = db.users.find_one({"email":email})
    if old_password1 != old_password2:
        return jsonify(message="Bad Password Confirmation"), 401
    if test:
        myquery = {"email":email}
        newvalues = {"$unset": {"reset_token": ""}, "$set": {"password": bcrypt.generate_password_hash(new_password)}}
        try:
            user = db.users.update_one(myquery, newvalues)
            return jsonify(message="Password upadate Succeeded!"), 201
        except:
            return jsonify(message="Bad Email or Password"), 401

    return jsonify(message="Bad Email or Password"), 401



