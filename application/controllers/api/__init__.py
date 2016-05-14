# encoding: utf-8

# created by @cloverstd
# created at 2016-05-10 22:40

from flask.ext.restful import Api
from ._base import bp
from . import member, order, user

api = Api(bp, catch_all_404s=True)

api.add_resource(member.Member, '/member')
api.add_resource(member.StoreList, '/member/store')
api.add_resource(member.Store, '/member/store/<store_id>')
api.add_resource(member.StoreCompanyList, '/member/store/<store_id>/company')
api.add_resource(member.StoreCompany, '/member/store/<store_id>/company/<company_id>')

api.add_resource(order.OrderList, '/order')
api.add_resource(order.OrderNo, '/order/no')
api.add_resource(order.Order, '/order/<order_id>')

api.add_resource(user.UserList, '/member/store/<store_id>/user')
api.add_resource(user.User, '/member/store/<store_id>/user/<user_id>')
api.add_resource(user.UserName, '/member/store/<store_id>/user/<user_id>/name/<int:id>')
api.add_resource(user.UserNameList, '/member/store/<store_id>/user/<user_id>/name')