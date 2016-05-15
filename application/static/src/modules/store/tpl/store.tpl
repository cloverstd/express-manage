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
                            <th>创建时间</th>
                            <th></th>
                        </tr>
                        <tr ng-repeat="store in vm.store.items">
                            <td>{{store.id}}</td>
                            <td>{{store.name}}</td>
                            <td>{{store.remark}}</td>
                            <td>{{store.created_at}}</td>
                            <td>
                                <div class="btn-group">
                                    <a class="btn btn-info btn-xs">查看详情</a>
                                    <a class="btn btn-danger btn-xs" ng-click="vm.store.del(store)">删除</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>