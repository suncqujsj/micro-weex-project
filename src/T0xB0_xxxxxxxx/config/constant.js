/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0xB0,
        page_title: "Microwave Oven",
        widget_name: 'MSO_T0xB0',
        widget_version: '5.1.3',
        extra1: {
            sn8: '0M3L20A8'
        },
        standby03:true, // 待机中打开03轮询
        hideChildLock:{
            working:true
        }
    }
};

/**
 * 注意事项
 * 1.md5 32 美居 5.1.3 => f3da9a217a73f4360ce73a3ef396e0b7
 * */