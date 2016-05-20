/**
 * Created by cloverstd on 16/5/18.
 */

class Ctrl {
    constructor ($state, memberService, $rootScope, authService, AUTH_EVENTS, $ionicPopup) {
        Object.assign(this, {
            $state,
            memberService,
            $rootScope,
            authService,
            AUTH_EVENTS,
            $ionicPopup,
        })

        this.init()
    }

    init() {
        this.signInForm = {}
    }

    signIn(data) {
        const vm = this
        vm.loading = true
        vm.memberService.signIn(data.username, data.password)
            .then(data => {
                console.log(data)
                if (data.access_token) {
                    vm.authService.signIn(data.access_token)
                    vm.$rootScope.$broadcast(vm.AUTH_EVENTS.loginSuccess)
                    vm.$state.go('main.order.query')
                } else {
                    vm.$rootScope.$broadcast(vm.AUTH_EVENTS.loginFailed)
                    this.showAlert('登录失败')
                }

            vm.loading = false
            })
            .catch((data) => {
                console.error(data)
                // vm.alertService.danger('登录失败')
                this.showAlert('登录失败')
                vm.$rootScope.$broadcast(vm.AUTH_EVENTS.loginFailed)
                vm.loading = false
            })
    }

    showAlert (message) {
        const alertPopup = this.$ionicPopup.alert({
            title: '发生错误了',
            template: message
        });

        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    }
}

Ctrl.$inject = [
    '$state',
    'memberService',
    '$rootScope',
    'authService',
    'AUTH_EVENTS',
    '$ionicPopup',
]

export default Ctrl