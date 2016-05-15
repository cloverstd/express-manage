import navTpl from './nav.tpl'
import alertTpl from './modules/alert/alert.tpl'


class AppCtrl {
    constructor($state) {
        const vm = this
        vm.tpls = {
            navbar: navTpl,
            alert: alertTpl,
        }
        
        console.log('hi11')
    }
}

AppCtrl.$inject = ['$state']


class NavCtrl {
    constructor($state, $rootScope, memberService, AUTH_EVENTS, authService) {
        const vm = this
        Object.assign(vm, {
            $state,
            $rootScope,
            memberService,
            AUTH_EVENTS,
            authService,
        })
        vm.init()
    }

    init() {
        const vm = this

        if (vm.authService.isAuthenticated() && !vm.$rootScope.current_user) {
            vm.getCurrent()
        }

        vm.$rootScope.$on(vm.AUTH_EVENTS.loginSuccess, () => {
            console.log('sign success')
            vm.getCurrent()
        })

        vm.$rootScope.$on(vm.AUTH_EVENTS.logoutSuccess, () => {
            console.log('sign out success')
            vm.$rootScope.current_user = null
        })
    }

    getCurrent() {
        const vm = this
        console.log('ger current user')
        vm.memberService.info()
            .then(data => {
                console.log(data)
                if (data.meta && data.meta.code == 0) {
                    vm.$rootScope.current_user = data.data
                }
            })
    }

}
NavCtrl.$inject = ['$state', '$rootScope', 'memberService', 'AUTH_EVENTS', 'authService']

export {
    AppCtrl,
    NavCtrl
}