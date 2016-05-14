#!/usr/bin/env python
# encoding: utf-8

import os
import datetime as dt


class Config(object):
    DEBUG = False
    SECRET_KEY = "\xb5\xb3}#\xb7A\xcac\x9d0\xb6\x0f\x80z\x97\x00\x1e\xc0\xb8+\xe9)\xf0}"

    PERMANENT_SESSION_LIFETIME = 3600 * 24 * 7
    SESSION_COOKIE_NAME = 'ejoyinfo_session'
    PROJECT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

    SITE_TITLE = "快递管理"
    PORT = 5002
    SITE_DOMAIN = "http://localhost:{}".format(PORT)

    PER_PAGE = 10

    SQLALCHEMY_TRACK_MODIFICATIONS = True

    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://user:password@host/database"

    # Redis
    REDIS_HOST = '11.11.11.3'
    REDIS_PORT = 6379
    REDIS_PASS = None
    # wechat

    WECHAT_CORP_ID = 'wxb0e80ba7b36d76e4'
    WECHAT_SECRET = 'U8S0Ej1Rm-Is9kZ2QAlRmUPVWA8Eq3SfrLsIRzhAC5Cmb9a0cg1v_61fWrvhn07F'
    WECHAT_TOKEN = '6qaoP68nSD2h41C4eesF6Zp45QcgQ8'
    WECHAT_ENCODING_AESKEY = 'j51E4g03xJT7HMDEOWAcV5HI2MU5GaLjy2UnfVDcJfM'
    WECHAT_PREFIX = "ejoyinfo:high"

    # 七牛
    QINIU_AK = 'XWAeCpEd3nUOvbMDKyRHD3JHGI6vguSJoVv9a7u'
    QINIU_SK = 'TdYmPhKTrBJZw9Nx1affwJ7GYDlzdxdwJ-Ogs_4'
    QINIU_BUCKET = 'edu-meeting'
    QINIU_URL = 'http://7xpy0n.com1.z0.glb.clouddn.com/'
    QINIU_LIMIT = 1024 * 1024 * 1024 * 10

    # 上传文件到本机
    UPLOAD_FOLDER = os.path.join(PROJECT_PATH, 'application/static/uploads')
    UPLOAD_PATH = '/static/uploads'

    # CACHE_PREFIX
    CACHE_PREFIX = "cloverstd"

    # JWT
    # https://pythonhosted.org/Flask-JWT/#configuration-options
    JWT_AUTH_URL_RULE = '/api/member/auth'
    JWT_EXPIRATION_DELTA = dt.timedelta(seconds=3600 * 24)