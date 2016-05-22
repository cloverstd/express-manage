/**
 * Created by cloverstd on 16/5/20.
 */

import settingsTpl from './tpl/settings.tpl'

function Router($stateProvider) {
    $stateProvider
        .state('main.system', {
            url: '/system',
            abstract: true
        })

        .state('main.system.settings', {
            url: '/settings',
            authenticate: true,
            views: {
                'tab-3@main': {
                    templateUrl: settingsTpl,
                    controller: 'SettingsCtrl as vm'
                }
            }
        })
}

Router.$inject = [
    '$stateProvider'
]

export default Router