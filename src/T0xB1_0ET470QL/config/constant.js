/**
 * Created by sf
 * 2018/10/26
 */
// var myDate = new Date();//获取系统当前时间
// var month = myDate.getMonth()+1;
// var date = myDate.getDate();
module.exports = {
    device: {
        type: 0xB1,
        page_title: "烤箱",
        sales_model: "G55蒸汽补湿烤箱",
        widget_name: 'MSO_T0xB1',
        widget_version: '5.1.31',
        extra1: {
            sn8: '0ET470QL'
        },
        hasLight: true , //是否有炉灯 
        preheatingCanSetting: true,  //预热中可以设置时间温度等 ，默认不可设置 
    }
};