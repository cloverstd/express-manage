# encoding: utf-8

# created by @cloverstd
# created at 2016-05-11 16:25

from flask.ext.marshmallow import Marshmallow
from flask.ext.restful import abort
from ..utils import tool

ma = Marshmallow()


class BaseModelSchema(ma.ModelSchema):
    def handle_error(self, exc, data):

        return abort(400, **tool.fail(400, exc.message))