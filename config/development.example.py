#!/usr/bin/env python
# encoding: utf-8

from .default import Config


class DevelopmentConfig(Config):

    DEBUG = True

    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@11.11.11.3/express-manage'
