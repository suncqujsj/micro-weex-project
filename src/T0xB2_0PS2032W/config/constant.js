/**
 * Created by sf
 * 2018/10/26 test4
 */

module.exports = {
    device: {
        page_title: "蒸汽烤箱",
        type: 0xB2,
        widget_name: 'MSO_T0xB2',
        widget_version: '5.1.8',
        extra1: {
            sn8: '0PS2032W'
        },
        hasLight: true , //是否有炉灯
        preheatingCanSetting: false,  //预热中可以设置时间温度等 ，默认不可设置
        hideChildLock:{
            standby: true,
            working:true
        },
        hideCloudRecipe:{
            standby:false,
            working:true
        },
        voiceAuth: false,
        // cloudMenuEditable: true
    }
};

/**
 * 注意事项
 * 1.
 *
 * */