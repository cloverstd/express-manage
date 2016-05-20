<ion-modal-view>
    <ion-header-bar class="bar bar-header bar-positive">
        <h1 class="title">选择快递公司</h1>
        <button class="button button-clear button-primary" ng-click="vm.companyModal.close()">取消</button>
    </ion-header-bar>
    <ion-content class="padding">
        <ion-list>
            <ion-radio ng-repeat="company in ::vm.company" ng-model="vm.addForm.company_id" ng-value="company.id" ng-click="vm.companyModal.choice(company)">{{company.name}}</ion-radio>
        </ion-list>
    </ion-content>
</ion-modal-view>