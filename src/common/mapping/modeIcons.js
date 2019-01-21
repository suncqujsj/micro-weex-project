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
icons[12] = getIcon('微波加热', 'microwave@3x');
icons[13] = getIcon('烧烤', 'broil@3x');
icons[14] = getIcon('解冻', 'thaw@3x');
icons[15] = getIcon('上管烧烤', 'up_pipe@3x');
icons[16] = getIcon('蒸汽', 'steam@3x');
icons[17] = getIcon('烘干', 'dry_hg@3x');
icons[18] = getIcon('湿烤', 'dry_hg@3x');
icons[19] = getIcon('ECO', 'ECO@3x');
icons[20] = getIcon('清洁', 'clean@3x');
icons[21] = getIcon('除味', 'remove_flavor@3x');

export default icons;