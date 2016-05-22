/**
 * Created by cloverstd on 16/5/21.
 */

class Scan {
    constructor($q, $ionicPlatform, $cordovaBarcodeScanner, $ionicPopup) {
        Object.assign(this, {
            $q,
            $ionicPlatform,
            $cordovaBarcodeScanner,
            $ionicPopup
        })
    }

    scan(config) {
        const deferred = this.$q.defer();
        config = config || {
              "preferFrontCamera" : false, // iOS and Android
              "showFlipCameraButton" : true, // iOS and Android
              "prompt" : "请扫描", // supported on Android only
              "orientation" : "portrait"
        }
        this.$ionicPlatform.ready(() => {
            this.$cordovaBarcodeScanner
                .scan(config)
                .then((result) => {
                    deferred.resolve(result)
                }, (error) => {
                    deferred.reject(error)
                });
        })
        return deferred.promise
    }
}

Scan.$inject = [
    '$q',
    '$ionicPlatform',
    '$cordovaBarcodeScanner',
    '$ionicPopup'
]

export default Scan