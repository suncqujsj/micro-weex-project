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
                currentItem:null,
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