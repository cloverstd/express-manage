# encoding: utf-8

# created by @cloverstd
# created at 2016-05-13 19:57

from ._base import AuthResource
from application import models
from application import schemas
from flask.ext.jwt import jwt_required, current_identity as current_user
from flask import abort, request
from application.utils import tool


class User(AuthResource):

    def get(self, store_id, user_id):
        store = current_user.stores.filter_by(id=store_id).first()
        if not store:
            return tool.fail(400, u"店铺不存在")
        user = store.users.filter_by(id=user_id).first()
        if not user:
            return tool.fail(404, u"用户不存在")

        result = schemas.UserSchema(exclude=("orders",)).dump(user)
        return tool.success(result.data)

    def put(self, store_id, user_id):
        store = current_user.stores.filter_by(id=store_id).first()
        if not store:
            return tool.fail(400, u"店铺不存在")
        user = store.users.filter_by(id=user_id).first()
        if not user:
            return tool.fail(404, u"用户不存在")
        self.parser.add_argument('mobile', type=unicode, required=True, help="手机号码必填")
        args = self.parser.parse_args()
        _user = store.users.filter_by(mobile=args.mobile).first()
        if _user:
            if _user.id != user.id:
                return tool.fail(406, u"手机号码已存在")

        user.mobile = args.mobile
        user.save()
        result = schemas.UserSchema(exclude=("orders",)).dump(user)
        return tool.success(result.data)

    def delete(self, store_id, user_id):
        store = current_user.stores.filter_by(id=store_id).first()
        if not store:
            return tool.fail(400, u"店铺不存在")
        user = store.users.filter_by(id=user_id).first()
        if not user:
            return tool.fail(404, u"用户不存在")
        if user.orders.count() > 0:
            return tool.fail(407, u"存在关联,无法删除")
        models.db.session.delete(user)
        models.db.session.commit()
        return tool.success(None)


class UserList(AuthResource):

    def get(self, store_id):
        self.parser.add_argument('page', type=int, location="args", default=1)
        self.parser.add_argument('per_page', type=int, location="args", default=10)
        self.parser.add_argument('mobile', type=unicode, location="args")
        self.parser.add_argument('name', type=unicode, location="args")
        args = self.parser.parse_args()
        store = current_user.stores.filter_by(id=store_id).first()
        if not store:
            return tool.fail(400, u"店铺不存在")
        order_query = models.User.query

        if args.mobile:
            order_query = order_query.filter(
                models.User.mobile.like(u'%{}%'.format(args.mobile))
            )
        if args.name:
            order_query = order_query.join(models.UserName).filter(
                models.UserName.name.like(u'%{}%'.format(args.name))
            )
        per_page = args['per_page'] if args['per_page'] <= 100 else 100
        paginate = order_query.paginate(args.page, per_page, False)

        result = schemas.UserSchema(many=True, exclude=("orders", )).dump(paginate.items)
        return tool.success({
            'items': result.data,
            'paginate': tool.paginate_to_json(paginate)
        })

    def post(self, store_id):
        self.parser.add_argument('mobile', type=unicode, required=True, help="手机号码必填")
        args = self.parser.parse_args()
        store = current_user.stores.filter_by(id=store_id).first()
        if not store:
            return tool.fail(400, u"店铺不存在")

        user = store.users.filter_by(mobile=args.mobile).first()
        if user:
            return tool.fail(406, u"手机号码已存在")

        user = models.User(mobile=args.mobile, store=store)
        models.db.session.add(user)
        models.db.session.commit()
        result = schemas.UserSchema(exclude=("orders",)).dump(user)
        return tool.success(result.data)


class UserName(AuthResource):

    def get(self, store_id, user_id, name_id):
        store = current_user.stores.filter_by(id=store_id).first()
        if not store:
            return tool.fail(400, u"店铺不存在")
        user = store.users.filter_by(id=user_id).first()
        if not user:
            return tool.fail(404, u"用户不存在")
        user_name = user.names.filter_by(id=name_id).first()
        if not user_name:
            return tool.fail(404, u"用户姓名不存在")

        result = schemas.UserNameSchema().dump(user_name)
        return tool.success(result.data)

    def put(self, store_id, user_id, name_id):
        store = current_user.stores.filter_by(id=store_id).first()
        if not store:
            return tool.fail(400, u"店铺不存在")
        user = store.users.filter_by(id=user_id).first()
        if not user:
            return tool.fail(404, u"用户不存在")

        user_name = user.names.filter_by(id=name_id).first()
        if not user_name:
            return tool.fail(404, u"用户姓名不存在")

        self.parser.add_argument('name', type=unicode)
        self.parser.add_argument('remark', type=unicode)
        self.parser.add_argument('address', type=unicode)
        args = self.parser.parse_args()
        if args.name:
            user_name.name = args.name
        if args.remark is not None:
            user_name.remark = args.remark
        if args.address is not None:
            user_name.address = args.address
        user_name.save()
        result = schemas.UserNameSchema().dump(user_name)
        return tool.success(result.data)

    def delete(self, store_id, user_id, name_id):
        store = current_user.stores.filter_by(id=store_id).first()
        if not store:
            return tool.fail(400, u"店铺不存在")
        user = store.users.filter_by(id=user_id).first()
        if not user:
            return tool.fail(404, u"用户不存在")
        user_name = user.names.filter_by(id=name_id).first()
        if not user_name:
            return tool.fail(404, u"用户姓名不存在")

        models.db.session.delete(user_name)
        models.db.session.commit()
        return tool.success(None)

class UserNameList(AuthResource):

    def post(self, store_id, user_id):
        store = current_user.stores.filter_by(id=store_id).first()
        if not store:
            return tool.fail(400, u"店铺不存在")
        user = store.users.filter_by(id=user_id).first()
        if not user:
            return tool.fail(404, u"用户不存在")

        self.parser.add_argument('name', type=unicode, required=True, help="用户姓名必填")
        self.parser.add_argument('remark', type=unicode)
        self.parser.add_argument('address', type=unicode)
        args = self.parser.parse_args()
        user_name = models.UserName()
        user_name.name = args.name
        user_name.remark = args.remark
        user_name.address = args.address
        user_name.user = user
        models.db.session.add(user_name)
        models.db.session.commit()
        result = schemas.UserNameSchema().dump(user_name)
        return tool.success(result.data)