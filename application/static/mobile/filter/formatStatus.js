/**
 * Created by cloverstd on 16/5/19.
 */

function filter($sce) {
	return function(value) {
        /*
            #  0 -- 到达
            #  1 -- 短信通知
            #  3 -- 电话通知
            #  5 -- 电话短信通知
            #  10 -- 签收
            #  11  -- 拒收
         */
        let label = '-'
        switch (value) {
            case 0:
                label = '<i class="circle-label circle-label-balanced">到</i>'
                break
            case 1:
                label = '<i class="circle-label circle-label-positive">通</i>'
                break
            case 2:
                label = '<i class="circle-label circle-label-positive">通</i>'
                break
            case 5:
                label = '<i class="circle-label circle-label-positive">通</i>'
                break
            case 10:
                label = '<i class="circle-label circle-label-calm">签</i>'
                break
            case 11:
                label = '<i class="circle-label circle-label-assertive">拒</i>'
                break
            default:
                label = '<i class="circle-label circle-label-light">-</i>'
                break
        }
        return $sce.trustAsHtml(label)
	}
}

filter.$inject = ['$sce']

export default filter