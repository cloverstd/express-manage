# encoding: utf-8

# created by @cloverstd
# created at 2016-05-10 23:34

from ._base import db, BaseModel
from flask import url_for
from sqlalchemy import or_


class User(db.Model, BaseModel):

    mobile = db.Column(db.String(11))
    mobile2 = db.Column(db.String(11))
    store_id = db.Column(db.Integer, db.ForeignKey('store.id'))
    store = db.relationship(
        'Store',
        backref=db.backref(
            'users',
            lazy="dynamic",
            order_by="desc(User.created_at)"
        )
    )

    @property
    def url(self):
        return url_for('user', id=self.id)

    @property
    def absolute_url(self):
        return url_for('user', id=self.id, _external=True)


class UserName(db.Model, BaseModel):

    name = db.Column(db.String(50))
    remark = db.Column(db.String(500))
    address = db.Column(db.String(500))

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(
        'User',
        backref=db.backref(
            'names',
            lazy="dynamic",
            order_by="desc(UserName.created_at)"
        )
    )

    @property
    def url(self):
        return url_for('user_name', id=self.id)

    @property
    def absolute_url(self):
        return url_for('user_name', id=self.id, _external=True)