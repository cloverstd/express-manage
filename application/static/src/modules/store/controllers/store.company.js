/**
 * Created by cloverstd on 16/5/15.
 */

class Ctrl {
    constructor($state, alertService, storeService, $stateParams, $uibModal, $scope) {
        Object.assign(this, {
            storeService,
            alertService,
            $state,
            $stateParams,
            $uibModal,
            $scope,
        })
        this.init()
    }

    init() {
        this.company = {}
        this.storeInit()
    }

    companyInit() {
        this.company.currentPage = 1
        this.company.list = (page) => {
            this.storeService.companyList(this.$stateParams.store_id, this.company.currentPage)
                .then(data => {
                    if (data.meta && data.meta.code == 0) {
                        this.company.items = data.data.items
                        this.company.paginate = data.data.paginate
                    }
                })
        }
        this.company.del = (company) => {
            this.storeService.companyDel(this.$stateParams.store_id, company.id)
                .then(data => {
                    if (data.meta && data.meta.code == 0) {
                        this.alertService.success('删除成功')
                        this.company.list()
                    } else {
                        this.alertService.danger('删除失败')
                    }
                }).catch(data => {
                this.alertService.danger('删除失败')
            })
        }
        this.company.list()
    }

    storeInit() {
        this.storeService.storeGet(this.$stateParams.store_id)
            .then(data => {
                this.store = data.data
                this.companyInit()
            })
    }

    openEdit(company) {
        const vm = this
        vm.$scope.closeEdit = () => {
            vm.modalInstance.dismiss('cancel')
        }
        vm.$scope.currentEditForm = company
        vm.$scope.save = () => {
            vm.storeService.companyPut(this.store.id, company.id, company)
                .then(data => {
                    if (data.meta && data.meta.code == 0) {
                        vm.alertService.success('修改成功')
                        vm.$scope.closeEdit()
                    } else {
                        vm.alertService.danger('修改失败')
                    }
                }).catch(data => {
                vm.alertService.danger('修改失败')
            })
        }
        vm.modalInstance = vm.$uibModal.open({
            animation: true,
            templateUrl: 'store.company.edit.html',
            scope: vm.$scope,
        })
        vm.modalInstance.result.then(() => {
            console.log('m1')
        }, () => {
            console.log('m2')
        })
    }
}

Ctrl.$inject = ['$state', 'alertService', 'storeService', '$stateParams', '$uibModal', '$scope']

export default Ctrl