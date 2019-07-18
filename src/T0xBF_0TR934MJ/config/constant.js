/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        type: 0xBF,
        page_title: "微波蒸汽烤箱",
        widget_name: 'MSO_T0xB1',
        widget_version: '5.0.7',
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
 * 1.烧烤、烧烤+微波 档位设置通过修改温度设置单位为"档"
 * 2.byte29 上报的温度档位隐藏处理
 * 3.自动菜单不应该设置time default
 * 4.自动菜单02下行hms设置为0xff
 * 5.设置时间不上报，自动隐藏倒计时小球
 *
 * */