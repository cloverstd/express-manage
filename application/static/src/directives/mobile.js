/**
 * Created by cloverstd on 16/5/16.
 */

class Mobile {
    constructor() {
        this.restrict   = 'AEC'
        this.template   = `
        <div>
            <button class="btn btn-info btn-xs" ng-click="show = !show"><i class="fa" ng-class="{'fa-eye': !show, 'fa-eye-slash': show, 'active': show}"></i></button>
            <span>{{mobile ? mobile.slice(0, 7) : '-'}}</span>
            <span ng-show="show">{{mobile.slice(7)}}</span>
            <span ng-hide="show">****</span>
        </div>
        `
        this.replace    = true
        this.transclude = true
    }

    controller() {

    }

    link(scope, ele, attrs, controller) {
        scope.mobile = attrs.number
    }
}

export default Mobile