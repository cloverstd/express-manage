/**
 * Created by cloverstd on 16/5/18.
 */

class Directive {
    constructor() {
        this.restrict   = 'AEC'
        this.template   = `
        <span>{{mobile}}</span>
        `
        this.replace    = true
        this.transclude = true
    }

    link (scope, ele, attrs, controller) {
        const segment = attrs.segment || '-'
        if (attrs.number.length == 11) {
            let mobile = ''
            mobile += attrs.number.slice(0, 3) + segment
            mobile += attrs.number.slice(3, 7) + segment
            mobile += attrs.number.slice(7, 11)
            scope.mobile = mobile
        } else {
            scope.mobile = attrs.number
        }
    }
}

export default Directive