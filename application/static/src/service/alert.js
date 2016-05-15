/**
 * Created by cloverstd on 16/5/15.
 */

class AlertService {
    constructor($rootScope) {
        this.$scope = $rootScope
    }

    success(msg) {
        this.$scope.$emit('ALERT', {
            type: 'success',
            msg: msg
        })
    }

    danger(msg) {
        this.$scope.$emit('ALERT', {
            type: 'danger',
            msg: msg
        })
    }

    warning(msg) {
        this.$scope.$emit('ALERT', {
            type: 'warning',
            msg: msg
        })
    }

    info(msg) {
        this.$scope.$emit('ALERT', {
            type: 'info',
            msg: msg
        })
    }
}

AlertService.$inject = ['$rootScope']

export default AlertService