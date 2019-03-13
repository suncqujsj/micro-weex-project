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
setItem('standbyState', '待机中', 'Standby');
setItem('tabs', ['自动菜单', '加热模式'], ['Auto Menu', 'Heat Mode']);

//参数框
setItem('start', '开始', 'Start');
setItem('cancel', '取消', 'Cancel');

/**
 * 工作中
 */
setItem('timeLeft', '剩余时间', 'Time Remaining');
setItem('close', '关闭', 'Close');
setItem('putIntoFoodMaterial', '放入食物', 'Put Into Food Material');
setItem('pressToStart', '点击开始', 'Press To Start');
setItem('preheat', '预热', 'Preheat');
setItem('preheating', '预热', 'Preheating');
setItem('preheated', '已预热', 'Preheated');
setItem('ing', '中', 'period');
setItem('wait', '我再想想', 'Wait A Moment');
setItem('confirmClose', '确定关闭', 'Close Anyway');
setItem('finish', '完成', 'finished');
setItem('to', '到', 'To');
setItem('hour', '时', 'H');
setItem('minute', '分', 'M');
setItem('second', '秒', 'S');
setItem('sensing', '感应中', 'Sensing');
setItem('cooking', '烹饪', 'Cooking');
setItem('hotCaution', '取出时小心烫手', 'HOT, Mind your hands.');
setItem('working', '工作中', 'Working');
setItem('probeMode', '探针模式', 'Probe Mode');
setItem('currentTemperature', '当前实时温度', 'Current Temperature');
export default languages;