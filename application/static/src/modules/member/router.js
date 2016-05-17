/**
 * Created by cloverstd on 16/5/14.
 */

import signInTpl from './tpl/sign_in.tpl'
import centerTpl from './tpl/center.tpl'

function Router($stateProvider) {
    $stateProvider
        .state('member', {
            abstract: true,
            url: '/member',
            template: '<div ui-view></div>'
        })

        .state('member.signIn', {
            url: '/sign/in',
            controller: 'SignInCtrl as vm',
            templateUrl: signInTpl,
            authenticate: false
        })

        .state('member.signOut', {
            url: '/sign/out',
            controller: (authService, $state, $rootScope, AUTH_EVENTS) => {
                authService.signOut()
                $state.go('member.signIn')
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess)
            },
            authenticate: false
        })

        .state('member.center', {
            url: '/center',
            controller: 'CenterCtrl as vm',
            templateUrl: centerTpl,
            authenticate: true
        })
}

Router.$inject = [
    '$stateProvider'
]

export default Router