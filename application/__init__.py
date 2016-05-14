#!/usr/bin/env python
# encoding: utf-8

# created by @cloverstd
# created at 2016-04-11 16:48

import sys
import os

project_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if project_path not in sys.path:
    sys.path.insert(0, project_path)

from flask import Flask, g, request
from werkzeug.wrappers import Response
import logging
from config import load_config
from werkzeug.contrib.fixers import ProxyFix
import time


def create_app():

    config = load_config()

    app = Flask(__name__)
    app.config.from_object(config)

    # Proxy fix
    app.wsgi_app = ProxyFix(app.wsgi_app)

    if not app.debug:
        app.logger.addHandler(logging.StreamHandler())
        app.logger.setLevel(logging.ERROR)
        register_error_handle(app)

    proxy_app(app)
    register_hooks(app)
    register_db(app)
    register_routes(app)
    # register_json_encoder(app)
    return app


def register_db(app):
    from .models import db
    db.init_app(app)

    from .schemas import ma
    ma.init_app(app)

    from .extensions import jwt
    jwt.init_app(app)


def register_routes(app):
    from controllers import api, web
    app.register_blueprint(api.bp, url_prefix="/api")
    app.register_blueprint(web.bp, url_prefix="/")


def register_error_handle(app):
    """Register HTTP error pages."""

    @app.errorhandler(403)
    def page_403(error):
        return "403", 403

    @app.errorhandler(404)
    def page_404(error):
        return "404", 404

    @app.errorhandler(500)
    def page_500(error):
        return "500", 500


def register_hooks(app):
    from .utils.user import get_current_user
    from flask import json

    @app.before_request
    def json_body():
        data = request.data
        if data:
            try:
                g.json_data = json.loads(data)
            except ValueError:
                g.json_data = {}

    @app.before_request
    def before_request():
        g._before_request_time = time.time()
        g.user = get_current_user()
        if isinstance(g.user, Response):
            return g.user


    @app.after_request
    def after_request(response):
        if hasattr(g, '_before_request_time'):
            delta = time.time() - g._before_request_time
            response.headers['X-Render-Time'] = delta * 1000
            if app.debug:
                response.headers['Access-Control-Allow-Origin'] = '*'
                response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type, Accept, x-token'
                response.headers['Access-Controll-Max-Age'] = '1728000'

        return response


class ReverseProxied(object):
    '''Wrap the application in this middleware and configure the
    front-end server to add these headers, to let you quietly bind
    this to a URL other than / and to an HTTP scheme that is
    different than what is used locally.

    In nginx:
    location /myprefix {
        proxy_pass http://192.168.0.1:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header X-Script-Name /myprefix;
        }

    :param app: the WSGI application
    '''
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        script_name = environ.get('HTTP_X_SCRIPT_NAME', '')
        if script_name:
            environ['SCRIPT_NAME'] = script_name
            path_info = environ['PATH_INFO']
            if path_info.startswith(script_name):
                environ['PATH_INFO'] = path_info[len(script_name):]

        scheme = environ.get('HTTP_X_SCHEME', '')
        if scheme:
            environ['wsgi.url_scheme'] = scheme
        return self.app(environ, start_response)


def proxy_app(app):
    app.wsgi_app = ReverseProxied(app.wsgi_app)


def register_json_encoder(app):
    from .utils.tool import CustomJSONEncoder
    app.json_encoder = CustomJSONEncoder
