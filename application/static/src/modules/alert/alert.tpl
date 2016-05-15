<div class="alert-box">
    <uib-alert ng-repeat="alert in vm.alerts" type="{{alert.type}}" close="vm.closeAlert($index)">{{alert.msg}}</uib-alert>
</div>