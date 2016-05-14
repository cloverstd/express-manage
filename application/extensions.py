# encoding: utf-8

# created by @cloverstd
# created at 2016-05-11 21:03

from flask.ext.jwt import JWT
from .models import Member


def authenticate(username, password):
    member = Member.query.filter_by(username=username).first()
    if member and member.check_password(password):
        return member


def identity(payload):
    user_id = payload['identity']
    return Member.query.get(user_id)

jwt = JWT(authentication_handler=authenticate, identity_handler=identity)