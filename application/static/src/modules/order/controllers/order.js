/**
 * Created by cloverstd on 16/5/15.
 */

import moment from 'moment'

class Ctrl {
    constructor($state, alertService, storeService, $stateParams, orderService, $timeout) {
        Object.assign(this, {
            storeService,
            alertService,
            $state,
            $stateParams,
            orderService,
            $timeout,
        })
        this.init()
    }

    init() {
        this.store_id = this.$stateParams.store_id
        this.search = {}
        this.order = {}
        this.orderInit()

        this.companyInit()
        this.statusInit()
    }

    companyInit() {
        this.storeService.companyList(this.store_id, 1, 1, 'all')
            .then(data => {
                this.company = data.data.items
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
        this.status = [{
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
    }
    
    orderInit() {
        this.order.currentPage = 1
        this.order.per_page = 100
        this.startAtDT = moment().subtract(1, 'month')._d
        this.startAtOptions = {
            maxDate: new Date(),
            formatMonth: 'MMMM',
            formatDayTitle: 'yyyy-MM',
            formatDayHeader: 'EEE',
            startingDay: 1,
            initDate: new Date(),
        }
        this.endAtDT = moment()._d
        this.endAtOptions = {
            maxDate: new Date(),
            formatMonth: 'MMMM',
            formatDayTitle: 'yyyy-MM',
            formatDayHeader: 'EEE',
            startingDay: 1,
            initDate: new Date(),
        }

        this.order.list = () => {
            const params = {
                start_at: moment(this.startAtDT).format('YYYY-MM-DD 00:00:00'),
                end_at: moment(this.endAtDT).format('YYYY-MM-DD'),
            }
            if (this.search.company_id) {
                params.company_id = this.search.company_id
            }
            if (this.search.key) {
                params.key = this.search.key
            }
            if (this.search.status_id == 0 || this.search.status_id) {
                params.status = this.search.status_id
            }
            console.log(params)
            this.orderService.orderList(this.store_id, this.order.currentPage, this.order.per_page, params)
                .then(data => {
                    this.order.items = data.data.items
                    this.order.paginate = data.data.paginate
                    this.search.loading = false
                })
        }
        this.order.list()
        this.order.search = () => {
            this.search.loading = true
            this.$timeout(() => {
                this.order.list()
            }, 500)
        }
        
        this.order.statusChange = (order, status) => {
            this.orderService.orderPut(this.store_id, order.id, {
                status: status
            }).then(data => {
                if (data.meta && data.meta.code == 0) {
                    this.alertService.success('保存成功')
                    order.status = status
                } else {
                    this.alertService.danger('保存失败')
                }
            }).catch(data => {
                this.alertService.danger('保存失败')
            })
        }
    }

}

Ctrl.$inject = ['$state', 'alertService', 'storeService', '$stateParams', 'orderService', '$timeout']

export default Ctrl