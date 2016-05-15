/**
 * Created by cloverstd on 16/5/15.
 */

function Router($urlRouterProvider) {
    $urlRouterProvider.otherwise("/member/sign/in");
}

Router.$inject = [
    '$urlRouterProvider'
]

export default Router