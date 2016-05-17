<div class="row">
    <div class="col-md-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="clearfix">
                    <div class="pull-left">
                        快递统计
                    </div>
                    <div class="pull-right">
                        <div class="btn-group btn-group-xs">
                            <button class="btn btn-info" ng-class="{'active': vm.search.model == 'day'}" ng-click="vm.setModel('day')">天</button>
                            <button class="btn btn-success" ng-class="{'active': vm.search.model == 'week'}" ng-click="vm.setModel('week')">周</button>
                            <button class="btn btn-primary" ng-class="{'active': vm.search.model == 'month'}" ng-click="vm.setModel('month')">月</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel-body">
                <div class="row margin-bottom-15">
                    <div class="col-xs-2">
                        开始时间
                    </div>
                    <div class="col-xs-2">
                        <p class="input-group">
                            <input type="text"
                                   class="form-control"
                                   uib-datepicker-popup
                                   ng-model="vm.startAtDT"
                                   is-open="vm.startAtOpend"
                                   datepicker-options="vm.startAtOptions"
                                   close-text="关闭"
                                   clear-text="清除"
                                   current-text="今天"
                                   ng-change="vm.setModel()"
                            />
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-default" ng-click="vm.startAtOpend = true"><i class="glyphicon glyphicon-calendar"></i></button>
                            </span>
                        </p>
                    </div>
                    <div class="col-xs-2">
                        结束时间
                    </div>
                    <div class="col-xs-2">
                        <p class="input-group">
                            <input type="text"
                                   class="form-control"
                                   uib-datepicker-popup
                                   ng-model="vm.endAtDT"
                                   is-open="vm.endAtOpend"
                                   datepicker-options="vm.startAtOptions"
                                   close-text="关闭"
                                   clear-text="清除"
                                   current-text="今天"
                                   ng-change="vm.setModel()"
                            />
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-default" ng-click="vm.endAtOpend = true"><i class="glyphicon glyphicon-calendar"></i></button>
                            </span>
                        </p>
                    </div>
                    <div class="col-xs-4">
                        <select class="form-control" ng-options="company.id as company.name for company in vm.company" ng-model="vm.search.company_id" ng-change="vm.setModel()">
                            <option value="">请选择公司</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div id="chart" style="width: 100%!important;height:400px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>