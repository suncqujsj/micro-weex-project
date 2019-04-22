/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0xB0,
        page_title: "BUILT-IN MWO",
        sales_model: "BUILT-IN MWO",
        widget_name: 'MSO_T0xB0',
        widget_version: '5.0.1',
        lang: 'en',
        extra1: {
            sn8: '02TESTB0'
        },
        hideChildLock:{
            standby:false,
            working:true
        },
        hideCloudRecipe:{
            standby:true,
            working:true
        }
        // hms:[0,1,1] //是否用时分秒组件
    }
};