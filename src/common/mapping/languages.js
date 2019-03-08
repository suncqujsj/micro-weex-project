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

//参数框
setItem('sfDialog.confirmText', '开始', 'Start');
setItem('sfDialog.cancelText', '取消', 'Cancel');

export default languages;