/**
 * Created by cloverstd on 16/5/18.
 */

import signInTpl from './tpl/sign.in.tpl'

function Router($stateProvider) {
    $stateProvider
        .state('main.member', {
            url: '/member',
            abstract: true
        })

        .state('signIn', {
            url: '/member/sign/in',
            templateUrl: signInTpl,
            controller: 'SignInCtrl as vm'
        })
}

Router.$inject = [
    '$stateProvider'
]

export default Router