const menus = [
    {
        title: '智能配网',
        subMenus: [
            {
                title: '如何添加设备',
                link: 'deviceProblems/problemDetail',
                detailTitle: '添加设备',
                descTypes: [
                    {
                        descName: '安卓用户添加设备',
                        steps: [
                            '确认手机已经打开并连接家庭无线网络（WiFi）', 
                            '登录美居App，在“首页”点击 “+”，进入“添加设备”界面',
                            '扫描设备机身二维码，或选择家电型号进入配网流程',
                            '操作设备进入配置模式，此时能接收到设备发出的热点WiFi：midea_xx_xxxx',
                            '选择家庭网络',
                            '根据提示完成连接操作',
                            '等待设备配网，连接成功后返回主界面'
                        ]
                    },
                    {
                        descName: '苹果用户添加设备',
                        steps: [
                            '确认手机已经打开并连接家庭无线网络（WiFi）',
                            '登录美居App，在“首页”点击 “+”，进入“添加设备”界面',
                            '扫描设备机身二维码，或选择家电型号进入配网流程',
                            '操作设备进入配置模式，此时能接收到家电发出的热点WiFi：midea_xx_xxxx',
                            '选择家庭网络',
                            '点击“去设置WiFi”按钮，在手机WiFi界面连接设备热点，然后返回美居App，继续进行配网',
                            '等待设备配网，连接成功后返回主界面'
                        ]
                    }
                ]
            },
            {
                title: '设备添加失败如何处理',
                link: 'deviceProblems/problemDetail',
                detailTitle: '设备添加失败',
                placeholder: '请根据失败提示进行重试',
                failTypes: [
                    {
                        failName: '失败1',
                        failDesc: '添加新设备，扫设备二维码后，配网进度0%，最后超时报此错误。安卓版本美居App上会出现，iOS版不会出现。',
                        solution: '解决方案',
                        steps: [
                            '按操作指引重置设备，进入配置模式',
                            '美居App的定位（位置）权限禁止，手机应用管理（或安全中心）打开美居App的定位（位置）权限',
                            '添加设备时以选择设备品类和型号添加，不使用扫二维码添加'
                        ]
                    },
                    {
                        failName: '失败2',
                        failDesc: '添加新设备，扫设备二维码后，配网进度83%，最后超时报此错误。安卓版本美居App上会出现，iOS版不会出现',
                        solution: '解决方案',
                        steps: [
                            '进入手机系统设置—>WLAN，输入正确密码,重新连接到无线路由器WiFi',
                            '重新添加，填写正确的家庭WiFi密码'
                        ]
                    },
                    {
                        failName: '失败3',
                        failDesc: '添加新设备百分比进度条中段，安卓美居App配网会卡在91%，iOS版本会卡在76%，约2分钟后超时报错',
                        solution: '解决方案',
                        steps: [
                            '检查无线路由器WiFi密码是否输入错误',
                            '更改无线路由器WiFi名称，去掉中文字或特殊字符',
                            '更改无线路由器设置，取消AP隔离',
                            '更改无线路由器设置，关闭黑白名单（MAC地址过滤）功能'
                        ]
                    },
                    {
                        failName: '失败4',
                        failDesc: '安卓美居App配网百分比86%。iOS美居App配网百分比76%。约2分钟后超时报错',
                        solution: '解决方案',
                        tryAgain: '排除以下几点后重试',
                        steps: [
                            '设备是否已进入配网模式',
                            '输入的无线路由器WiFi密码是否正确',
                            '无线路由器是否为2.4GHz网络',
                            '将无线路由器的模式设置为“802.11bg mixed”或者把频宽设置为“20MHz”后进行配网',
                            '无线路由器是否已关闭黑白名单（MAC地址过滤）功能',
                            '无线网络名称是否包含中文字符（不推荐使用中文字符）',
                            '尝试连接其他无线路由器重新配网'
                        ],
                        otherOpe: '或者进行以下操作',
                        otherOpeDesc: '在配网失败页面，点击“进入设备WiFi模式”，然后根据配网指引重新配网'
                    },
                    {
                        failName: '其他失败错误',
                        failDesc: '',
                        solution: '解决方案',
                        steps: [
                            '请联系在线客服，或者拨打美的售后热线：400-889-9315'
                        ]
                    }
                ]
            },
            {
                title: '添加设备无法选择家庭网络',
                link: 'deviceProblems/problemDetail',
                detailTitle: '添加设备无法选择家庭网络',
                placeholder: '安卓用户如果在添加设备无法选择家庭网络，请检查:',
                descSteps: [
                    '手机WLAN已打开',
                    '附近有可用网络',
                    '美居已获取定位权限（禁止美居获取定位权限将导致无法添加设备）。安卓用户，请在“设置”-“应用管理”-“美居”-“权限管理”-“定位”中选择允许；或者在手机系统出现“美居正在尝试通过网络或者卫星对您的手机定位”弹窗时选择允许'
                ]
            },
            {
                title: '设备二维码在哪里',
                link: 'deviceProblems/problemDetail',
                detailTitle: '设备二维码在哪里',
                descInfos: [
                    '美的智能设备在机身上都会贴有一张二维码，用于绑定并激活设备',
                    '不同设备粘贴二维码的位置会有所不同，主要粘贴在机身正面（如智能空调挂机、智能冰箱、智能洗衣机等）或机身背面（如智能空调柜机、智能插座等），使用前请仔细观察设备机身，并妥善保存二维码'
                ]
            },
            {
                title: '如何修改设备名称',
                link: 'deviceProblems/problemDetail',
                detailTitle: '修改设备名称',
                descInfos: [
                    '添加设备连接成功后，可以修改设备名称，或者在个人中心—>我的设备—>设备详情中进行修改',
                    '注: 修改名称仅限于家庭创建者，家庭成员无法修改'
                ]
            },
            {
                title: '如何删除设备',
                link: 'deviceProblems/problemDetail',
                detailTitle: '删除设备',
                descInfos: [
                    '登录美居App，在个人中心—>我的设备列表中按住左划删除',
                    '注: 删除仅限于家庭创建者，家庭成员无法删除'
                ]
            },
            {
                title: '设备为何显示离线',
                link: 'deviceProblems/problemDetail',
                detailTitle: '设备为何显示离线',
                placeholder: '若设备变为离线状态，请检查:',
                descSteps: [
                    '设备是否连接电源',
                    '设备是否连上家庭内的路由器',
                    'App提示网络畅通的情况下，减少无线路由器的接入设备数量'
                ],
                aboveInfo: '以上仍未能恢复，您还可尝试重置设备，具体重置方式请参照设备说明书'
            },
            {
                title: '如何重置设备（进入配置模式）',
                link: 'deviceProblems/problemDetail',
                detailTitle: '重置设备（进入配置模式）',
                descInfos: [
                    '重置设备（进入配置模式），就是让智能设备的WiFi模块恢复出厂初始设置，重置后可在美居App重新添加设备',
                    '不同类型、不同型号的设备的重置方式会有所不同，具体方式以实际设备配网指引为准'
                ]
            },
            {
                title: '如何下载/升级设备插件',
                link: 'deviceProblems/problemDetail',
                detailTitle: '下载/升级设备插件',
                descInfos: [
                    '登录美居App，在首页或智能页面设备卡片位置，根据提示进行下载或更新操作。如用户选择忽略，则下个版本更新时再提示'
                ]
            },
            {
                title: '网络信号弱导致设备控制失败怎么处理',
                link: 'deviceProblems/problemDetail',
                detailTitle: '网络信号弱导致设备控制失败怎么处理',
                descInfos: [
                    '请确认设备所在区域的WiFi信号强度，以及当前操作手机的网络情况，可适当调整路由器位置',
                    '若问题仍然存在，请完全退出美居App（删除后台进程），再重新打开美居App并登录',
                    '若问题仍然存在，可重新安装美居App并升级到最新版本'
                ]
            },
            {
                title: '为什么添加设备时失败，重试多次也无法添加',
                link: 'deviceProblems/problemDetail',
                detailTitle: '为什么添加设备时失败，重试多次也无法添加',
                descInfos: [
                    '当添加设备失败后，按照页面提示“重试”，请确保手机连接了家庭路由器网络，而且设备已进入了配网模式'
                ]
            },
            {
                title: '为什么主界面的设备不见了',
                link: 'deviceProblems/problemDetail',
                detailTitle: '为什么主界面的设备不见了',
                descInfos: [
                    '设备按照家庭进行展示，如没有看到之前的设备，可在首页切换家庭，或在个人中心—>我的设备列表中查找'
                ]
            },
            {
                title: '更改无线路由器名称或密码后，为什么手机软件不能控制设备',
                link: 'deviceProblems/problemDetail',
                detailTitle: '更改无线路由器名称或密码后，为什么手机软件不能控制设备',
                descInfos: [
                    '更改家庭无线路由器名称或密码后，需要重新配置设备到用户家庭无线网络'
                ]
            },
            {
                title: '为什么扫描二维码黑屏',
                link: 'deviceProblems/problemDetail',
                detailTitle: '为什么扫描二维码黑屏',
                descInfos: [
                    '扫描二维码时黑屏是因为禁止了美居的相机权限，建议您找到安全软件或者系统设置，打开美居的相机权限即可'
                ]
            },
            {
                title: '为什么无法找到midea_xx_xxxx设备WiFi',
                link: 'deviceProblems/problemDetail',
                detailTitle: '为什么无法找到midea_xx_xxxx设备WiFi',
                descInfos: [
                    '美的智能设备需要进入配置模式才会发射设备WiFi，进入配置模式的方法请参考设备配网指引。设备WiFi名称为midea_xx_xxxx，默认密码为12345678'
                ]
            },
            {
                title: '添加设备百分比进度条停止',
                link: 'deviceProblems/problemDetail',
                detailTitle: '添加设备百分比进度条停止',
                descInfos: [
                    '添加设备时出现进度条停止情况请不要着急取消或退出，美居会给出失败原因和提示。如果根据提示无法解决问题，请联系客服进行咨询'
                ]
            },
            {
                title: '为什么美居搜索不到我家里面的WiFi网络',
                link: 'deviceProblems/problemDetail',
                detailTitle: '为什么美居搜索不到我家里面的WiFi网络',
                descInfos: [
                    '美居无法获取WiFi列表是由于禁止了美居的定位权限，建议您找到安全软件或设置，打开美居的定位权限即可'
                ]
            },
            {
                title: '为什么我的设备WiFi指示灯一直在闪',
                link: 'deviceProblems/problemDetail',
                detailTitle: '为什么我的设备WiFi指示灯一直在闪',
                descInfos: [
                    'WiFi指示灯闪烁表明设备没有能够正常连接网络。建议您重置设备后再配网'
                ]
            },
            {
                title: '扫描二维码一直提示错误，怎么回事',
                link: 'deviceProblems/problemDetail',
                detailTitle: '扫描二维码一直提示错误，怎么回事',
                descInfos: [
                    '提示错误表明您扫描了错误的设备二维码，正确的二维码应该是单独贴在设备上，而不是常见的节能标示的二维码'
                ]
            },
            {
                title: '怎么才能知道我的设备是否支持WiFi功能',
                link: 'deviceProblems/problemDetail',
                detailTitle: '怎么才能知道我的设备是否支持WiFi功能',
                descInfos: [
                    '可查看产品说明书，或通过咨询购买渠道进行确认'
                ]
            },
            {
                title: '为什么我的设备进入AP配置模式还是找不到设备WiFi',
                link: 'deviceProblems/problemDetail',
                detailTitle: '为什么我的设备进入AP配置模式还是找不到设备WiFi',
                descInfos: [
                    '建议进行重试，如果多次尝试进入配置模式成功但无法搜索到设备WiFi，或为WiFi问题，请联系美的售后人员进行更换'
                ]
            },
            {
                title: '连接的时候出现错误怎么办',
                link: 'deviceProblems/problemDetail',
                detailTitle: '连接的时候出现错误怎么办',
                descInfos: [
                    '连接出现错误提示，请排除问题后重试，如果仍然不能解决可咨询客服需求帮助'
                ]
            },
            {
                title: '连接智能设备需要注意哪些常见问题',
                link: 'deviceProblems/problemDetail',
                detailTitle: '连接智能设备需要注意哪些常见问题',
                placeholder: '美居使用注意事项:',
                descSteps: [
                    '建议手机系统版本为安卓4.0或者iOS8.0以上',
                    '美居权限尽量全部打开，主要是定位，WiFi，推送，相机，数据网络等权限',
                    '家中必须有能够正常连接上网的家庭路由器网络',
                    '路由器不能开启AP隔离模式，WiFi名称不建议使用中文字符或其他特殊字符，密码长度>=8位',
                    '家庭路由器无线网络为2.4GHz频段'
                ]
            },
            {
                title: '为什么扫描设备二维码没有任何反应',
                link: 'deviceProblems/problemDetail',
                detailTitle: '为什么扫描设备二维码没有任何反应',
                descInfos: [
                    '扫描二维码时没有反应可以尝试变化角度，或者扫描距离稍微远一点，另外检查二维码是否破损。如果二维码破损，建议联系客服寻求帮助'
                ]
            }
        ]
    },
    {
        title: '家庭管理',
        subMenus: [
            {
                title: '如何添加家庭',
                link: 'deviceProblems/problemDetail',
                detailTitle: '添加家庭',
                detailStep: '设置 - 家庭管理 - 添加家庭',
                tipTitle: '提示条款',
                tipInfo: '美的提醒您：在使用美的平台各项服务前，请您务必仔细阅读并透彻理解本声明。如对本声明内容有任何疑问，您可向美的平台客服咨询。阅读本声明的过程中，如果您不同意本声明或其中任何内容，您应立即停止使用美的平台服务。如果您使用美的平台服务的，即意味着您认可本声明全部内容。'
            },
            {
                title: '如何创建新的家庭',
                link: 'deviceProblems/problemDetail',
                detailTitle: '创建新的家庭',
                descInfos: [
                    '登录美居App，点左上角头像-侧边栏点“我的家庭”-点右上加号，输入家庭名称及家庭描述，点击“创建”按钮即可完成家庭创建'
                ]
            },
            {
                title: '如何编辑家庭信息',
                link: 'deviceProblems/problemDetail',
                detailTitle: '编辑家庭信息',
                descInfos: [
                    '登录美居App，在个人中心—>设置—>家庭管理中进行编辑',
                    '注：编辑家庭信息仅限于家庭创建者，家庭成员无法修改'
                ]
            },
            {
                title: '如何删除家庭成员',
                link: 'deviceProblems/problemDetail',
                detailTitle: '删除家庭成员',
                descInfos: [
                    '登录美居App，在个人中心—>设置—>家庭管理—>家庭详情中删除家庭成员',
                    '注:删除家庭成员仅限于家庭创建者，家庭成员无法修改；被删除成员将不能控制该家庭中的设备'
                ]
            },
            {
                title: '如何邀请家庭成员',
                link: 'deviceProblems/problemDetail',
                detailTitle: '邀请家庭成员',
                descInfos: [
                    '登录美居App，在个人中心—>设置—>家庭管理—>家庭详情—>邀请成员，通过搜索手机号添加',
                    '家庭成员此时会收到邀请信息，点击“同意”则成功加入家庭，点击“忽略”则拒绝加入家庭',
                    '注：邀请家庭成员仅限于家庭创建者，家庭成员无法邀请；被邀请的成员将能控制该家庭中的所有设备'
                ]
            },
            {
                title: '如何删除/退出家庭',
                link: 'deviceProblems/problemDetail',
                detailTitle: '删除/退出家庭',
                descInfos: [
                    '登录美居App，在个人中心—>设置—>家庭管理'
                ],
                delTipTitle: '删除家庭',
                delTipInfo: '家庭创建者删除家庭后，该家庭的成员和设备关系都会删除',
                outTipTitle: '退出家庭',
                outTipInfo: '家庭成员退出家庭后，该成员将不能控制该家庭中的设备'
            },
            {
                title: '如何切换家庭',
                link: 'deviceProblems/problemDetail',
                detailTitle: '切换家庭',
                descInfos: [
                    '登录美居App，在首页家庭名称位置的下拉弹窗中选择家庭进行切换'
                ]
            }
        ]
    },
    // {
    //     title: '用户管理',
    //     subMenus: []
    // },
    {
        title: '其他部分',
        subMenus: [
            {
                title: '无法接收设备提醒/成员邀请',
                link: 'deviceProblems/problemDetail',
                detailTitle: '无法接收设备提醒/成员邀请',
                placeholder: '请检查美居App是否已获得推送通知权限',
                descInfos: [
                    '苹果用户具体入口：手机设置—> 通知—>美居—>允许通知',
                    '安卓用户具体入口：手机设置—>应用管理—>美居—>允许通知'
                ]
            },
            {
                title: '美居App闪退',
                link: 'deviceProblems/problemDetail',
                detailTitle: '美居App闪退',
                descInfos: [
                    '若美居App闪退，请完全退出美居App（删除后台进程），再重新打开美居App',
                    '若问题仍然存在，请完全卸载美居App后重新安装，并升级到最新版本',
                    '若问题仍然存在，建议尝试用其他手机登录，不排除部分手机系统太旧导致美居无法运行'
                ]
            },
            {
                title: '美居App无法登陆',
                link: 'deviceProblems/problemDetail',
                detailTitle: '美居App无法登陆',
                descInfos: [
                    '请确认网络情况后重试。若问题长时间仍然存在，请完全卸载美居App后重新安装，并升级到最新版本'
                ]
            }
        ]
    }
]

export default menus