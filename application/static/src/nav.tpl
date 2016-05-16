<nav class="navbar navbar-default">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav" ng-if="current_user">
        <li><a>今日快递</a></li>
        <li><a>历史快递</a></li>
        <li ui-sref-active="active"><a ui-sref="order.add">到件录单</a></li>
        <li><a>快递统计</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li ng-if="current_user" ui-sref-active="active"><a ui-sref="store.list">我的店铺</a></li>
        <li ng-if="!current_user" ui-sref-active="active"><a ui-sref="member.signIn">登录</a></li>
        <li class="dropdown" uib-dropdown ng-if="current_user">
          <a uib-dropdown-toggle class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{current_user.name}} <span class="caret"></span></a>
          <ul class="dropdown-menu" uib-dropdown-menu>
            <li><a>系统设置</a></li>
            <li><a>修改密码</a></li>
            <li role="separator" class="divider"></li>
            <li><a ui-sref="member.signOut">登出</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>