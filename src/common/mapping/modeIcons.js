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

icons[0] = getIcon('上下管', 'up_down_tube@3x');
icons[1] = getIcon('热风对流', 'hot_wind@3x');
icons[2] = getIcon('上下烧烤+风扇', 'up_down_and_fan@3x');
icons[3] = getIcon('下管烧烤', 'bottom_heat@3x');
icons[4] = getIcon('红外烧烤', 'radiant_heat@3x');

export default icons;