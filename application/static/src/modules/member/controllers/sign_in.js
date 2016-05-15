/**
 * Created by cloverstd on 16/5/14.
 */

class Ctrl {
    constructor($state, memberService, AUTH_EVENTS, $rootScope, authService, $scope, alertService) {
        const vm = this
        Object.assign(vm, {
            $state,
            memberService,
            AUTH_EVENTS,
            $rootScope,
            authService,
            $scope,
            alertService,
        })
        vm.init()
    }

    init() {
        const vm = this
        vm.signInForm = {}
        vm.authService.signOut()
        vm.$rootScope.$broadcast(vm.authService.logoutSuccess)

    }

    signIn() {
        const vm = this

        vm.memberService.signIn(vm.signInForm.username, vm.signInForm.password)
            .then(data => {
                console.log(data)
                if (data.access_token) {
                    vm.authService.signIn(data.access_token)
                    vm.$rootScope.$broadcast(vm.AUTH_EVENTS.loginSuccess)
                    vm.$state.go('store.list')
                } else {
                    vm.$rootScope.$broadcast(vm.AUTH_EVENTS.loginFailed)
                    vm.alertService.danger('登录失败')
                }
            })
            .catch((data) => {
                console.error(data)
                vm.alertService.danger('登录失败')
                vm.$rootScope.$broadcast(vm.AUTH_EVENTS.loginFailed)
            })
    }
}

Ctrl.$inject = ['$state', 'memberService', 'AUTH_EVENTS', '$rootScope', 'authService', '$scope', 'alertService']

export default Ctrl