/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0x9B,
        page_title: "蒸汽烤箱", // 此字段是页面顶端标题
        //sales_model: "TPN50QL_SSL", // 此字段已作废
        widget_name: 'MSO_T0xB1',
        widget_version: '5.0.8',
        extra1: {
            sn8: '0TQN50QL'
        },
        hideChildLock:{
            standby:false,
            working:true
        }
        // hms:[0,1,1] //是否用时分秒组件
    }
};


/*
* 注意事项：
* 1。由于老版本插件工作中没有上报 设定时间，因此 剩余时间/设定时间 的进度条将无法实现，因此隐藏进度小圆点 circleProgressPointHide: true,
* 2。老版本插件工作中不可以改时间和温度，避免出现问题。
*
* */