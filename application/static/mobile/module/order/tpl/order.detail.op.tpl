<ion-popover-view>
    <!--<ion-header-bar>-->
        <!--<h1 class="title">快递操作</h1>-->
    <!--</ion-header-bar>-->
    <ion-content>
        <button ng-if="vm.order.status < 10" class="button button-block button-calm" ng-click="vm.statusChange(10)">
              签收
        </button>
        <button ng-if="vm.order.status == 0" class="button button-block button-positive" ng-click="vm.statusChange(5)">
              通知
        </button>
        <button ng-if="vm.order.status < 10" class="button button-block button-assertive" ng-click="vm.statusChange(11)">
              拒收
        </button>
    </ion-content>
</ion-popover-view>