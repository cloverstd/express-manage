/**
 * Created by cloverstd on 16/5/19.
 */

import orderDetailOpTpl from '../tpl/order.detail.op.tpl'

class Ctrl {
    constructor ($stateParams, orderService, $ionicPopover, $scope, $ionicPopup) {
        Object.assign(this, {
            $stateParams,
            orderService,
            $ionicPopover,
            $scope,
            $ionicPopup,
        })

        this.init()
    }

    init() {
        this.store_id = this.$stateParams.store_id
        this.order_id = this.$stateParams.order_id
        console.log('order detail')
        this.orderInit()
        this.opInit()
    }

    orderInit() {
        this.orderService.orderGet(this.store_id, this.order_id)
            .then(data => {
                if (data.meta && data.meta.code == 0) {
                    this.order = data.data
                } else {
                    console.log('hi')
                }
            })
    }

    statusChange(status) {
        console.log(status)
        this.orderService.orderPut(this.store_id, this.order.id, {
            status: status
        }).then(data => {
            if (data.meta && data.meta.code == 0) {
                this.$ionicPopup.alert({
                    title: '成功',
                    template: '保存成功'
                })
                this.order.status = status
                this.order.updated_at = moment()
                this.opPopover.hide()
            } else {
                this.$ionicPopup.alert({
                    title: '错误',
                    template: '保存失败'
                })
            }
        }).catch(data => {
            this.$ionicPopup.alert({
                title: '错误',
                template: '保存失败'
            })
        })
    }

    opInit() {
        this.opPopover = {}
        this.$ionicPopover.fromTemplateUrl(orderDetailOpTpl, {
            scope: this.$scope
        }).then(popover => {
            this.opPopover.instance = popover
        })

        this.opPopover.show = ($event) => {
            this.opPopover.instance.show($event)
        }
        this.opPopover.hide = () => {
            this.opPopover.instance.hide()
        }
    }
}

Ctrl.$inject = [
    '$stateParams',
    'orderService',
    '$ionicPopover',
    '$scope',
    '$ionicPopup',
]

export default Ctrl