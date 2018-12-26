/**
 * Created by sf
 * 2018/10/22
 */

/**
 * 弹窗参数设置
 */

let accordions =  [
    {
        key:'time',
        type:'picker',
        isFolded: true,
        subtitle:'设置时间',
        unit:'分',
        hideArrow:false
    },
    {
        key:'temperature',
        type:'picker',
        isFolded: true,
        subtitle:'设置温度',
        unit:'°C',
        hideArrow:false
    },
    {
        key:'steamAmount',
        type:'picker',
        isFolded: true,
        subtitle:'设置蒸汽量',
        unit:'档',
        hideArrow:false
    },
    {
        key:'fireAmount',
        type:'picker',
        isFolded: true,
        subtitle:'设置火力',
        unit:'档',
        hideArrow:false
    },
    {
        key:'preheat',
        type:'switch',
        isFolded: true,
        subtitle:'设置预热',
        unit:'',
        hideArrow:true
    },
    {
        key:'weight',
        type:'picker',
        isFolded: true,
        subtitle:'设置解冻重量',
        unit:'g',
        hideArrow:false
    },
];

export default accordions;

/**
 * 
 * 每加一个key
 1.mixins/accordions.js里面添加
 2.currentItem.key,current.key
 3.在加热模式或者自动菜单配置文件里面，添加需要加的key的对象
 * 
*/
