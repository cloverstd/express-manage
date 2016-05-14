import appTpl from './index.tpl'

// load skeleton
import navCtrl from './nav/controller'
import navTpl from './nav/nav.tpl'


function AppRouter($stateProvider, $httpProvider, $urlRouterProvider) {

    // $httpProvider.interceptors.push('timestampMarker');
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('app', {
            url: '/',
            views: {
                '': {
                    template: appTpl
                },
                'nav@app': {
                    template: navTpl,
                    controller: navCtrl
                },
                'body@app': {
                    template: '<div>body</div>'
                },
                'footer@app': {
                    template: '<div>footer</div>'
                }
            }
        })
}

AppRouter.$inject = [
    '$stateProvider',
    '$httpProvider',
    '$urlRouterProvider'
]

// export default angular
// 	.module('express-manage.appRouter', [])
//     .config(AppRouter)
//     .controller('MainCtrl', appCtrl)
export default AppRouter
