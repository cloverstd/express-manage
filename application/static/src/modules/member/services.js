/**
 * Created by cloverstd on 16/5/15.
 */
import HTTPService from '../../service/http'
class Member extends HTTPService {
    constructor($http, $q) {
        super($http, $q)

        this.url = {
            signIn: '/api/member/auth',
            member: 'api/member',
        }
    }

    signIn(username, password) {
        return this.post(this.url.signIn, {
            username: username,
            password: password
        })
    }

    info() {
        return this.get(this.url.member)
    }

    memberPut(params) {
        return this.put(this.url.member, params)
    }
}

export default Member