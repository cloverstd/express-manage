/**
 * Created by cloverstd on 16/5/20.
 */

import register from '../../helper/register'

import Router from './router'

import SettingsCtrl from './controller/settings'


export default angular.module('express-manage.system', [])
    .config(Router)
    .controller('SettingsCtrl', SettingsCtrl)

register('express-manage.member')