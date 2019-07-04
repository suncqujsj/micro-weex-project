/**
 * Created by sf
 * 2019/02/14
 */

module.exports = {
    device: {
        page_title: "烤箱",
        type: 0xB4,
        widget_name: 'MSO_T0xB1',  // 埋点的时候，只保留 B0，B1，B2
        widget_version: '5.2.7',
        extra1: {
            sn8: '08T7428E'
        },
        standby03:true, // 待机中打开03轮询
        hideChildLock:{
            standby: true,
            working:true
        },
        showPreheatContinueBtn: true, // 当设备预热完成时，显示继续按钮
        showVideo: true // 显示视频监控入口
    }
};


/**
 * 注意事项
 * 1.下行发酵模式时候，需要设置下管低位温度，否则下行失败
 * 2.机器烹饪完成后，还可以再进行二次加热，带来一个新问题。判断app需要额外判断时间
 * 3.工作中不支持暂停
 * 4.工作中禁止修改工作参数
 * 5.待机模式打开03轮询
 * 6.待机模式下，插入探针，主动关闭不支持的模式弹窗
 * 7.探针温度必须小于腔体温度
 * 8.当设备预热完成时，显示继续按钮
 * 9.隐藏探针实时以及目标温度
 * 10.云菜谱上报探针模式value置为0
 * 11.云菜谱加时显示上下管设置、探针设置温度较大者
 * 12.云菜谱入口添加插入探针提示
 * */