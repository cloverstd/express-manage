<ion-view cache-view="false" view-title="快递详情" can-swipe-back="true">
    <ion-nav-buttons side="right">
        <button class="button" ng-click="vm.opPopover.show($event)">
          操作
        </button>
    </ion-nav-buttons>
    <ion-content>
        <ul class="list">
            <div class="item item-divider">
                快递单
            </div>
            <li class="item">
                单号
                <span class="item-note">
                    {{::vm.order.number}}
                </span>
            </li>
            <li class="item">
                状态
                <span class="item-note">
                    <span ng-bind-html="vm.order.status|formatOrderStatus"/>
                </span>
            </li>
            <li class="item">
                公司
                <span class="item-note">
                    {{::vm.order.company.name}}
                </span>
            </li>
            <li class="item" ng-if="vm.order.remark">
                备注
                <span class="item-note">
                    {{::vm.order.remark}}
                </span>
            </li>

            <div class="item item-divider">
                收件人
            </div>
            <li class="item">
                姓名
                <span class="item-note">
                    {{::vm.order.user.name}}
                </span>
            </li>
            <li class="item">
                号码
                <span class="item-note">
                    {{::vm.order.user.mobile}}
                </span>
            </li>
            <li class="item" ng-if="vm.order.remark">
                备注
                <span class="item-note">
                    {{::vm.order.user.remark}}
                </span>
            </li>
        </ul>
    </ion-content>
</ion-view>
