<ion-modal-view>
    <ion-header-bar class="bar bar-header bar-positive">
        <h1 class="title">过滤条件</h1>
        <button class="button" ng-click="vm.filterMoal.hide()">确认</button>
    </ion-header-bar>
    <ion-content class="padding">
        <div class="list">
            <a class="item" ng-click="vm.datePicker.open()">
                开始日期
                <span class="item-note">
                    {{vm.search.start_at_outer}}
                </span>
            </a>
            <a class="item" ng-click="vm.datePicker.end.open()">
                结束日期
                <span class="item-note">
                    {{vm.search.end_at_outer}}
                </span>
            </a>
            <ion-toggle ng-model="vm.search.is_not_sign"
                        ng-checked="vm.search.is_not_sign"
            >
                待签收
            </ion-toggle>
            <label class="item item-input item-select">
                <div class="input-label">
                    快递公司
                </div>
                <select ng-model="vm.search.company_id" ng-options="company.id as company.name for company in ::vm.company">
                    <option value>选择快递公司</option>
                </select>
            </label>
            <label class="item item-input item-select" ng-if="!vm.search.is_not_sign">
                <div class="input-label">
                    快递状态
                </div>
                <select ng-model="vm.search.status_id" ng-options="status.id as status.name for status in ::vm.status">
                    <option value>选择快递状态</option>
                </select>
            </label>
            <div class="item" ng-if="false">
                <pre ng-bind="vm.search | json"></pre>
            </div>
        </div>
    </ion-content>
</ion-modal-view>