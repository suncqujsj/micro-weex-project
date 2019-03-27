/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0xB0,
        page_title: "白色微波炉",
        widget_name: 'MSO_T0xB0',
        widget_version: '5.0.0',
        extra1: {
            sn8: '01TESTB0'
        },
        standby03:true, // 待机中打开03轮询
        lang: 'cn',
        hideChildLock:{
            working:true
        }
    }
};

/**
 * 注意事项
 * 1.md5 32 美居 5.1.3 => f3da9a217a73f4360ce73a3ef396e0b7
 * */