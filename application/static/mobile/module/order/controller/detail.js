/**
 * Created by cloverstd on 16/5/19.
 */

import orderDetailOpTpl from '../tpl/order.detail.op.tpl'

class Ctrl {
    constructor ($stateParams, orderService, $ionicPopover, $scope) {
        Object.assign(this, {
            $stateParams,
            orderService,
            $ionicPopover,
            $scope,
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
]

export default Ctrl