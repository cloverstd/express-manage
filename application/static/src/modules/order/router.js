/**
 * Created by cloverstd on 16/5/15.
 */

import orderAddTpl from './tpls/order.add.tpl'
import orderTpl from './tpls/order.tpl'

function Router($stateProvider) {
    $stateProvider
        .state('order', {
            abstract: true,
            url: '/order/store/:store_id/order',
            template: '<div ui-view></div>'
        })

        .state('order.list', {
            url: '?is_today&status',
            templateUrl: orderTpl,
            controller: 'OrderCtrl as vm',
            authenticate: true
        })

        .state('order.add', {
            url: '/add/:company_id?',
            defaultParams: {
                company_id: null,
            },
            templateUrl: orderAddTpl,
            controller: 'OrderAddCtrl as vm',
            authenticate: true
        })

        .state('order.detail', {
            url: '/{order_id:int}',
            template: 'order.detail',
            authenticate: true
        })
}

Router.$inject = ['$stateProvider']

export default Router