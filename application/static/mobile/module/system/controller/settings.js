/**
 * Created by cloverstd on 16/5/20.
 */

import aboutTpl from '../tpl/about.tpl'

class Ctrl {
    constructor(authService, $state, $ionicPopup, $scope, $ionicPlatform) {
        Object.assign(this, {
            $state,
            authService,
            $ionicPopup,
            $scope,
            $ionicPlatform
        })
        this.init()
    }

    init() {
        console.log('system settings')
    }

    signOut() {
        this.authService.signOut()
        this.$state.go('signIn')
    }
    
    clearCache() {
        this.$ionicPlatform.ready(() => {
            // window.location.reload()
        })
        window.location.reload()
    }

    about() {
        const myPopup = this.$ionicPopup.show({
            templateUrl: aboutTpl,
            title: '关于',
            subTitle: '快递管理',
            scope: this.$scope,
            buttons: [
                {
                    text: "关闭",
                    type: "button-positive"
                }
            ]
        })

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    }

}

Ctrl.$inject = [
    'authService',
    '$state',
    '$ionicPopup',
    '$scope',
    '$ionicPlatform',
]

export default Ctrl