/**
 * Created by cloverstd on 16/5/15.
 */

import register from '../../helpers/register'

import Router from './router'
import StoreCtrl from './controllers/store'

import Service from './services'

export default angular
    .module('express-manage.app.store', [])
    .config(Router)
    .controller('StoreCtrl', StoreCtrl)

register('express-manage.app.store')
.factory('storeService', Service)