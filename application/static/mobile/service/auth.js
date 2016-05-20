/**
 * Created by cloverstd on 16/5/15.
 */

class AuthService {
    constructor($rootScope, memberService) {
        this.$rootScope = $rootScope
        this.memberService = memberService
    }

    signIn (token) {
        localStorage.setItem("mobile-jwt", token)
    }

    signOut () {
        localStorage.clear()
    }

    isAuthenticated() {
        return localStorage.getItem('mobile-jwt')
    }
}

AuthService.$inject = ['$rootScope', 'memberService']

export default AuthService