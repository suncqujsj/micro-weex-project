/**
 * Created by Giggs
 * 2019/06/11
 */

module.exports = {
    device: {
        type: 0xB0,
        page_title: "BS Electric Better",
        sales_model: "Oven",
        widget_name: 'MSO_T0xB1',
        widget_version: '5.0.1',
        extra1: {
            sn8: '00E5R071'
        },
        standby03:true, // 待机中打开03轮询
        lang: 'en',
        hideChildLock:{
            working:true
        },
        hideCloudRecipe:{
            standby:true,
            working:true
        }
    }
};

/**
    产品相关信息
        1.本产品为 BS 项目集中之一，部署与海外美居平台。美的牌，应用于北美市场，
            30NTG5G070，燃气Good
            30NTG5G071，燃气Better
            30NTE5R070，电Good
            30NTE5R071，电Better（本产品）
        2.电控软件工程师 = 罗强，硬件 = 廖鸿生
        3.
 **/