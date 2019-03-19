/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0xB2,
        page_title: "蒸汽炉",
        sales_model: "TPN36FQL_SSL",
        widget_name: 'MSO_T0xB2',
        widget_version: '5.1.2',
        extra1: {
            sn8: '0TPN36FQ'
        },
        hideChildLock:{
            standby:false,
            working:false
        }
        // hms:[0,1,1] //是否用时分秒组件
    }
};