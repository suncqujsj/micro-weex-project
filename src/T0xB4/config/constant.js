/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        page_title: "小烤箱",
        type: 0xB4,
        sales_model: "T7-388D",
        widget_name: 'MSO_T0xB1',  // 埋点的时候，只保留 B0，B1，B2
        widget_version: '5.1.3',
        extra1: {
            sn8: '00T7388D'
        },
        hideChildLock:{
            // standby:true,
            working:true
        },
    }
};