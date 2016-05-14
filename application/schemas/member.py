# encoding: utf-8

# created by @cloverstd
# created at 2016-05-11 16:28

from ._base import ma, BaseModelSchema
from ..models import Member, Store, Company


class MemberSchema(BaseModelSchema):
    class Meta:
        model = Member


class StoreSchema(BaseModelSchema):
    class Meta:
        model = Store


class CompanySchema(BaseModelSchema):
    class Meta:
        model = Company
