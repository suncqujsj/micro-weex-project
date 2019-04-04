/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0xB0,
        page_title: "嵌入式微波炉",
        sales_model: "嵌入式微波炉",
        widget_name: 'MSO_T0xB0',
        widget_version: '5.0.0',
        extra1: {
            sn8: '02TESTB0'
        },
        hideChildLock:{
            standby:false,
            working:true
        }
        // hms:[0,1,1] //是否用时分秒组件
    }
};