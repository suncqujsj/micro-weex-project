/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0xB0,
        page_title: "微波炉",
        sales_model: "X7-321D耀石黑",
        widget_name: 'MSO_T0xB0',
        widget_version: '5.1.2',
        extra1: {
            sn8: '09X7321D'
        },
        hideChildLock:{
            standby:false,
            working:true
        }
        // hms:[0,1,1] //是否用时分秒组件
    }
};