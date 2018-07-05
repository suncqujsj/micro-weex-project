<template>
   <div class="wrap" :style="wrapStyle">
        <div class="row-sb hd">
            <text class="hd-text font-grey" @click="goBack">取消</text>
            <text class="hd-text">{{deviceName}}</text>
            <text class="hd-text font-grey"  @click="save">确定</text>
        </div>
        <div class="content">
            <text class="sub-hd">设置为</text>
            <div class="ability-list" v-for="(item,i) in actions">
                <div :class="['row-sb','floor', i=='0'?'no-border':'']">
                    <text>{{item.propertyName}}</text>
                    <div >
                        <switch-bar v-if="item.type == 'switch'" :checked="item.currentStatus =='on'? 1: 0" @change="switchAction(item,i)"></switch-bar>
                        <div v-if="item.type == 'list' || item.type=='range' " class="row-e" @click="showPop(item.property)">
                            <text v-if="item.type == 'list'" class="property-text">{{item.currentStatusName}}</text>
                            <text v-if="item.type=='range'" class="property-text">{{item.currentStatus}}</text>
                            <image class="icon" :src="icon.more"></image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pop-floor" v-for="(item,idx) in actions">
             <midea-popup v-if="item.type == 'list' || item.type=='range'" :show="show[item.property]" :height="600" @mideaPopupOverlayClicked="closePop(item.property)">
                <div class="row-sb pop-hd">
                    <text class="pop-text" @click="closePop(item.property)">取消</text>
                    <text class="pop-text" @click="confirmPop(item.property)">确定</text>
                </div>
                <scroller v-if="item.type == 'list'">
                    <text v-for="(value,key) in item.value" :class="['pop-item', item.currentStatus == key?'pop-item-active':'']" @click="setActiveKey(idx, key)">{{value}}</text>
                </scroller>
                <div v-if="item.type == 'range'">
                    <scroll-picker v-if="item.property == 'temperature'" :listArray="rangeArrays[item.property]" @onChange="setActiveTemperature"></scroll-picker>
                    <scroll-picker v-if="item.property == 'wind_speed'" :listArray="rangeArrays[item.property]" @onChange="setActiveWindSpeed"></scroll-picker>
                </div>
            </midea-popup>
        </div>
   </div>
</template>

<style>
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .row-e { flex-direction: row; align-items: center; justify-content: flex-end; }
    
    .wrap{ background-color: #f2f2f2; }
    .font-grey { color: #666; }
    .hd{
        background-color: #fff;
        width: 750px;
        height: 88px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .hd-text{ font-size: 32px; }
    .content{ padding-top: 50px;}
    .sub-hd{
        color: #666;
        font-size: 28px;
        margin-left:30px;
        margin-bottom: 18px;
    }
    .floor{
        margin-left: 25px;
        padding-top: 25px;
        padding-bottom: 25px;
        padding-right: 25px;
        border-top-width: 2px;
        border-top-style: solid;
        border-top-color: #e5e5e5;
    }
    .no-border{
        border-top-color: transparent;
    }
    .ability-list{
        background-color: #fff;
    }
    .property-text{
        color: #666;
        font-size: 30px;
    }
    .icon{
        width: 12px;
        height: 24px;
        margin-left: 20px;
    }
    .pop-text{ font-size: 30px; color: #007AFF; padding: 25px;}
    .pop-item{ padding: 22px; font-size: 30px; color: #777;  text-align: center; width: 750px;}
    .pop-item-active { color: #333}
</style>

<script>
    import { url, applianceActions, autoSupportActions } from './config/config.js'

    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaCell from '@/midea-component/cell.vue'
    import MideaPopup from '@/midea-component/popup.vue'
	import switchBar from '@/midea-rooms/components/switch.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    import scrollPicker from '@/midea-rooms/components/scrollPicker.vue'

    const channelSetDevice = new BroadcastChannel('autoBroadcast')

    export default {
        components:{ switchBar, MideaPopup, scrollPicker },
        mixins: [base],
        data(){
            return {
                icon: {
                    more: 'assets/img/more.png'
                },
                from: '',
                deviceName: '',
                actions: {},
                userDevice: [],
                deviceTask: {},
                show: {},
                active: {},
                activeKey: {},
                applianceActions: applianceActions,
                autoSupportActions: autoSupportActions[this.sceneType],
                rangeArrays: {
                    temperature: [],
                    windSpeed: []
                },
            }
        },
        computed: {
            wrapStyle(){
                let tmp = {
                    height: this.pageHeight+'px'
                }
                return tmp
            },
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            initData(){
                this.sceneType = nativeService.getParameters('sceneType')
                this.deviceType = nativeService.getParameters('deviceType')
                this.deviceName = decodeURIComponent(nativeService.getParameters('deviceName'))
                this.deviceId = nativeService.getParameters('deviceId')
                this.from = nativeService.getParameters('from')
                
                if ( this.from == 'addAuto' ) {
                }else if (this.from == 'editAuto') {
                    this.deviceTask = Object.assign({}, this.deviceTask, JSON.parse(decodeURIComponent(nativeService.getParameters('deviceTask'))))
                }
                let tmpActions = autoSupportActions[this.sceneType][this.deviceType].actions
                
                let tmpShow = {}
                let tmpActiveKey = {}
                for (var i in tmpActions) {
                    let currentStatus
                    if ( this.from == 'addAuto' || this.from == 'addEdit' ) {
                        currentStatus = tmpActions[i].default
                    }else if( this.from == 'editAuto'){
                        if (this.deviceTask[tmpActions[i].property] ) {
                            currentStatus = this.deviceTask[tmpActions[i].property]
                        }else{
                            currentStatus = tmpActions[i].default
                        }
                    }
                    if (tmpActions[i].type == 'range') {
                        tmpActions[i] = Object.assign({}, tmpActions[i], {currentStatus: currentStatus})
                    }else{
                        tmpActions[i] = Object.assign({}, tmpActions[i], {currentStatus: currentStatus, currentStatusName: tmpActions[i]['value'][currentStatus]})
                    }
                    
                    //显示启用按钮状态， 初始化选择项activeKey
                    if (tmpActions[i].type == 'switch') {
                    }else if (tmpActions[i].type == 'list' ){
                        tmpShow[tmpActions[i].property] = false //初始化弹窗显示状态为false
                    }else if ( tmpActions[i].type == 'range'){
                        tmpShow[tmpActions[i].property] = false //初始化弹窗显示状态为false
                        this.rangeArrays[tmpActions[i].property] = this.generateListArray(tmpActions[i].range.min, tmpActions[i].range.max)
                    }
                }

                this.actions = tmpActions
                this.show = Object.assign({}, this.show, tmpShow)
                this.activeKey = Object.assign({}, this.activeKey, tmpActiveKey)
            },
            switchAction(action, i){
                let tmp = {
                    'on': 'off',
                    'off': 'on'
                }
                this.actions[i].currentStatus = tmp[this.actions[i].currentStatus]
            },
            generateListArray(min, max){
                let tmp = []
                let len  = max-min+1
                for (let i=0; i<len; i++){
                    tmp[i] = { index: i, value: i+min }
                }
                return tmp
            },
            showPop(property){
                this.show[property] = true
            },
            closePop(property){
                this.show[property] = false
            },
            cancelPop(property){
                this.show[property] = false
            },
            confirmPop(property){
                this.show[property] = false
                for (var x in this.actions) {
                    if (this.actions[x].property == property){
                        this.actions[x].currentStatus = this.active[property]
                    }
                }
            },
            setActiveTemperature(e){
                this.active.temperature = e.value
            },
            setActiveWindSpeed(e){
                this.active.windSpeed = e.value
            },
            setActiveKey(propertyIdx, key){
                this.actions[propertyIdx].currentStatus = key
                this.actions[propertyIdx].currentStatusName = this.actions[propertyIdx]['value'][key]
            },
            save(){
                channelSetDevice.postMessage({
                    page: 'setDevice',
                    applianceCode: this.deviceId,
                    actions: this.actions
                })
                this.goBack()
            }
        },
        created(){
            this.initData()
        }
    }
</script>


