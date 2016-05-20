/**
 * Created by cloverstd on 16/5/18.
 */

import tabTpl from './tpl/tab.tpl'

function Router ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/order/add')

    $stateProvider
        .state('main', {
            url: '',
            templateUrl: tabTpl,
            abstract: true,
            controller: ['storeService', '$rootScope', (storeService, $rootScope) => {
                // storeService.storeList(1, 1, 1)
                //     .then(data => {
                //         if (data.data.items) {
                //             $rootScope.defaultStore = data.data.items[0]
                //         } else {
                //             $rootScope.defaultStore = {}
                //         }
                //         console.log($rootScope.defaultStore)
                //     })
            }]
        })
}

Router.$inject = ['$stateProvider', '$urlRouterProvider']

export default Router