/**
 * Created by sf
 * 2019/02/14
 */

module.exports = {
    device: {
        page_title: "烤箱",
        type: 0xB4,
        widget_name: 'MSO_T0xB1',  // 埋点的时候，只保留 B0，B1，B2
        widget_version: '5.0.5',
        extra1: {
            sn8: '0T7L421F'
        },
        standby03:true, // 待机中打开03轮询
        hideChildLock:{
            standby: true,
            working:true
        }
    }
};


/**
 * 注意事项
 * 参考fun烤箱二代（无探针部分） 08T7428E
 * */