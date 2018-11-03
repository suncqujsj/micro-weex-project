/**
 * Created by sf
 * 2018/10/22
 */

import accordions from "../../config/accordions.js";
import  nativeService  from '@/common/services/nativeService.js';

var settingArrData = function(start,end,step){
    var arr=[];
    if(start > end){
        return arr;
    }
    for(var i=0;start+i*step <= end;i++){
        var value = start+step*i;
        if(value < 0){
            continue;
        }
        arr[i]=value;
    }
    return arr;
};

const accordionMixin = {
    data () {
            return {
                accordions: this.initAccordions(),
                // currentItem:null,
                currentItem:{
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
                current:this.initCurrentData(),
                show: false
            }
    },
    methods: {
        range: function(key){ // picker属性范围
            let currentItem = this.currentItem;
            // debugger;
            let list = [];
            for(var i=0; 3*i<currentItem[key].range.length; i++){
                list = list.concat(settingArrData(currentItem[key].range[3*i],currentItem[key].range[3*i+1],currentItem[key].range[3*i+2]));
            }
            return {
                list,
                defaultValue: this.setValue(key),
                displayValue (item) {
                    return item;
                }
            };
        },
        setValue: function(key){
            return this.current[key] || (this.currentItem[key] ? this.currentItem[key].default : null);
        },
        updateAccordionFoldingStatus: function(key, value){
            // debugger;
            let accordions = JSON.parse(JSON.stringify(this.accordions));
            let accordionLen = this.accordions.length;
            for(let index=0;index < accordionLen;index++) {
                let item = accordions[index];
                if (key === index) {
                    item.isFolded = value;
                } else {
                    if (!value && !item.isFolded) {
                        item.isFolded = true;
                    }
                }
            }
            this.accordions = accordions;
        },
        initAccordions: function(){
            return accordions;
        },
        initCurrentData: function(){
            return {
                time: null,
                temperature: null,
                preheat:false,
                steamAmount:0,
                fireAmount:0,
                recipeId:null
            }
        },
        resetState: function(){
            this.accordions = this.initAccordions();
            this.current = this.initCurrentData();
            this.currentItem = null;
        },
        handlePickerChange(data, key){
            this.current[key] = data;
        },
        onPreheatChange(event) {
            this.current.preheat = event.value;
            console.log('currentPreheat', this.current.preheat);
        },
        openDialog(){
            this.show = true;
            this.current.preheat = this.currentItem['preheat'].default;
        },
        closeDialog(e) {
            this.show = false;
            if (e.type === 'cancel'){
                this.show = false;
                this.resetState();
                return;
            }

            let jsonCmd = {
                mode: this.currentItem.mode,
                minute: this.setValue('time'),
                temperature: this.setValue('temperature'),
                preheat: this.current.preheat,
                steamAmount: this.setValue('steamAmount'),
                fireAmount: this.setValue('fireAmount'),
                recipeId:this.setValue('recipeId')
            };

            // if(jsonCmd.mode === 0xE0) { // 自动菜单
            //     jsonCmd.recipeId =  this.setValue('recipeId');
            // }
            this.controlDevice(jsonCmd, e.working);
        },
    }
};

export default accordionMixin;