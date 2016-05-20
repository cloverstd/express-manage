/**
 * Created by cloverstd on 16/5/18.
 */

import register from '../../helper/register'

import Router from './router'

import SignInCtrl from './controller/sign.in'

// service
import memberService from './service'

export default angular.module('express-manage.member', [])
    .config(Router)
    .controller('SignInCtrl', SignInCtrl)

register('express-manage.member')
.factory('memberService', memberService)