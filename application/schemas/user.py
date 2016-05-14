# encoding: utf-8

# created by @cloverstd
# created at 2016-05-11 16:31

from ._base import ma, BaseModelSchema
from ..models import User, UserName


class UserNameSchema(BaseModelSchema):
    class Meta:
        model = UserName


class UserSchema(BaseModelSchema):
    class Meta:
        model = User

    names = ma.Nested(UserNameSchema, many=True, exclude=("user",))
