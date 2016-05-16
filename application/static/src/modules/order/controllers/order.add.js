/**
 * Created by cloverstd on 16/5/15.
 */

class Ctrl {
    constructor($state, alertService, storeService, $stateParams, orderService) {
        Object.assign(this, {
            storeService,
            alertService,
            $state,
            $stateParams,
            orderService
        })
        this.init()
    }

    init() {
        let company_id = this.$stateParams.company_id
        if (company_id) {
            company_id = parseInt(company_id)
        }
        this.addForm = {
            company_id: company_id,
            status: 0,
        }
        this.noInit()
        this.companyInit()

        this.userSearchInit()
    }

    companyInit() {
        this.storeService.companyList(this.$stateParams.store_id, 1, 1, 'all')
            .then(data => {
                this.company = data.data.items
                if (this.company.length == 0) {
                    this.alertService.warning('请先添加快递公司')
                    this.$state.go('store.company.add', {
                        store_id: this.$stateParams.store_id
                    })
                }
            })
    }

    noInit() {
        this.orderService.orderNo(this.$stateParams.store_id)
            .then(data => {
                this.no = data.data
                this.addForm.no = this.no
            })
    }

    orderSave(next) {
        this.orderService.orderPost(this.$stateParams.store_id, this.addForm)
            .then(data => {
                if (data.meta && data.meta.code == 0) {
                    this.alertService.success('添加成功')
                    if (next) {
                        this.$state.go('order.list', {

                            store_id: this.$stateParams.store_id
                        })
                    } else {
                        this.addForm = {
                            status: this.addForm.status,
                            company_id: this.addForm.company_id
                        }
                        this.noInit()
                    }
                } else {
                    console.log(data)
                    this.alertService.danger(data.meta.message)
                }
            }).catch(data => {
                console.log(data)
                if (data.meta && data.meta.message) {
                    if (angular.isObject(data.meta.message)) {
                        angular.forEach(data.meta.message, (value, key) => {
                            this.alertService.danger(value)
                        })
                    } else {
                        this.alertService.danger(data.meta.message)
                    }
                } else {
                    this.alertService.danger('添加失败')
                }
            })
    }

    userSearchInit() {

        this.userSearch = {
            page: 1,
            per_page: 10,
            key: null,
            type: 'mobile',
        }

        this.userSearch.search = () => {
            const search = {}
            if (this.userSearch.type == "mobile") {
                search.mobile = this.userSearch.key
            } else {
                search.name = this.userSearch.key
            }
            console.log(search)
            this.orderService.userSearch(
                this.$stateParams.store_id,
                this.userSearch.page,
                this.userSearch.per_page,
                search
            ).then(data => {
                this.userSearch.items = data.data.items
                this.userSearch.paginate = data.data.paginate
            })
        }
    }

    setUser(user, user_name) {
        this.addForm.user = {
            id: user.id,
            user_name_id: user_name.id,
            name: user_name.name,
            mobile: user.mobile,
        }
    }

}

Ctrl.$inject = ['$state', 'alertService', 'storeService', '$stateParams', 'orderService']

export default Ctrl