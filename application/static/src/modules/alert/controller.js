/**
 * Created by cloverstd on 16/5/15.
 */


class Ctrl {
    constructor($rootScope, $timeout) {
        const vm = this
        vm.$rootScope = $rootScope
        vm.$timeout = $timeout
        console.log('alert ctrl')

        vm.init()
    }

    init() {
        const vm = this
        vm.alerts = []

        vm.$rootScope.$on('ALERT', (e, args) => {
            const length = vm.alerts.push(args)
            vm.$timeout(() => {
                vm.closeAlert(length-1)
            }, 3000)
        })

    }

    closeAlert(index) {
        if (this.alerts.length == 1) {
            this.alerts = []
        } else {
            this.alerts.splice(index, 1)
        }
    }
}

Ctrl.$inject = ['$rootScope', '$timeout']

export default Ctrl