/**
 * Created by sf
 * 2019/02/14
 */

module.exports = {
    device: {
        page_title: "烤箱",
        type: 0xB4,
        widget_name: 'MSO_T0xB1',  // 埋点的时候，只保留 B0，B1，B2
        widget_version: '5.0.0',
        extra1: {
            sn8: '0T7L421F'
        },
        standby03:true, // 待机中打开03轮询
        hideChildLock:{
            standby: true,
            working:true
        }
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
 * */