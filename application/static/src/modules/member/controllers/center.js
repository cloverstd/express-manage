/**
 * Created by cloverstd on 16/5/17.
 */

class Ctrl {
    constructor(memberService, alertService, $state, AUTH_EVENTS, $rootScope) {
        Object.assign(this, {
            memberService,
            alertService,
            $state,
            AUTH_EVENTS,
            $rootScope,
        })
        this.init()
    }
    
    init() {
        this.passwordForm = {}
    }
    
    passwordSave() {
        this.memberService.memberPut(this.passwordForm)
            .then(data => {
                if (data.meta && data.meta.code == 0) {
                    this.alertService.info('修改成功,请重新登录')
                    this.$rootScope.$broadcast(this.AUTH_EVENTS.logoutSuccess)
                    this.$state.go('member.signIn')
                } else {
                    this.alertService.danger(data.meta.message)
                }
            }).catch(data => {
                this.alertService.danger('修改失败')
            })
    }
}

Ctrl.$inject = ['memberService', 'alertService', '$state', 'AUTH_EVENTS', '$rootScope']

export default Ctrl