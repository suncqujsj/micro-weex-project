/**
 * Created by Giggs
 * 2019/7/18
 * weibolu menu222
 */


let data = [
    {
        title: '吃点家常',  // 首个 title 很重要，决定了是否平铺所有菜。当 title = mode，平铺； 当title = xxx，按分类显示
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '整个番茄饭',
                    'mode': 0xE0,
                    // 时间
                    time:{
                        set: true,
                        default:22,
                        range: [19,25,1],
                    },
                    // 温度
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    // 预热
                    preheat:{
                        set:false,
                        default: false
                    },
                    // 蒸汽量
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    // 火力
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    // 重量
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    // 电控接收信号（菜谱ID，16进制）
                    recipeId:{
                        set:false,
                        default: 0xBA,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:'速冻水饺 300g \n' ,
                    //     cookingSteps:'1. 饺子皮边缘部分发白发干，整体加热后温度达到90度左右',
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '蛋花汤鱼皮饺',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:11,
                        range: [9,13,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xBB,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '面团部分：普通面粉（12个为例） 260g \n' +
                    //         '面团部分：水 约160g \n' +
                    //         '面团部分：干酵母 2-3g \n' +
                    //         '面团部分：白砂糖 50g\n' +
                    //         '面团部分：食盐 少许\n' +
                    //         '馅料部分：猪肉馅 200g\n'+
                    //         '馅料部分：干香菇 5-6朵 \n' +
                    //         '馅料部分：香葱 1根 \n' +
                    //         '馅料部分：酱油 1大勺 \n' +
                    //         '馅料部分：白砂糖 少许 \n' +
                    //         '馅料部分：食盐 适量 \n' ,
                    //     cookingSteps:
                    //         '1.将干香菇泡发后切碎，葱洗净切末，将猪肉馅、香菇和香葱放入碗中，加入生抽、白糖、盐，往一个方向搅拌均匀备用。\n' +
                    //         '2.将面粉、酵母粉、白糖、食盐和水混合，揉成光滑面团。\n' +
                    //         '3.把揉好的面团（连揉面的盆加盖）放入温暖无风环境中发酵至面团大小为原来的约2倍大小，面团里面充满蜂窝状的小孔时，说明已经发酵好，再一次揉搓面团，充分揉压出内部的起泡。\n' +
                    //         '4.把揉好的面团揉成长条形，切成平均分成小剂子（每个约40g）。\n' +
                    //         '5.将剂子按扁，然后用擀面杖将它擀成中间略厚边缘稍薄的面皮。\n' +
                    //         '6.把适量肉馅放入面皮中，由一处开始先捏出一个褶子，然后继续朝一个方向捏褶子，直至将面皮边缘捏完，收口，成包子生胚。\n' +
                    //         '7.在烤架上铺上一层烘焙纸（或者包纸），把做好的包子生胚整齐摆放在上面。\n' +
                    //         '8.烤架直接放置在微波炉陶瓷板上关上炉门醒发20分钟后，选择菜单烹调。\n' +
                    //         '9.烹调结束，等待5分钟再打开炉门，以防包子由于瞬间降温导致表皮严重收缩影响外观。',
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '番茄炒鸡蛋',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:6.5,
                        range: [5,8,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xBC,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '大米 200g \n' +
                    //         '水 300g \n' +
                    //         '红萝卜 80g \n' +
                    //         '玉米粒 80g\n' +
                    //         '广式腊肠 120g\n' +
                    //         '香葱 10g\n'+
                    //         '盐 3g',
                    //     cookingSteps:
                    //         '1.将大米淘洗干净，放在碗里，倒入300克水浸泡10分钟左右. \n' +
                    //         '2.将红萝卜切小块，将玉米剥好，葱切成葱花，将腊肠切成片状. \n' +
                    //         '3.将红萝卜、玉米和盐放进大米里混匀后，放入宽口大容器里面，加盖，把器皿放平板上，选择菜单启动即可. \n ' +
                    //         '4.剩余10分钟时听到提示音后将米饭取出，把腊肠片铺在米饭上面，蒸箱水盒装满水放回蒸箱中不加盖继续蒸10分钟，蒸好之后，取出，在饭上撒上葱花即可。',
                    //
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '腰果宫保鸡丁',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:10,
                        range: [9,11,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xD6,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '鸡蛋 两个 \n' +
                    //         '秋葵  两根 \n' +
                    //         '温水与鸡蛋比例 2：1 \n' +
                    //         '生抽 5g \n',
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.鸡蛋和水1:2混合搅打均匀，秋葵切薄片。\n' +
                    //         '3.鸡蛋液先用过滤网过滤一遍，秋葵铺在蛋液上。\n' +
                    //         '4.把把碟子放烤架上，把蒸架放平板上，关上炉门，水盒加水，选择菜单，启动即可。',
                    // },
                    settingHide: true
                },
            ]

        ]
    },
    {
        title: '吃点家常',  // 首个 title 很重要，决定了是否平铺所有菜。当 title = mode，平铺； 当title = xxx，按分类显示
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '土豆焖排骨',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:30,
                        range: [27,33,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xBD,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '鲜虾 400g\n' +
                    //         '盐 1g\n' +
                    //         '细砂糖 5g\n' +
                    //         '玉米油 30g\n' +
                    //         '生抽 15g\n' +
                    //         '蒜头 20g',
                    //     cookingSteps:
                    //         '1.准备好所有食材；\n' +
                    //         '2.处理虾，把虾须剪掉，用刀切开虾背，取出虾线，平铺在碟子上；\n' +
                    //         '3.将蒜切碎成蒜蓉，倒入玉米油，微波1000W加热2分钟加热后再加入盐、糖和生抽拌匀即成蒜蓉酱；\n' +
                    //         '4.把蒜蓉酱铺在虾的身上；\n'+
                    //         '5.蒸箱水盒装满水，食材放在碟子里后摆烤架上，把烤架放平板上，蒸汽温度100℃蒸9分钟即可。',
                    //
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '酱香肉末茄子',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:11,
                        range: [9,12,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xBE,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '新鲜鲈鱼1条 400克\n' +
                    //         '红辣椒 3个 \n' +
                    //         '蒜 6瓣\n' +
                    //         '姜 3片\n' +
                    //         '香葱 2根\n' +
                    //         '鱼露 约50克\n' +
                    //         '柠檬 1个挤汁',
                    //     cookingSteps:
                    //         '1.将收拾干净的鲈鱼抹干水分，两面分别割上三刀， 将生姜切薄片，塞到鱼肚子里。\n' +
                    //         '2.将红辣椒、蒜、香葱切碎，然后将鱼露、柠檬汁、辣椒、蒜、香葱倒入一个碗中，拌匀备用；\n' +
                    //         '3.把鱼放蒸鱼碟里，然后把碟子放蒸架上，把蒸架放平板上，关上炉门，水盒加水，选择菜单：清蒸柠檬鲈鱼，启动即可；\n' +
                    //         '4.烹饪结束后，把蒸鱼碟取出，倒掉鱼里面的汤汁，然后趁热浇上搅拌均匀的调味料即可。',
                    //
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '川味鱼香肉丝',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:4.5,
                        range: [4,5,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xBF,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '肋排 500克 \n' +
                    //         '南瓜 500克\n' +
                    //         '蒸肉米粉 150克\n' +
                    //         '酱油 2大勺\n' +
                    //         '鸡精 1勺 \n' +
                    //         '料酒 1大勺\n' +
                    //         '姜丝 1小勺\n' +
                    //         '葱 1根 \n' +
                    //         '麻油 少许\n' +
                    //         '糖 1勺\n' +
                    //         '五香粉 少许',
                    //     cookingSteps:
                    //         '1.将排骨洗净，沥干，切成长3cm小块，用酱油、料酒、糖、葱、姜丝拌匀，腌渍20分钟，期间翻动几次，入味更均匀；\n' +
                    //         '2.把南瓜去皮切2厘米厚，4厘米长的块，均匀垫在大碗的里面；\n' +
                    //         '3.在排骨里面加入五香米粉拌匀，使排骨都裹上一层米粉，然后放入铺了南瓜碗内；\n' +
                    //         '4.把碗放蒸架上，把烤架放平板上，关上炉门，水盒加满水，选择菜单：南瓜粉蒸排骨，启动即可；\n' +
                    //         '5.烹饪结束后拿出撒上葱花即可。' ,
                    //
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '双色剁椒鱼头',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:18,
                        range: [15,21,1]
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:600,
                        range:null
                        // range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xC0,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '鸡肉 适量\n' +
                    //         '姜 3片\n' +
                    //         '盐 1小勺\n' +
                    //         '酱油 1大勺\n' +
                    //         '红枣 3粒\n' +
                    //         '枸杞 5克\n' +
                    //         '植物油 1大勺\n' +
                    //         '香油 1勺\n' +
                    //         '淀粉 1小勺',
                    //     cookingSteps:
                    //         '1.鸡洗净沥干，剁小块，红枣洗净切开，枸杞洗净，然后和鸡块一起加适量盐、酱油、料酒、姜片、淀粉、植物油、香油腌制入味。\n' +
                    //         '2.鸡肉腌制入味后平铺到碟中，把碟子放入蒸架上，烤架置于平板上。\n' +
                    //         '3.关上炉门，水盒加水，选择菜单：红枣枸杞蒸滑鸡，启动即可。\n' +
                    //         '4.烹调结束后即可享用。' ,
                    //
                    // },
                    settingHide: true
                },
            ]

        ]
    },
    {
        title: '吃点营养',  // 首个 title 很重要，决定了是否平铺所有菜。当 title = mode，平铺； 当title = xxx，按分类显示
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '清蒸柠檬鲈鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:12.5,
                        range: [10,14,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x6B,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '娃娃菜 3颗（约500克）\n' +
                    //         '香葱 1根\n' +
                    //         '蒜头 7-8瓣\n' +
                    //         '生抽 1勺\n' +
                    //         '蚝油 半勺\n' +
                    //         '白糖 半勺\n' +
                    //         '植物油 1勺\n' +
                    //         '盐 1勺\n' ,
                    //     cookingSteps:
                    //         '1.娃娃菜掰开，洗净。\n' +
                    //         '2.香葱和蒜头切末，蒜末中拌入生抽、蚝油、植物油和盐调配成酱汁备用。\n' +
                    //         '3.在娃娃菜上淋上步骤2的酱汁，把碟子放入蒸架上，烤架置于平板上。\n' +
                    //         '4.关上炉门，水盒加水，选择菜单：蒜蓉蒸娃娃菜，启动即可。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '南瓜蒸排骨',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:25,
                        range: [21,29,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xC1,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '扇贝 400g(8个)\n' +
                    //         '粉丝 50g\n' +
                    //         '蒜 25g\n' +
                    //         '橄榄油 25g\n' +
                    //         '酱油 10g\n' +
                    //         '料酒 15g',
                    //     cookingSteps:
                    //         '1.准备好所有材料。\n' +
                    //         '2.碗里倒适量橄榄油，倒入切好的蒜末微波1000W加热2分钟，拿出，加入盐和酱油，拌匀备用。\n' +
                    //         '3.扇贝用牙刷刷洗干净，然后用刀子撬掉盖子，将扇贝肉清洗干净，用料酒腌制扇贝肉15分钟。\n' +
                    //         '4.粉丝热水泡软后，放入扇贝壳上，把扇贝肉放在粉丝上，再浇上备好的蒜蓉料汁。\n' +
                    //         '5.蒸箱水盒装满水，食物放在平底碟上，烤架放在平板上，蒸汽温度100℃蒸8分钟。',
                    //
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '日本豆腐蒸虾仁',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:10,
                        range: [8,11,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xC2,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '花甲 100克\n' +
                    //         '沙虾 100克\n' +
                    //         '鱿鱼须 100克\n' +
                    //         '洋葱 半个\n' +
                    //         '胡萝卜 半个\n' +
                    //         '青辣椒 1个\n' +
                    //         '植物油 2勺\n' +
                    //         '咖喱块 2-3块\n' +
                    //         '温开水 200克' ,
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.洋葱和青辣椒切块，胡萝卜切片，鱿鱼须洗净切开，鲜虾剪去虾须，剪开虾背，去虾线，花甲洗净，咖喱块用温水泡开备用。\n' +
                    //         '3.把洋葱和植物油倒入微波适用的大且深的容器中搅拌均匀，放入微波炉底盘，微波1000W火力加热2分钟。\n' +
                    //         '4.取出，加入各种海鲜和蔬菜搅拌均匀，加盖留孔放回微波炉底盘，微波1000W火力加热3分钟。\n' +
                    //         '5.取出，倒入咖喱汁搅拌均匀，放回微波炉底盘，微波1000W火力加热5分钟即可。',
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '豉椒蒸花蛤',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:13,
                        range: [11,15,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xC3,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '五花肉 250g\n' +
                    //         '青尖椒 150g\n' +
                    //         '蒜苗 1根\n' +
                    //         '豆豉 15g\n' +
                    //         '姜片 2片\n' +
                    //         '大蒜 3瓣\n' +
                    //         '盐 2g\n' +
                    //         '豆瓣酱 1勺\n' +
                    //         '老抽 5g\n' +
                    //         '水淀粉 2勺\n' +
                    //         '料酒 1勺\n' +
                    //         '花生油 2勺' ,
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.五花肉切薄片，青红椒洗净斜切段，蒜苗斜切成2cm长的段，姜切小粒，蒜切片，豆豉切碎。\n' +
                    //         '3.五花肉加入蒜片、姜粒、老抽、少许盐和1勺油搅拌均匀，取另外一只碗，加入豆豉碎、豆瓣酱、料酒、生抽、水淀粉、花生油拌匀作为酱汁备用。\n' +
                    //         '4.取一个微波适用的深盘，平铺上五花肉，不加盖放入微波炉底盘，微波高火加热4分钟。\n' +
                    //         '5.取出五花肉，加入青红椒、蒜苗，倒入酱汁拌匀，加盖留孔放入微波炉中，微波1000W火力加热4分钟。' ,
                    // },
                    settingHide: true
                },
            ]

        ]
    },
    {
        title: '吃点营养',  // 首个 title 很重要，决定了是否平铺所有菜。当 title = mode，平铺； 当title = xxx，按分类显示
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '红枣枸杞蒸滑鸡',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:18,
                        range: [15,21,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xC4,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '内脂豆腐 350g\n' +
                    //         '郫县豆瓣酱 50g\n' +
                    //         '猪肉 50g\n' +
                    //         '花椒粒 10颗\n' +
                    //         '花椒粉 1/2茶匙\n' +
                    //         '胡椒粉 1/2茶匙\n' +
                    //         '辣椒粉 1/2茶匙\n' +
                    //         '淀粉 3g\n' +
                    //         '水 27g\n' +
                    //         '生抽 15g\n' +
                    //         '陈醋 10g\n' +
                    //         '香葱 1根\n' +
                    //         '蒜苗 1根'  ,
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.豆腐切成1-2厘米的正方体，猪肉剁碎，蒜苗斜切段，葱切碎，淀粉加水搅拌均匀备用。\n' +
                    //         '3.猪肉末加少许盐、少许水淀粉腌制5分钟；取另外一个碗，放入豆瓣酱、花椒粉、辣椒粉、胡椒粉、生抽、陈醋、水淀粉搅拌均匀做成酱汁。\n' +
                    //         '4.取一只大而且深的盘子，放入豆腐，上面再均匀地平铺肉末，把调好的酱汁浇在豆腐表面，撒上花椒粒和蒜苗段，加盖留孔放入微波炉底盘，微波1000W火力加热5分钟。\n' +
                    //         '5.取出，轻轻拌匀，撒上香葱即可。'  ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '茶树菇蒸牛肉',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:11,
                        range: [9,13,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xC5,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '长豆角 300g\n' +
                    //         '茄子 200g\n' +
                    //         '蒜头 8瓣\n' +
                    //         '生抽 10g\n' +
                    //         '植物油 20g\n' +
                    //         '盐 2g\n' +
                    //         '蚝油 10g\n' +
                    //         '水 10g\n' +
                    //         '小红辣椒 1个\n' +
                    //         '香葱 1根',
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.豆角切切成6cm的段，茄子切成6cm的条状，蒜切末，香葱切段，小红辣椒切圈。\n' +
                    //         '3.取一只碗，放入蒜蓉、生抽、植物油、盐、蚝油、水搅拌均匀，把葱段与红椒圈泡入酱汁中浸泡一会儿备用。\n' +
                    //         '4.准备一个盘子，摆上豆角和茄子段，均匀地浇上酱汁，加盖留孔放入微波炉底盘，微波1000W火力加热6分钟，中途搅拌一次。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '蒜蓉蒸娃娃菜',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:12,
                        range: [10,14,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x6E,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '猪小排 500克\n' +
                    //         '姜片 3片\n' +
                    //         '料酒 1勺\n' +
                    //         '生抽 2勺\n' +
                    //         '米醋 3勺\n' +
                    //         '白糖 4勺\n' +
                    //         '淀粉 半勺\n' +
                    //         '老抽 少许\n' +
                    //         '食盐 适量\n' +
                    //         '番茄酱 2勺\n' +
                    //         '白芝麻 1茶匙' ,
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.猪小排洗净沥干水，加入姜片，料酒、生抽、米醋、白糖、淀粉、老抽、番茄酱抓匀，腌制15分钟。\n' +
                    //         '3.微波适用盘中加入腌制排骨，加盖留孔，放入微波炉底盘，微波1000W火力加热5分钟。\n' +
                    //         '4.取出，加入100g水，加盖留孔，放入微波炉底盘，微波1000W火力加热5分钟后，转微波500W火力继续加热10分钟。\n' +
                    //         '5.最后按照个人口味调入食盐并撒入熟芝麻即可。',
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '日式茶碗蒸',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:21,
                        range: [17,24,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xC6,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '干榛蘑 50g\n' +
                    //         '鸡肉 400g\n' +
                    //         '料酒 8g\n' +
                    //         '花椒粉 2g\n' +
                    //         '盐 3g\n' +
                    //         '生抽 8g\n' +
                    //         '大蒜 3瓣\n' +
                    //         '姜 2片\n' +
                    //         '陈醋 6g\n' +
                    //         '大葱 40g\n' +
                    //         '香葱 1根\n' +
                    //         '植物油 5g' ,
                    //     cookingSteps:
                    //         '1.准备好所有材料。\n' +
                    //         '2.榛蘑干用水冲冲去表面沙尘，用水提前12-24小时充分泡发，水不要倒掉，姜、蒜切末，鸡肉剁小块，香葱切碎，大葱斜切成片。\n' +
                    //         '3.鸡块加入料酒、1/2茶匙盐、生抽、花椒粉、姜蒜末和植物油搅拌均匀，腌制15分钟左右；取泡榛蘑的水300g，加入陈醋和1小茶匙盐搅拌均匀（如果水不够，可以适量加入部分清水）。\n' +
                    //         '4.汤盅中放入挤了水的榛蘑、鸡肉，加入切片的大葱，倒入步骤4调好的榛蘑水，加盖留孔放入微波炉中，微波1000W 加热10分钟后转微波500W火力再炖20分钟。\n' +
                    //         '5.炖好之后，取出，撒上葱花。' ,
                    // },
                    settingHide: true
                },
            ]

        ]
    },
    {
        title: '吃点花样',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '椒盐烤虾',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:10,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x76,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '牛排 300克\n' +
                    //         '盐 3克\n' +
                    //         '黄油 5克',
                    //     cookingSteps:
                    //         '1.牛排解冻到常温，洗去血水，沥干水份。\n' +
                    //         '2.在牛排上涂抹盐和黄油。\n' +
                    //         '3.选择菜单预热，预热结束后，将烤架放入微波炉1层，关上炉门，按启动键开始烹饪。',
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '蜜汁鸡中翅',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:25,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x79,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '鳕鱼块 3块\n' +
                    //         '盐 少许\n' +
                    //         '胡椒粉 少许',
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.鳕鱼冲洗干净，用厨房纸吸干水分，两面均匀撒上胡椒粉，抹上盐，腌10分钟左右，让鳕鱼更加的入味。\n' +
                    //         '3.烤盘铺上锡纸，在锡纸上刷上一层油（配方外），腌好的鳕鱼放在锡箔纸上，在鳕鱼两面刷上一层薄油。\n' +
                    //         '4.选择自动菜单预热，预热结束后，把烤盘放入烤箱中层，关上炉门，刷上食用油继续烤至程序结束。',
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '芝士奶油焗番薯',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:25,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xC7,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '虾 500克\n' +
                    //         '大蒜 3颗\n' +
                    //         '玉米油 10克\n' +
                    //         '糖 5克\n' +
                    //         '料酒 10克\n' +
                    //         '盐 10克\n' +
                    //         '椒盐 10克',
                    //     cookingSteps:
                    //         '1.取出虾洗净，去虾线。\n' +
                    //         '2.用大蒜、盐、料酒、玉米油、糖与虾搅拌均匀，放置30分钟。\n' +
                    //         '3.选择自动菜单预热，同时把虾用竹签串成4串，烤盘上铺上锡箔纸，放上虾串。\n' +
                    //         '4.预热结束后，将烤盘置于微波炉第2层，烹调结束后，取出即可。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '巴西烤鸡肉串',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:15,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xC8,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '排骨（7-8cm） 500g\n' +
                    //         '烤肉酱 50g\n' +
                    //         '洋葱 50g',
                    //     cookingSteps:
                    //         '1.准备好所有材料。\n' +
                    //         '2.肋排切成约7-8厘米的段，洗干净后用厨房纸巾吸干多余水分，洋葱切条。\n' +
                    //         '3.把洋葱放入排骨里，加入所有调味料，戴上一次性手套，充分揉匀，封上保鲜膜放在冰箱冷藏腌制半天或者过夜。\n' +
                    //         '4.把腌好的排骨放在锡纸上，放入烤盘中。\n' +
                    //         '5.选择自动菜单预热，预热结束后，把烤盘放入到第1层。\n' +
                    //         '6.蚝油、蜂蜜、油按照2：2：1混合均匀（分量外）。\n' +
                    //         '7.剩余烹饪时间5分钟时，倒掉多余的汁水，然后用刷子在排骨表面刷上蚝油蜜汁，放回炉子内继续烹饪至结束即可。' ,
                    // },
                    settingHide: true
                },
            ]

        ]
    },
    {
        title: '吃点花样',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '黑椒牛排',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:20,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:250,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xC9,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '扇贝 6个\n' +
                    //         '大蒜 6瓣\n' +
                    //         '油 3汤勺\n' +
                    //         '盐 少许' ,
                    //     cookingSteps:
                    //         '1.准备好所有材料。\n' +
                    //         '2.大蒜捣成蒜泥，加入植物油和盐，用微波100%火力热1分钟。\n' +
                    //         '3.扇贝肉洗干净后，用厨房纸巾吸干水分，加入热好的蒜蓉腌制15分钟。\n' +
                    //         '4.把腌制好的扇贝肉重新装在洗干净的扇贝壳上，放在垫了锡纸的烤盘上。\n' +
                    //         '5.选择自动菜单预热，预热结束后，把烤盘放入到第2层。扇贝烤好后取出，撒上适量葱花即可。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '香烤秋刀鱼',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:20,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xCA,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '鸡翅中 12个\n' +
                    //         '酱油 20mL\n' +
                    //         '盐 8g\n' +
                    //         '大蒜粉 少许\n' +
                    //         '黑胡椒 适量\n' +
                    //         '蜂蜜 少许' ,
                    //     cookingSteps:
                    //         '1.鸡翅洗净，用厨房纸洗去水分，用酱油、盐、大蒜粉、黑胡椒拌匀腌制3-4小时。\n' +
                    //         '2.选择自动菜单预热，腌制好的鸡翅排放在垫有烘焙纸或锡箔纸的烤盘里。\n' +
                    //         '3.预热结束后，将烤盘置于微波炉第1层，烹调结束后，取出即可。'  ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '韩式鱿鱼须',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:8,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xCB,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '玉米 3根\n' +
                    //         '孜然 10g\n' +
                    //         '植物油 1汤勺\n' +
                    //         '盐 少许' ,
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.玉米洗干净，切成约4厘米的段。\n' +
                    //         '3.把全部调味料放入碗中，混合均匀。\n' +
                    //         '4.玉米段放在垫了锡纸的烤盘中，用毛刷在玉米表面均匀地刷上调料。\n' +
                    //         '5.选择自动菜单预热，预热结束后，把烤盘放入炉子中第1层，烹饪结束后，取出即可。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '烤风味蔬菜串',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:16,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xCC,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '小土豆 8个\n' +
                    //         '盐 10g\n' +
                    //         '橄榄油 1茶匙\n' +
                    //         '香芹碎 1茶匙\n' +
                    //         '迷迭香 1茶匙' ,
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.小土豆洗净后不用去皮，放玻璃碗里，碗里加5g盐和500ml水，放入洗净的小土豆，盖上盖子选择微波100%火力煮5分钟左右，焖10分钟，到小土豆变软，用牙签可以插入即可。\n' +
                    //         '3.取出小土豆，沥干水分（也可以用厨房纸巾吸干水分，更省时）。在烤盘上的油纸，刷一层橄榄油，放上小土豆。\n' +
                    //         '4.用压土豆工具把小土豆纵向、横向都压一下，稍微压扁。\n' +
                    //         '5.在压开花的土豆表面，刷一层橄榄油，均匀撒上一层黑胡椒碎、香芹碎、迷迭香碎、盐\n' +
                    //         '6.选择自动菜单预热，预热结束后，把烤盘放入炉子中第1层。在最后几分钟注意观察颜色，表面金黄，微微有点焦即可停止。' ,
                    // },
                    settingHide: true
                },
            ]

        ]
    },
    {
        title: '吃点玩趣',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '蔓越莓曲奇',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:12,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x39,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '红薯 2个\n' +
                    //         '黄油 10g\n' +
                    //         '牛奶 25g\n' +
                    //         '砂糖 10g\n' +
                    //         '马苏里拉芝士碎 35g',
                    //     cookingSteps:
                    //         '1.将红薯用微波炉高火加热约10分钟，红薯熟透后，将其对半切开，将红薯肉挖出，保留外皮不要弄破。\n' +
                    //         '2.将红薯肉压成泥，加入黄油，牛奶和砂糖混合均匀，再将薯泥放入到外皮中，撒上马苏里拉芝士碎。\n' +
                    //         '3.选择菜单预热，预热结束后，把烤盘放入第2层，烘烤结束后即可取出。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '斑马纹戚风蛋糕',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:50,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x86,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '番茄 半个\n' +
                    //         '洋葱 30g\n' +
                    //         '猪肉末 50g\n' +
                    //         '番茄酱 100g\n' +
                    //         '水 100g\n' +
                    //         '盐 1小勺\n' +
                    //         '马苏里拉芝士 100g',
                    //     cookingSteps:
                    //         '1.准备好所有材料。\n' +
                    //         '2.番茄、洋葱分别切成小丁。\n' +
                    //         '3.玻璃碗内加入洋葱用微波100%火力加入30秒，接着加入猪肉末继续加热1分钟，再倒入番茄丁继续加热2分钟。然后倒入水，加入盐、番茄酱、罗勒叶和黑胡椒，继续加热待浓稠后就可以关火盛出备用。\n' +
                    //         '4.烧一锅水，水开后，加入一点盐（配方外），然后放入意粉，盖上锅盖使用微波100%火力加入8分钟，用凉开水冲洗后沥干，拌入少许橄榄油。\n' +
                    //         '5.把意粉与肉酱放在一起搅拌均匀，放在耐高温烤盘中，再在上面铺厚厚一层马苏里拉芝士。\n' +
                    //         '6.选择自动菜单预热，预热结束后，把陶瓷烤盘连同烤架放入第1层，关上炉门，开始烘烤，表面芝士融化、微微焦黄即可。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '法式焦糖布丁',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:30,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x87,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '三文鱼 300g\n' +
                    //         '柠檬 1个\n' +
                    //         '圣女果 5个\n' +
                    //         '盐 3g\n' +
                    //         '黑胡椒 1g\n' +
                    //         '橄榄油 1小勺\n' +
                    //         '淡奶油 50g\n' +
                    //         '紫甘蓝 50g\n' +
                    //         '马苏里拉芝士 100g',
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.将西兰花切成小块，放入煮沸的水中汆1分钟左右捞出，浸泡在冰水\n' +
                    //         '3.将三文鱼切成小块，圣女果对半切开，紫甘蓝切丝，柠檬切半，一半榨汁，另一半切成圆片备用。\n' +
                    //         '4.三文鱼加入1/2柠檬汁、3g盐和1g黑胡椒碎调味备用。淡奶油加入紫甘蓝丝、剩下的柠檬汁和水，搅拌至顺滑的酱汁。\n' +
                    //         '5.在耐高温陶瓷烤碗中刷一层橄榄油（配方内），放入圣女果、西兰花，加3g盐和1g黑胡椒碎、橄榄油搅拌均匀，接着均匀的放入三文鱼块。\n' +
                    //         '6.然后均匀地放上柠檬片、淋上紫甘蓝奶油酱汁，再撒满马苏里拉芝士碎。\n' +
                    //         '7.选择自动菜单预热，预热结束后，把陶瓷烤盘连同烤架放入第1层，关上炉门，开始烘烤，表面芝士融化、微微焦黄即可。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '牛角面包',
                    //'ellipsisText':'芝士焗海鲜千...', // Giggs，当菜名超过7个字，为了避免遮挡或超宽，要增加 ellipsisText 属性作为过渡
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:17,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x38,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '三文鱼 150g\n' +
                    //         '白蘑菇 35g\n' +
                    //         '洋葱 50g\n' +
                    //         '大虾 8只\n' +
                    //         '水浸金枪鱼 80g\n' +
                    //         '千层面面皮 6片\n' +
                    //         '番茄酱 100g\n' +
                    //         '马苏里拉芝士 60g\n' +
                    //         '黄油 25g \n' +
                    //         '低筋面粉 15g\n' +
                    //         '纯牛奶 250g ' ,
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.蘑菇和洋葱切碎，大虾焯熟后剥壳，三文鱼切片。\n' +
                    //         '3.热锅里加入10g黄油，完全融化后，加入低筋面粉翻炒均匀。\n' +
                    //         '4.边搅拌边慢慢牛奶，煮开后，不断搅拌以小火熬煮成浓稠的奶油白酱 。\n' +
                    //         '5.千层面片以沸水煮4分钟左右至8成熟，捞出冲冷水备用。\n' +
                    //         '6.热锅后加入15g黄油融化后，把洋葱粒、蘑菇粒炒香后，加入大虾煎香，再加入三文鱼、金枪鱼、番茄酱，小火煮至三文鱼变色即可。\n' +
                    //         '7.先铺一层千层（2张为1层）面皮在耐高温陶瓷烤碗里，然后铺上一层炒好的海鲜馅料。\n' +
                    //         '8.在馅料上抹上一层奶油白酱，撒一层马苏里拉芝士。\n' +
                    //         '9.重复上面的千层面皮-海鲜馅-奶油白酱-芝士-千层面皮，最后撒上马苏里拉芝士。\n' +
                    //         '10.选择自动菜单预热，预热结束后，把陶瓷烤盘连同烤架放入第1层，关上炉门，开始烘烤，表面芝士融化、微微焦黄即可。' ,
                    // },
                    settingHide: true
                },
            ]

        ]
    },
    {
        title: '吃点玩趣',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '意式薄底披萨',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:20,
                        range: [31,39,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xCD,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '雪梨 2个\n' +
                    //         '冰糖 50克\n' +
                    //         '水 1000克',
                    //     cookingSteps:
                    //         '1.雪梨洗净，去皮去核，切小块。\n' +
                    //         '2.除冰糖外将上述食材一起放入大而深的宽口微波适用容器中，加盖放入微波炉中，关门；\n' +
                    //         '3.选择菜单：冰糖雪梨，启动即可。\n' +
                    //         '4.最后剩余5分钟时加入冰糖即可。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '葡式蛋挞',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:20,
                        range: [36,44,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x26,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '干银耳 10-15g\n' +
                    //         '水 1200g\n' +
                    //         '鲜莲子 100g\n' +
                    //         '冰糖 适量',
                    //     cookingSteps:
                    //         '1.干银耳用清水充分泡发（约3-4个小时）后洗净去蒂，切小块，沥干备用。\n' +
                    //         '2.莲子洗净（不喜欢苦味的可以去掉莲心）。\n' +
                    //         '3.微波适用锅中加入银耳、莲子和水，加盖或盖保鲜膜留孔，放微波炉中，关上炉门，选择菜单后开始烹饪。\n' +
                    //         '4.听到提示音后，取出，加入冰糖，加盖，放入微波炉中继续烹饪，待烹调结束即可享用。'  ,
                    // },
                    settingHide: true
                },
            ]

        ]
    },
    {
        title: '吃点滋补',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '冰糖雪梨饮',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:35,
                        range: [31,39,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xCE,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '全脂牛奶 250g\n' +
                    //         '蛋清 90g\n' +
                    //         '糖粉 10g',
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.倒出20ml的鲜奶，蒸箱水盒装满水，鲜奶放在蒸盘上，放入蒸箱下层，蒸汽温度100摄氏度蒸8分钟。\n' +
                    //         '3.蒸好的牛奶放凉后牛奶表面起皮，用牙签在碗壁划一条缝，倒出牛奶，碗底留少许奶与奶皮（形成第一层奶皮）。\n' +
                    //         '4.蛋清稍稍搅打一下，将蛋清与剩余的牛奶混合，加入糖粉搅拌均匀。\n' +
                    //         '5.将混合好的牛奶蛋液过滤掉泡沫。\n' +
                    //         '6.将过滤好的蛋奶液慢慢的延碗边缘倒进刚刚留奶皮的碗里，盖上保鲜膜。\n' +
                    //         '7.蒸箱水盒装满水，食物放在烤架上，放入平板上，蒸汽温度100℃蒸15分钟，时间结束后，再利用热气在蒸箱中焖上3分钟，出炉就能吃了。',
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '椰汁木瓜露',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:35,
                        range: [31,39,1]
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xCF,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '油皮部分：中筋面粉 150g\n' +
                    //         '油皮部分：猪油 61g\n' +
                    //         '油皮部分：细砂糖 34g\n' +
                    //         '油皮部分：水 60g\n' +
                    //         '油酥部分：抹茶粉 4g\n' +
                    //         '油酥部分：低筋面粉 56g\n' +
                    //         '油酥部分：猪油 32g',
                    //     cookingSteps:
                    //         '1.油酥制作：把油酥材料充分揉匀至无干粉颗粒的团状，面团盖上保鲜膜备用。\n' +
                    //         '2.水油皮制作：放进搅拌桶，搅拌至面团能出不容易破的薄膜。水油皮面团滚圆后，盖上保鲜膜，室温放置1小时以上来松弛。\n' +
                    //         '3.咸蛋黄放在垫了锡纸/油纸的烤盘上，放入预热了的烤箱中层，以180℃烤7分钟左右至熟，微微出油状态即可取出，放凉备用。把豆沙分成8等份，每份25克，咸蛋黄放到豆沙中，揉圆，依次完成所有，把豆沙蛋黄馅盖好保鲜膜备用。\n' +
                    //         '4.抹茶油酥团分别分成4等份，盖上保鲜膜；松弛好的水油皮抹茶油酥，1份分成4等份，盖上保鲜膜。\n' +
                    //         '5.取出一份大的油皮，包入一个绿色的油酥，包的过程中，用虎口慢慢的向上推，直到全部包裹好，捏紧收口后稍微揉圆，收口向下放好。\n' +
                    //         '6.取出一个抹茶面团，用擀面杖擀成牛舌状，约手掌的长度。从下往上端卷起来，收口朝下，盖好保鲜膜。\n' +
                    //         '7.用同样的方法，卷好所有面团，每包好一个面团都需要盖好保鲜膜，静止松弛15分钟。\n' +
                    //         '8.取出一份抹茶面团，用擀面杖再次擀成长牛舌状，约1-2个手掌的长度。从下往上端卷起来，收口朝下，盖好保鲜膜。\n' +
                    //         '9.取一份抹茶面团，用比较锋利的刀从中间切开，切面比较漂亮。注意，只有有色面团才需要对半切开，原味面团不需要。将切面朝上，用手掌按扁， 用擀面杖擀成中间稍厚，边缘稍微薄的圆片，尽量擀边缘，不要过分擀中间的面团，否则成品不酥了。\n' +
                    //         '10.翻面后，把豆沙蛋黄馅放在中间。\n' +
                    //         '11.用虎口向上推，保持馅在面团的中心点，最后包紧收口，防止烤制过程中爆豆沙。每包好一个酥饼，都需要用保鲜膜封好。把包好的放进烤盘中。\n' +
                    //         '12.选择自动菜单预热，预热结束后，把烤盘放进第1层，烹饪结束后，取出即可。',
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '银耳莲子羹',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:40,
                        range: [36,44,1]
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0x8A,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '油皮部分：中筋面粉 150g\n' +
                    //         '油皮部分：猪油 61g\n' +
                    //         '油皮部分：细砂糖 34g\n' +
                    //         '油皮部分：水 60g\n' +
                    //         '油酥部分：低筋面粉 56g\n' +
                    //         '油酥部分：猪油 32g',
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.咸蛋黄放在垫了锡纸/油纸的烤盘上，放入预热了的烤箱中层，以180℃烤7分钟左右至熟，微微出油状态即可取出，放凉备用。\n' +
                    //         '3.将油皮的所有材料中的面粉、常温软化的猪油、糖、水放入搅拌桶里，揉成一个光滑状态的面团，最好是完全阶段，能拉出手套薄膜最好，放入玻璃碗中，盖好保鲜膜，常温松弛2小时左右。\n' +
                    //         '4.油酥材料混合均匀成团即可，盖好保鲜膜与油皮面团一起松弛。\n' +
                    //         '5.将松弛好的油酥和油皮面团分割每个均等的小剂子，油皮约17g每个，油酥约11g每个。\n' +
                    //         '6.取一个油皮的小剂子擀开成圆薄片，把一个油酥完整的包裹入其中，捏紧收口处。\n' +
                    //         '7.取一个包了油酥的面团，用手掌压扁，用擀面杖上下方向擀开成牛舌状，约1个手掌的长度。将面皮从上往下卷起来。\n' +
                    //         '8.每个都卷好后，收口朝下，盖上保鲜膜松弛15分钟。然后再重复一次，取一个卷好的面团，收口朝上，用擀面杖上下方向擀开成牛舌状，约1-2个手掌的长度，将面皮从上往下卷起来。每个都卷好后，收口朝下，盖上保鲜膜继续松弛15分钟。\n' +
                    //         '9.将红豆沙分成每个25g，然后包入一个咸蛋黄，搓圆备用。\n' +
                    //         '10.把第二次松弛好的油酥皮，收口朝上，用手指在中间按压一道，左右两边向中间折压，用擀面杖擀开成一个薄面团。\n' +
                    //         '11.中间包入蛋黄豆沙团，然后包裹起来，捏紧收口处，整圆，每包好一个蛋黄酥都需要用保鲜膜盖好。\n' +
                    //         '12.包好的蛋黄酥放在垫了油纸的烤盘中，每个蛋黄酥表面都刷上两层蛋黄液，撒上一小撮黑芝麻在顶部装饰。\n' +
                    //         '13.烤箱提前预热至180℃之后，把烤盘放入烤箱中层，以上下管发热模式烤25分钟左右。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '桂圆红枣汤',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:30,
                        range: [27,33,1],
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xD0,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '糯米粉 100克\n' +
                    //         '绵白糖 20克\n' +
                    //         '温水 50克\n' +
                    //         '澄粉 30克\n' +
                    //         '开水 40克\n' +
                    //         '菠菜 50克\n' +
                    //         '熟猪油或食用油 10克\n' +
                    //         '红豆沙 120克' ,
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.水烧开加入一点点盐，菠菜取菜叶洗净，在烧开的水中放入菠菜汆烫变色捞出，放入冷开水中过凉。\n' +
                    //         '3.用料理机打成细泥（越细越好），用细筛滤掉汁水，菠菜泥留用。\n' +
                    //         '4.糯米粉加入绵白糖及温水搅成半湿状，澄粉冲入开水搅成透明状。\n' +
                    //         '5.糯米粉与澄粉混合，趁热加入熟猪油（或者食用油）揉捏均匀。\n' +
                    //         '6.将混合的食材放入容器里，尽量摊薄一点（容易熟），蒸箱水盒装满水，放入蒸烤箱蒸15分钟左右（蒸完可用筷子拨开察看，若内部粉团还是白色的，就再多蒸一会儿；熟透的糯米团呈透明色，热的时候黏度较高）。\n' +
                    //         '7.将过滤出来的菠菜泥加入刚出锅的糯米团中，使劲搅拌使糯米团上色（注意：用的是菠菜泥而不是菠菜汁，若觉得觉得太干，可以适当加一点菠菜汁）。\n' +
                    //         '8.手上抹上一点食用油，将做好的青团坯等分成若干份，每份30克左右，反复揉捏成均匀的青绿色糕团，红豆沙也分成每份20克左右，反复揉捏成均匀的糕团。\n' +
                    //         '9.将红豆沙包入青团坯，操作过程戴手套、抹油。\n' +
                    //         '10.包好的青团表面刷上食用油，以缓解青团变硬，用裁剪好的保鲜膜包裹起来。' ,
                    // },
                    settingHide: true
                },
            ]

        ]
    },
    {
        title: '吃点滋补',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '莲藕排骨汤',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:60,
                        range: [54,66,1]
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xD1,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '鸡蛋 5个\n' +
                    //         '牛奶 60g\n' +
                    //         '低筋面粉 140g\n' +
                    //         '白砂糖 140g\n' +
                    //         '黄油 40g',
                    //     cookingSteps:
                    //         '1.准备好所有食材。\n' +
                    //         '2.将糖、鸡蛋液全部加入盆中，用电动打蛋器隔60℃左右热水高速打发。\n' +
                    //         '3.打发至蛋液颜色变乳白、细腻奶油状，提起打蛋头以蛋液写字，字体不会很快消失即可。\n' +
                    //         '4.将低筋面粉筛入蛋糊中，以刮刀翻拌均匀至无干粉状，翻拌30秒左右即可。\n' +
                    //         '5.黄油牛奶加至微热融化后，均匀地倒在面糊上，以刮刀翻拌均匀至面糊细腻状态，翻拌1分钟左右即可。\n' +
                    //         '6.模具底部、四周提前粘好油纸，将面糊倒进去，微震将气泡震出。\n' +
                    //         '7.选择自动菜单预热，预热结束后，把烤盘放进第1层，烹饪结束后，取出即可。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '无花果瘦肉汤',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:50,
                        range: [45,55,1]
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xD2,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '黄油 125g\n' +
                    //         '糖粉 70g\n' +
                    //         '全蛋液 25g\n' +
                    //         '低筋面粉 170g\n' +
                    //         '奶粉 9g\n' +
                    //         '蔓越莓干 50g',
                    //     cookingSteps:
                    //         '1.将黄油与糖粉混合均匀，用打蛋器打发至发白，加入鸡蛋液，继续打发至灰白色。\n' +
                    //         '2.筛入低筋面粉，用刮刀混合均匀，再加入蔓越莓干，混合均匀。\n' +
                    //         '3.将面糊放入长方体曲奇模具中，冷藏2小时以上。\n' +
                    //         '4.将冷藏好的曲奇取出，切成5mm厚的正方形，排列在烤盘上。\n' +
                    //         '5.选择菜单预热。预热结束后，将烤盘放到第2层，烘烤约15分钟，取出晾凉即可。' ,
                    // },
                    settingHide: true
                },

            ]

        ]
    },
    {
        title: '涨点小知识',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '酸奶发酵',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:360,
                        range: [1,60,1,65,120,5,130,480,10]
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xD5,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '冷冻蛋挞皮 9个\n' +
                    //         '纯牛奶 180g\n' +
                    //         '细砂糖 30g\n' +
                    //         '蛋黄 2个\n' +
                    //         '炼乳 30g\n' +
                    //         '低筋面粉 10g',
                    //     cookingSteps:
                    //         '1.挞皮放在烤盘里解冻20min。\n' +
                    //         '2.细砂糖加入到牛奶中搅拌均匀至溶化。\n' +
                    //         '3.加入蛋黄、炼乳搅拌均匀后，筛入低筋面粉，搅拌均匀。\n' +
                    //         '4.过筛制成挞水备用。\n' +
                    //         '5.将过筛的挞水装入挞皮中，装到八分满即可。\n' +
                    //         '6.选择菜单预热，将烤架置于微波炉第1层，关上炉门，按启动键开始烹饪。',
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '面团发酵',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:50,
                        range: [1,90,1]
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xD4,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '黄油 100g\n' +
                    //         '糖 100g\n' +
                    //         '低筋面粉 100g\n' +
                    //         '泡打粉 5g',
                    //     cookingSteps:
                    //         '1.准备所有食材。\n' +
                    //         '2.黄油室温软化后，加入糖粉，用刮刀稍微刮均匀，用电动打蛋器打至黄油稍发白、体积变大。\n' +
                    //         '3.分3次加入常温的蛋液，每次都打发至黄油与蛋液彻底融合，再加入下一次蛋液，搅拌至黄油和蛋液充分融合。\n' +
                    //         '4.低粉、泡打粉混合，过筛三次，加入打发好的黄油里，用刮刀切拌至无干粉状态。\n' +
                    //         '5.分三次加入百香果汁，每次都彻底拌匀再加入下一次，切拌好的面糊细腻，有光泽，把面糊装入裱花袋中，放入冰箱冷藏1小时左右。\n' +
                    //         '6.模具涂上一层薄薄的黄油（配方外）后，均匀地在四周撒上一层薄面粉，把多余的面粉倒掉。\n' +
                    //         '7.把冷藏好的面糊，挤入模具中。\n' +
                    //         '8.选择菜单预热，将烤架置于微波炉第1层，关上炉门，按启动键开始烹饪，烘烤结束，立即脱模，开始享受美味吧。' ,
                    // },
                    settingHide: true
                },
                {
                    'icon': '',
                    'text': '黄油软化',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:2.5,
                        range: [1,10,1]
                    },
                    temperature:{
                        set: false,
                        default:0,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    weight:{
                        set:false,
                        default:100,
                        range:[100,400,100],
                    },
                    recipeId:{
                        set:false,
                        default: 0xD3,
                        range:null
                    },
                    // detail: {
                    //     foodMaterial:
                    //         '黄油 100g\n' +
                    //         '糖 100g\n' +
                    //         '低筋面粉 100g\n' +
                    //         '泡打粉 5g',
                    //     cookingSteps:
                    //         '1.准备所有食材。\n' +
                    //         '2.黄油室温软化后，加入糖粉，用刮刀稍微刮均匀，用电动打蛋器打至黄油稍发白、体积变大。\n' +
                    //         '3.分3次加入常温的蛋液，每次都打发至黄油与蛋液彻底融合，再加入下一次蛋液，搅拌至黄油和蛋液充分融合。\n' +
                    //         '4.低粉、泡打粉混合，过筛三次，加入打发好的黄油里，用刮刀切拌至无干粉状态。\n' +
                    //         '5.分三次加入百香果汁，每次都彻底拌匀再加入下一次，切拌好的面糊细腻，有光泽，把面糊装入裱花袋中，放入冰箱冷藏1小时左右。\n' +
                    //         '6.模具涂上一层薄薄的黄油（配方外）后，均匀地在四周撒上一层薄面粉，把多余的面粉倒掉。\n' +
                    //         '7.把冷藏好的面糊，挤入模具中。\n' +
                    //         '8.选择菜单预热，将烤架置于微波炉第1层，关上炉门，按启动键开始烹饪，烘烤结束，立即脱模，开始享受美味吧。' ,
                    // },
                    settingHide: true
                },
            ]

        ]
    },
];

export default data;