/**
 * Created by sf
 * 2018/10/26 test4
 */

module.exports = {
    device: {
        page_title: "烤箱",
        type: 0xB1,
        widget_name: 'MSO_T0xB1',
        widget_version: '5.3.2',
        extra1: {
            sn8: '0TVN50R6'
        },
        hideChildLock:{
            standby: true,
            working:true
        },
        preheatingCanSetting: true,
        voiceAuth: true,
        // hasLight: true , //是否有炉灯
        cloudMenuEditable:true
    }
};

/**
 * 注意事项
 * 1.md5 32 美居 5.0.9 => a8fc1874d8704b329bc0c82c5d9a5ae9
 * */