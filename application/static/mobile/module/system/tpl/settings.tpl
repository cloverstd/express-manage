<ion-view view-title="系统设置">
  <ion-content class="padding">
        <div class="list">
            <div class="item item-divider">
                功能
            </div>
            <a class="item" ui-sref="main.order.add.quick">
                快速录单
            </a>
            <div class="item item-divider">
                系统信息
            </div>
            <a class="item item-icon-left" ng-click="vm.about()">
                <i class="icon ion-ios-information"></i>
                关于
            </a>
            <a class="item item-icon-left" ng-click="vm.clearCache()">
                <i class="icon ion-wrench"></i>
                刷新
            </a>
            <a class="item item-icon-left" ng-click="vm.signOut()">
                <i class="icon ion-alert-circled"></i>
                登出
            </a>

        </div>
  </ion-content>
</ion-view>