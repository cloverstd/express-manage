/**
 * Created by cloverstd on 16/5/14.
 */

// import 'angular'
// import 'jQuery'
// import moment from 'moment'
// import "angular-ui-router"
// import "angular-ui-bootstrap"

// less
import './style/common.less'

import register from './helpers/register'

// app
import {
    AppCtrl,
    NavCtrl,
} from './app.controller'
import AlertCtrl from './modules/alert/controller'

import AppRouter from './app.router'

// filters
import formatDT from './filter/formatDT'
import formatOrderStatus from './filter/formatOrderStatus'

// services

import HTTPService from './service/http'
import AuthService from './service/auth'
import AlertService from './service/alert'

// directives
import mobileDirective from './directives/mobile'

// modules

import Member from './modules/member'
import Store from './modules/store'
import Order from './modules/order'

export default angular
    .module('express-manage', [
        'ui.router',
        'ui.bootstrap',
        Member.name,
        Store.name,
        Order.name,
    ])
    .run(['$rootScope', '$state', 'authService', ($rootScope, $state, authService) => {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            if (toState.authenticate && !authService.isAuthenticated()){
                $state.transitionTo("member.signIn");
                event.preventDefault();
            }
        });
    }])
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth.login.success',
        loginFailed: 'auth.login.failed',
        logoutSuccess: 'auth.logout.success',
        sessionTimeout: 'auth.session.timeout',
        notAuthenticated: 'auth.not.authenticated',
        notAuthorized: 'auth.not.authorized'
    })
    .config(AppRouter)
    .controller('AppCtrl', AppCtrl)
    .controller('NavCtrl', NavCtrl)
    .controller('AlertCtrl', AlertCtrl)
    .filter('formatDT', formatDT)
    .filter('orderStatus', formatOrderStatus)

register('express-manage')
.factory('authService', AuthService)
.factory('alertService', AlertService)
.directive('mobile', mobileDirective)