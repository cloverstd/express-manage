# encoding: utf-8

# created by @cloverstd
# created at 2016-05-10 23:37

from ._base import db, BaseModel
from .member import Company, Store, member_store
from flask import url_for
from ..utils.tool import now


class Order(db.Model, BaseModel):
    __table_args__ = (db.UniqueConstraint('company_id', 'number', name="uix_1"),)

    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    company = db.relationship(
        'Company',
        backref=db.backref(
            'orders',
            lazy="dynamic",
            order_by="desc(Order.created_at)"
        )
    )
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(
        'User',
        backref=db.backref(
            'orders',
            lazy="dynamic",
            order_by="desc(Order.created_at)"
        )
    )
    number = db.Column(db.String(20))  # 单号
    no = db.Column(db.SmallInteger)  # 编号
    remark = db.Column(db.String(500))

    plan_at = db.Column(db.DateTime)  # 计划领取时间

    # 状态
    #  0 -- 到达
    #  1 -- 短信通知
    #  3 -- 电话通知
    #  5 -- 电话短信通知
    #  10 -- 签收
    #  11  -- 拒收

    status = db.Column(db.SmallInteger, default=0)

    updated_at = db.Column(db.DateTime, default=now)

    @property
    def url(self):
        return url_for('order', id=self.id)

    @property
    def absolute_url(self):
        return url_for('order', id=self.id, _external=True)

    @staticmethod
    def get_max_no(store_id):
        last_order = Order.query.join(Company).filter(
            Company.store_id == store_id,
            Order.sign_at is not None,
        ).order_by(Order.no.desc()).first()
        if last_order:
            return last_order.no + 1
        return 1

    @staticmethod
    def get_by_user_id_and_order_id(user_id, order_id):
        order = Order.query.join(Company).join(Store).join(member_store).filter(
            member_store.c.member_id == user_id,
            Order.id == order_id,
        ).first()
        return order