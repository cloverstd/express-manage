<div class="row">
    <div class="col-md-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="clearfix">
                    <div class="pull-left">我的店铺</div>
                    <div class="pull-right">
                        <a ui-sref="store.add" class="btn btn-primary btn-xs">新增</a>
                    </div>
                </div>
            </div>
            <div class="panel-body">
                <div class="table-responsive">
                    <table class="table">
                        <tr>
                            <th></th>
                            <th>名称</th>
                            <th>描述</th>
                            <th>旗下快递</th>
                            <th>创建时间</th>
                            <th></th>
                        </tr>
                        <tr ng-repeat="store in vm.store.items" ng-class="{active: store.default}">
                            <td>{{store.id}}</td>
                            <td>{{store.name}}</td>
                            <td>{{store.remark}}</td>
                            <td>{{store.company_count}}</td>
                            <td>{{store.created_at}}</td>
                            <td>
                                <div class="btn-group btn-group-xs">
                                    <a ui-sref="order.add({store_id: store.id})" class="btn btn-primary" ng-if="store.company_count">到件录单</a>
                                    <a class="btn btn-primary" ng-if="!store.company_count" disabled="">到件录单</a>
                                    <a class="btn btn-info" ui-sref="store.detail({store_id: store.id})">查看详情</a>
                                    <a class="btn btn-warning" ng-click="vm.openEdit(store)">修改</a>
                                    <a class="btn btn-danger" ng-click="vm.store.del(store)" ng-disabled="store.company_count">删除</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <uib-pagination
                        previous-text="上一页"
                        next-text="下一页"
                        items-per-page="vm.store.paginate.per_page"
                        total-items="vm.store.paginate.total"
                        ng-model="vm.store.currentPage"
                        max-size="5"
                        class="pagination-sm"
                        boundary-link-numbers="true"
                        rotate="false"
                        ng-change="vm.store.list()"></uib-pagination>
            </div>
        </div>
    </div>
</div>

<script type="text/ng-template" id="store.edit.html">
    <div class="modal-header">
        <h3 class="modal-title">修改店铺信息</h3>
    </div>
    <div class="modal-body">
        <form class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">店铺名称</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" ng-model="currentEditForm.name" required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">店铺描述</label>
                <div class="col-sm-10">
                    <textarea cols="30" rows="10" class="form-control" ng-model="currentEditForm.remark"></textarea>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">默认店铺</label>
                <div class="col-sm-10">
                    <label class="checkbox-inline">
                        <input type="checkbox" ng-value="true" ng-model="currentEditForm.default">
                    </label>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" type="button" ng-click="save()">保存</button>
        <button class="btn btn-warning" type="button" ng-click="closeEdit()">取消</button>
    </div>
</script>