/**
 * Created by cloverstd on 16/5/15.
 */

class Ctrl {
    constructor($state, alertService, storeService, $stateParams) {
        Object.assign(this, {
            storeService,
            alertService,
            $state,
            $stateParams,
        })
        this.init()
    }

    init() {
        this.addForm = {}
        this.store_id = this.$stateParams.store_id
    }

    add() {
        this.storeService.companyPost(this.store_id, this.addForm)
            .then(data => {
                if (data.meta && data.meta.code == 0) {
                    this.alertService.success('添加成功')
                    this.$state.go('store.detail', {store_id: this.store_id})
                } else {
                    this.alertService.danger('添加失败')
                }
            }).catch(data => {
            this.alertService.danger('添加失败')
        })
    }
}

Ctrl.$inject = ['$state', 'alertService', 'storeService', '$stateParams']

export default Ctrl