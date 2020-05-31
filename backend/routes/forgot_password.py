import datetime

from flask import Blueprint, request, jsonify, render_template
from flask_jwt_extended import create_access_token, decode_token

from backend.app import db
from backend.services.mail_service import send_email

bp = Blueprint('forgot_password',__name__)

@bp.route("/forgot_password", methods=["POST"])
def forgot_password():
    print(request)

    if request.is_json:
        email = request.json["email"]
    else:
        email = request.form["email"]

    print(email)
    if not email:
        return jsonify(message="Bad Email"), 401

    user = db.users.find_one({"email": email})
    if not user:
         return jsonify(message="Bad Email"), 401

    expires = datetime.timedelta(hours=24)
    reset_token = create_access_token(identity=email, expires_delta=expires)
    print(reset_token)
    try:
         send_email('SaltStack GUI Reset Your Password',
                                                      sender='notifsalt@gmail.com',
                                                      recipients=[email],
                                                      text_body=render_template('email/reset_password.txt',
                                                        url=request.host_url + reset_token),
                                                      html_body=render_template('email/reset_password.html',
                                                    url=request.host_url + reset_token))
    except ValueError:
        return "err"

@bp.route("/reset_password/<reset_token>", methods=["POST"])
def reset_password(reset_token):
    """

    :return:
    """
    if request.is_json:
        reset_token = request.json["reset_token"]
        password = request.json["password"]

    else:
        reset_token = request.form["reset_token"]
        password = request.form["password"]

    print(decode_token(reset_token))
    # test = users.find_one({"reset_token": reset_token})
    # if test:
    #     return jsonify(message="User Already Exist"), 409

    # else:
    #     user_info = dict(
    #         first_name=first_name,
    #         last_name=last_name,
    #         email=email,
    #         password=bcrypt.generate_password_hash(password),
    #     )
    #     print(user_info)
    #     users.insert_one(user_info)
    #     return jsonify(message="User added sucessfully"), 201
    #
