/**
 * Created by sf
 * 2018/10/26
 */

module.exports = {
    device: {
        page_title: "美的Fun烤箱II代",
        type: 0xB4,
        widget_name: 'MSO_T0xB1',  // 埋点的时候，只保留 B0，B1，B2
        widget_version: '5.0.1',
        extra1: {
            sn8: '08T7428E'
        }
    }
};


/**
 * 注意事项
 * 1.下行发酵模式时候，需要设置下管低位温度，否则下行失败
 * 2.机器烹饪完成后，还可以再进行二次加热，带来一个新问题。判断app需要额外判断时间
 * */