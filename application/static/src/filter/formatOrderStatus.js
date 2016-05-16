/**
 * Created by cloverstd on 16/5/16.
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
                label = '<span class="label label-info">到达</span>'
                break
            case 1:
                label = '<span class="label label-primary">短信通知</span>'
                break
            case 2:
                label = '<span class="label label-primary">电话通知</span>'
                break
            case 5:
                label = '<span class="label label-primary">通知</span>'
                break
            case 10:
                label = '<span class="label label-success">签收</span>'
                break
            case 11:
                label = '<span class="label label-danger">拒收</span>'
                break
            default:
                label = '-'
                break
        }
        return $sce.trustAsHtml(label)
	}
}

filter.$inject = ['$sce']

export default filter