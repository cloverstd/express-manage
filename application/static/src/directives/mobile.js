/**
 * Created by cloverstd on 16/5/16.
 */

class Mobile {
    constructor() {
        this.restrict   = 'AEC'
        this.template   = `
        <div>
            <button ng-if="tailNumber" class="btn btn-info btn-xs" ng-click="toggle()"><i class="fa" ng-class="{'fa-eye': !show, 'fa-eye-slash': show, 'active': show}"></i></button>
            <span>{{headNumber}}</span>
            <span ng-show="show">{{tailNumber}}</span>
            <span ng-hide="show" ng-if="tailNumber">****</span>
        </div>
        `
        this.replace    = true
        this.transclude = true
    }

    controller() {

    }

    link(scope, ele, attrs, controller) {
        scope.show = false
        scope.toggle = () => {
            scope.show = !scope.show
        }
        if (attrs.number.length > 4) {
            scope.tailNumber = attrs.number.slice(attrs.number.length - 4)
            scope.headNumber = attrs.number.slice(0, attrs.number.length - 4)
        } else {
            scope.headNumber = attrs.number
        }
    }
}

export default Mobile