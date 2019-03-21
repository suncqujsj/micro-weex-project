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
 * 1.水盒位置在左上，水盒水位在下时（互相垂直），水盒位置上方短路为缺水盒，水盒水位右边为缺水。（板子）
 *
 * */