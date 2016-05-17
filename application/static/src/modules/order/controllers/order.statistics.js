/**
 * Created by cloverstd on 16/5/17.
 */

import echarts from 'echarts'
import moment from 'moment'

class Ctrl {
    constructor(orderService, $stateParams, storeService, $timeout) {
        Object.assign(this, {
            orderService,
            $stateParams,
            storeService,
            $timeout,
        })
        this.init()
    }
    init() {
        this.store_id = this.$stateParams.store_id
        this.search = {}
        this.search.model = 'month'
        this.echartsInit()
        this.dateInit()
        this.companyInit()

        this.refreshData()
    }

    dateInit() {
        this.startAtDT = moment(moment().format('YYYY-01-01 00:00:00'))._d

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
    }

    echartsInit() {
        this.chart = echarts.init(document.getElementById('chart'))

        this.chart.setOption({
            title: {
                text: '快递统计'
            },
            tooltip: {},
            legend: {
                data:['快递量']
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '快递量',
                type: 'line',
                data: []
            }],
            toolbox: {
                show: true,
                feature: {
                    // dataZoom: {},
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {},
                }
            },

        })
        this.chart.showLoading()
    }
    
    refreshData() {
        const vm = this
        const params = {
            start_at: moment(this.startAtDT).format('YYYY-MM-DD 00:00:00'),
            end_at: moment(this.endAtDT).format('YYYY-MM-DD 23:59:59'),
        }
        if (this.search.company_id) {
            params.company_id = this.search.company_id
        }
        params.model = this.search.model
        vm.orderService.orderStatistics(vm.store_id, params)
            .then(data => {
                vm.chart.setOption({
                    xAxis: {
                        data: data.data.xAxis
                    },
                    series: [{
                        name: '快递量',
                        data: data.data.series_data,
                    }]
                })
                vm.chart.hideLoading()
            })
    }

    companyInit() {
        this.storeService.companyList(this.store_id, 1, 1, 'all')
            .then(data => {
                this.company = data.data.items
            })
    }

    setModel(m) {
        this.search.model = m
        this.chart.showLoading()
        this.$timeout(() => {
            this.refreshData()
        }, 500)
    }
}

Ctrl.$inject = ['orderService', '$stateParams', 'storeService', '$timeout']

export default Ctrl