<template>
    <div class="accordion-wrapper">
        <!--模式参数设置弹窗-->
        <sf-dialog :show="show" :working="isWorkingPage" confirmText="开始" @close="closeDialog" @mideaDialogCancelBtnClicked="closeDialog" @mideaDialogConfirmBtnClicked="closeDialog">
            <div slot="content">
                <modal-header style="margin:0 -36px;" v-if="currentItem" :showRightImg="!detailEmpty && currentItem.mode === 0xE0" rightImg="assets/img/header/public_ic_help@3x.png" class="modal-header" :title="modeText" titleText="#666666" :isImmersion="false"  :showLeftImg="false" @rightImgClick="showDetailModal"></modal-header>

                <template v-for="(item, index) in accordions">
                    <template v-if="item.type==='picker'">
                        <sf-accordion v-if="currentItem && currentItem[item.key].set" :value="setValue(item.key)" :unit="item.unit" :index="index" :title="item.subtitle" :isFolded="item.isFolded"  @callback="updateAccordionFoldingStatus">
                            <div slot="content">
                                <wx-picker  :data="range(item.key)" :target="item.key" :visible="true" @wxChange="handlePickerChange"></wx-picker>
                                <!--<wx-picker  :list="range(item.key).list" :defaultValue="range(item.key).defaultValue" :target="item.key"  @wxChange="handlePickerChange"></wx-picker>-->
                            </div>
                        </sf-accordion>
                    </template>
                    <template v-if="item.type==='switch'">
                        <sf-accordion v-if="currentItem && currentItem[item.key].set" :title="item.subtitle" index="-1" :hideArrow="item.hideArrow">
                            <div slot="right">
                                <midea-switch2 :checked="current[item.key]" @change="onPreheatChange" width="70" height="38" slot="value"></midea-switch2>
                            </div>
                        </sf-accordion>
                    </template>
                </template>
            </div>
        </sf-dialog>

        <detail-modal :show="showDetailVisibility" @close="closeDetailModal">
            <div slot="title">
                <modal-header  leftImg="assets/img/header/public_ic_gray@3x.png" class="modal-header" :title="modeText" titleText="#666666" :isImmersion="false"  :showLeftImg="true" @leftImgClick="closeDetailModal"></modal-header>
            </div>
            <div slot="content" class="content-wrap" :style="{'height':338*2 + 'px'}">
                <div class="content-block row" :style="{'padding-top':14*2-3+'px'}">
                    <text class="label">食材:</text>
                    <scroller class="food-material-items flex">
                        <div class="food-material-item row" v-for="item in foodMaterialItems">
                            <text class="food-material-item-left flex">{{item.name}}</text>
                            <text class="food-material-item-right">{{item.weight}}</text>
                        </div>
                    </scroller>
                </div>
                <div class="content-block row" :style="{'padding-top':20*2-3+'px'}">
                    <text class="label">处理:</text>
                    <scroller class="cooking-steps flex">
                        <text v-for="(item, index) in cookingSteps" class="cooking-step">{{index+1}}.{{item}}</text>
                    </scroller>
                </div>
            </div>
        </detail-modal>
    </div>
</template>
<style lang="less" type="text/less">
@import "../../../common/less/common";
.content-wrap{
  padding: 0 31*2px;
}

.content-block{
  border-top-width: 1px;
  border-top-color: #E5E5E8;
}

.label{
  .f(12*2px);
  .ma-r(16*2px);
}
.food-material-items{
  height: 179px;
}
.food-material-item-left, .food-material-item-right, .cooking-step{
  .f(12*2px);
  .gray;
}

.cooking-steps{
  height: 435px;
  width: 180*2px;
}

.cooking-step{
  line-height: 15*2px;
  .ma-b(13*2);
}
</style>

<script>
    import modalHeader from '@/component/sf/custom/modal-header.vue'
    import sfAccordion from '@/component/sf/custom/accordion.vue'
    import sfDialog from '@/component/sf/custom/dialog.vue'
    import WxPicker from '@/component/sf/custom/picker.vue'
    // import WxPicker from '@/component/sf/custom/picker_midea.vue'
    import mideaSwitch2 from '@/midea-component/switch2.vue'
    import detailModal from '@/component/sf/custom/detail-modal.vue'
    import nativeService from "@/common/services/nativeService";
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
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }, 
            accordions: {
                type: Array,
                default: function(){
                    return []
                }
            },
            isWorkingPage: {
                type: Boolean,
                default: false
            },
            modeText: {
                type: String,
                default: ''
            },
            currentItem: {
                type: Object,
                default: function () {
                    return {
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
                    };
                },
                required: true
            },
            current: {
                type: Object,
                default: function () {
                    return  {
                        time: null,
                        temperature: null,
                        preheat:false,
                        steamAmount:0,
                        fireAmount:0,
                        recipeId:null
                    };
                },
                required: true
            },
        },
        watch: {
            isFolded(value) {
                this.isFoldedStatus = value
            },
            // current:{
            //     handler(newName, oldName) {
            //         this.current = newName;
            //     },
            //     immediate: true,
            //     deep: true
            // }
        },
        components: {sfDialog,WxPicker,modalHeader,detailModal,sfAccordion,mideaSwitch2,detailModal},
        data() {
            return {
               showDetailVisibility: false,
            }
        },
        created(){
            
        },
         computed:{
            detailEmpty: function(){
                return !this.currentItem || !this.currentItem.detail;
            },
            foodMaterialItems(){
                if(this.detailEmpty) {
                    return [];
                }

                let list = [];
                let foodMaterial= JSON.parse(JSON.stringify(this.currentItem.detail.foodMaterial));
                let foodMaterialItems = foodMaterial.split('\n');
                let itemLen = foodMaterialItems.length;
                for(let i=0;i<itemLen;i++) {
                    let itemArr = foodMaterialItems[i].split(/\s+/);
                    let item = {
                        name: itemArr[0],
                        weight: itemArr[1]
                    };
                    list.push(JSON.parse(JSON.stringify(item)));
                }
                return list;
            },
            cookingSteps(){
                if(this.detailEmpty) {
                    return [];
                }

                let list = [];
                let cookingSteps = this.currentItem.detail.cookingSteps;
                let steps = cookingSteps.split('\n');
                let stepLen = steps.length;
                for(let i=0;i<stepLen;i++) {
                    let step = steps[i];
                    list.push(step.split('.')[1]);
                }
                return list;
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
            handlePickerChange(data,key){
                var _current = JSON.parse(JSON.stringify(this.current));
                _current[key] = data;
                this.$emit('handlePickerChange', _current);
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
                this.$emit('foldCallback',accordions);
                //this.accordions = accordions;
            },
             closeDialog(e) {
                //  nativeService.alert(e);
                 if (e.type === 'cancel' || e.type === 'close'){
                    this.$emit('cancelCallback');
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
                this.$emit('sureCallback',jsonCmd, e.working);
            },
            onPreheatChange(event) {
                 var _current = JSON.parse(JSON.stringify(this.current));
                _current['preheat'] = event.value;
                this.$emit('handlePickerChange',_current);
            },
            makeSwitch(e) {
                // debugger;
                this.isFoldedStatus = !this.isFoldedStatus;
                if(this.index === -1) return;
                this.$emit('callback', this.index, this.isFoldedStatus);
            },

            showDetailModal(){
                this.showDetailVisibility = true;
            },
            closeDetailModal(){
                this.showDetailVisibility = false;
            }
        }
    }
</script>

<style>
    .accordion-wrapper {
        
    }
</style>