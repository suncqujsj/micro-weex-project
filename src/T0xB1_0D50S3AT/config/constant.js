/**
 * Created by sf
 * 2018/10/26
 */
var myDate = new Date();//获取系统当前时间
var month = myDate.getMonth()+1;
var date = myDate.getDate();
module.exports = {
    device: {
        type: 0x9B,
        page_title: "烤箱",
        sales_model: "双子星",
        widget_name: 'MSO_T0xB1',
        widget_version: '5.'+month+'.'+date,
        extra1: {
            sn8: '0ET470QL'
        },
        hasLight: false , //是否有炉灯        
    }
};