/**
 * Created by cloverstd on 16/5/21.
 */

import quickAddComapnyTpl from '../tpl/quick.add.company.tpl'

class Ctrl {
    constructor(orderService, storeService, scanService, $scope, $ionicPopup) {
        Object.assign(this, {
            orderService,
            storeService,
            scanService,
            $scope,
            $ionicPopup,
        })
        
        this.init()
    }
    
    init() {
        this.storeService.storeList(1, 1, 1)
            .then(data => {
                if (data.data.items) {
                    this.store = data.data.items[0]
                } else {
                    this.store = {}
                }
                this.orderInit()
                this.companyInit(() => {
                    this.noInit()
                })
            })
    }

    orderInit() {
        this.order = {}
        this.order.page = 1
        this.order.per_page = 100
        const params = {}
        params.company_id = this.company_id
        this.orderService.quickOrderList(this.store.id, this.order.page, this.order.per_page, params)
            .then(data => {
                this.order.items = data.data.items
                this.order.paginate = data.data.paginate
            })
    }

    companyInit(cb) {
        this.storeService.companyList(this.store.id, 1, 1, 1)
            .then(data => {
                this.company = data.data.items
                if (this.company) {
                    this.company_id = this.company[0].id
                    this.company_name = this.company[0].name
                }
                cb()
            })
    }

    noInit() {
        this.orderService.orderNo(this.store.id)
            .then(data => {
                this.no = data.data
            })
    }
    
    saveOrder(cb) {
        const params = {}
        params.company_id = this.company_id
        params.number = this.number
        console.log(params)
        this.orderService.quickOrderPost(this.store.id, params)
            .then(data => {
                if (data.meta && data.meta.code == 0) {

                    this.orderInit()
                    if (cb) {
                        cb()
                    } else {
                        this.$ionicPopup.alert({
                            title: '成功',
                            template: '录单成功'
                        })
                    }
                } else {
                    if (angular.isString(data.meta.message)) {
                        this.$ionicPopup.alert({
                            title: '错误',
                            template: data.meta.message
                        })
                    } else {
                        this.$ionicPopup.alert({
                            title: '错误',
                            template: `发生了错误`
                        })
                    }
                }
            })
            .catch(data => {
                if (data.meta && angular.isString(data.meta.message)) {
                    this.$ionicPopup.alert({
                        title: '错误',
                        template: data.meta.message
                    })
                } else if (data.meta && angular.isObject(data.meta.message)) {
                    angular.forEach(data.meta.message, (value, key) => {
                        this.$ionicPopup.alert({
                            title: '错误',
                            template: value
                        })
                    })
                } else {
                    this.$ionicPopup.alert({
                        title: '错误',
                        template: `发生了错误`
                    })
                }
            })
    }
    scan() {
        this.scanService.scan()
            .then(result => {
                if (!result.cancelled) {
                    this.number = result.text
                    this.saveOrder(() => {
                        this.scan()
                    })
                }
            }).catch(error => {
                this.$ionicPopup.alert({
                        title: '错误',
                        template: `发生了错误`
                    })
            })
    }

    showCompanyPopup() {
        this.companyPopup = this.$ionicPopup.show({
            templateUrl: quickAddComapnyTpl,
            title: '快递公司',
            subTitle: '请选择快速录单的快递公司',
            scope: this.$scope,
            buttons: [
                {
                    text: '<b>取消</b>',
                    type: 'button-positive',
                    onTap: (e) => {
                        console.log('hi')
                    }
                }
            ]
        })
    }

    closeCompanyPopup() {
        this.companyPopup.close()
    }

    setCompany(company) {
        this.company_name = company.name
        this.orderInit()
        this.closeCompanyPopup()
    }


    setEdit() {
        this.popover.close()
    }
}

Ctrl.$inject = [
    'orderService',
    'storeService',
    'scanService',
    '$scope',
    '$ionicPopup',
]

export default Ctrl