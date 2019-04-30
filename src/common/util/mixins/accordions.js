/**
 * Created by sf
 * 2018/10/22
 */

import accordions from "../config/accordions.js";
import  nativeService  from '@/common/services/nativeService.js';
const objectAssign = require('object-assign');

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
                currentItem:null,
                current:this.initCurrentData(),
                show: false,
                accordions: this.initAccordions()
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
        getAccordionLanguage(item, key){
            return item[key][this.getLang()] ? item[key][this.getLang()] : item[key];
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
                quantity:0,
                steamSwitch:false,
                recipeId:null,
                probeTemperature: null,
                probe: false,
                isTemperatureChange: false,
                isTimeChange: false,
                isSteamAmountChange: false,
                isFireAmountChange: false,
                upTemperature: null,
                downTemperature: null,
                isProbeSettingTemperature: null
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
            if(this.preheatCondition(key) && !this.isSmallOven()){
                if(data<100){
                    this.current.preheatHide = true;
                }else{
                    this.current.preheatHide = false;
                }
            }
            // nativeService.alert(this.current);
        },
        preheatCondition(key){ // sf 各种温度判断
            const keys = ['temperature', 'upTemperature', 'downTemperature'];
            return keys.indexOf(key) > -1
        },
        onPreheatChange(event) {
            this.current[event.itemKey] = event.value;
            // console.log('currentPreheat', this.current.preheat);
        },
        openDialog(){
             //弹出时，重新初始值
             if(!this.isWorkingPage){ //弹出框的参数为初始默认值,否则如果是工作页面，弹出框的参数为当前的温度时间蒸汽等
                this.current = this.initCurrentData();
             }
             
             this.accordions = this.initAccordions();
             this.current.isTemperatureChange = false;
             this.current.isTimeChange = false;
             this.current.isSteamAmountChange = false;
             this.current.isFireAmountChange = false;
             this.current.preheatHide = false;
             this.current.preheat = this.currentItem['preheat'] ? this.currentItem['preheat'].default : false;
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
                this.statisticsUpload({subAction: 'cancel_mode_click'});
                return;
            }

            let jsonCmd = {
                currentItem: this.currentItem,
                mode: this.currentItem.mode,
                time: this.setValue('time'),
                temperature: this.setValue('temperature'),
                preheat: this.current.preheat,
                preheatHide:  this.current.preheatHide,
                steamAmount: this.setValue('steamAmount'),
                weight: this.setValue('weight'),
                quantity: this.setValue('quantity'),
                steamSwitch: this.current.steamSwitch,
                fireAmount: this.setValue('fireAmount'),
                recipeId:this.setValue('recipeId'),
                probeTemperature: this.setValue('probeTemperature'),
                probe:  this.currentItem.probe,
                second: this.current.second,
                isTemperatureChange:  this.current.isTemperatureChange,
                isTimeChange: this.current.isTimeChange,
                isSteamAmountChange: this.current.isSteamAmountChange,
                isFireAmountChange: this.current.isFireAmountChange,
                upTemperature:this.setValue('upTemperature'),
                downTemperature:this.setValue('downTemperature'),
                isProbeSettingTemperature: this.setValue('isProbeSettingTemperature')
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

            this.dialogParamsStatistics(jsonCmd);

            jsonCmd = this.formatJsonCmd(jsonCmd);

            this.statisticsUpload({subAction: 'start_mode_click', action_result:this.currentItem.mode});
            this.controlDevice(jsonCmd, e);
        },
        /**
         * 弹窗参数数据埋点
         */
        dialogParamsStatistics(jsonCmd){
            try {
                if(this.isStandby()) {
                    for(let accordion of this.accordions) {
                        let key = accordion.key;
                        if(!!this.currentItem[key] && this.currentItem[key].set && this.currentItem[key].default != jsonCmd[key]) { // bool to test
                            nativeService.toast(`${!!this.currentItem[key]}:${this.currentItem[key].set}:${this.currentItem[key].default != jsonCmd[key]}`);
                            this.statisticsUpload({subAction: `${key}_${accordion.type}`, action_result:`${this.currentItem[key].default}->${jsonCmd[key]}`});
                        }
                    }
                    return;
                }

                for(let accordion of this.accordions) {
                    let key = accordion.key;
                    if(!!this.currentItem[key] && this.currentItem[key].set && !this.currentItem[key].hide) { // bool to test
                        this.statisticsUpload({subAction: `${key}_${accordion.type}`, action_result:`${jsonCmd[key]}`});
                    }
                }

            }catch (e) {
                nativeService.toast(e)
            }
        },
        validate(jsonCmd){
            // nativeService.alert(this.cmdObj.isProbe.value)
            let sn8 = this.device.extra1.sn8;
            switch (sn8){
                case '08T7428E':
                case '0T7L421F':
                    if(this.cmdObj.isProbe.value && (jsonCmd.probeTemperature >= jsonCmd.temperature)) {
                        return '探针温度必须小于腔体温度';
                    }
                default:
                    return null;
            }
        },

        formatJsonCmd(jsonCmd){
            let buffer = objectAssign({}, jsonCmd);
            let sn8 = this.device.extra1.sn8;
            if(sn8 === '0TR934MJ' && this.isAutoMenu(jsonCmd.mode)) { // 电控根据重量自动计算烹饪时间。
                buffer.minute = null;
            }

            return buffer;
        },

        isAutoMenu(mode){
            return mode === 0xE0;
        }
    }
};

export default accordionMixin;