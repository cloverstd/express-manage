<ion-modal-view>
    <ion-header-bar class="bar bar-header bar-positive">
        <div class="buttons" ng-click="vm.userSearchModal.close()">
            <button class="button">取消</button>
        </div>
        <h1 class="title">搜索用户</h1>
    </ion-header-bar>
    <ion-content class="padding">
        <div class="card">
            <div class="item item-divider">
            搜索
            </div>
            <div class="item">
                <div class="list">
                    <label class="item item-input">
                        <input type="text" placeholder="输入姓名或者手机号码搜索" ng-model="vm.userSearch.key">
                    </label>
                    <label class="item">
                        <ion-toggle ng-model="vm.userSearch.mobile" toggle-class="toggle-calm">手机</ion-toggle>
                    </label>
                    <label class="item">
                        <div class="button-bar">
                            <button ng-disabled="!vm.userSearch.key" class="button button-calm button-small" ng-click="vm.userSearch.page = 1; vm.userSearchModal.search()">搜索</button>
                        </div>
                    </label>
                </div>
            </div>
        <!--</div>-->
        <!--<div class="list card" ng-show="vm.userSearchModal.items">-->
             <div class="item" ng-repeat="user in vm.userSearchModal.items" ng-show="vm.userSearchModal.items">
                 <mobile number="{{user.mobile}}" />
                 <div class="row">
                     <div class="col" ng-repeat="user_name in user.names">
                         <button class="button button-small" ng-click="vm.userSearchModal.choice(user, user_name)">{{user_name.name}}</button>
                     </div>
                 </div>
            </div>
            <div class="item" ng-show="vm.userSearchModal.has_next()">
                <button class="button button-small button-block button-positive" ng-click="vm.userSearchModal.loadMore()">加载更多</button>
            </div>
        </div>
        <div class="text-center" ng-show="vm.userSearch.searching">
             <ion-spinner></ion-spinner>
        </div>
    </ion-content>
</ion-modal-view>