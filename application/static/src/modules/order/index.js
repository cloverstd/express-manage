/**
 * Created by cloverstd on 16/5/15.
 */

import register from '../../helpers/register'

import Router from './router'

import OrderAddCtrl from './controllers/order.add'
import OrderCtrl from './controllers/order'

import Service from './services'

export default angular
    .module('express-manage.app.order', [])
    .config(Router)
    .controller('OrderAddCtrl', OrderAddCtrl)
    .controller('OrderCtrl', OrderCtrl)

register('express-manage.app.order')
.factory('orderService', Service)