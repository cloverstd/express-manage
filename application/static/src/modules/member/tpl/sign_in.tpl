<div class="row">
    <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
            <div class="panel-body">
                <form class="form-signin" ng-submit="vm.signIn()">
                    <h2 class="form-signin-heading">请先登录</h2>
                    <input type="text" ng-model="vm.signInForm.username" class="form-control" placeholder="用户名" required autofocus>

                    <input type="password" ng-model="vm.signInForm.password" class="form-control" placeholder="密码" required>

                    <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
                </form>
            </div>
        </div>
    </div>
</div>