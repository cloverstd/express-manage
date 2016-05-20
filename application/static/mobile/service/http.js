/**
 * Created by cloverstd on 16/5/14.
 */

class HTTPService {
    constructor($http, $q) {
        this.$http = $http
        this.$q = $q
    }

    http(options) {
        if (localStorage.getItem('mobile-jwt')) {
            const token = localStorage.getItem('mobile-jwt')
            if (options.headers) {
                options.headers.Authorization = `JWT ${token}`
            } else {
                options.headers = {
                    Authorization: `JWT ${token}`
                }
            }
        }
        const deferred = this.$q.defer();
        this.$http(options)
            .success((data, status, headers, config) => {
                deferred.resolve(data)
            }).error((data, status, headers, config) => {
                deferred.reject(data, status)
            })
        return deferred.promise
    }

    get(path, params) {
        params = params || {}
        const headers = {}
        if (path.startsWith('/')) {
            path = path.slice(1)
        }
        const url = `${window.config.baseUrl}/${path}`
        return this.http({
            headers: headers,
            method: 'GET',
            url: url,
            params: params,
            paramSerializer: '$httpParamSerializerJQLike'
        })
    }

    post(path, data, params) {
        params = params || {}
        const headers = {
            'Content-Type': 'application/json',
        }
        if (path.startsWith('/')) {
            path = path.slice(1)
        }
        const url = `${window.config.baseUrl}/${path}`

        return this.http({
            headers: headers,
            method: 'POST',
            url: url,
            params: params,
            data: data,
            paramSerializer: '$httpParamSerializerJQLike'
        })
    }

    put(path, data, params) {
        params = params || {}
        const headers = {
            'Content-Type': 'application/json',
        }
        if (path.startsWith('/')) {
            path = path.slice(1)
        }

        const url = `${window.config.baseUrl}/${path}`

        return this.http({
            headers: headers,
            method: 'PUT',
            url: url,
            params: params,
            data: data,
            paramSerializer: '$httpParamSerializerJQLike'
        })
    }

    del(path) {
        const params = params || {}
        const headers = {
            'Content-Type': 'application/json',
        }
        if (path.startsWith('/')) {
            path = path.slice(1)
        }
        const url = `${window.config.baseUrl}/${path}`

        return this.http({
            headers: headers,
            method: 'DELETE',
            url: url,
            params: params,
            paramSerializer: '$httpParamSerializerJQLike'
        })
    }
}

HTTPService.$inject = ['$http', '$q']

export default HTTPService