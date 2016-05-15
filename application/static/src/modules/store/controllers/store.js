/**
 * Created by cloverstd on 16/5/15.
 */

class Ctrl {
    constructor(storeService) {
        const vm = this
        Object.assign(vm, {
            storeService
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

        vm.store.list = (page) => {
            page = page || 1
            vm.storeService.storeList(page)
                .then(data => {
                    vm.store.items = data.data.items
                    vm.store.paginate = data.data.paginate
                })
        }

        vm.store.del = (store) => {
            vm.storeService.storeDel(store.id)
                .then(data => {
                    if (data.meta && data.meta.code == 0) {
                        alert('删除成功')
                        vm.store.list()
                    }
                })
        }

        vm.store.list()
    }
}

Ctrl.$inject = ['storeService']

export default Ctrl