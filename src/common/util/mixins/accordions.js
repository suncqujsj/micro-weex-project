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
                currentItem:null,
                // currentItem:{
                //     'icon': '',
                //     'text': '清蒸草鱼香菇',
                //     'mode': 0xE0,
                //     time:{
                //         set: true,
                //         default:13,
                //         range:[5,120,1]
                //     },
                //     temperature:{
                //         set: true,
                //         default:100,
                //         range:[35,70,1,75,100,5]
                //     },
                //     preheat:{
                //         set:false,
                //         default: false
                //     },
                //     steamAmount:{
                //         set:false,
                //         default:0,
                //         range:null
                //     },
                //     fireAmount:{
                //         set:false,
                //         default:0,
                //         range:null
                //     },
                //     weight:{
                //         set:false,
                //         default:0,
                //         range:null
                //     },
                //     recipeId:{
                //         set:false,
                //         default: 0x41,
                //         range:null
                //     },
                //     probeTemperature:{
                //         set: false,
                //         default:0,
                //         range:null,
                //     },
                //     probe: null,//肉类探针
                //     detail: null
                // },
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
                hms:null,
                temperature: null,
                preheat:false,
                preheatHide: false,
                steamAmount:null,
                fireAmount:0,
                weight:0,
                steamSwitch:false,
                recipeId:null,
                probeTemperature: null,
                probe: false,
                isTemperatureChange: false,
                isTimeChange: false,
                isSteamAmountChange: false,
                isFireAmountChange: false
            }
        },
        resetState: function(){
            this.accordions = this.initAccordions();
            this.current = this.initCurrentData();
            this.closeDetailModal();
            this.currentItem = null;
        },
        handlePickerChange(data, key){
            //记录哪个key的值修改到
            if(key=='temperature' && this.current[key]!=data){
                this.current.isTemperatureChange = true;
            }
            if(key=='time' && this.current[key]!=data){
                this.current.isTimeChange = true;
            }
            if(key=='steamAmount' && this.current[key]!=data){
                this.current.isSteamAmountChange = true;
            }
            if(key=='fireAmount' && this.current[key]!=data){
                this.current.isFireAmountChange = true;
            }
            this.current[key] = data;
            if(key=='temperature'){
                if(data<100){
                    this.current.preheatHide = true;
                }else{
                    this.current.preheatHide = false;
                }
            }
            // nativeService.alert(this.current);
        },
        onPreheatChange(event) {
            this.current[event.itemKey] = event.value;
            // console.log('currentPreheat', this.current.preheat);
        },
        openDialog(){
             //弹出时，重新初始值
             this.accordions = this.initAccordions();
             this.current.isTemperatureChange = false;
             this.current.isTimeChange = false;
             this.current.isSteamAmountChange = false;
             this.current.isFireAmountChange = false;
             this.current.preheatHide = false;
             this.current.preheat = this.currentItem['preheat'].default;
            //  this.current.hms = this.currentItem['hms'].default;
            // this.current.steamSwitch = this.currentItem['steamSwitch'].default;
            // this.current.time = this.currentItem['time'].default;
            // this.current.temperature = this.currentItem['temperature'].default;
            // this.current.steamAmount = this.currentItem['steamAmount'].default;
            // this.current.fireAmount = this.currentItem['fireAmount'].default;
            this.settingClickRecord = true;
            this.show = true;
           
         
        },
        closeDialog(e) {
            this.settingClickRecord = false;
            this.show = false;
            if (e.type === 'cancel' || e.type === 'close'){
                this.show = false;
                this.resetState();
                return;
            }

            let jsonCmd = {
                currentItem: this.currentItem,
                mode: this.currentItem.mode,
                minute: this.setValue('time'),
                temperature: this.setValue('temperature'),
                preheat: this.current.preheat,
                preheatHide:  this.current.preheatHide,
                steamAmount: this.setValue('steamAmount'),
                weight: this.setValue('weight'),
                steamSwitch: this.current.steamSwitch,
                fireAmount: this.setValue('fireAmount'),
                recipeId:this.setValue('recipeId'),
                probeTemperature: this.setValue('probeTemperature'),
                probe:  this.currentItem.probe,
                second: this.current.second,
                isTemperatureChange:  this.current.isTemperatureChange,
                isTimeChange: this.current.isTimeChange,
                isSteamAmountChange: this.current.isSteamAmountChange,
                isFireAmountChange: this.current.isFireAmountChange
            };

            let msg = this.validate(jsonCmd);
            if(msg) {
                this.show = true;
                nativeService.toast(msg);
                return;
            }

            // this.resetState();
            
            // if(jsonCmd.mode === 0xE0) { // 自动菜单
            //     jsonCmd.recipeId =  this.setValue('recipeId');
            // }
            this.controlDevice(jsonCmd, e);
        },
        validate(jsonCmd){
            let sn8 = this.device.extra1.sn8;
            switch (sn8){
                case '08T7428E':
                case '0T7L421F':
                    if(jsonCmd.probeTemperature >= jsonCmd.temperature) {
                        return '探针温度必须小于腔体温度';
                    }
                default:
                    return null;
            }
        }
    }
};

export default accordionMixin;