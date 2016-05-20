/**
 * Created by cloverstd on 16/5/18.
 */

import addFormStatusRadioTpl from '../tpl/add.form.status.radio.tpl'
import addFormCompanyRadioTpl from '../tpl/add.form.company.radio.tpl'

class Ctrl {
    constructor($ionicModal, $scope) {
        Object.assign(this, {
            $ionicModal,
            $scope,
        })

        this.init()
        console.log('order add')
    }

    init() {
        const vm = this
        vm.addForm = {
            status_id: 0
        }
        vm.statusModalInit()
        vm.statusInit()
        vm.companyInit()
        vm.companyModalInit()
        vm.text = "123"
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

       this.addForm.status_name = this.status[0].name
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
        this.company = [{
            id: 1,
            name: '天天快递'
        }, {
            id: 2,
            name: '顺丰快递'
        }, {
            id: 3,
            name: '全峰快递'
        }, {
            id: 4,
            name: '京东'
        }]

        this.addForm.company_name = this.company[0].name
        this.addForm.company_id = this.company[0].id
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
}

Ctrl.$inject = [
    '$ionicModal',
    '$scope'
]

export default Ctrl