# encoding: utf-8

# created by @cloverstd
# created at 2016-05-10 22:41

from flask.ext.restful import Resource, reqparse
from ._base import AuthResource
from application.models import Member as MemberModel, db
from application import schemas
from flask.ext.jwt import jwt_required, current_identity as current_user
from flask import abort, request
from application.utils import tool


class Member(AuthResource):

    def get(self):
        member_schema = schemas.MemberSchema(exclude=("password",))

        return tool.success(member_schema.dump(current_user).data)

    def put(self):
        self.parser.add_argument('name', type=unicode)
        self.parser.add_argument('password', type=unicode)

        args = self.parser.parse_args()
        if args.name:
            current_user.name = args.name
        if args.password:
            current_user.password = args.password

        current_user.save()
        member_schema = schemas.MemberSchema(exclude=("password",))

        return tool.success(member_schema.dump(current_user).data)


class Store(AuthResource):

    def get(self, store_id):
        store = current_user.stores.filter_by(id=store_id).first_or_404()
        store_schema = schemas.StoreSchema(exclude=('users',))

        return tool.success(store_schema.dump(store).data)

    def put(self, store_id):
        self.parser.add_argument('name', type=unicode)
        self.parser.add_argument('remark', type=unicode)
        params = self.parser.parse_args()
        store = current_user.stores.filter_by(id=store_id).first_or_404()
        if params.get('name'):
            store.name = params['name']
        if params.get('remark', None) is not None:
            store.remark = params['remark']
        store.save()

        result = schemas.StoreSchema(exclude=('users',)).dump(store)
        return tool.success(result.data)

    def delete(self, store_id):
        store = current_user.stores.filter_by(id=store_id).first_or_404()
        if store.companies.count() > 0:
            return tool.fail(407, u"存在关联,无法删除")
        if store.users.count() > 0:
            return tool.fail(407, u"存在关联,无法删除")
        current_user.stores.remove(store)
        db.session.delete(store)
        current_user.save()
        return tool.success("")


class StoreList(AuthResource):

    def get(self):
        self.parser.add_argument('page', type=int, location="args", default=1)
        self.parser.add_argument('per_page', type=int, location="args", default=10)
        args = self.parser.parse_args()
        per_page = args['per_page'] if args['per_page'] <= 100 else 100
        paginate = current_user.stores.paginate(args['page'], per_page)
        store_schema = schemas.StoreSchema(many=True, exclude=('users',))
        result = store_schema.dump(paginate.items)
        return tool.success({
            "items": result.data,
            "paginate": tool.paginate_to_json(paginate)
        })

    def post(self):
        result = schemas.StoreSchema().load(request.get_json())
        current_user.stores.append(result.data)
        current_user.save()
        return tool.success(schemas.StoreSchema().dump(result.data).data)


class StoreCompany(AuthResource):

    def get(self, store_id, company_id):
        store = current_user.stores.filter_by(id=store_id).first_or_404()
        company = store.companies.filter_by(id=company_id).first_or_404()

        company_schema = schemas.CompanySchema()
        result = company_schema.dump(company)
        return tool.success(result.data)

    def delete(self, store_id, company_id):
        store = current_user.stores.filter_by(id=store_id).first_or_404()
        company = store.companies.filter_by(id=company_id).first_or_404()
        if company.orders.count() > 0:
            return tool.fail(407, u"存在关联,无法删除")
        db.session.delete(company)
        db.session.commit()
        return tool.success('')

    def put(self, store_id, company_id):
        store = current_user.stores.filter_by(id=store_id).first_or_404()
        company = store.companies.filter_by(id=company_id).first_or_404()

        self.parser.add_argument('name', type=unicode)
        self.parser.add_argument('remark', type=unicode)
        self.parser.add_argument('web_site', type=unicode)
        self.parser.add_argument('store_id', type=int)

        args = self.parser.parse_args()
        if args.get('store_id'):
            store = current_user.stores.filter_by(id=args['store_id']).first()
            if not store:
                return tool.fail(404, u"店铺不存在"), 404
            company.store = store
        if args.get('name'):
            company.name = args['name']
        company.remark = args.get('remark', company.remark)
        company.web_site = args.get('web_site', company.web_site)
        company.save()
        company_schema = schemas.CompanySchema()
        result = company_schema.dump(company)
        return tool.success(result.data)


class StoreCompanyList(AuthResource):

    def get(self, store_id):
        store = current_user.stores.filter_by(id=store_id).first_or_404()
        self.parser.add_argument('page', type=int, location="args", default=1)
        self.parser.add_argument('per_page', type=int, location="args", default=10)
        args = self.parser.parse_args()
        per_page = args['per_page'] if args['per_page'] <= 100 else 100

        paginate = store.companies.paginate(args['page'], per_page)
        company_schema = schemas.CompanySchema(many=True)
        result = company_schema.dump(paginate.items)
        return tool.success({
            "items": result.data,
            "paginate": tool.paginate_to_json(paginate)
        })

    def post(self, store_id):
        store = current_user.stores.filter_by(id=store_id).first_or_404()
        data = request.get_json()
        data['store_id'] = store.id
        result = schemas.CompanySchema().load(data)

        db.session.add(result.data)
        db.session.commit()
        return tool.success(schemas.CompanySchema(exclude=("orders",)).dump(result.data))