/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0xB0,
        page_title: "微蒸烤一体机",
        widget_name: 'MSO_T0xB0',
        widget_version: '5.1.6',
        extra1: {
            sn8: '0PG23E0W'
        },
        standby03:true, // 待机中打开03轮询
        // hms:[0,1,1],
        hideChildLock:{
            working:true
        }
    }
};