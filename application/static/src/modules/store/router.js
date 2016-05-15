/**
 * Created by cloverstd on 16/5/15.
 */

import storeTpl from './tpl/store.tpl'
import storeAddTpl from './tpl/store.add.tpl'
import storeCompanyTpl from './tpl/store.company.tpl'
import storeCompanyAddTpl from './tpl/store.company.add.tpl'

function Router($stateProvider) {
    $stateProvider
        .state('store', {
            abstract: true,
            url: '/store',
            template: '<div ui-view></div>'
        })
        .state('store.list', {
            url: '',
            controller: 'StoreCtrl as vm',
            templateUrl: storeTpl,
            authenticate: true
        })
        .state('store.add', {
            url: '/add',
            controller: 'StoreAddCtrl as vm',
            templateUrl: storeAddTpl,
            authenticate: true
        })
        .state('store.edit', {
            url: '/edit',
            controller: () => {
                console.log('store edit')
            },
            template: 'store edit',
            authenticate: true
        })
        .state('store.detail', {
            url: '/{store_id:int}',
            controller: 'StoreCompanyCtrl as vm',
            templateUrl: storeCompanyTpl,
            authenticate: true,
        })
        
        .state('store.company', {
            abstract: true,
            url: '/{store_id:int}/company',
            template: '<div ui-view></div>'
        })

        .state('store.company.list', {
            url: '',
            controller: 'StoreCompanyCtrl as vm',
            templateUrl: storeCompanyTpl,
            authenticate: true
        })

        .state('store.company.add', {
            url: '/add',
            controller: 'StoreCompanyAddCtrl as vm',
            templateUrl: storeCompanyAddTpl,
            authenticate: true
        })

        .state('store.company.edit', {
            url: '',
            controller: () => {
                console.log('company edit')
            },
            template: 'company edit',
            authenticate: true
        })
}

Router.$inject = [
    '$stateProvider'
]

export default Router