// import 'ionic'
// import 'ionic-angular'

import './style/common.less'
import register from './helper/register'

import Main from './module/main'
import Order from './module/order'
import Member from './module/member'
import Store from './module/store'
import System from './module/system'


// directive
import mobileSegment from './directive/mobileSegment'
import scan from './directive/scan'

// service
import authService from './service/auth'
import scanService from './service/scan'

// filter
import formatOrderStatus from './filter/formatStatus'

angular.module('express-manage',[
    'ionic',
    'ionic-datepicker',
    'ngCordova',
    Main.name,
    Order.name,
    Member.name,
    Store.name,
    System.name,
])
.config((ionicDatePickerProvider, $ionicConfigProvider) => {
    ionicDatePickerProvider.configDatePicker({
        weeksList: ['天', '一', '二', '三', '四', '五', '六'],
        monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        setLabel: '选择',
        todayLabel: '今天',
        closeLabel: '关闭',
        // showTodayButton: true,
        closeOnSelect: true,

    })

    $ionicConfigProvider.tabs.position('bottom')
}).config(($httpProvider) => {
    $httpProvider.interceptors.push(($q, $injector) => {
        // 拦截所有验证失败的请求,跳转到登录页面

        return {
            responseError: (rejection) => {
                if (rejection.status !== 401) {
                    return rejection
                }
                const $state = $injector.get('$state');
                const deferred = $q.defer()
                $state.go('signIn')

                return deferred.promise;
            }
        }
    })

})
.run(['$rootScope', '$state', 'authService', '$ionicPlatform', ($rootScope, $state, authService, $ionicPlatform) => {
    $ionicPlatform.ready(function() {
        // alert('ready ok')
        // alert(ionic.Platform.platform())
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs).
        // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
        // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
        // useful especially with forms, though we would prefer giving the user a little more room
        // to interact with the app.
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          // Set the statusbar to use the default style, tweak this to
          // remove the status bar on iOS or change it to use white instead of dark colors.
          //   alert('status bar')
            StatusBar.styleDefault();
        }
    })

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !authService.isAuthenticated()){
            $state.transitionTo("signIn");
            event.preventDefault();
        }
    })
}])
.constant('AUTH_EVENTS', {
    loginSuccess: 'auth.login.success',
    loginFailed: 'auth.login.failed',
    logoutSuccess: 'auth.logout.success',
    sessionTimeout: 'auth.session.timeout',
    notAuthenticated: 'auth.not.authenticated',
    notAuthorized: 'auth.not.authorized'
})
.filter('formatOrderStatus', formatOrderStatus)

register('express-manage')
.directive('mobile', mobileSegment)
.directive('scan', scan)
.factory('authService', authService)
.factory('scanService', scanService)