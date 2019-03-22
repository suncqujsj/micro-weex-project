/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0xBF,
        page_title: "微波蒸汽烤箱",
        widget_name: 'MSO_T0xB1',
        widget_version: '5.0.0',
        extra1: {
            sn8: '0TR934MJ'
        },
        standby03:true, // 待机中打开03轮询
        hideChildLock:{
            working:true
        }
    }
};

/**
 * 注意事项
 * 1.蒸汽 03上报byte16-18上报有误
 * 2.加热模式-烧烤 03上报 火力档位设置在byte21 上管实际温度低位 应该在byte24
 * */