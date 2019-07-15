/**
 * Created by sf
 * 2018/10/26
 */
// var myDate = new Date();//获取系统当前时间
// var month = myDate.getMonth()+1;
// var date = myDate.getDate();
module.exports = {
    device: {
        type: 0xB2,
        page_title: "蒸汽炉",
        sales_model: "蒸汽炉 TPN50ER6-SSL",
        widget_name: 'MSO_T0xB2',
        widget_version: '5.3.9',
        extra1: {
            sn8: '0TPN50R6'
        },
        standby03:true, // 待机中打开03轮询
        hasLight: true , //是否有炉灯
        hideChildLock:{
            working:true,
            standby:true,
        }
    }
};

/**
 * 注意事项
 * 1.md5 32 美居 5.2.8 => e3750ff129776077e83fae77bae048d7
 * */