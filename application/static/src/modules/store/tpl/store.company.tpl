<div class="row">
    <div class="col-md-12">
        <div class="panel panel-default" ng-if="vm.store">
            <div class="panel-heading">
                <div class="clearfix">
                    <div class="pull-left">{{vm.store.name}}的下属快递</div>
                    <div class="pull-right">
                        <a ui-sref="store.company.add({store_id: vm.store.id})" class="btn btn-primary btn-xs">新增</a>
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
                            <th>官网</th>
                            <th>快递单数</th>
                            <th>创建时间</th>
                            <th></th>
                        </tr>
                        <tr ng-repeat="company in vm.company.items">
                            <td>{{company.id}}</td>
                            <td>{{company.name}}</td>
                            <td>{{company.remark}}</td>
                            <td><a ng-href="{{company.web_site}}" ng-if="company.web_site" target="_blank">点击查看</a></td>
                            <td>{{company.order_count}}</td>
                            <td>{{company.created_at}}</td>
                            <td>
                                <div class="btn-group btn-group-xs">
                                    <a class="btn btn-warning" ng-click="vm.openEdit(company)">修改</a>
                                    <button class="btn btn-danger" ng-click="vm.company.del(company)" ng-disabled="company.order_count">删除</button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <uib-pagination
                        previous-text="上一页"
                        next-text="下一页"
                        items-per-page="vm.company.paginate.per_page"
                        total-items="vm.company.paginate.total"
                        ng-model="vm.company.currentPage"
                        max-size="5"
                        class="pagination-sm"
                        boundary-link-numbers="true"
                        rotate="false"
                        ng-change="vm.company.list()"></uib-pagination>
            </div>
        </div>
    </div>
</div>

<script type="text/ng-template" id="store.company.edit.html">
    <div class="modal-header">
        <h3 class="modal-title">修改快递公司信息</h3>
    </div>
    <div class="modal-body">
        <form class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">快递名称</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" ng-model="currentEditForm.name" required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">快递网址</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" ng-model="currentEditForm.web_site" required>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">快递描述</label>
                <div class="col-sm-10">
                    <textarea cols="30" rows="10" class="form-control" ng-model="currentEditForm.remark"></textarea>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" type="button" ng-click="save()">保存</button>
        <button class="btn btn-warning" type="button" ng-click="closeEdit()">取消</button>
    </div>
</script>