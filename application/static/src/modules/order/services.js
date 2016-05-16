/**
 * Created by cloverstd on 16/5/15.
 */

import HTTPService from '../../service/http'

class Order extends HTTPService {
    constructor($http, $q) {
        super($http, $q)

        this.url = {
            order: '/api/member/store',
        }
    }

    orderList(store_id, page, per_page, params) {
        params.page = page || 1
        params.per_page = per_page || 10
        return this.get(`${this.url.order}/${store_id}/order`, params)
    }

    orderPost(store_id, data) {
        return this.post(`${this.url.order}/${store_id}/order`, data)
    }

    orderGet(store_id, order_id) {
        return this.get(`${this.url.order}/${store_id}/order/${order_id}`)
    }

    orderDelete(store_id, order_id) {
        return this.del(`${this.url.order}/${store_id}/order/${order_id}`)
    }

    orderPut(store_id, order_id, data) {
        return this.put(`${this.url.order}/${store_id}/order/${order_id}`, data)
    }
    
    orderNo(store_id) {
        return this.get(`${this.url.order}/${store_id}/order/no`)
    }

    // user
    userSearch(store_id, page, per_page, params) {
        params.page = page || 1
        params.per_page = per_page || 10
        return this.get(`/api/member/store/${store_id}/user`, params)
    }
}

export default Order