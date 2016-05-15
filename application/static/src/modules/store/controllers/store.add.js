/**
 * Created by cloverstd on 16/5/15.
 */

class Ctrl {
    constructor($state, alertService, storeService) {
        Object.assign(this, {
            storeService,
            alertService,
            $state,
        })
        this.init()
    }

    init() {
        this.addForm = {}
    }

    add() {
        this.storeService.storePost(this.addForm)
            .then(data => {
                if (data.meta && data.meta.code == 0) {
                    this.alertService.success('添加成功')
                    this.$state.go('store.list')
                } else {
                    this.alertService.danger('添加失败')
                }
            })
            .catch(data => {
                console.log(data)
                this.alertService.danger('添加失败')
            })
    }
}

Ctrl.$inject = ['$state', 'alertService', 'storeService']

export default Ctrl