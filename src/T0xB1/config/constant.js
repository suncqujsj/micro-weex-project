/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        page_title: "大烤箱",
        type: 0xB1,
        widget_name: 'MSO_T0xB1',  // 埋点的时候，只保留 B0，B1，B2
        widget_version: '5.0.1',
        extra1: {
            sn8: '0ET1065Q'
        },
        hideChildLock:{
            standby:true,
            working:true
        },
    }
};