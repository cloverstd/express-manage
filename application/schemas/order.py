# encoding: utf-8

# created by @cloverstd
# created at 2016-05-11 16:30

from ._base import ma, BaseModelSchema
from ..models import Order
from marshmallow import fields


class OrderSchema(BaseModelSchema):
    class Meta:
        model = Order

    user = fields.Function(lambda obj: obj.user)
    company = fields.Function(lambda obj: {
        'id': obj.company.id,
        'name': obj.company.name
    })