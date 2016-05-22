/**
 * Created by cloverstd on 16/5/20.
 */

class Directive {
    constructor() {

        this.restrict   = 'AEC'
        this.template   = `
        <button ng-click="scan()" ng-click="scan()" ng-transclude></button>
        `
        this.replace    = true
        this.transclude = true

        this.scope = {
            config: '=',
            result: '=',
            vm: '=',
            cb: '&',
            c: '=',
        }

        this.controller = ['$scope', '$parse', '$ionicPlatform', '$cordovaBarcodeScanner', '$ionicPopup', ($scope, $parse, $ionicPlatform, $cordovaBarcodeScanner, $ionicPopup) => {
            $scope.scan = () => {
                $ionicPlatform.ready(() => {
                $cordovaBarcodeScanner
                    .scan($scope.config)
                    .then((result) => {
                        if (!result.cancelled) {
                            $scope.result = result.text
                            if ($scope.cb) {
                                $parse($scope.cb).call($scope.vm)
                            }
                            if ($scope.c === true) {
                                $scope.scan()
                            }
                        }
                    }, (error) => {
                        $ionicPopup.alert({
                            title: '错误',
                            template: '扫描失败'
                        })
                    });
            })
            }
        }]
    }

    link (scope, ele, attrs, controller) {
        const config = scope.config || {
              "preferFrontCamera" : false, // iOS and Android
              "showFlipCameraButton" : true, // iOS and Android
              "prompt" : "请扫描", // supported on Android only
              "orientation" : "portrait"
        }
        console.log(scope)
        console.log(config)
    }
}

export default Directive