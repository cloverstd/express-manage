/**
 * Created by cloverstd on 16/5/18.
 */

import addTpl from './tpl/add.tpl'
import queryTpl from './tpl/query.tpl'
import historyTpl from './tpl/history.tpl'
import orderDetailTpl from './tpl/order.detail.tpl'

function Router ($stateProvider) {
    $stateProvider
        // .state('order', {
        //     url: '/order',
        //     views: {
        //         'order-add': {
        //             template: '<ion-nav-view></ion-nav-view>'
        //         },
        //         'order-query': {
        //             template: '<ion-nav-view></ion-nav-view>'
        //         }
        //     },
        //     abstract: true
        // })
        .state('main.order', {
            url: '/order',
            abstract: true
        })

        .state('main.order.add', {
            url: '/add',
            authenticate: true,
            views: {
                'order-add@main': {
                    templateUrl: addTpl,
                    controller: 'AddCtrl as vm'
                }
            }
        })

        .state('main.order.query', {
            url: '/query',
            authenticate: true,
            views: {
                'order-query@main': {
                    templateUrl: queryTpl,
                    controller: 'QueryCtrl as vm'
                }
            }
        })

        .state('main.order.history', {
            url: '/history',
            authenticate: true,
            views: {
                'order-history@main': {

                    templateUrl: historyTpl,
                    controller: () => {
                        console.log('order history')
                    }
                }
            }
        })

        .state('main.order.detail', {
            url: '/store/{store_id: int}/{order_id: int}',
            authenticate: true,
            views: {
                'order-query@main': {
                    templateUrl: orderDetailTpl,
                    controller: 'DetailCtrl as vm'
                }
            }
        })
}

Router.$inject = [
    '$stateProvider'
]

export default Router