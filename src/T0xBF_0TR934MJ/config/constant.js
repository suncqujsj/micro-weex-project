/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0xBF,
        page_title: "微蒸烤一体机",
        widget_name: 'MSO_T0xB1',
        widget_version: '5.0.0',
        extra1: {
            sn8: '0TR934MJ'
        },
        standby03:true, // 待机中打开03轮询
        hideChildLock:{
            working:true
        }
    }
};