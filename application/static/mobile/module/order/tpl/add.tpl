<ion-view cache-view="false" view-title="到件录单">

    <ion-nav-buttons side="right">
          <button class="button" ng-click="vm.orderSave()">
              保存
          </button>
    </ion-nav-buttons>

    <ion-content>
        <div class="list">
            <label class="item item-divider">
                收件人信息
                <div class="user-search">
                    <button ng-if="!vm.addForm.user.id" class="button button-small button-icon icon ion-search" ng-click="vm.userSearchModal.open()">
                    </button>
                    <button ng-if="vm.addForm.user.id" ng-click="vm.clearUserSearch()" class="button button-small button-icon icon ion-close-circled"></button>
                </div>
            </label>

            <label class="item item-input">
                <span class="input-label">姓名</span>
                <input type="text" placeholder="姓名" ng-model="vm.addForm.user.name">
            </label>
            <label class="item item-input">
                <span class="input-label">手机号码</span>
                <input type="tel" placeholder="手机号码" ng-model="vm.addForm.user.mobile">
            </label>
            <label class="item item-input">
                <textarea placeholder="地址" ng-model="vm.addForm.user.address"></textarea>
            </label>
            <label class="item item-input">
                <textarea placeholder="备注" ng-model="vm.addForm.user.remark"></textarea>
            </label>
            <label class="item item-divider">
                快递信息
            </label>
            <label class="item item-input" ng-click="vm.statusModal.open()">
                <span class="input-label">快递状态</span>

                <span class="item-note">
                    {{vm.addForm.status_name}}
                </span>
            </label>
            <label class="item item-input" ng-click="vm.companyModal.open()">
                <div class="input-label">
                    快递公司
                </div>
                <span class="item-note">
                    {{vm.addForm.company_name}}
                </span>
            </label>

            <div class="item item-input-inset">
                <label class="item-input-wrapper">
                    <input type="tel" placeholder="快递编号" ng-model="vm.addForm.no">
                </label>
                <button class="button button-small button-icon icon ion-load-c" ng-click="vm.noInit()">
                </button>
            </div>
            <!--<label class="item item-input-inset">-->

                <!--<label class="item-input-wrapper">-->
                    <!--<input type="number" placeholder="快递单号" ng-model="vm.addForm.number">-->
                <!--</label>-->
                <!--<button class="button button-light">-->
                    <!--<i class="icon ion-qr-scanner"></i>-->
                <!--</button>-->
            <!--</label>-->
            <div class="item item-input-inset">
                <label class="item-input-wrapper">
                    <input type="text" placeholder="快递单号" ng-model="vm.addForm.number">
                </label>
                <button class="button button-small button-icon icon ion-qr-scanner" ng-click="">
                </button>
            </div>
            <label class="item item-input">
                <textarea placeholder="备注" ng-model="vm.addForm.remark"></textarea>
            </label>
        </div>
    </ion-content>
</ion-view>
