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
            let list = settingArrData(currentItem[key].range[0],currentItem[key].range[1],currentItem[key].range[2]);
            return {
                list,
                defaultValue: this.setValue(key),
                displayValue (item) {
                    return item;
                }
            };
        },
        setValue: function(key){
            return this.current[key] || this.currentItem[key].default;
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
                fireAmount:0
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
            if(this.currentItem && this.currentItem['preheat'].default){
                this.current.preheat = true;
            }
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
                preheat: this.currentItem.preheat,
                steamAmount: this.setValue('steamAmount'),
                fireAmount: this.setValue('fireAmount')
            };
            nativeService.alert(jsonCmd);
            return;
            this.controlDevice(jsonCmd);

        },
    }
};

export default accordionMixin;