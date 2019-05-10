/**
 * Created by sf
 * 2019/3/19
 */

const objectAssign = require('object-assign');

const common = {

};

const cn = {
    standbyState: '待机',
    tabs: ['自动菜单', '加热模式'],
    start: '开始',
    cancel: '取消',
    timeLeft: '剩余时间',
    close: '关闭',
    putIntoFoodMaterial: '放入食物',
    pressToStart: '点击开始',
    preheat: '预热',
    preheating: '预热',
    preheated: '已预热',
    ing: '中',
    wait: '我再想想',
    confirmClose: '确定关闭',
    finish: '完成',
    to: '到',
    hour: '时',
    minute: '分',
    second: '秒',
    sensing: '感应中',
    cooking: '烹饪',
    hotCaution: '取出时小心烫手',
    working: '工作中',
    probeMode: '探针模式',
    currentTemperature: '当前实时温度',
    time: '时间',
    temperature: '温度',
    upTemperature: '上管温度',
    downTemperature: '下管温度',
    probeTemperature: '探针温度',
    isProbeSettingTemperature: '温度',
    steamAmount: '蒸汽量',
    fireAmount: '火力',
    weight: '重量',
    quantity: '数量',
    quantityDefaultUnit: '份',
    morePageTitle: '更多功能',
    childLockOpenedText: '童锁开启',
    closeChildLock: '关闭童锁',
    pausing: '暂停中',
    resume: '继续',
    pause: '暂停',
    cookFinished: '烹饪结束'
};

const en = {
    standbyState: 'Standby',
    tabs: ['Auto Menu', 'Heat Mode'],
    start: 'Start',
    cancel: 'Cancel',
    timeLeft: 'Time Remaining',
    close: 'Cancel',
    putIntoFoodMaterial: 'Put Into Food Material',
    pressToStart: 'Press To Start',
    preheat: 'Preheat',
    preheating: 'Preheating',
    preheated: 'Preheated',
    ing: 'period',
    wait: 'Wait A Moment',
    confirmClose: 'Close Anyway',
    finish: 'Finished',
    to: 'To',
    hour: 'H',
    minute: 'M',
    second: 'S',
    sensing: 'Sensing',
    cooking: 'Cooking',
    hotCaution: 'HOT, Mind your hands.',
    working: 'Working',
    probeMode: 'Probe Mode',
    currentTemperature: 'Current Temperature',
    time: 'Time',
    temperature: 'Temperature',
    upTemperature: 'Up Pipe Temperature',
    downTemperature: 'Down Pipe Temperature',
    probeTemperature: 'Probe Temperature',
    isProbeSettingTemperature: 'Temperature',
    steamAmount: 'Steam Amount',
    fireAmount: 'Power Level',
    weight: 'Weight',
    quantity: 'Quantity',
    quantityDefaultUnit: 'Copies',
    morePageTitle: 'More functions',
    childLockOpenedText: 'Child lock opened',
    closeChildLock: 'Close the Child lock',
    pausing: 'Pausing',
    resume: 'Start',
    pause: 'Stop',
    cookFinished: 'End of cook'
};

const lang = {
    cn,
    en
};

export default lang;