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
    'humidit_auto_menu ': {value: 0xE2, text:'湿度感应菜单'},
    'dry':{ value: 0xc4, text:'烘干'},
    'clean':{ value: 0xc6, text:'清洁'},

    'microwave':{ value: 0x01,text:'微波' },
    'above_tube':{ value: 0x40,text:'烧烤' },
    'unfreeze':{ value: 0xa0,text:'解冻' },
    'remove_odor':{ value: 0xc3,text:'除味' },
    'scale_clean':{ value: 0xc1,text:'除垢' },

    /*
     0PS2032W
    */
   'fast_steam':{ value: 0x90,text:'快蒸' },
   'slow_steam':{ value: 0x22,text:'慢蒸' },
   'hot_wind_bake':{ value: 0x41,text:'烘烤' },
   'steam_and_hot_wind':{ value: 0x31,text:'蒸烤' },
   'dining_utensils_clean':{ value: 0xc8,text:'餐具清洁' },
   
   'fast_baking': { value: 0x70,text:'双模快烤' },
};

export default mode;