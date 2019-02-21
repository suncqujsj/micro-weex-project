/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0xB0,
        page_title: "微波炉",
        widget_name: 'MSO_T0xB0',
        widget_version: '5.0.8',
        extra1: {
            sn8: '0M3L20A8'
        },
        standby03:true, // 待机中打开03轮询
        hideChildLock:{
            working:true
        }
    }
};