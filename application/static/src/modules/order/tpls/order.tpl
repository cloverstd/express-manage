<div class="row">
    <div class="col-md-12">
        <div class="panel panel-default">
            <div class="panel-heading">快递单</div>
            <div class="panel-body">
                <div class="row margin-bottom-15">
                    <div class="col-xs-2">
                        开始时间
                    </div>
                    <div class="col-xs-2">
                        <p class="input-group">
                            <input type="text"
                                   class="form-control"
                                   uib-datepicker-popup
                                   ng-model="vm.startAtDT"
                                   is-open="vm.startAtOpend"
                                   datepicker-options="vm.startAtOptions"
                                   close-text="关闭"
                                   clear-text="清除"
                                   current-text="今天"
                                   ng-change="vm.order.search()"
                            />
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-default" ng-click="vm.startAtOpend = true"><i class="glyphicon glyphicon-calendar"></i></button>
                            </span>
                        </p>
                    </div>
                    <div class="col-xs-2">
                        结束时间
                    </div>
                    <div class="col-xs-2">
                        <p class="input-group">
                            <input type="text"
                                   class="form-control"
                                   uib-datepicker-popup
                                   ng-model="vm.endAtDT"
                                   is-open="vm.endAtOpend"
                                   datepicker-options="vm.startAtOptions"
                                   close-text="关闭"
                                   clear-text="清除"
                                   current-text="今天"
                                   ng-change="vm.order.search()"
                            />
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-default" ng-click="vm.endAtOpend = true"><i class="glyphicon glyphicon-calendar"></i></button>
                            </span>
                        </p>
                    </div>
                    <div class="col-xs-4">
                        <select class="form-control" ng-options="company.id as company.name for company in vm.company" ng-model="vm.search.company_id" ng-change="vm.order.search()">
                            <option value="">请选择公司</option>
                        </select>
                    </div>
                </div>
                <div class="row margin-bottom-15">
                    <div class="col-xs-4">
                        <input type="text" class="form-control" ng-change="vm.order.search()" ng-model="vm.search.key" placeholder="请输入单号,姓名,手机号过滤">
                    </div>
                    <div class="col-xs-4">
                        <select class="form-control" ng-options="status.id as status.name for status in vm.status" ng-model="vm.search.status_id" ng-change="vm.order.search()">
                            <option value="">请选择快递状态</option>
                        </select>
                    </div>
                </div>
                <div class="text-center" ng-show="vm.search.loading">
                    <i class="fa fa-spinner fa-spin fa-5x fa-fw"></i>
                </div>
                <div class="table-responsive" ng-hide="vm.search.loading">
                    <table class="table">
                        <tr>
                            <th>编号</th>
                            <th>单号</th>
                            <th>快递</th>
                            <th>姓名</th>
                            <th>手机号码</th>
                            <th>状态</th>
                            <th>更新时间</th>
                            <th></th>
                        </tr>
                        <tr ng-repeat="order in vm.order.items">
                            <td>
                                <span class="label label-primary">{{order.no}}</span>
                            </td>
                            <td>{{order.number}}</td>
                            <td>{{order.company.name}}</td>
                            <td>{{order.user.name}}</td>
                            <td>
                                <mobile number="{{order.user.mobile}}" />
                            </td>
                            <td><span ng-bind-html="order.status|orderStatus"></span></td>
                            <td>{{order.updated_at|formatDT}}</td>
                            <td>
                                <div class="btn-group btn-group-xs">
                                    <button class="btn btn-info" ng-if="order.status < 10" ng-click="vm.order.statusChange(order, 10)">签收</button>
                                    <button class="btn btn-success" ng-if="order.status == 0" ng-click="vm.order.statusChange(order, 5)">通知</button>
                                    <button class="btn btn-danger" ng-if="order.status < 10" ng-click="vm.order.statusChange(order, 11)">拒收</button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <uib-pagination
                        previous-text="上一页"
                        next-text="下一页"
                        items-per-page="vm.order.paginate.per_page"
                        total-items="vm.order.paginate.total"
                        ng-model="vm.order.currentPage"
                        max-size="5"
                        class="pagination-sm"
                        boundary-link-numbers="true"
                        rotate="false"
                        ng-change="vm.order.list()"></uib-pagination>
            </div>
        </div>
    </div>
</div>