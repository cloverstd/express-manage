webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _register = __webpack_require__(6);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _main = __webpack_require__(7);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _order = __webpack_require__(10);
	
	var _order2 = _interopRequireDefault(_order);
	
	var _member = __webpack_require__(30);
	
	var _member2 = _interopRequireDefault(_member);
	
	var _store = __webpack_require__(35);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _mobileSegment = __webpack_require__(37);
	
	var _mobileSegment2 = _interopRequireDefault(_mobileSegment);
	
	var _auth = __webpack_require__(38);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	var _formatStatus = __webpack_require__(39);
	
	var _formatStatus2 = _interopRequireDefault(_formatStatus);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// service
	
	
	angular.module('express-manage', ['ionic', 'ionic-datepicker', _main2.default.name, _order2.default.name, _member2.default.name, _store2.default.name]).config(function (ionicDatePickerProvider) {
	    ionicDatePickerProvider.configDatePicker({
	        weeksList: ['天', '一', '二', '三', '四', '五', '六'],
	        monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	        setLabel: '选择',
	        todayLabel: '今天',
	        closeLabel: '关闭',
	        // showTodayButton: true,
	        closeOnSelect: true
	
	    });
	}).run(['$rootScope', '$state', 'authService', '$ionicPlatform', function ($rootScope, $state, authService, $ionicPlatform) {
	    $ionicPlatform.ready(function () {
	        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	        // for form inputs).
	        // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
	        // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
	        // useful especially with forms, though we would prefer giving the user a little more room
	        // to interact with the app.
	        if (window.cordova && window.cordova.plugins.Keyboard) {
	            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	            cordova.plugins.Keyboard.disableScroll(true);
	        }
	        if (window.StatusBar) {
	            // Set the statusbar to use the default style, tweak this to
	            // remove the status bar on iOS or change it to use white instead of dark colors.
	            StatusBar.styleDefault();
	        }
	    });
	    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
	        if (toState.authenticate && !authService.isAuthenticated()) {
	            $state.transitionTo("signIn");
	            event.preventDefault();
	        }
	    });
	}]).constant('AUTH_EVENTS', {
	    loginSuccess: 'auth.login.success',
	    loginFailed: 'auth.login.failed',
	    logoutSuccess: 'auth.logout.success',
	    sessionTimeout: 'auth.session.timeout',
	    notAuthenticated: 'auth.not.authenticated',
	    notAuthorized: 'auth.not.authorized'
	}).filter('formatOrderStatus', _formatStatus2.default);
	
	// filter
	
	
	// directive
	// import 'ionic'
	// import 'ionic-angular'
	
	(0, _register2.default)('express-manage').directive('mobile', _mobileSegment2.default).factory('authService', _auth2.default);

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
	 */
	function register(appName) {
	
	    var app = angular.module(appName);
	
	    return {
	        directive: directive,
	        controller: controller,
	        service: service,
	        provider: provider,
	        factory: factory
	    };
	
	    function directive(name, constructorFn) {
	
	        constructorFn = _normalizeConstructor(constructorFn);
	
	        if (!constructorFn.prototype.compile) {
	            // create an empty compile function if none was defined.
	            constructorFn.prototype.compile = function () {};
	        }
	
	        var originalCompileFn = _cloneFunction(constructorFn.prototype.compile);
	
	        // Decorate the compile method to automatically return the link method (if it exists)
	        // and bind it to the context of the constructor (so `this` works correctly).
	        // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
	        // returns `this.link` from within the compile function.
	        _override(constructorFn.prototype, 'compile', function () {
	            return function () {
	                originalCompileFn.apply(this, arguments);
	
	                if (constructorFn.prototype.link) {
	                    return constructorFn.prototype.link.bind(this);
	                }
	            };
	        });
	
	        var factoryArray = _createFactoryArray(constructorFn);
	
	        app.directive(name, factoryArray);
	        return this;
	    }
	
	    function controller(name, contructorFn) {
	        app.controller(name, contructorFn);
	        return this;
	    }
	
	    function service(name, contructorFn) {
	        app.service(name, contructorFn);
	        return this;
	    }
	
	    function provider(name, constructorFn) {
	        app.provider(name, constructorFn);
	        return this;
	    }
	
	    function factory(name, constructorFn) {
	        constructorFn = _normalizeConstructor(constructorFn);
	        var factoryArray = _createFactoryArray(constructorFn);
	        app.factory(name, factoryArray);
	        return this;
	    }
	
	    /**
	     * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
	     * we need to pull out the array of dependencies and add it as an $inject property of the
	     * actual constructor function.
	     * @param input
	     * @returns {*}
	     * @private
	     */
	    function _normalizeConstructor(input) {
	        var constructorFn;
	
	        if (input.constructor === Array) {
	            //
	            var injected = input.slice(0, input.length - 1);
	            constructorFn = input[input.length - 1];
	            constructorFn.$inject = injected;
	        } else {
	            constructorFn = input;
	        }
	
	        return constructorFn;
	    }
	
	    /**
	     * Convert a constructor function into a factory function which returns a new instance of that
	     * constructor, with the correct dependencies automatically injected as arguments.
	     *
	     * In order to inject the dependencies, they must be attached to the constructor function with the
	     * `$inject` property annotation.
	     *
	     * @param constructorFn
	     * @returns {Array.<T>}
	     * @private
	     */
	    function _createFactoryArray(constructorFn) {
	        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
	        var args = constructorFn.$inject || [];
	        var factoryArray = args.slice(); // create a copy of the array
	        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
	        // dependency, and the final item is the factory function itself.
	        factoryArray.push(function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }
	
	            //return new constructorFn(...args);
	            var instance = new (Function.prototype.bind.apply(constructorFn, [null].concat(args)))();
	            for (var key in instance) {
	                instance[key] = instance[key];
	            }
	            return instance;
	        });
	
	        return factoryArray;
	    }
	
	    /**
	     * Clone a function
	     * @param original
	     * @returns {Function}
	     */
	    function _cloneFunction(original) {
	        return function () {
	            return original.apply(this, arguments);
	        };
	    }
	
	    /**
	     * Override an object's method with a new one specified by `callback`.
	     * @param object
	     * @param methodName
	     * @param callback
	     */
	    function _override(object, methodName, callback) {
	        object[methodName] = callback(object[methodName]);
	    }
	}
	
	exports.default = register;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	        value: true
	});
	
	var _router = __webpack_require__(8);
	
	var _router2 = _interopRequireDefault(_router);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = angular.module('express-manage.main', []).config(_router2.default);
	// Router

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _tab = __webpack_require__(9);
	
	var _tab2 = _interopRequireDefault(_tab);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Router($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise('/order/add');
	
	    $stateProvider.state('main', {
	        url: '',
	        templateUrl: _tab2.default,
	        abstract: true,
	        controller: ['storeService', '$rootScope', function (storeService, $rootScope) {
	            // storeService.storeList(1, 1, 1)
	            //     .then(data => {
	            //         if (data.data.items) {
	            //             $rootScope.defaultStore = data.data.items[0]
	            //         } else {
	            //             $rootScope.defaultStore = {}
	            //         }
	            //         console.log($rootScope.defaultStore)
	            //     })
	        }]
	    });
	} /**
	   * Created by cloverstd on 16/5/18.
	   */
	
	Router.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	exports.default = Router;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var path = '/Users/cloverstd/Dropbox/WorkSpace/express-manage/application/static/mobile/module/main/tpl/tab.tpl';
	var html = "<ion-tabs class=\"tabs-icon-top tabs-positive\">\n    <ion-tab title=\"到件录单\" icon=\"ion-android-add\" ui-sref=\"main.order.add\">\n        <ion-nav-view name=\"order-add\"></ion-nav-view>\n    </ion-tab>\n\n    <ion-tab title=\"快递查询\" icon=\"ion-ios-search-strong\" ui-sref=\"main.order.query\">\n        <ion-nav-view name=\"order-query\"></ion-nav-view>\n    </ion-tab>\n\n    <!--<ion-tab title=\"快递历史\" icon=\"ion-clipboard\" ui-sref=\"main.order.history\">-->\n        <!--<ion-nav-view name=\"order-history\"></ion-nav-view>-->\n    <!--</ion-tab>-->\n\n</ion-tabs>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _register = __webpack_require__(6);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _router = __webpack_require__(11);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _add = __webpack_require__(16);
	
	var _add2 = _interopRequireDefault(_add);
	
	var _query = __webpack_require__(19);
	
	var _query2 = _interopRequireDefault(_query);
	
	var _detail = __webpack_require__(26);
	
	var _detail2 = _interopRequireDefault(_detail);
	
	var _services = __webpack_require__(28);
	
	var _services2 = _interopRequireDefault(_services);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by cloverstd on 16/5/18.
	 */
	
	exports.default = angular.module('express-manage.order', []).config(_router2.default).controller('AddCtrl', _add2.default).controller('QueryCtrl', _query2.default).controller('DetailCtrl', _detail2.default);
	
	// service
	
	(0, _register2.default)('express-manage.order').factory('orderService', _services2.default);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _add = __webpack_require__(12);
	
	var _add2 = _interopRequireDefault(_add);
	
	var _query = __webpack_require__(13);
	
	var _query2 = _interopRequireDefault(_query);
	
	var _history = __webpack_require__(14);
	
	var _history2 = _interopRequireDefault(_history);
	
	var _orderDetail = __webpack_require__(15);
	
	var _orderDetail2 = _interopRequireDefault(_orderDetail);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by cloverstd on 16/5/18.
	 */
	
	function Router($stateProvider) {
	    $stateProvider
	    // .state('order', {
	    //     url: '/order',
	    //     views: {
	    //         'order-add': {
	    //             template: '<ion-nav-view></ion-nav-view>'
	    //         },
	    //         'order-query': {
	    //             template: '<ion-nav-view></ion-nav-view>'
	    //         }
	    //     },
	    //     abstract: true
	    // })
	    .state('main.order', {
	        url: '/order',
	        abstract: true
	    }).state('main.order.add', {
	        url: '/add',
	        authenticate: true,
	        views: {
	            'order-add@main': {
	                templateUrl: _add2.default,
	                controller: 'AddCtrl as vm'
	            }
	        }
	    }).state('main.order.query', {
	        url: '/query',
	        authenticate: true,
	        views: {
	            'order-query@main': {
	                templateUrl: _query2.default,
	                controller: 'QueryCtrl as vm'
	            }
	        }
	    }).state('main.order.history', {
	        url: '/history',
	        authenticate: true,
	        views: {
	            'order-history@main': {
	
	                templateUrl: _history2.default,
	                controller: function controller() {
	                    console.log('order history');
	                }
	            }
	        }
	    }).state('main.order.detail', {
	        url: '/store/{store_id: int}/{order_id: int}',
	        authenticate: true,
	        views: {
	            'order-query@main': {
	                templateUrl: _orderDetail2.default,
	                controller: 'DetailCtrl as vm'
	            }
	        }
	    });
	}
	
	Router.$inject = ['$stateProvider'];
	
	exports.default = Router;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var path = '/Users/cloverstd/Dropbox/WorkSpace/express-manage/application/static/mobile/module/order/tpl/add.tpl';
	var html = "<ion-view cache-view=\"false\" view-title=\"到件录单\">\n\n    <ion-nav-buttons side=\"right\">\n          <button class=\"button\" ng-click=\"vm.orderSave()\">\n              保存\n          </button>\n    </ion-nav-buttons>\n\n    <ion-content>\n        <div class=\"list\">\n            <label class=\"item item-divider\">\n                收件人信息\n                <div class=\"user-search\">\n                    <button ng-if=\"!vm.addForm.user.id\" class=\"button button-small button-icon icon ion-search\" ng-click=\"vm.userSearchModal.open()\">\n                    </button>\n                    <button ng-if=\"vm.addForm.user.id\" ng-click=\"vm.clearUserSearch()\" class=\"button button-small button-icon icon ion-close-circled\"></button>\n                </div>\n            </label>\n\n            <label class=\"item item-input\">\n                <span class=\"input-label\">姓名</span>\n                <input type=\"text\" placeholder=\"姓名\" ng-model=\"vm.addForm.user.name\">\n            </label>\n            <label class=\"item item-input\">\n                <span class=\"input-label\">手机号码</span>\n                <input type=\"tel\" placeholder=\"手机号码\" ng-model=\"vm.addForm.user.mobile\">\n            </label>\n            <label class=\"item item-input\">\n                <textarea placeholder=\"地址\" ng-model=\"vm.addForm.user.address\"></textarea>\n            </label>\n            <label class=\"item item-input\">\n                <textarea placeholder=\"备注\" ng-model=\"vm.addForm.user.remark\"></textarea>\n            </label>\n            <label class=\"item item-divider\">\n                快递信息\n            </label>\n            <label class=\"item item-input\" ng-click=\"vm.statusModal.open()\">\n                <span class=\"input-label\">快递状态</span>\n\n                <span class=\"item-note\">\n                    {{vm.addForm.status_name}}\n                </span>\n            </label>\n            <label class=\"item item-input\" ng-click=\"vm.companyModal.open()\">\n                <div class=\"input-label\">\n                    快递公司\n                </div>\n                <span class=\"item-note\">\n                    {{vm.addForm.company_name}}\n                </span>\n            </label>\n\n            <div class=\"item item-input-inset\">\n                <label class=\"item-input-wrapper\">\n                    <input type=\"tel\" placeholder=\"快递编号\" ng-model=\"vm.addForm.no\">\n                </label>\n                <button class=\"button button-small button-icon icon ion-load-c\" ng-click=\"vm.noInit()\">\n                </button>\n            </div>\n            <!--<label class=\"item item-input-inset\">-->\n\n                <!--<label class=\"item-input-wrapper\">-->\n                    <!--<input type=\"number\" placeholder=\"快递单号\" ng-model=\"vm.addForm.number\">-->\n                <!--</label>-->\n                <!--<button class=\"button button-light\">-->\n                    <!--<i class=\"icon ion-qr-scanner\"></i>-->\n                <!--</button>-->\n            <!--</label>-->\n            <div class=\"item item-input-inset\">\n                <label class=\"item-input-wrapper\">\n                    <input type=\"text\" placeholder=\"快递单号\" ng-model=\"vm.addForm.number\">\n                </label>\n                <button class=\"button button-small button-icon icon ion-qr-scanner\" ng-click=\"\">\n                </button>\n            </div>\n            <label class=\"item item-input\">\n                <textarea placeholder=\"备注\" ng-model=\"vm.addForm.remark\"></textarea>\n            </label>\n        </div>\n    </ion-content>\n</ion-view>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 13 */
/***/ function(module, exports) {

	var path = '/Users/cloverstd/Dropbox/WorkSpace/express-manage/application/static/mobile/module/order/tpl/query.tpl';
	var html = "<ion-view cache-view=\"true\" view-title=\"快递查询\">\n    <ion-nav-buttons side=\"left\">\n        <button class=\"button\" ng-click=\"vm.filterMoal.show()\">\n          过滤\n        </button>\n    </ion-nav-buttons>\n    <ion-nav-buttons side=\"right\">\n        <button class=\"button\" ng-click=\"vm.change()\">\n          刷新\n        </button>\n    </ion-nav-buttons>\n    <ion-header-bar class=\"bar-light bar-subheader\">\n            <input type=\"search\"\n                   placeholder=\"请输入单号,姓名,手机号码\"\n                   ng-model=\"vm.search.key\"\n                   class=\"full-width\"\n                   ng-change=\"vm.change()\">\n        <button class=\"button icon ion-qr-scanner\"></button>\n    </ion-header-bar>\n    <ion-content>\n\n        <ion-list>\n            <ion-item ng-repeat=\"order in vm.order.items\" on-double-tap=\"vm.toggleOrderButton(order)\" ui-sref=\"main.order.detail({store_id: vm.store.id, order_id: order.id})\">\n\n                <span class=\"order-company\">{{order.company.name}}</span>\n                <span class=\"order-number\">{{order.number}}</span>\n                <div class=\"order-wrapper\">\n\n                    <span class=\"order-item badge badge-assertive\">{{order.no}}</span>\n                    <span class=\"order-item\" ng-bind-html=\"order.status|formatOrderStatus\">\n                    </span>\n                    <span class=\"order-item order-name\">{{order.user.name}}</span>\n                    <span class=\"order-item order-mobile\">\n                        <mobile number=\"{{order.user.mobile}}\"/>\n                    </span>\n                </div>\n            </ion-item>\n        </ion-list>\n        <button class=\"button button-full button-positive\" ng-if=\"vm.order.has_next()\" ng-click=\"vm.order.load()\">\n            <span ng-hide=\"vm.order.loadActive\">加载更多</span>\n            <ion-spinner icon=\"lines\" ng-show=\"vm.order.loadActive\"></ion-spinner>\n        </button>\n        <!--<ion-infinite-scroll-->\n            <!--on-infinite=\"vm.order.load()\"-->\n            <!--ng-if=\"vm.order.has_next()\"-->\n            <!--icon=\"ion-loading-c\"-->\n            <!--distance=\"10%\">-->\n        <!--</ion-infinite-scroll>-->\n    </ion-content>\n</ion-view>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 14 */
/***/ function(module, exports) {

	var path = '/Users/cloverstd/Dropbox/WorkSpace/express-manage/application/static/mobile/module/order/tpl/history.tpl';
	var html = "<ion-view cache-view=\"false\" view-title=\"快递历史\">\n    <ion-content>\n        快递历史\n    </ion-content>\n</ion-view>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 15 */
/***/ function(module, exports) {

	var path = '/Users/cloverstd/Dropbox/WorkSpace/express-manage/application/static/mobile/module/order/tpl/order.detail.tpl';
	var html = "<ion-view cache-view=\"false\" view-title=\"快递详情\" can-swipe-back=\"true\">\n    <ion-nav-buttons side=\"right\">\n        <button class=\"button\" ng-click=\"vm.opPopover.show($event)\">\n          操作\n        </button>\n    </ion-nav-buttons>\n    <ion-content>\n        <ul class=\"list\">\n            <div class=\"item item-divider\">\n                快递单\n            </div>\n            <li class=\"item\">\n                单号\n                <span class=\"item-note\">\n                    {{::vm.order.number}}\n                </span>\n            </li>\n            <li class=\"item\">\n                状态\n                <span class=\"item-note\">\n                    <span ng-bind-html=\"vm.order.status|formatOrderStatus\">\n                </span>\n            </li>\n            <li class=\"item\">\n                公司\n                <span class=\"item-note\">\n                    {{::vm.order.company.name}}\n                </span>\n            </li>\n            <li class=\"item\" ng-if=\"vm.order.remark\">\n                备注\n                <span class=\"item-note\">\n                    {{::vm.order.remark}}\n                </span>\n            </li>\n\n            <div class=\"item item-divider\">\n                收件人\n            </div>\n            <li class=\"item\">\n                姓名\n                <span class=\"item-note\">\n                    {{::vm.order.user.name}}\n                </span>\n            </li>\n            <li class=\"item\">\n                号码\n                <span class=\"item-note\">\n                    {{::vm.order.user.mobile}}\n                </span>\n            </li>\n            <li class=\"item\" ng-if=\"vm.order.remark\">\n                备注\n                <span class=\"item-note\">\n                    {{::vm.order.user.remark}}\n                </span>\n            </li>\n        </ul>\n    </ion-content>\n</ion-view>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by cloverstd on 16/5/18.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _addFormStatusRadio = __webpack_require__(17);
	
	var _addFormStatusRadio2 = _interopRequireDefault(_addFormStatusRadio);
	
	var _addFormCompanyRadio = __webpack_require__(18);
	
	var _addFormCompanyRadio2 = _interopRequireDefault(_addFormCompanyRadio);
	
	var _userSearchModal = __webpack_require__(53);
	
	var _userSearchModal2 = _interopRequireDefault(_userSearchModal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ctrl = function () {
	    function Ctrl($ionicModal, $scope, orderService, $ionicLoading, $stateParams, storeService, $ionicScrollDelegate, $ionicPopup) {
	        _classCallCheck(this, Ctrl);
	
	        Object.assign(this, {
	            $ionicModal: $ionicModal,
	            $scope: $scope,
	            orderService: orderService,
	            $ionicLoading: $ionicLoading,
	            $stateParams: $stateParams,
	            storeService: storeService,
	            $ionicScrollDelegate: $ionicScrollDelegate,
	            $ionicPopup: $ionicPopup
	        });
	
	        this.init();
	        console.log('order add');
	    }
	
	    _createClass(Ctrl, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;
	
	            var vm = this;
	            vm.addForm = {
	                status: 0
	            };
	            this.storeService.storeList(1, 1, 1).then(function (data) {
	                if (data.data.items) {
	                    _this.store = data.data.items[0];
	                } else {
	                    _this.store = {};
	                }
	
	                vm.statusModalInit();
	                vm.statusInit();
	                vm.companyInit();
	                vm.companyModalInit();
	                vm.userSearchModalInit();
	                vm.noInit();
	            });
	        }
	    }, {
	        key: 'statusInit',
	        value: function statusInit() {
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
	            }];
	
	            this.addForm.status_name = this.statusData[0].name;
	        }
	    }, {
	        key: 'statusModalInit',
	        value: function statusModalInit() {
	            var _this2 = this;
	
	            this.statusModal = {};
	            this.$ionicModal.fromTemplateUrl(_addFormStatusRadio2.default, {
	                scope: this.$scope,
	                animation: 'slide-in-up'
	            }).then(function (modal) {
	                _this2.statusModal.instance = modal;
	            });
	            this.statusModal.open = function () {
	                _this2.statusModal.instance.show();
	            };
	
	            this.statusModal.close = function () {
	                _this2.statusModal.instance.hide();
	            };
	
	            this.statusModal.choice = function (status) {
	                _this2.addForm.status_name = status.name;
	                _this2.statusModal.close();
	            };
	        }
	    }, {
	        key: 'companyInit',
	        value: function companyInit() {
	            var _this3 = this;
	
	            this.storeService.companyList(this.store.id, 1, 1, 'all').then(function (data) {
	                _this3.company = data.data.items;
	                if (_this3.company) {
	                    _this3.addForm.company_name = _this3.company[0].name;
	                    _this3.addForm.company_id = _this3.company[0].id;
	                }
	            });
	        }
	    }, {
	        key: 'companyModalInit',
	        value: function companyModalInit() {
	            var _this4 = this;
	
	            this.companyModal = {};
	            this.$ionicModal.fromTemplateUrl(_addFormCompanyRadio2.default, {
	                scope: this.$scope,
	                animation: 'slide-in-up'
	            }).then(function (modal) {
	                _this4.companyModal.instance = modal;
	            });
	            this.companyModal.open = function () {
	                _this4.companyModal.instance.show();
	            };
	
	            this.companyModal.close = function () {
	                _this4.companyModal.instance.hide();
	            };
	
	            this.companyModal.choice = function (company) {
	                _this4.addForm.company_name = company.name;
	                _this4.companyModal.close();
	            };
	        }
	    }, {
	        key: 'userSearchModalInit',
	        value: function userSearchModalInit() {
	            var _this5 = this;
	
	            this.userSearchModal = {};
	            this.$ionicModal.fromTemplateUrl(_userSearchModal2.default, {
	                scope: this.$scope,
	                animation: 'slide-in-up'
	            }).then(function (modal) {
	                _this5.userSearchModal.instance = modal;
	            });
	            this.userSearchModal.open = function () {
	                _this5.userSearchModal.instance.show();
	            };
	
	            this.userSearchModal.close = function () {
	                _this5.userSearchModal.instance.hide();
	            };
	
	            this.userSearch = {
	                page: 1,
	                per_page: 10,
	                key: null,
	                type: 'mobile'
	            };
	
	            this.userSearchModal.search = function (cb) {
	                var search = {};
	                if (_this5.userSearch.mobile) {
	                    search.mobile = _this5.userSearch.key;
	                } else {
	                    search.name = _this5.userSearch.key;
	                }
	                _this5.userSearch.searching = true;
	                _this5.orderService.userSearch(_this5.store.id, _this5.userSearch.page, _this5.userSearch.per_page, search).then(function (data) {
	                    if (cb) {
	                        cb(data.data.items);
	                    } else {
	                        _this5.userSearchModal.items = data.data.items;
	                    }
	
	                    _this5.userSearchModal.paginate = data.data.paginate;
	                    _this5.userSearch.searching = false;
	                });
	            };
	
	            this.userSearchModal.has_next = function () {
	                if (_this5.userSearchModal.paginate) {
	                    if (_this5.userSearchModal.paginate.has_next) {
	                        return true;
	                    }
	                }
	                return false;
	            };
	
	            this.userSearchModal.loadMore = function () {
	                _this5.userSearch.page = _this5.userSearchModal.paginate.next_num;
	                _this5.userSearchModal.search(function (items) {
	                    items.map(function (item) {
	                        _this5.userSearchModal.items.push(item);
	                    });
	                    _this5.$ionicScrollDelegate.scrollBottom();
	                });
	            };
	
	            this.userSearchModal.choice = function (user, user_name) {
	                _this5.addForm.user = {
	                    id: user.id,
	                    user_name_id: user_name.id,
	                    name: user_name.name,
	                    mobile: user.mobile
	                };
	                console.log(_this5.addForm);
	                _this5.userSearchModal.close();
	            };
	        }
	    }, {
	        key: 'orderSave',
	        value: function orderSave() {
	            var _this6 = this;
	
	            this.orderService.orderPost(this.store.id, this.addForm).then(function (data) {
	                if (data.meta && data.meta.code == 0) {
	                    _this6.addForm = {
	                        status: _this6.addForm.status,
	                        company_id: _this6.addForm.company_id
	                    };
	                    _this6.noInit();
	                } else {
	                    console.log(data);
	                    _this6.$ionicPopup.alert({
	                        title: '错误',
	                        template: '发生了错误'
	                    });
	                }
	            }).catch(function (data) {
	                _this6.$ionicPopup.alert({
	                    title: '错误',
	                    template: '发生了错误'
	                });
	            });
	        }
	    }, {
	        key: 'noInit',
	        value: function noInit() {
	            var _this7 = this;
	
	            console.log('hi');
	            this.orderService.orderNo(this.store.id).then(function (data) {
	                _this7.no = data.data;
	                _this7.addForm.no = _this7.no;
	            });
	        }
	    }, {
	        key: 'clearUserSearch',
	        value: function clearUserSearch() {
	            this.addForm.user = {};
	        }
	    }]);
	
	    return Ctrl;
	}();
	
	Ctrl.$inject = ['$ionicModal', '$scope', 'orderService', '$ionicLoading', '$stateParams', 'storeService', '$ionicScrollDelegate', '$ionicPopup'];
	
	exports.default = Ctrl;

/***/ },
/* 17 */
/***/ function(module, exports) {

	var path = '/Users/cloverstd/Dropbox/WorkSpace/express-manage/application/static/mobile/module/order/tpl/add.form.status.radio.tpl';
	var html = "<ion-modal-view>\n    <ion-header-bar class=\"bar bar-header bar-positive\">\n        <h1 class=\"title\">选择快递状态</h1>\n        <button class=\"button button-clear button-primary\" ng-click=\"vm.statusModal.close()\">取消</button>\n    </ion-header-bar>\n    <ion-content class=\"padding\">\n        <ion-list>\n            <ion-radio ng-repeat=\"status in ::vm.statusData\" ng-model=\"vm.addForm.status\" ng-value=\"status.id\" ng-click=\"vm.statusModal.choice(status)\">{{status.name}}</ion-radio>\n        </ion-list>\n    </ion-content>\n</ion-modal-view>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 18 */
/***/ function(module, exports) {

	var path = '/Users/cloverstd/Dropbox/WorkSpace/express-manage/application/static/mobile/module/order/tpl/add.form.company.radio.tpl';
	var html = "<ion-modal-view>\n    <ion-header-bar class=\"bar bar-header bar-positive\">\n        <h1 class=\"title\">选择快递公司</h1>\n        <button class=\"button button-clear button-primary\" ng-click=\"vm.companyModal.close()\">取消</button>\n    </ion-header-bar>\n    <ion-content class=\"padding\">\n        <ion-list>\n            <ion-radio ng-repeat=\"company in ::vm.company\" ng-model=\"vm.addForm.company_id\" ng-value=\"company.id\" ng-click=\"vm.companyModal.choice(company)\">{{company.name}}</ion-radio>\n        </ion-list>\n    </ion-content>\n</ion-modal-view>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by cloverstd on 16/5/18.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _moment = __webpack_require__(20);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _queryFilter = __webpack_require__(25);
	
	var _queryFilter2 = _interopRequireDefault(_queryFilter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ctrl = function () {
	    function Ctrl(orderService, $rootScope, $ionicLoading, storeService, $ionicModal, $scope, ionicDatePicker, $timeout, $ionicScrollDelegate) {
	        _classCallCheck(this, Ctrl);
	
	        Object.assign(this, {
	            orderService: orderService,
	            $rootScope: $rootScope,
	            $ionicLoading: $ionicLoading,
	            storeService: storeService,
	            $ionicModal: $ionicModal,
	            $scope: $scope,
	            ionicDatePicker: ionicDatePicker,
	            $timeout: $timeout,
	            $ionicScrollDelegate: $ionicScrollDelegate
	        });
	        this.init();
	    }
	
	    _createClass(Ctrl, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;
	
	            // this.store = this.$rootScope.defaultStore
	            this.order = {};
	            this.search = {
	                is_not_sign: true,
	                is_typing: false
	            };
	            this.storeService.storeList(1, 1, 1).then(function (data) {
	                if (data.data.items) {
	                    _this.store = data.data.items[0];
	                } else {
	                    _this.store = {};
	                }
	
	                _this.companyInit();
	                _this.datePickerInit();
	                _this.orderInit();
	                _this.statusInit();
	                _this.filterModalInit();
	            });
	        }
	    }, {
	        key: 'change',
	        value: function change() {
	            var _this2 = this;
	
	            if (!this.search.is_typing) {
	                this.$ionicLoading.show({
	                    template: '<ion-spinner icon="bubbles"></ion-spinner>'
	                }).then(function () {
	                    console.log("The loading indicator is now displayed");
	                });
	                this.$timeout(function () {
	                    _this2.$ionicScrollDelegate.scrollTop();
	                    _this2.order.list();
	                }, 500);
	            }
	        }
	    }, {
	        key: 'companyInit',
	        value: function companyInit() {
	            var _this3 = this;
	
	            this.storeService.companyList(this.store.id, 1, 1, 1).then(function (data) {
	                _this3.company = data.data.items;
	            });
	        }
	    }, {
	        key: 'orderInit',
	        value: function orderInit() {
	            var _this4 = this;
	
	            this.order.page = 1;
	            this.$ionicLoading.show({
	                template: '<ion-spinner icon="bubbles"></ion-spinner>'
	            }).then(function () {
	                console.log("The loading indicator is now displayed");
	            });
	            this.order.list = function (cb) {
	
	                var params = {};
	                params.start_at = (0, _moment2.default)(_this4.search.start_at).format('YYYY-MM-DD 00:00:00');
	                if (_this4.search.end_at) {
	                    params.end_at = (0, _moment2.default)(_this4.search.end_at).format('YYYY-MM-DD 23:23:23');
	                }
	                if (_this4.search.key) {
	                    params.key = _this4.search.key;
	                }
	                if (_this4.search.is_not_sign) {
	                    params.is_not_sign = true;
	                }
	                if (_this4.search.company_id) {
	                    params.company_id = _this4.search.company_id;
	                }
	                if (_this4.search.status_id == 0 || _this4.search.status_id) {
	                    params.status = _this4.search.status_id;
	                }
	                _this4.orderService.orderList(_this4.store.id, _this4.order.page, 100, params).then(function (data) {
	
	                    if (cb) {
	                        cb(data.data.items);
	                    } else {
	                        _this4.order.items = data.data.items;
	                    }
	                    _this4.order.paginate = data.data.paginate;
	                    _this4.$ionicLoading.hide().then(function () {
	                        console.log("The loading indicator is now hidden");
	                    });
	                    _this4.order.loadActive = false;
	
	                    // this.$scope.$broadcast('scroll.infiniteScrollComplete');
	                });
	            };
	
	            this.order.list();
	
	            this.order.load = function () {
	                _this4.order.loadActive = true;
	                _this4.order.page = _this4.order.paginate.next_num;
	                _this4.order.list(function (items) {
	                    items.map(function (item) {
	                        _this4.order.items.push(item);
	                    });
	                });
	            };
	            // this.$scope.$on('$stateChangeSuccess', () => {
	            //     this.order.load()
	            // });
	            this.order.has_next = function () {
	                if (_this4.order.paginate && _this4.order.paginate.has_next) {
	                    return true;
	                }
	                return false;
	            };
	        }
	    }, {
	        key: 'statusInit',
	        value: function statusInit() {
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
	            }];
	        }
	    }, {
	        key: 'filterModalInit',
	        value: function filterModalInit() {
	            var _this5 = this;
	
	            this.filterMoal = {};
	            this.$ionicModal.fromTemplateUrl(_queryFilter2.default, {
	                scope: this.$scope,
	                animation: 'slide-in-up'
	            }).then(function (modal) {
	                console.log('modal init');
	                _this5.filterMoal.instance = modal;
	            });
	
	            this.filterMoal.show = function () {
	                _this5.filterMoal.instance.show();
	            };
	
	            this.filterMoal.hide = function () {
	                _this5.filterMoal.instance.hide();
	                _this5.change();
	            };
	        }
	    }, {
	        key: 'datePickerInit',
	        value: function datePickerInit() {
	            var _this6 = this;
	
	            this.datePicker = {};
	            var now = (0, _moment2.default)();
	            this.search.start_at_outer = now.format('YYYY-01-01');
	            this.search.start_at = (0, _moment2.default)(this.search.start_at_outer);
	
	            this.search.end_at_outer = now.format('YYYY-MM-DD');
	            this.search.end_at = (0, _moment2.default)(this.search.end_at_outer);
	
	            var ipObj1 = {
	                callback: function callback(val) {
	                    //Mandatory
	                    _this6.search.start_at = (0, _moment2.default)(new Date(val));
	                    _this6.search.start_at_outer = (0, _moment2.default)(new Date(val)).format('YYYY-MM-DD');
	                    console.log('Return value from the datepicker popup is : ' + val, new Date(val));
	                },
	                // from: new Date(2012, 1, 1), //Optional
	                to: now._d, //Optional
	                inputDate: (0, _moment2.default)(now.format('YYYY-01-01 00:00:00'))._d, //Optional
	                mondayFirst: true, //Optional
	                // disableWeekdays: [0],       //Optional
	                closeOnSelect: true, //Optional
	                templateType: 'popup' //Optional
	            };
	
	            this.datePicker.open = function () {
	                _this6.ionicDatePicker.openDatePicker(ipObj1);
	            };
	
	            this.datePicker.end = {};
	            this.datePicker.end.open = function () {
	                _this6.ionicDatePicker.openDatePicker({
	                    callback: function callback(val) {
	                        _this6.search.end_at = (0, _moment2.default)(new Date(val));
	                        _this6.search.end_at_outer = (0, _moment2.default)(new Date(val)).format('YYYY-MM-DD');
	                    },
	                    // from: new Date(2012, 1, 1), //Optional
	                    to: now._d, //Optional
	                    inputDate: now._d, //Optional
	                    mondayFirst: true, //Optional
	                    // disableWeekdays: [0],       //Optional
	                    closeOnSelect: true, //Optional
	                    templateType: 'popup' //Optional
	                });
	            };
	        }
	    }]);
	
	    return Ctrl;
	}();
	
	Ctrl.$inject = ['orderService', '$rootScope', '$ionicLoading', 'storeService', '$ionicModal', '$scope', 'ionicDatePicker', '$timeout', '$ionicScrollDelegate'];
	
	exports.default = Ctrl;

/***/ },
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ function(module, exports) {

	var path = '/Users/cloverstd/Dropbox/WorkSpace/express-manage/application/static/mobile/module/order/tpl/query.filter.tpl';
	var html = "<ion-modal-view>\n    <ion-header-bar class=\"bar bar-header bar-positive\">\n        <h1 class=\"title\">过滤条件</h1>\n        <button class=\"button\" ng-click=\"vm.filterMoal.hide()\">确认</button>\n    </ion-header-bar>\n    <ion-content class=\"padding\">\n        <div class=\"list\">\n            <a class=\"item\" ng-click=\"vm.datePicker.open()\">\n                开始日期\n                <span class=\"item-note\">\n                    {{vm.search.start_at_outer}}\n                </span>\n            </a>\n            <a class=\"item\" ng-click=\"vm.datePicker.end.open()\">\n                结束日期\n                <span class=\"item-note\">\n                    {{vm.search.end_at_outer}}\n                </span>\n            </a>\n            <ion-toggle ng-model=\"vm.search.is_not_sign\"\n                        ng-checked=\"vm.search.is_not_sign\"\n            >\n                待签收\n            </ion-toggle>\n            <label class=\"item item-input item-select\">\n                <div class=\"input-label\">\n                    快递公司\n                </div>\n                <select ng-model=\"vm.search.company_id\" ng-options=\"company.id as company.name for company in ::vm.company\">\n                    <option value>选择快递公司</option>\n                </select>\n            </label>\n            <label class=\"item item-input item-select\" ng-if=\"!vm.search.is_not_sign\">\n                <div class=\"input-label\">\n                    快递状态\n                </div>\n                <select ng-model=\"vm.search.status_id\" ng-options=\"status.id as status.name for status in ::vm.status\">\n                    <option value>选择快递状态</option>\n                </select>\n            </label>\n            <div class=\"item\" ng-if=\"false\">\n                <pre ng-bind=\"vm.search | json\"></pre>\n            </div>\n        </div>\n    </ion-content>\n</ion-modal-view>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by cloverstd on 16/5/19.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _orderDetailOp = __webpack_require__(27);
	
	var _orderDetailOp2 = _interopRequireDefault(_orderDetailOp);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ctrl = function () {
	    function Ctrl($stateParams, orderService, $ionicPopover, $scope) {
	        _classCallCheck(this, Ctrl);
	
	        Object.assign(this, {
	            $stateParams: $stateParams,
	            orderService: orderService,
	            $ionicPopover: $ionicPopover,
	            $scope: $scope
	        });
	
	        this.init();
	    }
	
	    _createClass(Ctrl, [{
	        key: 'init',
	        value: function init() {
	            this.store_id = this.$stateParams.store_id;
	            this.order_id = this.$stateParams.order_id;
	            console.log('order detail');
	            this.orderInit();
	            this.opInit();
	        }
	    }, {
	        key: 'orderInit',
	        value: function orderInit() {
	            var _this = this;
	
	            this.orderService.orderGet(this.store_id, this.order_id).then(function (data) {
	                if (data.meta && data.meta.code == 0) {
	                    _this.order = data.data;
	                } else {
	                    console.log('hi');
	                }
	            });
	        }
	    }, {
	        key: 'opInit',
	        value: function opInit() {
	            var _this2 = this;
	
	            this.opPopover = {};
	            this.$ionicPopover.fromTemplateUrl(_orderDetailOp2.default, {
	                scope: this.$scope
	            }).then(function (popover) {
	                _this2.opPopover.instance = popover;
	            });
	
	            this.opPopover.show = function ($event) {
	                _this2.opPopover.instance.show($event);
	            };
	            this.opPopover.hide = function () {
	                _this2.opPopover.instance.hide();
	            };
	        }
	    }]);
	
	    return Ctrl;
	}();
	
	Ctrl.$inject = ['$stateParams', 'orderService', '$ionicPopover', '$scope'];
	
	exports.default = Ctrl;

/***/ },
/* 27 */
/***/ function(module, exports) {

	var path = '/Users/cloverstd/Dropbox/WorkSpace/express-manage/application/static/mobile/module/order/tpl/order.detail.op.tpl';
	var html = "<ion-popover-view>\n    <!--<ion-header-bar>-->\n        <!--<h1 class=\"title\">快递操作</h1>-->\n    <!--</ion-header-bar>-->\n    <ion-content>\n        <button class=\"button button-block button-calm\">\n              签收\n        </button>\n        <button class=\"button button-block button-positive\">\n              通知\n        </button>\n        <button class=\"button button-block button-assertive\">\n              拒收\n        </button>\n    </ion-content>\n</ion-popover-view>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _http = __webpack_require__(29);
	
	var _http2 = _interopRequireDefault(_http);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by cloverstd on 16/5/15.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Order = function (_HTTPService) {
	    _inherits(Order, _HTTPService);
	
	    function Order($http, $q) {
	        _classCallCheck(this, Order);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Order).call(this, $http, $q));
	
	        _this.url = {
	            order: '/api/member/store'
	        };
	        return _this;
	    }
	
	    _createClass(Order, [{
	        key: 'orderList',
	        value: function orderList(store_id, page, per_page, params) {
	            params.page = page || 1;
	            params.per_page = per_page || 10;
	            return this.get(this.url.order + '/' + store_id + '/order', params);
	        }
	    }, {
	        key: 'orderPost',
	        value: function orderPost(store_id, data) {
	            return this.post(this.url.order + '/' + store_id + '/order', data);
	        }
	    }, {
	        key: 'orderGet',
	        value: function orderGet(store_id, order_id) {
	            return this.get(this.url.order + '/' + store_id + '/order/' + order_id);
	        }
	    }, {
	        key: 'orderDelete',
	        value: function orderDelete(store_id, order_id) {
	            return this.del(this.url.order + '/' + store_id + '/order/' + order_id);
	        }
	    }, {
	        key: 'orderPut',
	        value: function orderPut(store_id, order_id, data) {
	            return this.put(this.url.order + '/' + store_id + '/order/' + order_id, data);
	        }
	    }, {
	        key: 'orderNo',
	        value: function orderNo(store_id) {
	            return this.get(this.url.order + '/' + store_id + '/order/no');
	        }
	
	        // user
	
	    }, {
	        key: 'userSearch',
	        value: function userSearch(store_id, page, per_page, params) {
	            params.page = page || 1;
	            params.per_page = per_page || 10;
	            return this.get('/api/member/store/' + store_id + '/user', params);
	        }
	    }, {
	        key: 'orderStatistics',
	        value: function orderStatistics(store_id, params) {
	            return this.get('/api/member/store/' + store_id + '/order/statistics', params);
	        }
	    }]);
	
	    return Order;
	}(_http2.default);
	
	exports.default = Order;

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by cloverstd on 16/5/14.
	 */
	
	var HTTPService = function () {
	    function HTTPService($http, $q) {
	        _classCallCheck(this, HTTPService);
	
	        this.$http = $http;
	        this.$q = $q;
	    }
	
	    _createClass(HTTPService, [{
	        key: 'http',
	        value: function http(options) {
	            if (localStorage.getItem('mobile-jwt')) {
	                var token = localStorage.getItem('mobile-jwt');
	                if (options.headers) {
	                    options.headers.Authorization = 'JWT ' + token;
	                } else {
	                    options.headers = {
	                        Authorization: 'JWT ' + token
	                    };
	                }
	            }
	            var deferred = this.$q.defer();
	            this.$http(options).success(function (data, status, headers, config) {
	                deferred.resolve(data);
	            }).error(function (data, status, headers, config) {
	                deferred.reject(data, status);
	            });
	            return deferred.promise;
	        }
	    }, {
	        key: 'get',
	        value: function get(path, params) {
	            params = params || {};
	            var headers = {};
	            if (path.startsWith('/')) {
	                path = path.slice(1);
	            }
	            var url = window.config.baseUrl + '/' + path;
	            return this.http({
	                headers: headers,
	                method: 'GET',
	                url: url,
	                params: params,
	                paramSerializer: '$httpParamSerializerJQLike'
	            });
	        }
	    }, {
	        key: 'post',
	        value: function post(path, data, params) {
	            params = params || {};
	            var headers = {
	                'Content-Type': 'application/json'
	            };
	            if (path.startsWith('/')) {
	                path = path.slice(1);
	            }
	            var url = window.config.baseUrl + '/' + path;
	
	            return this.http({
	                headers: headers,
	                method: 'POST',
	                url: url,
	                params: params,
	                data: data,
	                paramSerializer: '$httpParamSerializerJQLike'
	            });
	        }
	    }, {
	        key: 'put',
	        value: function put(path, data, params) {
	            params = params || {};
	            var headers = {
	                'Content-Type': 'application/json'
	            };
	            if (path.startsWith('/')) {
	                path = path.slice(1);
	            }
	
	            var url = window.config.baseUrl + '/' + path;
	
	            return this.http({
	                headers: headers,
	                method: 'PUT',
	                url: url,
	                params: params,
	                data: data,
	                paramSerializer: '$httpParamSerializerJQLike'
	            });
	        }
	    }, {
	        key: 'del',
	        value: function del(path) {
	            var params = params || {};
	            var headers = {
	                'Content-Type': 'application/json'
	            };
	            if (path.startsWith('/')) {
	                path = path.slice(1);
	            }
	            var url = window.config.baseUrl + '/' + path;
	
	            return this.http({
	                headers: headers,
	                method: 'DELETE',
	                url: url,
	                params: params,
	                paramSerializer: '$httpParamSerializerJQLike'
	            });
	        }
	    }]);
	
	    return HTTPService;
	}();
	
	HTTPService.$inject = ['$http', '$q'];
	
	exports.default = HTTPService;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _register = __webpack_require__(6);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _router = __webpack_require__(31);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _sign = __webpack_require__(33);
	
	var _sign2 = _interopRequireDefault(_sign);
	
	var _service = __webpack_require__(34);
	
	var _service2 = _interopRequireDefault(_service);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by cloverstd on 16/5/18.
	 */
	
	exports.default = angular.module('express-manage.member', []).config(_router2.default).controller('SignInCtrl', _sign2.default);
	
	// service
	
	(0, _register2.default)('express-manage.member').factory('memberService', _service2.default);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _signIn = __webpack_require__(32);
	
	var _signIn2 = _interopRequireDefault(_signIn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Router($stateProvider) {
	    $stateProvider.state('main.member', {
	        url: '/member',
	        abstract: true
	    }).state('signIn', {
	        url: '/member/sign/in',
	        templateUrl: _signIn2.default,
	        controller: 'SignInCtrl as vm'
	    });
	} /**
	   * Created by cloverstd on 16/5/18.
	   */
	
	Router.$inject = ['$stateProvider'];
	
	exports.default = Router;

/***/ },
/* 32 */
/***/ function(module, exports) {

	var path = '/Users/cloverstd/Dropbox/WorkSpace/express-manage/application/static/mobile/module/member/tpl/sign.in.tpl';
	var html = "<ion-view view-title=\"请先登录\" name=\"login-view\">\n  <ion-content class=\"padding\">\n      <div class=\"list list-inset\">\n          <label class=\"item item-input\">\n              <input type=\"text\" placeholder=\"用户名\" ng-model=\"vm.signInForm.username\">\n          </label>\n          <label class=\"item item-input\">\n              <input type=\"password\" placeholder=\"密码\" ng-model=\"vm.signInForm.password\">\n          </label>\n      </div>\n      <button class=\"button button-block button-positive\" ng-click=\"vm.signIn(vm.signInForm)\">\n          <span ng-hide=\"vm.loading\">登录</span>\n          <ion-spinner icon=\"lines\" ng-show=\"vm.loading\"></ion-spinner>\n      </button>\n  </ion-content>\n</ion-view>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by cloverstd on 16/5/18.
	 */
	
	var Ctrl = function () {
	    function Ctrl($state, memberService, $rootScope, authService, AUTH_EVENTS, $ionicPopup) {
	        _classCallCheck(this, Ctrl);
	
	        Object.assign(this, {
	            $state: $state,
	            memberService: memberService,
	            $rootScope: $rootScope,
	            authService: authService,
	            AUTH_EVENTS: AUTH_EVENTS,
	            $ionicPopup: $ionicPopup
	        });
	
	        this.init();
	    }
	
	    _createClass(Ctrl, [{
	        key: 'init',
	        value: function init() {
	            this.signInForm = {};
	        }
	    }, {
	        key: 'signIn',
	        value: function signIn(data) {
	            var _this = this;
	
	            var vm = this;
	            vm.loading = true;
	            vm.memberService.signIn(data.username, data.password).then(function (data) {
	                console.log(data);
	                if (data.access_token) {
	                    vm.authService.signIn(data.access_token);
	                    vm.$rootScope.$broadcast(vm.AUTH_EVENTS.loginSuccess);
	                    vm.$state.go('main.order.query');
	                } else {
	                    vm.$rootScope.$broadcast(vm.AUTH_EVENTS.loginFailed);
	                    _this.showAlert('登录失败');
	                }
	
	                vm.loading = false;
	            }).catch(function (data) {
	                console.error(data);
	                // vm.alertService.danger('登录失败')
	                _this.showAlert('登录失败');
	                vm.$rootScope.$broadcast(vm.AUTH_EVENTS.loginFailed);
	                vm.loading = false;
	            });
	        }
	    }, {
	        key: 'showAlert',
	        value: function showAlert(message) {
	            var alertPopup = this.$ionicPopup.alert({
	                title: '发生错误了',
	                template: message
	            });
	
	            alertPopup.then(function (res) {
	                console.log('Thank you for not eating my delicious ice cream cone');
	            });
	        }
	    }]);
	
	    return Ctrl;
	}();
	
	Ctrl.$inject = ['$state', 'memberService', '$rootScope', 'authService', 'AUTH_EVENTS', '$ionicPopup'];
	
	exports.default = Ctrl;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _http = __webpack_require__(29);
	
	var _http2 = _interopRequireDefault(_http);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by cloverstd on 16/5/18.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Member = function (_HTTPService) {
	    _inherits(Member, _HTTPService);
	
	    function Member($http, $q) {
	        _classCallCheck(this, Member);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Member).call(this, $http, $q));
	
	        _this.url = {
	            signIn: '/api/member/auth',
	            member: 'api/member'
	        };
	        return _this;
	    }
	
	    _createClass(Member, [{
	        key: 'signIn',
	        value: function signIn(username, password) {
	            return this.post(this.url.signIn, {
	                username: username,
	                password: password
	            });
	        }
	    }, {
	        key: 'info',
	        value: function info() {
	            return this.get(this.url.member);
	        }
	    }, {
	        key: 'memberPut',
	        value: function memberPut(params) {
	            return this.put(this.url.member, params);
	        }
	    }]);
	
	    return Member;
	}(_http2.default);
	
	exports.default = Member;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _register = __webpack_require__(6);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _services = __webpack_require__(36);
	
	var _services2 = _interopRequireDefault(_services);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by cloverstd on 16/5/18.
	 */
	
	exports.default = angular.module('express-manage.store', []);
	// .config(Router)
	
	// import Router from './router'
	
	// service
	
	(0, _register2.default)('express-manage.order').factory('storeService', _services2.default);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _http = __webpack_require__(29);
	
	var _http2 = _interopRequireDefault(_http);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by cloverstd on 16/5/15.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Store = function (_HTTPService) {
	    _inherits(Store, _HTTPService);
	
	    function Store($http, $q) {
	        _classCallCheck(this, Store);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Store).call(this, $http, $q));
	
	        _this.url = {
	            store: '/api/member/store'
	        };
	        return _this;
	    }
	
	    _createClass(Store, [{
	        key: 'storeList',
	        value: function storeList(page, per_page, is_default) {
	            var params = {
	                page: page || 1,
	                per_page: per_page || 10
	            };
	            if (is_default == 0 || is_default) {
	                params.default = is_default;
	            }
	            return this.get(this.url.store, params);
	        }
	    }, {
	        key: 'storePost',
	        value: function storePost(data) {
	            return this.post(this.url.store, data);
	        }
	    }, {
	        key: 'storeGet',
	        value: function storeGet(store_id) {
	            return this.get(this.url.store + '/' + store_id);
	        }
	    }, {
	        key: 'storePut',
	        value: function storePut(store_id, data) {
	            return this.put(this.url.store + '/' + store_id, data);
	        }
	    }, {
	        key: 'storeDel',
	        value: function storeDel(store_id) {
	            return this.del(this.url.store + '/' + store_id);
	        }
	    }, {
	        key: 'companyList',
	        value: function companyList(store_id, page, per_page, all) {
	            page = page || 1;
	            per_page = per_page || 10;
	            var params = {
	                page: page || 1,
	                per_page: per_page || 10
	            };
	            if (all) {
	                params.all = true;
	            }
	            return this.get(this.url.store + '/' + store_id + '/company', params);
	        }
	    }, {
	        key: 'companyGet',
	        value: function companyGet(store_id, company_id) {
	            return this.get(this.url.store + '/' + store_id + '/company/' + company_id);
	        }
	    }, {
	        key: 'companyPut',
	        value: function companyPut(store_id, company_id, data) {
	            return this.put(this.url.store + '/' + store_id + '/company/' + company_id, data);
	        }
	    }, {
	        key: 'companyDel',
	        value: function companyDel(store_id, company_id) {
	            return this.del(this.url.store + '/' + store_id + '/company/' + company_id);
	        }
	    }, {
	        key: 'companyPost',
	        value: function companyPost(store_id, data) {
	            return this.post(this.url.store + '/' + store_id + '/company', data);
	        }
	    }]);
	
	    return Store;
	}(_http2.default);
	
	exports.default = Store;

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by cloverstd on 16/5/18.
	 */
	
	var Directive = function () {
	    function Directive() {
	        _classCallCheck(this, Directive);
	
	        this.restrict = 'AEC';
	        this.template = '\n        <span>{{mobile}}</span>\n        ';
	        this.replace = true;
	        this.transclude = true;
	    }
	
	    _createClass(Directive, [{
	        key: 'link',
	        value: function link(scope, ele, attrs, controller) {
	            var segment = attrs.segment || '-';
	            if (attrs.number.length == 11) {
	                var mobile = '';
	                mobile += attrs.number.slice(0, 3) + segment;
	                mobile += attrs.number.slice(3, 7) + segment;
	                mobile += attrs.number.slice(7, 11);
	                scope.mobile = mobile;
	            } else {
	                scope.mobile = attrs.number;
	            }
	        }
	    }]);
	
	    return Directive;
	}();
	
	exports.default = Directive;

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Created by cloverstd on 16/5/15.
	 */
	
	var AuthService = function () {
	    function AuthService($rootScope, memberService) {
	        _classCallCheck(this, AuthService);
	
	        this.$rootScope = $rootScope;
	        this.memberService = memberService;
	    }
	
	    _createClass(AuthService, [{
	        key: 'signIn',
	        value: function signIn(token) {
	            localStorage.setItem("mobile-jwt", token);
	        }
	    }, {
	        key: 'signOut',
	        value: function signOut() {
	            localStorage.clear();
	        }
	    }, {
	        key: 'isAuthenticated',
	        value: function isAuthenticated() {
	            return localStorage.getItem('mobile-jwt');
	        }
	    }]);
	
	    return AuthService;
	}();
	
	AuthService.$inject = ['$rootScope', 'memberService'];
	
	exports.default = AuthService;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by cloverstd on 16/5/19.
	 */
	
	function filter($sce) {
	    return function (value) {
	        /*
	            #  0 -- 到达
	            #  1 -- 短信通知
	            #  3 -- 电话通知
	            #  5 -- 电话短信通知
	            #  10 -- 签收
	            #  11  -- 拒收
	         */
	        var label = '-';
	        switch (value) {
	            case 0:
	                label = '<i class="circle-label circle-label-balanced">到</i>';
	                break;
	            case 1:
	                label = '<i class="circle-label circle-label-positive">通</i>';
	                break;
	            case 2:
	                label = '<i class="circle-label circle-label-positive">通</i>';
	                break;
	            case 5:
	                label = '<i class="circle-label circle-label-positive">通</i>';
	                break;
	            case 10:
	                label = '<i class="circle-label circle-label-calm">签</i>';
	                break;
	            case 11:
	                label = '<i class="circle-label circle-label-assertive">拒</i>';
	                break;
	            default:
	                label = '<i class="circle-label circle-label-light">-</i>';
	                break;
	        }
	        return $sce.trustAsHtml(label);
	    };
	}
	
	filter.$inject = ['$sce'];
	
	exports.default = filter;

/***/ },
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/***/ function(module, exports) {

	var path = '/Users/cloverstd/Dropbox/WorkSpace/express-manage/application/static/mobile/module/order/tpl/user.search.modal.tpl';
	var html = "<ion-modal-view>\n    <ion-header-bar class=\"bar bar-header bar-positive\">\n        <div class=\"buttons\" ng-click=\"vm.userSearchModal.close()\">\n            <button class=\"button\">取消</button>\n        </div>\n        <h1 class=\"title\">搜索用户</h1>\n    </ion-header-bar>\n    <ion-content class=\"padding\">\n        <div class=\"card\">\n            <div class=\"item item-divider\">\n            搜索\n            </div>\n            <div class=\"item\">\n                <div class=\"list\">\n                    <label class=\"item item-input\">\n                        <input type=\"text\" placeholder=\"输入姓名或者手机号码搜索\" ng-model=\"vm.userSearch.key\">\n                    </label>\n                    <label class=\"item\">\n                        <ion-toggle ng-model=\"vm.userSearch.mobile\" toggle-class=\"toggle-calm\">手机</ion-toggle>\n                    </label>\n                    <label class=\"item\">\n                        <div class=\"button-bar\">\n                            <button ng-disabled=\"!vm.userSearch.key\" class=\"button button-calm button-small\" ng-click=\"vm.userSearch.page = 1; vm.userSearchModal.search()\">搜索</button>\n                        </div>\n                    </label>\n                </div>\n            </div>\n        <!--</div>-->\n        <!--<div class=\"list card\" ng-show=\"vm.userSearchModal.items\">-->\n             <div class=\"item\" ng-repeat=\"user in vm.userSearchModal.items\" ng-show=\"vm.userSearchModal.items\">\n                 <mobile number=\"{{user.mobile}}\" />\n                 <div class=\"row\">\n                     <div class=\"col\" ng-repeat=\"user_name in user.names\">\n                         <button class=\"button button-small\" ng-click=\"vm.userSearchModal.choice(user, user_name)\">{{user_name.name}}</button>\n                     </div>\n                 </div>\n            </div>\n            <div class=\"item\" ng-show=\"vm.userSearchModal.has_next()\">\n                <button class=\"button button-small button-block button-positive\" ng-click=\"vm.userSearchModal.loadMore()\">加载更多</button>\n            </div>\n        </div>\n        <div class=\"text-center\" ng-show=\"vm.userSearch.searching\">\n             <ion-spinner></ion-spinner>\n        </div>\n    </ion-content>\n</ion-modal-view>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ }
]);
//# sourceMappingURL=app.js.map