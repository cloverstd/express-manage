<div class="row">
    <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
            <div class="panel-heading">添加店铺</div>
            <div class="panel-body">
                <form class="form-horizontal" ng-submit="vm.add()">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">店铺名称</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" ng-model="vm.addForm.name" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">店铺描述</label>
                        <div class="col-sm-10">
                            <textarea cols="30" rows="10" class="form-control" ng-model="vm.addForm.remark"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="submit" class="btn btn-primary">添加</button>
                            <a ui-sref="store.list" class="btn btn-danger">取消</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>