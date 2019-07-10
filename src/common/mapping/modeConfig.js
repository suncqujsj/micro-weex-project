/**
 * Created by sf
 * 2019/1/29
 */

let mode = {
    'double_tube':{ value: 0x4c, text:'上下烧烤'},
    'hot_wind_bake':{ value: 0x41, text:'热风对流'},
    'double_tube_fan':{ value: 0x52, text:'上下烧烤+风扇'},
    'underside_tube':{ value: 0x49, text:'下管烧烤'},
    'double_upside_tube_fan':{ value: 0x51, text:'双上管+风扇'},
    'core_baking':{ value: 0x46, text:'双上管烧烤'},
    'total_baking':{ value: 0x47, text:'红外烧烤'},
    'underside_tube_hot_wind_bake':{ value: 0x42, text:'下管烧烤+热风对流'},
    'zymosis':{ value: 0xb0, text:'发酵'},


    'pure_steam':{ value: 0x20, text:'蒸汽'},
    'auto_menu':{ value: 0xE0, text:'自动菜单'},
    'dry':{ value: 0xc4, text:'烘干'},
    'scale_clean':{ value: 0xc1, text:'清洁'},
};

export default mode;