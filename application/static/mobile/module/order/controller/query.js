/**
 * Created by cloverstd on 16/5/18.
 */
import moment from 'moment'
import queryFilterTpl from '../tpl/query.filter.tpl'

class Ctrl {
    constructor(orderService, $rootScope, $ionicLoading, storeService, $ionicModal, $scope, ionicDatePicker, $timeout, $ionicScrollDelegate) {
        Object.assign(this, {
            orderService,
            $rootScope,
            $ionicLoading,
            storeService,
            $ionicModal,
            $scope,
            ionicDatePicker,
            $timeout,
            $ionicScrollDelegate,
        })
        this.init()
    }

    init() {
        // this.store = this.$rootScope.defaultStore
        this.order = {}
        this.search = {
            is_not_sign: true,
            is_typing: false
        }
        this.storeService.storeList(1, 1, 1)
            .then(data => {
                if (data.data.items) {
                    this.store = data.data.items[0]
                } else {
                    this.store = {}
                }

                this.companyInit()
                this.datePickerInit()
                this.orderInit()
                this.statusInit()
                this.filterModalInit()
            })
    }

    change() {
        if (!this.search.is_typing) {
            this.$ionicLoading.show({
                template: '<ion-spinner icon="bubbles"></ion-spinner>'
            }).then(function(){
                console.log("The loading indicator is now displayed");
            });
            this.$timeout(() => {
                this.$ionicScrollDelegate.scrollTop();
                this.order.list()
            }, 500)
        }
    }

    companyInit() {
        this.storeService.companyList(this.store.id, 1, 1, 1)
            .then(data => {
                this.company = data.data.items
            })
    }

    orderInit() {

        this.order.page = 1
        this.$ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner>'
        }).then(function(){
            console.log("The loading indicator is now displayed");
        });
        this.order.list = (cb) => {

            const params = {}
            params.start_at = moment(this.search.start_at).format('YYYY-MM-DD 00:00:00')
            if (this.search.end_at) {
                params.end_at = moment(this.search.end_at).format('YYYY-MM-DD 23:23:23')
            }
            if (this.search.key) {
                params.key = this.search.key
            }
            if (this.search.is_not_sign) {
                params.is_not_sign = true
            }
            if (this.search.company_id) {
                params.company_id = this.search.company_id
            }
            if (this.search.status_id == 0 || this.search.status_id) {
                params.status = this.search.status_id
            }
            this.orderService.orderList(this.store.id, this.order.page, 100, params)
                .then(data => {

                    if (cb) {
                        cb(data.data.items)
                    } else {
                        this.order.items = data.data.items
                    }
                    this.order.paginate = data.data.paginate
                    this.$ionicLoading.hide().then(() => {
                        console.log("The loading indicator is now hidden");
                    });
                    this.order.loadActive = false

                    // this.$scope.$broadcast('scroll.infiniteScrollComplete');
                })
        }

        this.order.list()

        this.order.load = () => {
            this.order.loadActive = true
            this.order.page = this.order.paginate.next_num
            this.order.list((items) => {
                items.map(item => {
                    this.order.items.push(item)
                })
            })
        }
        // this.$scope.$on('$stateChangeSuccess', () => {
        //     this.order.load()
        // });
        this.order.has_next = () => {
            if (this.order.paginate && this.order.paginate.has_next) {
                return true
            }
            return false
        }
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

    filterModalInit() {
        this.filterMoal = {}
        this.$ionicModal.fromTemplateUrl(queryFilterTpl, {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then((modal) => {
            console.log('modal init')
            this.filterMoal.instance = modal;
        })

        this.filterMoal.show = () => {
            this.filterMoal.instance.show()
        }

        this.filterMoal.hide = () => {
            this.filterMoal.instance.hide()
            this.change()
        }
    }

    datePickerInit() {
        this.datePicker = {}
        const now = moment()
        this.search.start_at_outer = now.format('YYYY-01-01')
        this.search.start_at = moment(this.search.start_at_outer)


        this.search.end_at_outer = now.format('YYYY-MM-DD')
        this.search.end_at = moment(this.search.end_at_outer)

        const ipObj1 = {
            callback: (val) => {  //Mandatory
                this.search.start_at = moment(new Date(val))
                this.search.start_at_outer = moment(new Date(val)).format('YYYY-MM-DD')
                console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            },
            // from: new Date(2012, 1, 1), //Optional
            to: now._d, //Optional
            inputDate: moment(now.format('YYYY-01-01 00:00:00'))._d,      //Optional
            mondayFirst: true,          //Optional
            // disableWeekdays: [0],       //Optional
            closeOnSelect: true,       //Optional
            templateType: 'popup'       //Optional
        }

        this.datePicker.open = () => {
            this.ionicDatePicker.openDatePicker(ipObj1);
        }

        this.datePicker.end = {}
        this.datePicker.end.open = () => {
            this.ionicDatePicker.openDatePicker({
                callback: (val) => {
                    this.search.end_at = moment(new Date(val))
                    this.search.end_at_outer = moment(new Date(val)).format('YYYY-MM-DD')
                },
                // from: new Date(2012, 1, 1), //Optional
                to: now._d, //Optional
                inputDate: now._d,      //Optional
                mondayFirst: true,          //Optional
                // disableWeekdays: [0],       //Optional
                closeOnSelect: true,       //Optional
                templateType: 'popup'       //Optional
            });
        }
    }
}

Ctrl.$inject = [
    'orderService',
    '$rootScope',
    '$ionicLoading',
    'storeService',
    '$ionicModal',
    '$scope',
    'ionicDatePicker',
    '$timeout',
    '$ionicScrollDelegate',
]

export default Ctrl