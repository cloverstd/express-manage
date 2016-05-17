<div class="row">
    <div class="col-md-12">
        <div class="panel panel-default">
            <div class="panel-heading">我的信息</div>
            <div class="panel-body">
                <form class="form-horizontal" ng-submit="vm.passwordSave()">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">原密码</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" required ng-model="vm.passwordForm.password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">新密码</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" required ng-model="vm.passwordForm.password1">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">重复密码</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" required ng-model="vm.passwordForm.password2">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                            <button class="btn btn-info" type="submit">保存</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>