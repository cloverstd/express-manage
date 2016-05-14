# encoding: utf-8

# created by @cloverstd
# created at 2016-05-11 16:30

from ._base import ma, BaseModelSchema
from ..models import Order


class OrderSchema(BaseModelSchema):
    class Meta:
        model = Order