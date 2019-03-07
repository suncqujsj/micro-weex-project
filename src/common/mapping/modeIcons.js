/**
 * Created by sf
 * 2018/12/27
 */

const prefix = 'img/modes/';
const suffix = '.png';

let icons = [];

let getIcon = function(cn='', iconName, en=''){
    return {
        cn, // mode Chinese name
        en, // mode English name
        dir: `${prefix}${iconName}${suffix}` // mode icon directory
    }
};

icons[0] = getIcon('上下烧烤', 'up_down_tube@3x');
icons[1] = getIcon('热风对流', 'hot_wind@3x');
icons[2] = getIcon('上下烧烤+风扇', 'up_down_and_fan@3x');
icons[3] = getIcon('下管烧烤', 'bottom_heat@3x');
icons[4] = getIcon('红外烧烤', 'radiant_heat@3x');
icons[5] = getIcon('双上管+风扇', 'double_grill_and_fan@3x');
icons[6] = getIcon('双上管烧烤', 'double_grill@3x');
icons[7] = getIcon('发酵', 'fermentation@3x');
icons[8] = getIcon('下管+热风对流', 'bottom_heat_and_hot_wind@3x');
icons[9] = getIcon('上管+红外+风扇', 'up_hot_wind@3x');
icons[10] = getIcon('除垢', 'descaling_cg@3x');
icons[11] = getIcon('快速预热', 'quik_preheat@3x');
icons[12] = getIcon('微波', 'microwave@3x', 'Microwave');
icons[13] = getIcon('烧烤', 'broil@3x');
icons[14] = getIcon('解冻', 'thaw@3x');
icons[15] = getIcon('上管烧烤', 'up_pipe@3x');
icons[16] = getIcon('纯蒸', 'steam@3x');
icons[17] = getIcon('烘干', 'dry_hg@3x');
icons[18] = getIcon('湿烤', 'dry_hg@3x');
icons[19] = getIcon('ECO', 'ECO@3x');
icons[20] = getIcon('清洁', 'clean@3x');
icons[21] = getIcon('除味', 'remove_flavor@3x');
icons[22] = getIcon('微波烧烤', 'microwave_grill@3x');
icons[23] = getIcon('按重解冻', 'defrost_by_weight@3x', 'Weight Defrost');
icons[24] = getIcon('按时解冻', 'defrost_by_time@3x', 'Time Defrost');
icons[25] = getIcon('快蒸', '');
icons[26] = getIcon('变频加热', 'microwave@3x');
icons[27] = getIcon('快捷微波', 'microwave@3x');
icons[28] = getIcon('保温', '');
icons[29] = getIcon('变频加热', '');
icons[30] = getIcon('自动菜单', '');
icons[31] = getIcon('热风烧烤', 'hot_wind_and_broil@3x');
icons[32] = getIcon('旋转烧烤', 'rotate_grill@3x');

icons[33] = getIcon('蒸汽', 'steam@3x');
icons[34] = getIcon('蒸汽+上下烧烤', '');
icons[35] = getIcon('蒸汽+热风对流', '');
icons[36] = getIcon('蒸汽+立体烧烤', '');
icons[37] = getIcon('蒸汽+底部烧烤', '');
icons[38] = getIcon('蒸汽+大面积+风扇', '');
icons[39] = getIcon('蒸汽+大面积', '');
icons[40] = getIcon('蒸汽+小面积', '');

icons[41] = getIcon('旋转小分量上色', '');
icons[42] = getIcon('双层烧烤', '');
export default icons;