<ion-view cache-view="false" view-title="到件录单">

    <ion-nav-buttons side="right">
          <button class="button">
              保存
          </button>
    </ion-nav-buttons>

    <ion-content>
        <div class="list">
            <label class="item">
                <h2 class="text-center">收件人信息</h2>
            </label>
            <label class="item item-input">
                <span class="input-label">姓名</span>
                <input type="text" placeholder="姓名">
            </label>
            <label class="item item-input">
                <span class="input-label">手机号码</span>
                <input type="tel" placeholder="手机号码">
            </label>
            <label class="item item-input">
                <textarea placeholder="地址"></textarea>
            </label>
            <label class="item item-input">
                <textarea placeholder="备注"></textarea>
            </label>
        </div>
        <div class="list">
            <label class="item">
                <h2 class="text-center">快递信息</h2>
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

            <label class="item item-input">
                <input type="tel" placeholder="快递编号">
            </label>
            <label class="item item-input item-input-inset">

                <label class="item-input-wrapper">
                    <input type="number" placeholder="快递单号">
                </label>
                <button class="button button-light">
                    <i class="icon ion-qr-scanner"></i>
                </button>
            </label>
            <label class="item item-input">
                <textarea placeholder="备注"></textarea>
            </label>
        </div>
    </ion-content>
</ion-view>
