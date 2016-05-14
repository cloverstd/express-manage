# encoding: utf-8

# created by @cloverstd
# created at 2016-05-12 00:23

from ._base import AuthResource
from application import models
from application import schemas
from flask.ext.jwt import jwt_required, current_identity as current_user
from application.utils import tool, lib


class OrderNo(AuthResource):

    def get(self):
        order_query = models.Order.query.filter(
            models.Order.status < 10,
        ).order_by(models.Order.no)
        all_no = [i.no for i in order_query]
        if not all_no:
            return tool.success(1)

        number = all_no[0] - 1
        if number > 0:
            return tool.success(1)
        for index, no in enumerate(map(lambda x: x-number, all_no)):
            if no != index + 1:
                return tool.success(index + 1 + number)

        return tool.success(all_no[-1] + 1)


class Order(AuthResource):

    def get(self, order_id):
        order = models.Order.get_by_user_id_and_order_id(current_user.id, order_id)
        if not order:
            return tool.fail(404, u"快递单不存在")
        result = schemas.OrderSchema().dump(order)
        return tool.success(result.data)

    def put(self, order_id):
        order = models.Order.get_by_user_id_and_order_id(current_user.id, order_id)
        if not order:
            return tool.fail(404, u"快递单不存在")

        self.parser.add_argument('company_id', type=int, help="公司必填")
        self.parser.add_argument('no', type=int, default=None)
        self.parser.add_argument('remark', type=unicode)
        self.parser.add_argument('status', type=int)
        self.parser.add_argument('user_id', type=int)

        args = self.parser.parse_args()
        if args.company_id:
            company = models.Company.get_by_user_id_and_company_id(current_user.id, args.company_id)
            if not company:
                return tool.fail(400, u"公司不存在")

            if order.company_id != args.company_id:
                order.company_id = args.company_id
        if args.user_id:
            user = order.company.store.users.filter_by(id=args.user_id).first()
            if not user:
                return tool.fail(400, u"用户不存在")
            if order.user_id != user.id:
                order.user_id = user.id
        if args.no < 1:
            return tool.fail(407, u"编号不能小于 1")
        if args.status:
            order.status = args.status
            order.updated_at = tool.now()
        if args.no:
            order.no = args.no
        if args.remark:
            order.remark = args.remark

        order.save()
        result = schemas.OrderSchema().dump(order)
        return tool.success(result.data)

    def delete(self, order_id):
        order = models.Order.get_by_user_id_and_order_id(current_user.id, order_id)
        if not order:
            return tool.fail(404, u"快递单不存在")
        models.db.session.delete(order)
        models.db.session.commit()
        return tool.success(None, u"删除成功")


class OrderList(AuthResource):

    def get(self):
        self.parser.add_argument('page', type=int, location="args", default=1)
        self.parser.add_argument('per_page', type=int, location="args", default=10)
        self.parser.add_argument('start_at', type=lib.arrow_datetime, help="开始时间必填", required=True, location="args")
        self.parser.add_argument('end_at', type=lib.arrow_datetime, help="结束时间", location="args")
        self.parser.add_argument('user_id', type=int, help="用户 ID", location="args")
        self.parser.add_argument('company_id', type=int, help="公司 ID", location="args")
        self.parser.add_argument('number', type=unicode, location="args")
        args = self.parser.parse_args()
        per_page = args['per_page'] if args['per_page'] <= 100 else 100
        end_at = args.end_at or tool.now(False)
        order_query = models.Order.query.\
            join(models.Company).\
            join(models.Store).\
            join(models.member_store).filter(
                models.member_store.c.member_id == current_user.id,
                models.Order.created_at >= args.start_at.naive,
                models.Order.created_at <= end_at.naive,
            )
        if args.user_id:
            order_query = order_query.filter(
                models.Order.user_id == args.user_id,
            )
        if args.company_id:
            order_query = order_query.filter(
                models.Order.company_id == args.company_id,
            )
        if args.number:
            order_query = order_query.filter(
                models.Order.number.like(u'%{}%'.format(args.number))
            )
        paginate = order_query.order_by(models.Order.created_at.desc()).paginate(
            args.page,
            per_page,
            False
        )

        order_schema = schemas.OrderSchema(many=True)
        return tool.success({
            "items": order_schema.dump(paginate.items).data,
            "paginate": tool.paginate_to_json(paginate)
        })

    def post(self):
        self.parser.add_argument('company_id', type=int, required=True, help="公司必填")
        self.parser.add_argument('number', type=unicode, required=True, help="快递单号必填")
        self.parser.add_argument('no', type=int, default=None)
        self.parser.add_argument('remark', type=unicode)
        self.parser.add_argument('plan_at', type=lib.arrow_datetime)
        self.parser.add_argument('status', type=int, default=0)

        self.parser.add_argument('user', type=dict, required=True, help="用户必填")
        args = self.parser.parse_args()

        company = models.Company.get_by_user_id_and_company_id(current_user.id, args.company_id)
        if not company:
            return tool.fail(400, u"公司不存在")
        store = company.store
        order = company.orders.filter_by(number=args.number).first()
        if order:
            return tool.fail(406, u"快递单号已存在")
        if args.no:
            if args.no < 1:
                return tool.fail(407, u"编号不能小于 1")

        if "id" in args.user:
            user = store.users.filter_by(id=args.user['id']).first()

            # # 用户编号都存在时,看是否为他自己的
            # order = models.Order.query.join(models.Company).join(models.Store).filter(
            #     models.Store.id == store.id,
            #     models.Order.no == args.no,
            #     models.Order.user != user,
            # ).first()
            # if order:
            #     return tool.fail(406, u"编号已存在")
            if not user:
                return tool.fail(400, u"用户不存在")
        else:
            # order = models.Order.query.join(models.Company).join(models.Store).filter(
            #     models.Store.id == store.id,
            #     models.Order.no == args.no,
            # ).first()
            # if order:
            #     return tool.fail(406, u"编号已存在")
            if "mobile" not in args.user:
                return tool.fail(400, u"联系方式必填")
            if "name" not in args.user:
                return tool.fail(400, u"姓名必填")
            if store.get_user_by_mobile(args.user["mobile"]):
                return tool.fail(406, u"手机号码 {} 已存在".format(args.user["mobile"]))

            user = models.User()
            user.mobile = args.user["mobile"]
            user_name = models.UserName(name=args.user["name"])
            user.store = store
            models.db.session.add(user)
            user_name.user = user
            if "address" in args.user:
                user_name.address = args.user["address"]
            if "remark" in args.user:
                user_name.remark = args.user["remark"]
            models.db.session.add(user_name)
        order = models.Order()
        if args.no:
            order.no = args.no
        else:
            # 计算出 no
            # 1 此用户已有未领取的快递时,编同一个号
            no = models.Order.get_max_no(store.id)
            order.no = no
        order.user = user
        order.company = company
        order.number = args.number
        order.status = args.status
        if args.plan_at:
            order.plan_at = args.plan_at.naive

        models.db.session.add(order)
        models.db.session.commit()
        result = schemas.OrderSchema().dump(order)

        return tool.success(result.data)