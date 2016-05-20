/**
 * Created by cloverstd on 16/5/15.
 */

import HTTPService from '../../service/http'

class Store extends HTTPService {
    constructor($http, $q) {
        super($http, $q)

        this.url = {
            store: '/api/member/store'
        }
    }

    storeList(page, per_page, is_default) {
        const params = {
            page: page || 1,
            per_page: per_page || 10
        }
        if (is_default == 0 || is_default) {
            params.default = is_default
        }
        return this.get(this.url.store, params)
    }

    storePost(data) {
        return this.post(this.url.store, data)
    }

    storeGet(store_id) {
        return this.get(`${this.url.store}/${store_id}`)
    }
    
    storePut(store_id, data) {
        return this.put(`${this.url.store}/${store_id}`, data)
    }

    storeDel(store_id) {
        return this.del(`${this.url.store}/${store_id}`)
    }

    companyList(store_id, page, per_page, all) {
        page = page || 1
        per_page = per_page || 10
        const params = {
            page: page || 1,
            per_page: per_page || 10
        }
        if (all) {
            params.all = true
        }
        return this.get(`${this.url.store}/${store_id}/company`, params)
    }

    companyGet(store_id, company_id) {
        return this.get(`${this.url.store}/${store_id}/company/${company_id}`)
    }

    companyPut(store_id, company_id, data) {
        return this.put(`${this.url.store}/${store_id}/company/${company_id}`, data)
    }

    companyDel(store_id, company_id) {
        return this.del(`${this.url.store}/${store_id}/company/${company_id}`)
    }

    companyPost(store_id, data) {
        return this.post(`${this.url.store}/${store_id}/company`, data)
    }

}

export default Store