/**
 * Created by sf
 * 2018/11/14
 */

let autoMenu = [
    {
        title: '三高',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '蒸鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:10,
                        range:[1,60,1]
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
                        default:0,
                        range:null
                    },
                    fireAmount:{
                        set:false,
                        default:0,
                        range:null
                    },
                    recipeId:{
                        set:false,
                        default: 0x01,
                        range:null
                    },
                    settingHide:false, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                },
                {
                    'icon': '',
                    'text': '清蒸草鱼香菇',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:13,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x41,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'香菇 34克end'+
                        '草鱼 350克end'+
                        '香葱丝 10克end'+
                        '姜 20克 end'+
                        '汉口白酒(49.6度) 2毫升end'+
                        '蒸鱼豉油   7毫升end'+
                        '花椒    2克end'+
                        '酱油(均值)  4毫升end',
                        cookingSteps:'1.将鱼清洗干净，去内脏后，在鱼体两侧抹匀食用油，再沾少许白酒；end'+
                        '2.准备葱丝、姜片、香菇切块；end'+
                        '3.将葱丝、姜片、香菇块铺在鱼盘上，将鱼入盘后再在鱼身上撒些葱姜丝。end'+
                        '4.把蒸盘/烤架放入腔体第一层，鱼盘放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '5.烹饪结束后，把鱼拿出，并把多余的水份倒掉，铺上葱丝，姜丝，淋上酱油。end'+
                        '6.把油加热，爆香花椒，编出红油，热油泼在鱼上面即可。'
                    }
                },
                {
                    'icon': '',
                    'text': '金针菇蒸粉丝',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:10,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x42,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'金针菇 200克end'+
                        '水发粉丝 250克end'+
                        '葱花 10克end'+
                        '剁椒 30克end'+
                        '花椒 5克end'+
                        '鸡粉 2克end'+
                        '姜丝 25克end'+
                        '生抽 5毫升end'+
                        '食用油 10克end'+
                        '蒜末 30克end'+
                        '盐 2克',
                        cookingSteps:'1.将发好的粉丝切成段备用，洗净的金针菇切去老茎；end'+
                        '2.取一个碟子，将粉丝铺在盘中，放上金针菇，撒上少许姜丝、蒜末、剁椒、盐、鸡粉，再浇上少许生抽。end'+
                        '3.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '4.烹饪结束后将蒸好的金针菇粉丝取出，撒上葱花；end'+
                        '5.把油加热，放入花椒，爆香，趁热浇在粉丝上并搅拌均匀即可。'
                    }
                },
                {
                    'icon': '',
                    'text': '鲜虾花蛤蒸蛋羹',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x43,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'花蛤肉 65克end'+
                        '鸡蛋 120克end'+
                        '虾仁 40克end'+
                        '葱花 15克end'+
                        '鸡粉 2克end'+
                        '料酒 4毫升end'+
                        '盐 2克',
                        cookingSteps:'1.洗净的虾仁由背部切开，去除虾线，切小段。end'+
                        '2.把虾仁装入碗中，放入洗净的花蛤肉，end'+
                        '淋入少许料酒，加盐、鸡粉，拌匀，腌渍约10分钟。end'+
                        '3.鸡蛋打入蒸碗中，加少许鸡粉、盐，打散调匀，倒入150克温水，快速搅拌匀；end'+
                        '4.放入腌好的虾仁、花蛤肉，拌匀，去掉泡沫备用。end'+
                        '5.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '6.烹饪结束后取出，撒上葱花即可。'
                    }
                },
            ],

        ]
    },
    {
        title: '1-7岁儿童',
        iconButtons: [
            [


                {
                    'icon': '',
                    'text': '南瓜泥牛奶蒸蛋',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:12,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x47,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'南瓜 25克end'+
                        '牛奶 100克end'+
                        '鸡蛋 60克end'+
                        '白糖 3克end'+
                        '盐 1克',
                        cookingSteps:'1.南瓜去皮切小块，放入蒸箱中，蒸汽温度100℃蒸10分钟；end'+
                        '2.蒸熟的南瓜趁热用勺子压成南瓜泥，鸡蛋打散备用；end'+
                        '3.将南瓜泥、牛奶加入鸡蛋中一起打匀，加入盐、糖调味；end'+
                        '4.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '5.烹饪结束后取出即可。'
                    }
                },
                {
                    'icon': '',
                    'text': '清蒸鲳鱼',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x48,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'鲳鱼 250克end'+
                        '白糖 5克end'+
                        '豉油 25.0毫升end'+
                        '葱白 10克end'+
                        '葱叶 10克end'+
                        '红椒 20克end'+
                        '胡椒粉 3克end'+
                        '鸡粉 5克end'+
                        '生姜 20克end'+
                        '食用油 10克end'+
                        '盐 2克end'+
                        '芝麻油 10克',
                        cookingSteps:'1.去皮洗净的生姜切薄片，取部分切成丝，洗净的葱叶切成丝，洗净的红椒切开，去籽，切成丝备用；end'+
                        '2.葱白切段垫于盘底，放上宰杀处理干净的鲳鱼，撒上适量盐抹匀，放上姜片；end'+
                        '3.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '4.烹饪结束后，将蒸熟的鲳鱼取出，夹去姜片和葱白。end'+
                        '5.将切好的姜丝、葱丝和红椒丝放入碗中，拌匀，将其放在鱼身上，撒上胡椒粉；end'+
                        '6.把油、豉油、白糖、鸡粉、1勺水和芝麻油拌匀，调成味汁，加热煮沸后趁热淋在鱼身上即可。'
                    }
                },
                {
                    'icon': '',
                    'text': '粉蒸牛肉',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:20,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x49,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'牛肉 300克、蒸肉米粉100克end'+
                        '葱花 5克、蚝油 4克end'+
                        '红椒 5克、鸡粉 2克end'+
                        '料酒 5毫升、生抽 4毫升end'+
                        '食用油 8克、水淀粉 5毫升end'+
                        '蒜蓉 10克、盐 2克',
                        cookingSteps:'1.处理好的牛肉切成片，待用。end'+
                        '2.取一个碗，倒入牛肉，加入盐、鸡粉，放入少许料酒、生抽、蚝油、水淀粉，搅拌匀，加入蒸肉米粉，搅拌均匀。end'+
                        '3.取一个蒸盘，将拌好的牛肉装入盘中。end'+
                        '4.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '5.将蒸好的牛肉取出，放上蒜蓉、红椒、葱花。end'+
                        '6.把油加热后趁热浇在牛肉上即可。'
                    }
                },
                
            ],
           
        ]
    },
    {
        title: '7-14岁儿童',
        iconButtons:[
            [
                {
                    'icon': '',
                    'text': '豉汁蒸鲈鱼',
                    'mode': 0xE0,
                    hide:false,
                    time:{
                        set: false,
                        default:8,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x4A,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'鲈鱼 400克（不包含头尾）end'+
                        '葱丝 10克end'+
                        '红辣椒 2克end'+
                        '姜 20克end'+
                        '干香菇 4克end'+
                        '豆豉 6克end'+
                        '花生油 4毫升end'+
                        '料酒 2毫升end'+
                        '蒸鱼豉油   5毫升end'+
                        '盐 1克',
                        cookingSteps:'1.鱼洗净，切掉头尾，在鱼身的背部切1厘米左右宽的块，鱼肚子处不要切断。end'+
                        '2.加入盐、葱、姜、料酒、生抽腌制20分钟。end'+
                        '3.香菇洗净、泡软后捞出备用。end'+
                        '4.盘子放入香菇，把鱼身子在盘子中摆成花形，放上头尾，再撒上豆豉。end'+
                        '5.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '6.鱼蒸好后取出，多余的水倒掉，淋上蒸鱼豉油，放上葱丝、姜丝、红椒圈。油烧热，淋在鱼上即可。'
                    }
                },
                {
                    'icon': '',
                    'text': '枸杞百合蒸鸡',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x4B,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'鸡肉 400克end'+
                        '葱花 10克、干百合 20克end'+
                        '枸杞 15克、红枣 20克end'+
                        '鸡粉 2克、姜 17克end'+
                        '料酒 6毫升、生抽 8毫升end'+
                        '生粉 8克、食用油 10克end'+
                        '盐 3克、淀粉 4克',
                        cookingSteps:'1.把洗净的红枣切开，去除核，再把枣肉切碎。end'+
                        '2.洗净的鸡肉切开，再斩成小块。end'+
                        '3.将鸡块装入碗中，撒上备好的枣肉。end'+
                        '4.放入洗净的百合，撒上洗好的枸杞、姜片，加入少许盐、鸡粉，淋入适量料酒、生抽、油、生粉，搅拌均匀后腌制end'+
                        '约15分钟。end'+
                        '5.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '6烹饪结束后取出，.趁热撒上葱花即成。'
                    }
                },
                {
                    'icon': '',
                    'text': '牛肉灌汤包',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x4C,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'低筋面粉 90克、高筋面粉200克end'+
                        '牛肉 150克、葱花 30克end'+
                        '黄奶油 50克、鸡蛋 60克end'+
                        '鸡粉 2克、姜末 10克end'+
                        '生抽 3毫升、生粉 70克end'+
                        '盐 2克、芝麻油 2毫升',
                        cookingSteps:'1.将洗净的牛肉切成小块，再剁碎，盛碗待用；end'+
                        '2.在装有牛肉的碗中，放入芝麻油、姜末、鸡粉、生抽、葱花、盐，搅拌均匀，end'+
                        '加入2勺清水，同方向搅拌均匀，制成馅料待用；end'+
                        '3.备好的碗中放入高筋面粉、低筋面粉，打入鸡蛋，同方向搅拌均匀；end'+
                        '4.备好的碗中装40克清水，放入生粉，拌匀，加入30克开水，搅成糊状，加入20克清水，冷却；end'+
                        '5.把生粉团放入鸡蛋面团中，放入黄油，搅拌均匀；end'+
                        '6.将面团倒在案板上，撒上少量生粉，揉压成光滑面团；end'+
                        '7.取适量面团搓成长条状，用刀切数个大小均等的剂子；end'+
                        '8.使用擀面杖把剂子（约20克）压扁，擀成包子皮。取适量馅料（约10克）放在包子皮上，捏紧制成生坯；end'+
                        '9.将蒸盘铺上吸油纸，把包好的包子摆放整齐；end'+
                        '10. 把装包子的蒸盘放入腔体中间位置，水盒加水，选择菜单，启动即可。end'+
                        '11.烹饪结束后，取出蒸盘即可。'
                    }
                },

            ],
        ]
    },
    {
        title: '减肥塑身',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '柠香鲈鱼',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:8,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x4D,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'鲈鱼 350克、end'+
                        '彩椒 20克、end'+
                        '葱条 20克、end'+
                        '姜 45克、end'+
                        '柠檬 45克、end'+
                        '盐 3克',
                        cookingSteps:'1.把柠檬切开，将柠檬汁挤入碗中，待用。end'+
                        '2.取部分洗净的葱切成细丝。end'+
                        '3.洗好的彩椒切开，去籽，切成薄片，再切丝。end'+
                        '4.处理干净的鲈鱼切上花刀，备用。end'+
                        '5.将鲈鱼放入蒸盘中，撒上少许盐，抹匀，将姜片、葱条塞入鱼腹中，淋上少许柠檬汁，腌渍10分钟，至其入味，备用。end'+
                        '6.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '7.烹饪结束后，取出鱼腹中的姜片和葱条。end'+
                        '8.点缀上葱丝、彩椒丝即可。'
                    }
                },
                {
                    'icon': '',
                    'text': '蒜蓉干贝蒸丝瓜',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:7,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x4E,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'干贝 30克end'+
                        '丝瓜 200克end'+
                        '葱花 10克end'+
                        '鸡粉 3克end'+
                        '生抽 4克end'+
                        '食用油 10克end'+
                        '蒜蓉 40克end'+
                        '盐 3克',
                        cookingSteps:'1.将洗净的干贝拍碎。end'+
                        '2.已去皮洗净的丝瓜切2厘米左右长，摆盘。end'+
                        '3.起油锅，倒入干贝煸香、加蒜蓉炒香，.放入适量盐、鸡粉、生抽，快速炒匀调味。end'+
                        '4.将炒香的料浇在丝瓜上。end'+
                        '5.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘/烤架中间，水盒加水，选择菜单，启动即可。end'+
                        '6.烹饪结束后取出，撒上备好的葱花，浇上熟油即成。'
                    }
                },
                {
                    'icon': '',
                    'text': '清蒸香菇鳕鱼',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:12,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x4F,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'水发香菇55克end'+
                        '鳕鱼肉 150克end'+
                        '彩椒 10克end'+
                        '葱丝 10克end'+
                        '鸡粉 2克end'+
                        '姜 20克end'+
                        '料酒 4毫升end'+
                        '杂粮 50克end'+
                        '油 20克end'+
                        '盐 1小勺、end'+
                        '黑胡椒 少量',
                        cookingSteps:'1.将洗净的香菇用斜刀切片。end'+
                        '2.洗好的彩椒切丝，改切成粒。end'+
                        '3.把香菇片装入盘中，加入少许盐、鸡粉、料酒，放入姜丝，搅拌匀，再倒入彩椒粒，拌匀，调成酱菜，待用。end'+
                        '4.取一个碟子，放入洗净的鳕鱼肉，再倒入酱菜，摆放好。end'+
                        '5.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '6.烹饪结束后取出，趁热撒上葱丝，待稍凉后即可食用。'
                    }
                }
            ]
        ]
    },
    {
        title: '孕妇',
        iconButtons: [
            [
                {
                    'icon': '',
                    'text': '豆腐狮子头',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:10,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x44,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'豆腐 125克end'+
                        '五花肉 15克end'+
                        '鸡蛋 15克end'+
                        '生粉 5克end'+
                        '蒜 5克end'+
                        '细香葱 5克end'+
                        '香菇 5克end'+
                        '生抽 2毫升end'+
                        '蚝油 1毫升end'+
                        '盐 1克',
                        cookingSteps:'1.猪肉洗净剁成肉泥；香菇切碎；香葱均切成末。end'+
                        '2.豆腐放在洗净的容器中揉碎，依次加入肉泥、香菇、生姜、鸡蛋、香葱、盐、酱油、生粉，用手搅拌均匀。end'+
                        '3.手心涂抹少量食用油，再取适量豆腐泥，用手团成团放在盘子中。end'+
                        '4.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '5.烹饪结束后取出，撒上葱花即可。'
                    }
                },
                {
                    'icon': '',
                    'text': '蒜蓉粉丝鲍鱼',
                    'mode': 0xE0,
                    time:{
                        set: false,
                        default:8,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: false,
                        default:100,
                        range:[35,70,1,75,100,5]
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
                    recipeId:{
                        set:false,
                        default: 0x45,
                        range:null
                    },
                    settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                    detail: {
                        foodMaterial:'龙口粉丝 10克end'+
                        '鲍鱼 150克end'+
                        '蒜 4克、细香葱 4克end'+
                        '生抽 2毫升、蚝油 2毫升end'+
                        '料酒 2毫升、盐 1克',
                        cookingSteps:'1.粉丝用水泡软，蒜，葱切碎，取一小碗，加入蒜末，油、生抽、盐、料酒、蚝油等爆香拌匀备用。end'+
                        '2.将鲍鱼洗干净，沥干水份，每个鲍鱼用刀横竖开刀花，在盘底部放入泡软的粉丝，再放上鲍鱼，淋上爆香的蒜末，end'+
                        '3.把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                        '4.烹饪结束后取出，撒上葱花即可。'
                    }
                },
                    {
                        'icon': '',
                        'text': '小米蒸排骨',
                        'mode': 0xE0,
                        time:{
                            set: false,
                            default:23,
                            range:[5,120,1]
                        },
                        temperature:{
                            set: false,
                            default:100,
                            range:[35,70,1,75,100,5]
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
                        recipeId:{
                            set:false,
                            default: 0x46,
                            range:null
                        },
                        settingHide:true, // 工作页面，收否隐藏设置参数，true = 隐藏，false = 显示
                        detail: {
                            foodMaterial:'排骨段 400克、end'+
                            '水发小米 90克end'+
                            '葱花 10克、end'+
                            '鸡粉 2克、end'+
                            '姜 15克end'+
                            '料酒 3毫升、end'+
                            '生抽 3毫升end'+
                            '生粉 5克、end'+
                            '食用油 10克end'+
                            '大蒜 8克end'+
                            '盐 2克end'+
                            '芝麻油 3毫升end'+
                            '淀粉 4克',
                            cookingSteps:'1.将洗净的排骨段装入碗中，放入备好的姜片、蒜末，再加入盐、鸡粉，淋入少许生抽、料酒，拌匀至入味。end'+
                            '2.把沥干水的小米倒入碗中，与排骨段充分拌匀，撒上少许生粉，搅拌匀。end'+
                            '3.淋入少许芝麻油，拌匀，腌制15分钟。end'+
                            '4.取一个干净的盘子，倒入腌制好的排骨，叠放整齐，待用。end'+
                            '5. 把蒸盘/烤架放入腔体第一层，把装食物的碟子放入蒸盘中间，水盒加水，选择菜单，启动即可。end'+
                            '5.烹饪结束后取出，趁热撒上葱花，浇入少许热油即可。'
                        }
                    },
            ]
        ]
    },

];

import modeIcons from "../../common/mapping/modeIcons";
let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': modeIcons[16].dir,
                'text': modeIcons[16].cn,
                'mode': 0x20,
                time:{
                    set: true,
                    default:20,
                    range:[1,300,1],
                },
                temperature:{
                    set: true,
                    default:100,
                    range:[35,100,1],
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false, //工作中，隐藏预热选择
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:null,
                    // isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null,
                },
               
                // probeTemperature:{
                //     set: true,
                //     default:60,
                //     range:[50,100,1],
                // },
                // probe: true,//支持肉类探针
               
            },
           
            {
                'icon': modeIcons[7].dir,
                'text': modeIcons[7].cn,
                'mode': 0xB0,
                time:{
                    set: true,
                    default:50,
                    range:[5,540,1]
                },
                temperature:{
                    set: true,
                    default:37,
                    range:[35,45,1]
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false,
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
                // steamSwitch:{
                //     set:true,
                //     default: false,
                //     hide: true,
                // }
            },
            {
                'icon': modeIcons[17].dir,
                'text': modeIcons[17].cn,
                'mode': 0xC4,
                time:{
                    set: true,
                    default:10,
                    range:[5,60,1],
                },
                temperature:{
                    set: false,
                    default:160,
                    range:null,
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false,
                },
                steamAmount:{
                    set:false,
                    default:0,
                    range:null,
                    // isProbeThenThisHide: true,//如果是探针模式，则隐藏该选择
                },
                fireAmount:{
                    set:false,
                    default:0,
                    range:null,
                },
                // probeTemperature:{
                //     set: true,
                //     default:60,
                //     range:[50,100,1],
                // },
                // probe:true //支持肉类探针
            },
            {
                'icon': modeIcons[10].dir,
                'text': modeIcons[10].cn,
                'mode': 0xC1,
                time:{
                    set: true,
                    default:10,
                    range:[5,60,1]
                },
                temperature:{
                    set: false,
                    default:100,
                    range:null
                },
                preheat:{
                    set:false,
                    default: false,
                    hide: false,
                },
                steamAmount:{
                    set:false,
                    default:0
                },
                fireAmount:{
                    set:false,
                    default:0
                },
            },
        ]
    },
];

let page = {
    tabs: [
        {
            name:'自动菜单',
            active:true,
            rows:autoMenu
        },
        {
            name:'加热模式',
            active:false,
            rows:modes
        }
    ]
};

export default page;