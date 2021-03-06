/**
 * Created by cloverstd on 16/5/18.
 */

import register from '../../helper/register'

import Router from './router'

import AddCtrl from './controller/add'
import QueryCtrl from './controller/query'
import DetailCtrl from './controller/detail'
import QuickAddCtrl from './controller/quick.add'

// service
import service from './services'

export default angular.module('express-manage.order', [])
    .config(Router)
    .controller('AddCtrl', AddCtrl)
    .controller('QueryCtrl', QueryCtrl)
    .controller('DetailCtrl', DetailCtrl)
    .controller('QuickAddCtrl', QuickAddCtrl)

register('express-manage.order')
.factory('orderService', service)