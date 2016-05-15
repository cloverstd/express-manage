# encoding: utf-8

# created by @cloverstd
# created at 2016-05-10 23:18

from _base import db, BaseModel
from ..utils.tool import now
from werkzeug.security import generate_password_hash, check_password_hash
from flask import url_for
from .user import User
from sqlalchemy import or_

member_store = db.Table(
    'member_store',
    db.Column('member_id', db.Integer, db.ForeignKey('member.id')),
    db.Column('store_id', db.Integer, db.ForeignKey('store.id')),
    db.Column('created_at', db.DateTime, default=now),

)


class Member(db.Model, BaseModel):

    username = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(128), unique=True)
    mobile = db.Column(db.String(11), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(128), nullable=False)

    @property
    def url(self):
        return url_for('member', id=self.id)

    @property
    def absolute_url(self):
        return url_for('member', id=self.id, _external=True)

    def __setattr__(self, name, value):
        # Hash password when set it.
        if name == 'password':
            value = generate_password_hash(value)
        super(Member, self).__setattr__(name, value)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Store(db.Model, BaseModel):

    name = db.Column(db.String(50), nullable=False)
    remark = db.Column(db.String(500))

    members = db.relationship(
        'Member',
        secondary=member_store,
        backref=db.backref(
            'stores',
            lazy="dynamic",
            order_by="desc(Store.created_at)"
        )
    )

    @property
    def url(self):
        return url_for('store', id=self.id)

    @property
    def absolute_url(self):
        return url_for('store', id=self.id, _external=True)

    def get_user_by_mobile(self, mobile):

        return self.users.filter(
            or_(
                User.mobile == mobile,
                User.mobile2 == mobile
            )
        ).first()


class Company(db.Model, BaseModel):

    name = db.Column(db.String(50), nullable=False)
    remark = db.Column(db.String(500))
    web_site = db.Column(db.String(250))

    store_id = db.Column(db.Integer, db.ForeignKey('store.id'))
    store = db.relationship(
        'Store',
        backref=db.backref(
            'companies',
            lazy="dynamic",
            order_by="desc(Company.created_at)"
        )
    )

    @property
    def url(self):
        return url_for('company', id=self.id)

    @property
    def absolute_url(self):
        return url_for('company', id=self.id, _external=True)

    @staticmethod
    def get_by_user_id_and_company_id(user_id, company_id):
        company = Company.query.join(Store).join(member_store).filter(
            member_store.c.member_id == user_id,
            Company.id == company_id,
        ).first()
        return company
