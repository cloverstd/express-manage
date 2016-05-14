# encoding: utf-8

# created by @cloverstd
# created at 2016-05-10 22:48

from flask import Blueprint
from flask.ext.restful import Resource, reqparse
from flask.ext.jwt import jwt_required
from application.utils.lib import HackArgument

bp = Blueprint(
    __name__,
    "api"
)


class AuthResource(Resource):
    decorators = [jwt_required()]

    def __init__(self, *args, **kwargs):
        self.parser = reqparse.RequestParser(argument_class=HackArgument, trim=True)
        super(AuthResource, self).__init__(*args, **kwargs)