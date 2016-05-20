/**
 * Created by cloverstd on 16/5/18.
 */

import addFormStatusRadioTpl from '../tpl/add.form.status.radio.tpl'
import addFormCompanyRadioTpl from '../tpl/add.form.company.radio.tpl'
import userSearchTpl from '../tpl/user.search.modal.tpl'

class Ctrl {
    constructor($ionicModal, $scope, orderService, $ionicLoading, $stateParams, storeService, $ionicScrollDelegate, $ionicPopup) {
        Object.assign(this, {
            $ionicModal,
            $scope,
            orderService,
            $ionicLoading,
            $stateParams,
            storeService,
            $ionicScrollDelegate,
            $ionicPopup,
        })

        this.init()
        console.log('order add')
    }

    init() {
        const vm = this
        vm.addForm = {
            status: 0
        }
        this.storeService.storeList(1, 1, 1)
            .then(data => {
                if (data.data.items) {
                    this.store = data.data.items[0]
                } else {
                    this.store = {}
                }

                vm.statusModalInit()
                vm.statusInit()
                vm.companyInit()
                vm.companyModalInit()
                vm.userSearchModalInit()
                vm.noInit()
            })
    }

   statusInit() {
        /*
            #  0 -- 到达
            #  1 -- 短信通知
            #  3 -- 电话通知
            #  5 -- 电话短信通知
            #  10 -- 签收
            #  11  -- 拒收
         */
        this.statusData = [{
            id: 0,
            name: '到达'
        }, {
            id: 1,
            name: '短信通知'
        }, {
            id: 3,
            name: '电话通知'
        }, {
            id: 5,
            name: '电话短信通知'
        }, {
            id: 10,
            name: '签收'
        }, {
            id: 11,
            name: '拒收'
        }]

       this.addForm.status_name = this.statusData[0].name
    }


    statusModalInit () {
        this.statusModal = {}
        this.$ionicModal.fromTemplateUrl(addFormStatusRadioTpl, {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then((modal) => {
            this.statusModal.instance = modal
        })
        this.statusModal.open = () => {
            this.statusModal.instance.show()
        }

        this.statusModal.close = () => {
            this.statusModal.instance.hide()
        }
        
        this.statusModal.choice = (status) => {
            this.addForm.status_name = status.name
            this.statusModal.close()
        }

    }

    companyInit() {
        this.storeService.companyList(this.store.id, 1, 1, 'all')
            .then(data => {
                this.company = data.data.items
                if (this.company) {
                    this.addForm.company_name = this.company[0].name
                    this.addForm.company_id = this.company[0].id
                }
            })
    }

    companyModalInit() {
        this.companyModal = {}
        this.$ionicModal.fromTemplateUrl(addFormCompanyRadioTpl, {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then((modal) => {
            this.companyModal.instance = modal
        })
        this.companyModal.open = () => {
            this.companyModal.instance.show()
        }

        this.companyModal.close = () => {
            this.companyModal.instance.hide()
        }

        this.companyModal.choice = (company) => {
            this.addForm.company_name = company.name
            this.companyModal.close()
        }
    }

    userSearchModalInit() {
        this.userSearchModal = {}
        this.$ionicModal.fromTemplateUrl(userSearchTpl, {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then((modal) => {
            this.userSearchModal.instance = modal
        })
        this.userSearchModal.open = () => {
            this.userSearchModal.instance.show()
        }

        this.userSearchModal.close = () => {
            this.userSearchModal.instance.hide()
        }

        this.userSearch = {
            page: 1,
            per_page: 10,
            key: null,
            type: 'mobile',
        }

        this.userSearchModal.search = (cb) => {
            const search = {}
            if (this.userSearch.mobile) {
                search.mobile = this.userSearch.key
            } else {
                search.name = this.userSearch.key
            }
            this.userSearch.searching = true
            this.orderService.userSearch(
                this.store.id,
                this.userSearch.page,
                this.userSearch.per_page,
                search
            ).then(data => {
                if (cb) {
                    cb(data.data.items)
                } else {
                    this.userSearchModal.items = data.data.items
                }

                this.userSearchModal.paginate = data.data.paginate
                this.userSearch.searching = false
            })
        }
        
        this.userSearchModal.has_next = () => {
            if (this.userSearchModal.paginate) {
                if (this.userSearchModal.paginate.has_next) {
                    return true
                }
            }
            return false
        }

        this.userSearchModal.loadMore = () => {
            this.userSearch.page = this.userSearchModal.paginate.next_num
            this.userSearchModal.search((items) => {
                items.map(item => {
                    this.userSearchModal.items.push(item)
                })
                this.$ionicScrollDelegate.scrollBottom()
            })
        }
        
        this.userSearchModal.choice = (user, user_name) => {
            this.addForm.user = {
                id: user.id,
                user_name_id: user_name.id,
                name: user_name.name,
                mobile: user.mobile,
            }
            console.log(this.addForm)
            this.userSearchModal.close()
        }
    }

    orderSave() {

        this.orderService.orderPost(this.store.id, this.addForm)
            .then(data => {
                if (data.meta && data.meta.code == 0) {
                    this.addForm = {
                        status: this.addForm.status,
                        company_id: this.addForm.company_id
                    }
                    this.noInit()
                } else {
                    console.log(data)
                    this.$ionicPopup.alert({
                        title: '错误',
                        template: '发生了错误'
                    })
                }
            }).catch(data => {
                this.$ionicPopup.alert({
                        title: '错误',
                        template: '发生了错误'
                    })
            })
    }

    noInit() {
        console.log('hi')
        this.orderService.orderNo(this.store.id)
            .then(data => {
                this.no = data.data
                this.addForm.no = this.no
            })
    }

    clearUserSearch() {
        this.addForm.user = {}
    }
}

Ctrl.$inject = [
    '$ionicModal',
    '$scope',
    'orderService',
    '$ionicLoading',
    '$stateParams',
    'storeService',
    '$ionicScrollDelegate',
    '$ionicPopup',
]

export default Ctrl