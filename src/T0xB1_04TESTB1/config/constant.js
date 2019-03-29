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
        page_title: "嵌入式大烤箱",
        sales_model: "嵌入式大烤箱",
        widget_name: 'MSO_T0xB1',
        widget_version: '5.0.0',
        extra1: {
            sn8: '04TESTB1'
        },
        hasLight: true , //是否有炉灯 
        preheatingCanSetting: true,  //预热中可以设置时间温度等 ，默认不可设置 
    }
};