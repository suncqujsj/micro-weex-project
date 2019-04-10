/**
 * Created by sf
 * 2019/02/14
 */

module.exports = {
    device: {
        page_title: "Toast Oven",
        type: 0xB4,
        sales_model: "Toast Oven",
        lang: 'en',
        widget_name: 'MSO_T0xB4',  // 埋点的时候，只保留 B0，B1，B2
        widget_version: '5.0.0',
        extra1: {
            sn8: '03TESTB4'
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