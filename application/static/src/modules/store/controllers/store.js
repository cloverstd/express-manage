/**
 * Created by cloverstd on 16/5/15.
 */

class Ctrl {
    constructor(storeService, alertService, $uibModal, $scope) {
        const vm = this
        Object.assign(vm, {
            storeService,
            alertService,
            $uibModal,
            $scope,
        })
        vm.init()
    }

    init() {
        const vm = this
        vm.store = {}
        vm.storeInit()
    }

    storeInit() {

        const vm = this
        vm.store.currentPage = 1
        vm.store.list = (page) => {
            page = page || 1
            vm.storeService.storeList(vm.store.currentPage)
                .then(data => {
                    vm.store.items = data.data.items
                    vm.store.paginate = data.data.paginate
                })
        }

        vm.store.del = (store) => {
            vm.storeService.storeDel(store.id)
                .then(data => {
                    if (data.meta && data.meta.code == 0) {
                        vm.alertService.success('删除成功')
                        vm.store.list()
                    } else {
                        vm.alertService.danger(data.meta.message)
                    }
                })
        }

        vm.store.list()
    }

    openEdit(store) {
        const vm = this
        vm.$scope.closeEdit = () => {
            vm.modalInstance.dismiss('cancel')
        }
        vm.$scope.currentEditForm = store
        vm.$scope.save = () => {
            vm.storeService.storePut(store.id, store)
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
            templateUrl: 'store.edit.html',
            scope: vm.$scope,
        })
        vm.modalInstance.result.then(() => {
            console.log('m1')
        }, () => {
            console.log('m2')
        })
    }
}

Ctrl.$inject = ['storeService', 'alertService', '$uibModal', '$scope']

export default Ctrl