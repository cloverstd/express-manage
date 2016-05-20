/**
 * Created by cloverstd on 16/5/18.
 */

import register from '../../helper/register'

// import Router from './router'

// service
import service from './services'

export default angular.module('express-manage.store', [])
    // .config(Router)

register('express-manage.order')
.factory('storeService', service)