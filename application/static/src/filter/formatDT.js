/**
 * Created by cloverstd on 16/5/16.
 */

import moment from 'moment'

function filter() {
	return function(value) {
        if (! value) {
            return '-'
        }
		return moment(value).format('YYYY-MM-DD HH:mm:ss')
	}
}

export default filter