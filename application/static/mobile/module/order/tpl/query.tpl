<ion-view cache-view="true" view-title="快递查询">
    <ion-nav-buttons side="left">
        <button class="button" ng-click="vm.filterMoal.show()">
          过滤
        </button>
    </ion-nav-buttons>
    <ion-nav-buttons side="right">
        <button class="button" ng-click="vm.change()">
          刷新
        </button>
    </ion-nav-buttons>
    <ion-header-bar class="bar-light bar-subheader">
            <input type="search"
                   placeholder="请输入单号,姓名,手机号码"
                   ng-model="vm.search.key"
                   class="full-width"
                   ng-change="vm.change()">
        <button class="button icon ion-qr-scanner"></button>
    </ion-header-bar>
    <ion-content>

        <ion-list>
            <ion-item ng-repeat="order in vm.order.items" on-double-tap="vm.toggleOrderButton(order)" ui-sref="main.order.detail({store_id: vm.store.id, order_id: order.id})">

                <span class="order-company">{{order.company.name}}</span>
                <span class="order-number">{{order.number}}</span>
                <div class="order-wrapper">

                    <span class="order-item badge badge-assertive">{{order.no}}</span>
                    <span class="order-item" ng-bind-html="order.status|formatOrderStatus">
                    </span>
                    <span class="order-item order-name">{{order.user.name}}</span>
                    <span class="order-item order-mobile">
                        <mobile number="{{order.user.mobile}}"/>
                    </span>
                </div>
            </ion-item>
        </ion-list>
        <button class="button button-full button-positive" ng-if="vm.order.has_next()" ng-click="vm.order.load()">
            <span ng-hide="vm.order.loadActive">加载更多</span>
            <ion-spinner icon="lines" ng-show="vm.order.loadActive"></ion-spinner>
        </button>
        <!--<ion-infinite-scroll-->
            <!--on-infinite="vm.order.load()"-->
            <!--ng-if="vm.order.has_next()"-->
            <!--icon="ion-loading-c"-->
            <!--distance="10%">-->
        <!--</ion-infinite-scroll>-->
    </ion-content>
</ion-view>
