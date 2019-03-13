/**
 * Created by sf
 * 2018/10/22
 */

/**
 * 弹窗参数设置
 */

let getTitle = function(cn, en){
    let en_prefix = 'Set ';
    let cn_prefix = '设置';
    return {
        cn: cn_prefix + cn,
        en: en_prefix + en
    };
};

let getUnit = function(cn, en){
    return {
        cn,en
    };
};

let accordions =  [
    {
        key:'time',
        type:'picker',
        isFolded: true,
        subtitle: getTitle('时间', 'Time'),
        unit: getUnit('分', 'Minute'),
        hideArrow:false
    },
    {
        key:'temperature',
        type:'picker',
        isFolded: true,
        subtitle: getTitle('温度', 'Temperature'),
        unit:'°C',
        hideArrow:false
    },

    /**
     * 上下独立温度
     */
    {
        key:'upTemperature',
        type:'picker',
        isFolded: true,
        subtitle: '设置上管温度',
        unit:'',
        hideArrow:false
    },
    {
        key:'downTemperature',
        type:'picker',
        isFolded: true,
        subtitle: '设置下管温度',
        unit:'',
        hideArrow:false
    },

    {
        key:'probeTemperature',
        type:'picker',
        isFolded: true,
        subtitle:getTitle('探针温度', 'Probe Temperature'),
        unit:'°C',
        hideArrow:false
    },
    {
        key:'steamAmount',
        type:'picker',
        isFolded: true,
        subtitle: getTitle('蒸汽量', 'Steam Amount'),
        unit:'档',
        hideArrow:false
    },
    {
        key:'fireAmount',
        type:'picker',
        isFolded: true,
        subtitle: getTitle('火力', 'Fire Amount'),
        unit: getUnit('档', 'Gear'),
        hideArrow:false
    },
    {
        key:'preheat',
        type:'switch',
        isFolded: true,
        subtitle: getTitle('预热', 'Preheating'),
        unit:'',
        hideArrow:true
    },
    {
        key:'weight',
        type:'picker',
        isFolded: true,
        subtitle:getTitle('重量', 'Weight'),
        unit:'g',
        hideArrow:false
    },
    {
        key:'steamSwitch',
        type:'switch',
        isFolded: true,
        subtitle: getTitle('蒸汽开关', 'Steam Switch'),
        unit:'',
        hideArrow:true
    },
    {
        key:'hms',
        type:'pickers',
        isFolded: true,
        subtitle: getTitle('时间', 'Time'),
        unit:'',
        hideArrow:false
    },
];

export default accordions;

/**
 * 
 * 每加一个key
 1.mixins/accordions.js里面添加
 2.current.key
 3.在加热模式或者自动菜单配置文件里面，添加需要加的key的对象
 4.工作页面，点击设置修改参数setting ， 加上current.key
 * 
*/
