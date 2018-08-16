<template>
   <div class="wrap" :style="wrapStyle">
        <div class="header-floor">
            <midea-header :title="deviceName" :isImmersion="isipx?false:true" bgColor="#fff" titleText="#000" @leftImgClick="goBack"></midea-header>
            <div v-if="from == 'editAuto'" class="delete" @click="cancelDevice" :style="headBtnStyle">
                <text class="delete-text">删除</text>
            </div>
       </div>
        <list>
            <cell class="content">
                <text class="sub-hd">设置为</text>
                <div class="ability-list" v-for="(item,i) in actions">
                    <div v-if="item.type == 'switch'" :class="['row-sb','floor', i=='0'?'no-border':'']">
                        <text class="property-name">{{item.propertyName}}</text>
                        <div>
                            <switch-bar :isActive="item.currentStatus =='on'" @onSwitch="switchAction(item,i)"></switch-bar>
                        </div>
                    </div>
                    <div v-if="(item.type == 'list' || item.type=='range') && showOtherActions" :class="['row-sb','floor', i=='0'?'no-border':'']"  @click="showPop(item.property)">
                        <text class="property-name">{{item.propertyName}}</text>
                        <div>
                            <div class="row-e">
                                <text v-if="item.type == 'list'" class="property-text">{{item.currentStatusName}}</text>
                                <text v-if="item.type=='range'" class="property-text">{{item.currentStatus}}</text>
                                <image class="icon" :src="icon.more"></image>
                            </div>
                        </div>
                    </div>
                </div>
                <text v-if="actions.length > 0" class="save-btn" @click="save">确定</text>
                
            </cell>
        </list>
        <div class="pop-floor" v-for="(item,idx) in actions">
             <midea-confirm2 :height="490" :show="show[item.property]" @leftBtnClick="closePop(item.property)" @rightBtnClick="confirmPop(item.property)" @mideaPopupOverlayClicked="closePop(item.property)">
                 <div v-if="item.type == 'list'" class="pop-list">
                    <scroller>
                        <text v-for="(value,key) in item.value" :class="['pop-item', active[item.property].value == key?'pop-item-active':'']" @click="setActiveKey(item.property, idx, key)"> {{value}}</text>
                    </scroller>
                 </div>
                <div v-if="item.type == 'range'">
                    <scroll-picker :height="375" v-if="item.property == 'temperature'" :listArray="rangeArrays[item.property]" @onChange="setActiveTemperature"></scroll-picker>
                    <scroll-picker :height="375" v-if="item.property == 'wind_speed'" :listArray="rangeArrays[item.property]" @onChange="setActiveWindSpeed"></scroll-picker>
                </div>
            </midea-confirm2>
        </div>
   </div>
</template>

<style>
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .row-e { flex-direction: row; align-items: center; justify-content: flex-end; }
    
    .wrap{ background-color: #f2f2f2; }
    .header-floor{ position: relative; }
    .font-grey { color: #666; }
    .content{ padding-top: 50px;}
    .sub-hd{
        color: #666;
        font-size: 28px;
        margin-left:30px;
        margin-bottom: 18px;
    }
    .floor{
        margin-left: 25px;
        padding-right: 25px;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #e5e5e5;
    }
    .no-border{
        border-top-color: transparent;
    }
    .delete{
        position: absolute;
        top: 30px;
        right: 25px;
    }
    .delete-text{
        font-size: 28px;
        color: #666;
    }
    .ability-list{
        background-color: #fff;
    }
    .property-name{
        padding-top: 30px;
        padding-bottom: 30px;
        font-size: 30px;
    }
    .property-text{
        color: #666;
        font-size: 28px;
    }
    .save-btn{
        width: 690px;
        margin-top: 48px;
        padding: 25px;
        background-color: #267AFF;
        color: #fff;
        border-radius: 8px;
        margin-left: 30px;
        text-align: center;
        font-size: 32px;
    }
    .icon{
        width: 12px;
        height: 24px;
        margin-left: 20px;
    }
    .pop-text{ font-size: 30px; color: #007AFF; padding: 25px;}
    .pop-list{
        padding-top: 20px;
        height: 340px;
        margin-bottom: 30px;
        background-color: #fff;
    }
    .pop-item{ padding: 22px; font-size: 30px; color: #777;  text-align: center; width: 750px;}
    .pop-item-active { color: #333}
</style>

<script>
    const { platform } = weex.config.env;
    import { url, applianceActions, autoSupportActions } from './config/config.js'

    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import MideaCell from '@/midea-component/cell.vue'
    import MideaPopup from '@/midea-component/popup.vue'
	import switchBar from '@/midea-rooms/components/switch.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    import scrollPicker from '@/midea-rooms/components/scrollPicker.vue'
    import mideaConfirm2 from '@/midea-rooms/components/confirm2.vue'

    const channelSetDevice = new BroadcastChannel('autoBroadcast')

    export default {
        components:{ MideaHeader, switchBar, mideaConfirm2, MideaPopup, scrollPicker },
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
                pageStamp: '',
                editProperties: {},
                isCheck: ''
            }
        },
        computed: {
            wrapStyle(){
                let tmp = {
                    height: this.pageHeight+'px'
                }
                return tmp
            },
            showOtherActions(){
                let tmp = false
                for (var i in this.actions) {
                    if (this.actions[i].property == 'power' && this.actions[i].currentStatus == 'on') {
                        tmp = true
                    }
                    break
                }
                return tmp
            },
            headBtnStyle(){
                let tmp = {}
                if (this.isImmersion) {
                    tmp.top = '72px'
                }else{
                    tmp.top = '32px'
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
                this.pageStamp = nativeService.getParameters('pageStamp')
                
                if ( this.from == 'addAuto' ) {
                }else if (this.from == 'editAuto') {
                    this.deviceTask = Object.assign({}, this.deviceTask, JSON.parse(decodeURIComponent(nativeService.getParameters('deviceTask'))))
                }
                
                nativeService.getItem('mideaRoom'+this.deviceId+this.pageStamp, (res)=>{
                    if (res.result == 'success' && res.data) {
                        this.editProperties = JSON.parse(res.data)
                    }

                    let tmpActions = autoSupportActions[this.sceneType][this.deviceType].actions
                    let tmpShow = {}
                    let tmpActiveKey = {}

                    for (var i in tmpActions) {
                        let currentStatus
                        if ( this.from == 'addAuto' || this.from == 'addEdit' ) {
                            if (this.editProperties[tmpActions[i].property] === '' || this.editProperties[tmpActions[i].property] == undefined) {
                                currentStatus = tmpActions[i].default
                            }else{
                                currentStatus = this.editProperties[tmpActions[i].property]
                            }
                        }else if( this.from == 'editAuto'){
                            if (this.deviceTask[tmpActions[i].property] === '' || this.deviceTask[tmpActions[i].property] === undefined ) {
                                currentStatus = this.editProperties[tmpActions[i].property]  || tmpActions[i].default
                            }else{
                                currentStatus = this.editProperties[tmpActions[i].property] || this.deviceTask[tmpActions[i].property]
                            }
                        }

                        if (tmpActions[i].type == 'range') {
                            tmpActions[i] = Object.assign({}, tmpActions[i], {currentStatus: currentStatus})
                        }else{
                            if (tmpActions[i].type == 'list') {
                                this.active[tmpActions[i].property] = {
                                    index: i,
                                    value: currentStatus
                                }
                                if (tmpActions[i].type == 'list') {//初始化弹窗的内容
                                    let activeProperty = {}
                                    activeProperty[tmpActions[i].property] = {
                                        index: i,
                                        value: currentStatus
                                    }
                                    this.active = Object.assign({}, this.active, activeProperty)
                                }
                            }
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
                })
                
            },
            switchAction(action, i){
                let tmp = {
                    'on': 'off',
                    'off': 'on'
                }
                this.actions[i].currentStatus = tmp[this.actions[i].currentStatus]
                this.actions[i].currentStatusName = action.value[ this.actions[i].currentStatus]
                this.editProperties[this.actions[i].property] =  this.actions[i].currentStatus
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
                    if (this.actions[x].property == property && this.actions[x].type == 'range'){
                        this.actions[x].currentStatus = this.active[property] || this.rangeArrays[property][0].value
                    }
                    if (this.actions[x].property == property && this.actions[x].type == 'list') {
                        this.actions[x].currentStatus = this.active[property].value
                        this.actions[x].currentStatusName =this.actions[x].value[ this.actions[x].currentStatus]
                    }
                    this.editProperties[this.actions[x].property] = this.actions[x].currentStatus
                }
            },
            setActiveTemperature(e){
                this.active.temperature = e.value
            },
            setActiveWindSpeed(e){
                this.active.wind_speed = e.value
            },
            setActiveKey(property, propertyIdx, key){
                this.active[property] = {
                    index: propertyIdx,
                    value: key
                }
            },
            cancelDevice(){
                this.isCheck = 'uncheck'
                this.postMessageAndBack()
            },
            save(){
                nativeService.setItem('mideaRoom'+this.deviceId+this.pageStamp, JSON.stringify(this.editProperties))
                this.postMessageAndBack()
            },
            postMessageAndBack(){
                channelSetDevice.postMessage({
                    page: 'setDevice',
                    applianceCode: this.deviceId,
                    actions: this.actions,
                    isCheck: this.isCheck
                })
                this.goBack()
            }
        },
        created(){
            this.initData()
        }
    }
</script>


