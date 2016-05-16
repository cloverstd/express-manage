<div class="row">
    <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
            <div class="panel-heading">到件录单</div>
            <div class="panel-body">
                <p class="text-center order-no">
                    推荐编号: {{vm.addForm.no}}
                </p>
                <form class="form-horizontal">
                    <h5>收件人信息</h5>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">搜索收件人</label>
                        <div class="col-sm-10">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="请输入收件人姓名或者手机号码搜索" ng-model="vm.userSearch.key">
                                <span class="input-group-btn">
                                    <button class="btn btn-info" type="button" ng-disabled="!vm.userSearch.key" ng-click="vm.userSearch.type='mobile'; vm.userSearch.search()">手机</button>
                                    <button class="btn btn-info" type="button" ng-disabled="!vm.userSearch.key" ng-click="vm.userSearch.type='name'; vm.userSearch.search()">姓名</button>
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-10 col-sm-offset-2 margin-top-10" ng-show="vm.userSearch.key && vm.userSearch.items">
                            <div class="table-responsive">
                                <table class="table">
                                    <tr>
                                        <th>手机号码</th>
                                        <th>姓名</th>
                                    </tr>
                                    <tr ng-repeat="user in vm.userSearch.items">
                                        <td>{{user.mobile}}</td>
                                        <td>
                                            <button class="btn btn-info btn-xs" ng-repeat="user_name in user.names" type="button" ng-click="vm.setUser(user, user_name)">{{user_name.name}}</button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <uib-pagination
                                previous-text="上一页"
                                next-text="下一页"
                                items-per-page="vm.userSearch.paginate.per_page"
                                total-items="vm.userSearch.paginate.total"
                                ng-model="vm.userSearch.page"
                                max-size="5"
                                class="pagination-sm"
                                boundary-link-numbers="true"
                                rotate="false"
                                ng-change="vm.userSearch.search()"></uib-pagination>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="请输入收件人姓名" ng-model="vm.addForm.user.name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机号码</label>
                        <div class="col-sm-10">
                            <input type="mobile" maxlength="11" class="form-control" placeholder="请输入收件人手机号码" ng-model="vm.addForm.user.mobile">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-2 control-label">地址</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="请输入收件人地址" ng-model="vm.addForm.user.address">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-2 control-label">备注</label>
                        <div class="col-sm-10">
                            <textarea  class="form-control" placeholder="请输入收件人备注" ng-model="vm.addForm.user.remark"></textarea>
                        </div>
                    </div>
                    <hr>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">快递状态</label>
                        <div class="col-sm-10">
                            <label class="radio-inline">
                                <input type="radio" name="status" ng-model="vm.addForm.status" ng-value="0"> 待联系
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="status" ng-model="vm.addForm.status" ng-value="3"> 已电话通知
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="status" ng-model="vm.addForm.status" ng-value="10"> 已签收
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="status" ng-model="vm.addForm.status" ng-value="11"> 拒收
                            </label>
                        </div>
                    </div>
                    <hr>
                    <h5>快递信息</h5>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">快递公司</label>
                        <div class="col-sm-10">
                            <label class="radio-inline" ng-repeat="company in vm.company">
                                <input type="radio" name="company" ng-value="company.id" ng-model="vm.addForm.company_id"> {{company.name}}
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">快递单号</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="请输入快递单号" ng-model="vm.addForm.number">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">快递编号</label>
                        <div class="col-sm-10">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="请输入快递编号" ng-model="vm.addForm.no">
                                <span class="input-group-btn">
                                    <button class="btn btn-info" type="button"><i class="fa fa-refresh" ng-click="vm.noInit()"></i></button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">备注</label>
                        <div class="col-sm-10">
                            <textarea  class="form-control" placeholder="请输入快递备注" ng-model="vm.addForm.remark"></textarea>
                        </div>
                    </div>
                    <hr>
                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                            <button class="btn btn-primary" ng-click="vm.orderSave('next')">保存</button>
                            <button class="btn btn-info" ng-click="vm.orderSave()">保存（继续录单）</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>