# encoding: utf-8

# created by @cloverstd
# created at 2016-05-11 16:28

from ._base import ma, BaseModelSchema
from ..models import Member, Store, Company
from marshmallow import fields


class MemberSchema(BaseModelSchema):
    class Meta:
        model = Member


class StoreSchema(BaseModelSchema):
    class Meta:
        model = Store

    company_count = fields.Function(lambda obj: obj.companies.count())


class CompanySchema(BaseModelSchema):
    class Meta:
        model = Company

    order_count = fields.Function(lambda obj: obj.orders.count())