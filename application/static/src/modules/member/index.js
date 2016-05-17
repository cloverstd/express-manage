/**
 * Created by cloverstd on 16/5/14.
 */

import register from '../../helpers/register'

import Router from './router'
import SignInCtrl from './controllers/sign_in'
import CenterCtrl from './controllers/center'

import Service from './services'

export default angular
    .module('express-manage.app.member', [])
    .config(Router)
    .controller('SignInCtrl', SignInCtrl)
    .controller('CenterCtrl', CenterCtrl)

register('express-manage.app.member')
.factory('memberService', Service)