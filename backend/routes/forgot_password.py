import datetime

from flask import Blueprint, request, jsonify, render_template, redirect, flash
from flask_jwt_extended import create_access_token, decode_token, current_user
from wtforms import Form, PasswordField, StringField, HiddenField
from wtforms.validators import DataRequired, ValidationError

from backend.app import db, bcrypt
from backend.services.mail_service import send_email

import asyncio

class PasswordForm(Form):
    reset_token = HiddenField("reset_token")
    password1 = PasswordField('Password1', validators=[DataRequired()])
    password2 = PasswordField('Password2', validators=[DataRequired()])


bp = Blueprint('forgot_password', __name__)

loop = asyncio.new_event_loop()

@bp.route("/forgot_password", methods=["POST"])
def forgot_password():
    # print(request)

    if request.is_json:
        email = request.json["email"]
    else:
        email = request.form["email"]

    # print(email)
    if not email:
        return jsonify(message="Bad Email"), 401

    user = db.users.find_one({"email": email})
    if not user:
        return jsonify(message="Bad Email"), 401

    expires = datetime.timedelta(hours=24)
    reset_token = create_access_token(identity=email, expires_delta=expires)

    myquery = {"email": email}
    newvalues = {"$set": {"reset_token": reset_token}}
    user = db.users.update_one(myquery, newvalues)

    url = request.host_url + 'reset/'
    try:
        res = loop.run_until_complete(send_email('SaltStack GUI Reset Your Password',
                   sender='notifsalt@gmail.com',
                   recipients=[email],
                   text_body=render_template('email/reset_password.txt',
                                             url=url + reset_token),
                   html_body=render_template('email/reset_password.html',
                                             url=url + reset_token)))
        return jsonify(res=res)
    except Exception as e:
        return jsonify(message="Bad Email"), 401


@bp.route("/reset_password", methods=["POST"])
def reset_password():
    """

    :return:
    """
    reset_token = request.form["reset_token"]
    password1 = request.form["password1"]
    password2 = request.form["password2"]
    # print("=============POST=================")
    # print(reset_token)
    # print(password1)
    # print(password2)

    test = db.users.find_one({"reset_token": reset_token})
    if password1 != password2:
        return jsonify(message="Bad Password Confirmation"), 401
    if test:
        myquery = {"reset_token": reset_token}
        newvalues = {"$unset": {"reset_token":""},"$set": {"password":bcrypt.generate_password_hash(password1)}}

        user = db.users.update_one(myquery, newvalues)
        return jsonify(message="Password upadate Succeeded!"), 201

    return jsonify(message="Bad Reset Token"), 401



@bp.route('/reset', methods=["GET", "POST"])
@bp.route('/reset/<token>', methods=["GET", "POST"])
def reset(token=None):
    # print(token)
    test = db.users.find_one({"reset_token": token})
    if test:
        # print(test)
        form = PasswordForm(reset_token=token)
        return render_template('change_password.html', form=form)
