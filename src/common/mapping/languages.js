/**
 * Created by sf
 * 2019/3/8
 */

let languages = {};

let setItem = function(key, cn='',en=''){
    languages[key] = {
        cn,
        en
    }
};

/**
 * 待机
 */
setItem('standbyState', '待机中', 'standby');
setItem('tabs', ['自动菜单', '加热菜单'], ['Auto Menu', 'Heat Mode']);

export default languages;