/**
 * Created by cloverstd on 16/5/15.
 */

import register from '../../helpers/register'

import Router from './router'
import StoreCtrl from './controllers/store'
import StoreAddCtrl from './controllers/store.add'
import StoreCompanyCtrl from './controllers/store.company'
import StoreCompanyAddCtrl from './controllers/store.company.add'

import Service from './services'

export default angular
    .module('express-manage.app.store', [])
    .config(Router)
    .controller('StoreCtrl', StoreCtrl)
    .controller('StoreAddCtrl', StoreAddCtrl)
    .controller('StoreCompanyCtrl', StoreCompanyCtrl)
    .controller('StoreCompanyAddCtrl', StoreCompanyAddCtrl)

register('express-manage.app.store')
.factory('storeService', Service)