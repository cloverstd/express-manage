<ion-view view-title="请先登录" name="login-view">
  <ion-content class="padding">
      <div class="list list-inset">
          <label class="item item-input">
              <input type="text" placeholder="用户名" ng-model="vm.signInForm.username">
          </label>
          <label class="item item-input">
              <input type="password" placeholder="密码" ng-model="vm.signInForm.password">
          </label>
      </div>
      <button class="button button-block button-positive" ng-click="vm.signIn(vm.signInForm)">
          <span ng-hide="vm.loading">登录</span>
          <ion-spinner icon="lines" ng-show="vm.loading"></ion-spinner>
      </button>
  </ion-content>
</ion-view>