# encoding: utf-8

# created by @cloverstd
# created at 2016-05-13 20:15

from flask.ext.restful.reqparse import Argument
from flask.ext.restful import abort
from flask import current_app
import six
from .tool import fail
import arrow


class HackArgument(Argument):

    def handle_validation_error(self, error, bundle_errors):

        error_str = six.text_type(error)
        error_msg = self.help.format(error_msg=error_str) if self.help else error_str
        msg = {self.name: error_msg}

        if current_app.config.get("BUNDLE_ERRORS", False) or bundle_errors:
            return error, msg
        return abort(400, **fail(400, msg))


def arrow_datetime(datetime_str):
    n = arrow.get(datetime_str)
    return n