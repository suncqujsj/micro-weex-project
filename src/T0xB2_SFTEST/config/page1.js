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
                    'text': '清蒸草鱼香菇',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:13,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'香菇 34克\n' +
                        '草鱼 134克\n' +
                        '香葱 1克\n' +
                        '姜 1克 \n' +
                        '汉口白酒(49.6度) 2毫升\n' +
                        '蒸鱼豉油   7毫升\n' +
                        '花椒    2克\n' +
                        '酱油(均值)  2毫升',
                        cookingSteps:'1.将鱼清洗干净，去内脏后，在鱼体两侧抹匀食用油，再沾少许白酒。\n' +
                        '2.准备葱丝、姜片。\n' +
                        '3.香菇切块。\n' +
                        '4.将葱丝、姜片、香菇块铺在鱼盘上，将鱼入盘后再在鱼身上撒些葱姜丝。\n' +
                        '5.锅下水，等水开后，将鱼入锅；蒸6-7分钟即关火。\n' +
                        '6.关火后，别打开锅盖，利用锅内余温“虚蒸”5-8分钟后立即出锅，把多余的水份倒掉。\n' +
                        '7.铺上葱，淋上酱油。\n' +
                        '8.在鱼身撒上青蒜末，锅中放油，爆香花椒。编出红油，热油泼在鱼上面即可。'
                    }
                },
                {
                    'icon': '',
                    'text': '金针菇蒸粉丝',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:10,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'金针菇 200克\n' +
                        '水发粉丝250克\n' +
                        '葱花 10克\n' +
                        '剁椒 30克\n' +
                        '花椒 5克\n' +
                        '鸡粉 2克\n' +
                        '姜丝 25克\n' +
                        '生抽 5毫升\n' +
                        '食用油 10克\n' +
                        '蒜末 30克\n' +
                        '盐 2克',
                        cookingSteps:'1.将发好的粉丝切成段备用。\n' +
                        '2.洗净的金针菇切去老茎。\n' +
                        '3.取一个盘子，将粉丝铺在盘中，放上金针菇。\n' +
                        '4.撒上少许姜丝、蒜末。\n' +
                        '5.再放上少许剁椒。\n' +
                        '6.撒上适量盐、鸡粉。\n' +
                        '7.再浇上少许生抽。\n' +
                        '8.把加工处理好的金针菇和粉丝放入烧开的蒸锅中。\n' +
                        '9.加盖，用中火蒸10分钟至熟。\n' +
                        '10.揭盖，将蒸好的金针菇粉丝取出。\n' +
                        '11.用油起锅，放入花椒，爆香。\n' +
                        '12.撒上葱花，浇上锅中热油和花椒即可。'
                    }
                },
                {
                    'icon': '',
                    'text': '鲜虾花蛤蒸蛋羹',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:15,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:95,
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
                    detail: {
                        foodMaterial:'花蛤肉 65克\n' +
                        '鸡蛋 120克\n' +
                        '虾仁 40克\n' +
                        '葱花 15克\n' +
                        '鸡粉 2克\n' +
                        '料酒 4毫升\n' +
                        '盐 2克\n',
                        cookingSteps:'1.洗净的虾仁由背部切开，去除虾线，切小段。\n' +
                        '2.把虾仁装入碗中，放入洗净的花蛤肉。\n' +
                        '3.淋入少许料酒，加盐、鸡粉，拌匀，腌渍约10分钟。\n' +
                        '4.鸡蛋打入蒸碗中，加少许鸡粉、盐，打散调匀。\n' +
                        '5.倒入少许温开水，快速搅拌匀。\n' +
                        '6.放入腌好的虾仁、花蛤肉，拌匀，备用。\n' +
                        '7.蒸锅上火烧开，放入蒸碗。\n' +
                        '8.盖上盖，用中火蒸约10分钟，至食材熟透。\n' +
                        '9.揭盖，取出蒸碗。\n' +
                        '10.撒上葱花即可。'
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
                        set: true,
                        default:14,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
                        default:95,
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
                    detail: {
                        foodMaterial:'南瓜 25克\n' +
                        '牛奶 100克\n' +
                        '鸡蛋 60克\n' +
                        '白糖 3克\n' +
                        '盐 1克',
                        cookingSteps:'1.南瓜去皮切小块，放入蒸箱中，手机上点击“开启自动烹饪”，蒸汽温度100℃蒸10分钟。\n' +
                        '2.蒸熟的南瓜趁热用勺子压成南瓜泥，鸡蛋打散备用。\n' +
                        '3.将南瓜泥、牛奶加入鸡蛋中一起打匀，加入盐、糖调味。\n' +
                        '4.放入蒸箱中，点击“开启自动烹饪”，蒸汽温度100℃蒸10分钟。\n'
                    }
                },
                {
                    'icon': '',
                    'text': '清蒸鲳鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:18,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'',
                        cookingSteps:''
                    }
                },
                {
                    'icon': '',
                    'text': '粉蒸牛肉',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:24,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'牛肉 300克\n' +
                        '蒸肉米粉100克\n' +
                        '葱花 5克\n' +
                        '蚝油 4克\n' +
                        '红椒 5克\n' +
                        '鸡粉 2克\n' +
                        '料酒 5毫升\n' +
                        '生抽 4毫升\n' +
                        '食用油 8克\n' +
                        '水淀粉 5毫升\n' +
                        '大蒜 10克\n' +
                        '盐 2克\n',
                        cookingSteps:'1.处理好的牛肉切成片，待用。\n' +
                        '2.取一个碗，倒入牛肉，加入盐、鸡粉，放入少许料酒、生抽、蚝油、水淀粉，搅拌匀。\n' +
                        '3.加入适量的蒸肉米粉，搅拌片刻。\n' +
                        '4.取一个蒸盘，将拌好的牛肉装入盘中。\n' +
                        '5.蒸锅上火烧开，放入牛肉。\n' +
                        '6.盖上锅盖，大火蒸20分钟至熟透。\n' +
                        '7.掀开锅盖，将牛肉取出。\n' +
                        '8.将蒸好的牛肉装入另一盘中。\n' +
                        '9.放上蒜苗、红椒、葱花。\n' +
                        '10.锅中注入食用油，烧至六成热。\n' +
                        '11.将烧好的热油浇在牛肉上即可。'
                    }
                },
                {
                    'icon': '',
                    'text': '豉汁蒸鲈鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:10,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'鲈鱼 100克\n' +
                        '葱 4克\n' +
                        '红辣椒 2克\n' +
                        '姜 2克\n' +
                        '干香菇 4克\n' +
                        '豆豉 6克\n' +
                        '花生油 4毫升\n' +
                        '料酒 2毫升\n' +
                        '盐 1克',
                        cookingSteps:'1.鱼洗净，切掉头尾，在鱼身的背部切1厘米左右宽的块，鱼肚子处不要切断。\n' +
                        '2.加入盐、葱、姜、料酒、生抽腌制20分钟。\n' +
                        '3.香菇洗净、泡软后捞出备用。\n' +
                        '4.盘子放入香菇，把鱼身子在盘子中摆成花形，放上头尾，再撒上豆豉。\n' +
                        '5.放入蒸箱中，点击“开启自动烹饪”，蒸汽温度100℃蒸10分钟。\n' +
                        '6.鱼蒸好后取出，放上小葱、红甜椒圈。油烧热，淋在鱼上即可。'
                    }
                },
            ],
            [

                {
                    'icon': '',
                    'text': '枸杞百合蒸鸡',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:16,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'鸡肉 400克\n' +
                        '葱花 10克\n' +
                        '干百合 20克\n' +
                        '枸杞 15克\n' +
                        '红枣 20克\n' +
                        '鸡粉 2克\n' +
                        '姜 17克\n' +
                        '料酒 6毫升\n' +
                        '生抽 8毫升\n' +
                        '生粉 8克\n' +
                        '食用油 10克\n' +
                        '盐 3克\n' +
                        '淀粉 4克',
                        cookingSteps:'1.把洗净的红枣切开，去除核，再把枣肉切碎。\n' +
                        '2.洗净的鸡肉切开，再斩成小块。\n' +
                        '3.将鸡块装入碗中，撒上备好的枣肉。\n' +
                        '4.放入洗净的百合，撒上洗好的枸杞、姜片。\n' +
                        '5.加入少许盐、鸡粉，淋入适量料酒、生抽，搅拌匀。\n' +
                        '6.倒上少许生粉，拌匀上浆。\n' +
                        '7.再注入少许食用油，腌渍约10分钟。\n' +
                        '8.取一干净的盘子，摆放上腌渍好的食材。\n' +
                        '9.蒸锅上火烧开，放入装有鸡肉的盘子。\n' +
                        '10.盖上盖子，用大火蒸约15分钟，至食材熟透。\n' +
                        '11.关火后揭开盖，取出蒸好的菜肴。\n' +
                        '12.趁热撒上葱花即成。\n'
                    }
                },
                {
                    'icon': '',
                    'text': '牛肉灌汤包',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:16,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'低筋面粉90克\n' +
                        '高筋面粉200克\n' +
                        '牛肉 150克\n' +
                        '葱花 30克\n' +
                        '黄奶油 50克\n' +
                        '鸡蛋 60克\n' +
                        '鸡粉 2克\n' +
                        '姜末 10克\n' +
                        '生抽 3毫升\n' +
                        '生粉 70克\n' +
                        '盐 2克\n' +
                        '芝麻油 2毫升\n',
                        cookingSteps:'1.将洗净的牛肉切成小块，再剁碎，盛碗待用。\n' +
                        '2.在装有牛肉的碗中，放入芝麻油、姜末、鸡粉、生抽、葱花、盐，搅拌均匀。\n' +
                        '3.注入适量清水，同方向搅拌均匀，制成馅料。\n' +
                        '4.备好的碗中放入高筋面粉、低筋面粉，打入鸡蛋，同方向搅拌均匀。\n' +
                        '5.备好的碗中装少许清水，放入生粉，拌匀，加入适量开水，搅成糊状，加入适量清水，冷却。\n' +
                        '6.把生粉团放入鸡蛋面团中，放入黄奶油，搅拌均匀。\n' +
                        '7.将面团倒在案板上，撒上少量生粉，揉压成光滑面团。\n' +
                        '8.取适量面团搓成长条状，用刀切数个大小均等的剂子。\n' +
                        '9.使用擀面杖把剂子压扁，擀成包子皮。取适量馅料放在包子皮上，捏紧制成生坯。\n' +
                        '10.将包好的生坯放在锡纸上，放在蒸笼上。\n' +
                        '11.将蒸笼放入烧开的蒸锅里，加盖，大火蒸8分钟。\n' +
                        '12.时间到，揭开盖子，取出蒸笼即可。'
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
                        set: true,
                        default:13,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'鲈鱼 350克\n' +
                        '彩椒 20克\n' +
                        '葱条 20克\n' +
                        '姜 45克\n' +
                        '柠檬 45克\n' +
                        '盐 3克\n',
                        cookingSteps:'1.把柠檬切开，将柠檬汁挤入碗中，待用。\n' +
                        '2.取部分洗净的葱切成细丝。\n' +
                        '3.洗好的彩椒切开，去籽，切成薄片，再切丝。\n' +
                        '4.处理干净的鲈鱼切上花刀，备用。\n' +
                        '5.将鲈鱼放入蒸盘中，撒上少许盐，抹匀。\n' +
                        '6.将姜片、葱条塞入鱼腹中，淋上少许柠檬汁，腌渍10分钟，至其入味，备用。\n' +
                        '7.蒸锅上火烧开，放入蒸盘。\n' +
                        '8.盖上锅盖，用中火蒸约15分钟至熟。\n' +
                        '9.揭开锅盖，取出蒸盘，取出鱼腹中的姜片和葱条。\n' +
                        '10.点缀上葱丝、彩椒丝即可。\n'
                    }
                },
                {
                    'icon': '',
                    'text': '蒜蓉干贝蒸丝瓜',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:9,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'干贝 30克\n' +
                        '丝瓜 200克\n' +
                        '葱花 10克\n' +
                        '鸡粉 3克\n' +
                        '生抽 4克\n' +
                        '食用油 10克\n' +
                        '蒜蓉 40克\n' +
                        '盐 3克\n',
                        cookingSteps:'1.将洗净的干贝拍碎。\n' +
                        '2.已去皮洗净的丝瓜切棋子形，摆盘。\n' +
                        '3.起油锅，倒入干贝煸香。\n' +
                        '4.加蒜蓉炒香。\n' +
                        '5.放入适量盐、鸡粉、生抽。\n' +
                        '6.快速炒匀调味。\n' +
                        '7.将炒香的料浇在丝瓜上。\n' +
                        '8.丝瓜转到蒸锅。\n' +
                        '9.加盖，蒸3分钟至熟透。\n' +
                        '10.揭盖，取出蒸好的丝瓜。\n' +
                        '11.撒上备好的葱花。\n' +
                        '12.浇上熟油即成。'
                    }
                },
                {
                    'icon': '',
                    'text': '清蒸香菇鳕鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:13,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'水发香菇55克\n' +
                        '鳕鱼肉 150克\n' +
                        '彩椒 10克\n' +
                        '葱丝 10克\n' +
                        '鸡粉 2克\n' +
                        '姜 20克\n' +
                        '料酒 4毫升\n' +
                        '盐 2克\n' +
                        '\n',
                        cookingSteps:'1.将洗净的香菇用斜刀切片。\n' +
                        '2.洗好的彩椒切丝，改切成粒。\n' +
                        '3.把香菇片装入盘中，加入少许盐、鸡粉、料酒。\n' +
                        '4.放入姜丝，搅拌匀，再倒入彩椒粒，拌匀，调成酱菜，待用。\n' +
                        '5.取一个蒸盘，放入洗净的鳕鱼肉，再倒入酱菜，堆放好。\n' +
                        '6.蒸锅上火烧开，放入蒸盘。\n' +
                        '7.盖上盖，用中火蒸约10分钟，至食材熟软。\n' +
                        '8.关火后揭盖，取出蒸好的菜肴。\n' +
                        '9.趁热撒上葱丝，待稍凉后即可食用。'
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
                        set: true,
                        default:12,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'豆腐 125克\n' +
                        '五花肉 15克\n' +
                        '鸡蛋 15克\n' +
                        '生粉 5克\n' +
                        '蒜 5克\n' +
                        '细香葱 5克\n' +
                        '香菇 5克\n' +
                        '生抽 2毫升\n' +
                        '蚝油 1毫升\n' +
                        '盐 1克',
                        cookingSteps:'1.猪肉洗净剁成肉泥；香菇切碎；香葱均切成末。\n' +
                        '2.豆腐放在洗净的容器中揉碎，依次加入肉泥、香菇、生姜、鸡蛋、香葱、盐、酱油、生粉，用手搅拌均匀。\n' +
                        '3.手心涂抹少量食用油，再取适量豆腐泥，用手团成团放在盘子中。\n' +
                        '4.放入蒸汽炉中，大火蒸10-12分钟，即可。\n'
                    }
                },
                {
                    'icon': '',
                    'text': '蒜蓉粉丝鲍鱼',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:10,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'龙口粉丝10克\n' +
                        '鲍鱼 150克\n' +
                        '蒜 4克\n' +
                        '细香葱 4克\n' +
                        '生抽 2毫升\n' +
                        '蚝油 2毫升\n' +
                        '料酒 2毫升\n' +
                        '盐 1克',
                        cookingSteps:'1.粉丝用水泡软，蒜，葱切碎，取一小碗，加入蒜末，油、生抽、盐、料酒、耗油等爆香拌匀备用。\n' +
                        '2.将鲍鱼洗干净，沥干水份，每个鲍鱼用刀横竖开刀花，在盘底部放入泡软的粉丝，再放上鲍鱼，淋上爆香的蒜末，放入蒸汽炉，大火蒸8分钟左右，撒上葱花，称热食用。'
                    }
                },
                {
                    'icon': '',
                    'text': '小米蒸排骨',
                    'mode': 0xE0,
                    time:{
                        set: true,
                        default:25,
                        range:[5,120,1]
                    },
                    temperature:{
                        set: true,
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
                    detail: {
                        foodMaterial:'排骨段 400克\n' +
                        '水发小米90克\n' +
                        '葱花 10克\n' +
                        '鸡粉 2克\n' +
                        '姜 15克\n' +
                        '料酒 3毫升\n' +
                        '生抽 3毫升\n' +
                        '生粉 5克\n' +
                        '食用油 10克\n' +
                        '大蒜 8克\n' +
                        '盐 2克\n' +
                        '芝麻油 3毫升\n' +
                        '淀粉 4克',
                        cookingSteps:'1.将洗净的排骨段装入碗中，放入备好的姜片、蒜末。\n' +
                        '2.再加入盐、鸡粉，淋入少许生抽、料酒，拌匀至入味。\n' +
                        '3.把沥干水的小米倒入碗中，与排骨段充分拌匀。\n' +
                        '4.撒上少许生粉，搅拌匀。\n' +
                        '5.淋入少许芝麻油，拌匀，腌渍一会。\n' +
                        '6.取一个干净的盘子，倒入腌渍好的排骨，叠放整齐，待用。\n' +
                        '7.蒸锅上火烧开，放入码好排骨的盘子。\n' +
                        '8.盖上锅盖，用中火蒸20分钟至食材熟透。\n' +
                        '9.揭下锅盖，取出蒸好的排骨。\n' +
                        '10.趁热撒上葱花，浇入少许热油即可。\n'
                    }
                },
            ]
        ]
    },

];

let modes = [
    {
        title: '',
        iconButtons: [
            {
                'icon': 'assets/img/modes/steam@3x.png',
                'text': '蒸汽',
                'mode': 0x20,
                time:{
                    set: true,
                    default:10,
                    range:[1,300,1]
                },
                temperature:{
                    set: true,
                    default:100,
                    range:[35,70,1,75,100,5]
                },
                preheat:{
                    set:false,
                    default: false
                },
                steamAmount:{
                    set:false,
                    default:0
                },
                fireAmount:{
                    set:false,
                    default:0
                }
            },
            {
                'icon': 'assets/img/modes/clean@3x.png',
                'text': '除垢',
                'mode': 0xC1,
                time:{
                    set: false,
                    default:15,
                    range:null
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
                }
            },

            {
                'icon': 'assets/img/modes/fermentation@3x.png',
                'text': '发酵',
                'mode': 0xB0,
                time:{
                    set: true,
                    default:40,
                    range:[5,720,1]
                },
                temperature:{
                    set: true,
                    default:40,
                    range:[35,45,1]
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
                }
            },
            {
                'icon': 'assets/img/modes/clean@3x.png',
                'text': '烘干',
                'mode': 0xC4,
                time:{
                    set: true,
                    default:10,
                    range:[5,60,1]
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
                }
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