/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0x9B,
        page_title: "蒸汽烤箱",
        sales_model: "TPN50QL_SSL",
        widget_name: 'MSO_T0xB1',
        widget_version: '5.0.3',
        extra1: {
            sn8: '0TQN50QL'
        },
        hideChildLock:{
            standby:false,
            working:true
        }
        // hms:[0,1,1] //是否用时分秒组件
    }
};