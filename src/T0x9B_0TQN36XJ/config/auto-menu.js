/**
 * Created by sf
 * 2018/10/20
 */

let data = [
    {
        title: '1-7岁儿童',
        iconButtons: [
            {
                'icon': 'assets/img/modes/steam@3x.png',
                'text': '蒸汽',
                'mode': 0x20,
                pickTime: true,
                pickTemperature: true,
                switchPreheat:false,
                defaultTime: 10,
                defaultTemperature: 100
            },
            {
                'icon': 'assets/img/modes/steam_and_hot_wind@3x.png',
                'text': '蒸汽+热风',
                'mode': 0x31
            },
            {
                'icon': 'assets/img/modes/broil@3x.png',
                'text': '烧烤',
                'mode': 0x40
            },
            {
                'icon': 'assets/img/modes/hot_wind@3x.png',
                'text': '热风对流',
                'mode': 0x41
            }
        ]
    },
    {
        title: '1-8岁儿童',
        iconButtons: [
            {
                'icon': 'assets/img/modes/hot_wind_and_broil@3x.png',
                'text': '热风烧烤',
                'mode': 0x43
            },
            {
                'icon': 'assets/img/modes/clean@3x.png',
                'text': '清洁',
                'mode': 0xC1
            },
            {
                'icon': 'assets/img/modes/heat_preservation@3x.png',
                'text': '保温',
                'mode': 0xD0
            },
            {
                'icon': 'assets/img/modes/fermentation@3x.png',
                'text': '发酵',
                'mode': 0xB0
            }
        ]
    }
];

export default data;