<ion-modal-view>
    <ion-header-bar class="bar bar-header bar-positive">
        <h1 class="title">选择快递状态</h1>
        <button class="button button-clear button-primary" ng-click="vm.statusModal.close()">取消</button>
    </ion-header-bar>
    <ion-content class="padding">
        <ion-list>
            <ion-radio ng-repeat="status in ::vm.status" ng-model="vm.addForm.status_id" ng-value="status.id" ng-click="vm.statusModal.choice(status)">{{status.name}}</ion-radio>
        </ion-list>
    </ion-content>
</ion-modal-view>