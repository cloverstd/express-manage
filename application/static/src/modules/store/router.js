/**
 * Created by cloverstd on 16/5/15.
 */

import storeTpl from './tpl/store.tpl'

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
            controller: () => {
                console.log('store add')
            },
            template: 'store add',
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

        .state('store.company', {
            abstract: true,
            url: '/{company_id:int}/company',
            template: '<div ui-view></div>'
        })

        .state('store.company.list', {
            url: '',
            controller: () => {
                console.log('company list')
            },
            template: 'company list',
            authenticate: true
        })

        .state('store.company.add', {
            url: '',
            controller: () => {
                console.log('company add')
            },
            template: 'company add',
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