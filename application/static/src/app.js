/**
 * Created by cloverstd on 16/5/14.
 */

import 'angular'
// import 'jQuery'
import "angular-ui-router"
import "angular-ui-bootstrap"
import App from "./skeleton/index"
import AppCtrl from './skeleton/controller'

export default angular
    .module('express-manage', [
        'ui.router',
        'ui.bootstrap',
        App.name
    ])
    .controller('AppCtrl', AppCtrl)