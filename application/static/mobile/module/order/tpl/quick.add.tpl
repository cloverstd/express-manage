<ion-view cache-view="false" view-title="快速录单">
    <ion-nav-buttons side="left">
          <a class="button" ui-sref="main.order.add">
              到件录单
          </a>
    </ion-nav-buttons>
    <ion-nav-buttons side="right">
          <button class="button" ng-click="vm.showCompanyPopup()">
              {{vm.company_name}}
          </button>
    </ion-nav-buttons>
    <ion-header-bar class="bar-light bar-subheader">
            <input type="search"
                   placeholder="单号"
                   ng-model="vm.number"
                   class=""
            style="width: 100%">
        <div style="width: 155px">
            <scan class="button icon ion-qr-scanner" vm="vm" result="vm.number"></scan>
            <button class="button icon-left ion-qr-scanner" ng-click="vm.scan()">连续</button>
        </div>
    </ion-header-bar>
    <ion-content>
        <ion-list>
            <ion-item ng-repeat="order in vm.order.items">
                <span>{{order.number}}</span>
                    <span class="badge badge-assertive">{{order.no}}</span>
            </ion-item>
        </ion-list>
    </ion-content>
</ion-view>
