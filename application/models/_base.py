# encoding: utf-8

# created by @cloverstd
# created at 2016-05-10 22:38

from flask.ext.sqlalchemy import SQLAlchemy
from ..utils.tool import now

db = SQLAlchemy()


class BaseModel(object):

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=now)

    def save(self):
        db.session.commit()