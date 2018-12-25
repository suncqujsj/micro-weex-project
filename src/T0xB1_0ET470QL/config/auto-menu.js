/**
 * Created by sf
 * 2018/10/20
 */
let data = [
    {
        title: '所有人群',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '翻热',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:20,
                        range: null
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:2,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x51,
                        range:null
                    },
                    detail: null,
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                },
                {
                    'icon': '',
                    'text': '全麦核桃包',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:10,
                        range:null
                    },
                    temperature:{
                        set: false,
                        default:175,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: true
                    },
                    steamAmount:{
                        set:false,
                        default:4,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x52,
                        range:null
                    },
                    settingHide:true,// 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'面包粉 175克 \n' +
                        '全麦粉 75克 \n' +
                        '香葱 1克 \n' +
                        '干酵母 2.5克 \n' +
                        '糖 20克 \n' +
                        '盐   4.5g\n' +
                        '水    165克\n' +
                        '橄榄油  125克\n'+
                        '葡萄干 25克 \n' +
                        '蔓越莓干 25克 \n' +
                        '核桃仁 25克 \n' +
                        '表面装饰 面包粉 \n' ,
                        cookingSteps:'1.准备好食材，室温软化黄油 \n'+
                        '2.将高筋面粉、全麦粉、酵母、糖、盐一起搅拌均匀后备用 \n'+
                        '3.将全蛋、水倒入面粉中搅拌至面团光滑 \n'+
                        '4.将软化好的黄油放入面团中搅拌均匀后，加入核桃碎拌匀 \n'+
                        '5.将面团放入搅拌机中打发至面筋完全扩展，手撑起时如纸般薄片透明 \n'+
                        '6.取出面团放于案板上，搓成圆团后盖上保鲜膜松弛30分钟 \n'+
                        '7.将松弛好的面团分割成每个200g揉圆后松弛15分钟'+
                        '8.将松弛好的面团整形成自己想要的形状，用烤箱发酵模式进行发酵60分钟 \n'+
                        '9.将烤箱预热至上下管170度 \n'+
                        '10.将发酵好的面包置于烤炉中烘焙约25分钟 \n'+
                        '11.烘焙完成，取出即可'
                    },
                },
                {
                    'icon': '',
                    'text': '菌菇烤鸡胸肉',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:40,
                        range:null
                    },
                    temperature:{
                        set: false,
                        default:175,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:1,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x53,
                        range:null
                    },
                    settingHide:true,
                    detail: {
                        foodMaterial:'鸡胸肉 250克 \n' +
                        '口蘑 100克 \n' +
                        '香菇 100克 \n' +
                        '洋葱 125克 \n' +
                        '黄油 20克 \n' +
                        '牛奶   125g\n' +
                        '面粉    10克\n' +
                        '淡奶油  50克\n',
                        cookingSteps:'1.鸡胸肉抹上黑胡椒和盐腌制一下，放烤盘中备用 \n'+
                        '2.蘑菇切片，洋葱切丝 \n'+
                        '3.热锅下油，把洋葱炒至金黄再下蘑菇，炒香 \n'+
                        '4.菜挪开一边，下黄油，热了之后炒面粉，然后倒入牛奶和奶油搅拌 \n'+
                        '5.材料都搅拌均匀，加入盐和黑胡椒调味 \n'+
                        '6.铺在鸡胸肉上面 \n'+
                        '7.预热200度，放入烤箱中 \n'+
                        '8.烤箱175度烤45分钟 '
                    },
                },
                {
                    'icon': '',
                    'text': '牛角面包',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:10,
                        range:null
                    },
                    temperature:{
                        set: false,
                        default:165,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: true
                    },
                    steamAmount:{
                        set:false,
                        default:1,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x54,
                        range:null
                    },
                    settingHide:true,
                    detail: {
                        foodMaterial:'高筋粉 250克 \n' +
                        '低筋粉 50克 \n' +
                        '清水 150ML \n' +
                        '奶粉 15克 \n' +
                        '无盐黄油 15克 \n' +
                        '鸡蛋液 30克\n' +
                        '酵母 3克\n' +
                        '白砂糖40克\n',
                        cookingSteps:'1.准备好所有材料。end'+
                        '2.将所有材料除黄油外倒入面包机内筒，搅拌和面程序。end'+
                        '3.揉成比较光滑的面团，把黄油放入，继续揉面至扩展阶段。end'+
                        '4.第一次发酵到原来的2-2.5倍大，约45分钟。end'+
                        '5.用手轻轻将面团挤压，排除气泡。将面团分割两份，取其一块，擀成薄厚均匀的面片，切去边角，分成等腰三角形面片。end'+
                        '6.由三角形面片底边往尖头部分，卷起呈牛角状。面包生坯整理好，排入垫了油纸的烤盘，在35度、湿度85%的空间，进行第2次发酵至2倍左右，约40分钟。end'+
                        '7.发酵完成后，在表面刷上一层鸡蛋液。end'+
                        '8.上下烘烤模式，烤箱180度预热好后，把面包放入中层。end'+
                        '9.15分钟烘烤至上色即可。',
                    },
                },
            ],
        ]
    },
    {
        title: '所有人群',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '香烤啤酒鸡',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:72,
                        range:null
                    },
                    temperature:{
                        set: false,
                        default:185,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:1,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x55,
                        range:null
                    },
                    settingHide:true,
                    detail: {
                        foodMaterial:'鸡 1000克 \n' +
                        '啤酒 1罐 \n' +
                        '香葱 1克 \n' +
                        '西葫芦 1根 \n' +
                        '灯笼椒 1个 \n' +
                        '柠檬 1个\n' +
                        '洋葱 1个\n' +
                        '蒜 2瓣\n'+
                        '大葱 1根 \n' +
                        '香菜 2根 \n' +
                        '松子 30克 \n' +
                        '辣椒粉 2茶匙 \n'+
                        '迷迭香 2支\n' +
                        '橄榄油 20毫升\n'+
                        '盐 适量 \n' +
                        '胡椒碎 适量\n' ,
                        cookingSteps:'1.主要材料备齐；end'+
                        '2.整鸡去除颈部头部及鸡脚后，整鸡刷上橄榄油、辣椒粉，均匀撒上盐和胡椒碎；end'+
                        '3.接着洋葱切块，西葫芦和灯笼椒切块备用；end'+
                        '4.打开啤酒罐，倒出半罐啤酒，接着在啤酒罐中加入迷迭香和2个拍碎的蒜瓣；end'+
                        '5.接着将啤酒罐从鸡尾部插入鸡胸腔，向上放入烤盘中，接着填入洋葱块、西葫芦块、红椒块；end'+
                        '6.蔬菜上淋上橄榄油、盐和胡椒粉调味；end'+
                        '7.烤箱预热至180℃之后，将烤盘放入烤箱，以180度上下火烤40-45分钟。期间观察烘烤的情况，如喜欢口感清爽的蔬菜，可将蔬菜与鸡分开烘烤，蔬菜用较短的时间完成也可；end'+
                        '8.将葱、香菜与松子放入烤好的蔬菜，柠檬切角，淋上柠檬汁、盐、胡椒粉充分混合；end'+
                        '9.烤好的鸡静置5-10分钟后，将鸡按需切块摆盘后就可以享用了。',
                    },
                }, 
                {
                    'icon': '',
                    'text': '草莓纸杯蛋糕',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:41,
                        range:null
                    },
                    temperature:{
                        set: false,
                        default:150,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:1,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x56,
                        range:null
                    },
                    settingHide:true,
                    detail: {
                        foodMaterial:'黄油 60克 \n' +
                        '白油 90克 \n' +
                        '糖粉 150克 \n' +
                        '高筋面粉 150克 \n' +
                        '泡打粉 1克 \n' +
                        '盐 3克 \n' +
                        '全蛋 150克 \n' +
                        '牛奶 15克 \n' ,
                        cookingSteps:'1.将所有的食材准备好，室温软化黄油end'+
                        '2.将糖粉、盐加入软化好的黄油中搅拌均匀打发至乳白色end'+
                        '3.将打散鸡蛋分三次依次加入打发好的黄油中搅拌均匀end'+
                        '4.将高筋面粉过筛加入拌匀的食材中再进搅拌均匀end'+
                        '5.将牛奶分两次加入拌匀的面糊中end'+
                        '6.将拌好的面糊倒入纸杯中，7-8分满备用end'+
                        '7.将烤箱上下管预热至175度end'+
                        '8.将装好的纸杯放入烤盘，置入已预热好的烤箱，烘焙约18分钟end'+
                        '9.烘焙完成，取出即可',
                    },
                }, 
                {
                    'icon': '',
                    'text': '牛肉披萨',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:10,
                        range:null
                    },
                    temperature:{
                        set: false,
                        default:210,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: true
                    },
                    steamAmount:{
                        set:false,
                        default:1,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x57,
                        range:null
                    },
                    settingHide:true,
                    detail: null
                }, 
                {
                    'icon': '',
                    'text': '地中海柠檬烤鱼',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:30,
                        range:null
                    },
                    temperature:{
                        set: false,
                        default:170,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:3,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x58,
                        range:null
                    },
                    settingHide:true,
                    detail: {
                        foodMaterial:'鲈鱼 1条约650g \n' +
                        '大蒜 1头 \n' +
                        '海盐 1小匙 \n' +
                        '黑胡椒碎粒 少许  \n' +
                        '白葡萄酒 3大匙 \n' +
                        '橄榄油 适量 \n' +
                        '柠檬 1个 \n' +
                        '迷迭香 1枝 \n'+ 
                        '百里香 1枝 \n' ,
                        cookingSteps:'1.准备材料。鲈鱼洗净擦干，备用。end'+
                        '2.鱼身各划2刀。end'+
                        '3.里里外外抹上盐和黑胡椒碎粒(包含肚子)。end'+
                        '4.鱼肚子放入迷迭香和百里香，包上保鲜膜放入冰箱冷藏室腌渍1小时左右，使之入味均匀。end'+
                        '5.蒜拦腰对半切开，不需要去除外皮。end'+
                        '6.油锅烧热，放入蒜，切面朝下，煎至金黄，熄火。end'+
                        '7.柠檬外皮用盐揉一下，清水冲洗干净，1/2个柠檬切成片。end'+
                        '8.烤盘上铺锡纸，先刷一层橄榄油，垫2〜3片柠檬片，放上腌渍好的鲈鱼，在鲈鱼身上铺上2〜3片柠檬片，淋上橄榄油，煎好的蒜也放在鱼身周围。end'+
                        '9.将锡纸两端提起，往中间捏紧，捏成锡纸包鱼。end'+
                        '10.烤箱以上下火模式、200℃预热好后，将鲈鱼放入烤箱中层。end'+
                        '11.烘烤25分钟。end'+
                        '12.烘烤结束后取出烤盘，打开捏紧的锡纸， 食用前挤适量柠檬汁为鱼提鲜。'
                    },
                }, 
            ],

        ]
    },
    {
        title: '所有人群',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '苹果烤猪排',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:40,
                        range:null
                    },
                    temperature:{
                        set: false,
                        default:160,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:2,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x59,
                        range:null
                    },
                    settingHide:true,
                    detail: {
                        foodMaterial:'猪排 300g \n' +
                        '烧烤酱 50克 \n' +
                        '黑胡椒碎粒 1克 \n' +
                        '蒜瓣 3个 \n' +
                        '苹果 1个 \n' +
                        '红薯 1个 \n' +
                        '红糖 10克 \n' +
                        '柠檬 3-4片    \n' +
                        '油 少许  \n' ,
                        cookingSteps:'1.猪扒放入大碗中，加入烧烤酱、黑胡椒碎粒和拍碎的蒜瓣，拌匀，腌制2小时以上 end'+
                        '2.红薯和苹果切小块 end'+
                        '3.热锅放油先放入红薯翻炒至微软 end'+
                        '4.加入苹果一起翻炒变软后，再加入红糖，翻炒均匀即可 end'+
                        '5.在烤盘底部放入红薯和苹果 end'+
                        '6.铺上腌制好的猪排（蒜瓣一起放入，不喜欢可不放） end'+
                        '7.放上柠檬片 end'+
                        '8.烤箱以上下管发热模式、200度预热好后，把猪扒放入中层 end'+
                        '9.烘烤20分钟左右 '
                    },
                }, 
                {
                    'icon': '',
                    'text': '脆皮烤羊腿',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:120,
                        range:null
                    },
                    temperature:{
                        set: false,
                        default:170,
                        range:null
                    },
                    preheat:{
                        set:false,
                        default: false
                    },
                    steamAmount:{
                        set:false,
                        default:2,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x5A,
                        range:null
                    },
                    settingHide:true,
                    detail: {
                        foodMaterial:'羊腿 1000克 \n' +
                        '胡萝卜 1根\n' +
                        '土豆 1个 \n' +
                        '姜 2片 \n' +
                        '小洋葱 3个\n' +
                        '孜然 20克 \n' +
                        '黑胡椒粉 2克 \n' +
                        '盐 4克 \n' +
                        '植物油 10毫升 \n' +
                        '迷迭香 2克  \n' ,
                        cookingSteps:'1.羊腿清洗干净，然后用松肉针在肉质较厚的地方戳洞； end'+
                        '2.盐和黑胡椒粉撒到羊腿上，揉搓至盐化开； end'+
                        '3.羊腿肉厚的地方斜切几刀，然后大蒜和一小头的洋葱捣碎成泥状，涂抹整个羊腿，空隙里也要抹上； end'+
                        '4.撒上孜然粉和迷迭香碎； end'+
                        '5.放好腌料的羊腿要充分揉搓一会儿，使腌料味道更好的进入肉的纤维里； end'+
                        '6.用保鲜膜包裹羊腿，放冰箱腌制12小时以上(或更久，24小时之内)； end'+
                        '7.腌制好的羊腿掀掉保鲜膜，然后用锡纸包裹； end'+
                        '8.烤箱提前预热到200℃，羊腿放入烤盘里，然后把烤盘放烤网上，放烤箱的中层，上下管烤40分钟； end'+
                        '9.胡萝卜、土豆、洋葱切成滚刀块状，用植物油、盐、孜然翻粉拌一下，放烤盘里 end'+
                        '10.烤40分钟后的羊腿取出，掀去锡纸，羊腿直接放烤网上，置于烤箱的中层，把装有蔬菜的烤盘放在下层，200度上下管再烤30分钟即可。'
                    },
                }, 
            ]

        ]
    },
];

export default data;