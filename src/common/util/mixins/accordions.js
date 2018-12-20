/**
 * Created by sf
 * 2018/10/22
 */

import accordions from "../config/accordions.js";
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
                    detail: null
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
            var rangeList = currentItem[key].range;
            if(rangeList[rangeList.length-1] == "取消"){
                list = list.concat('取消');
            }
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
            // if(this.current[key]==0){
            //     return this.current[key];
            // }
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
            if (e.type === 'cancel' || e.type === 'close'){
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
                recipeId:this.setValue('recipeId'),
            };

            // if(jsonCmd.mode === 0xE0) { // 自动菜单
            //     jsonCmd.recipeId =  this.setValue('recipeId');
            // }
            this.controlDevice(jsonCmd, e);
        },
    }
};

export default accordionMixin;