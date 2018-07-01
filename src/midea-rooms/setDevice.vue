<template>
   <div class="wrap" :style="wrapStyle">
        <div class="row-sb hd">
            <text class="hd-text font-grey" @click="goBack">取消</text>
            <text class="hd-text">{{deviceName}}</text>
            <text class="hd-text font-grey"  @click="save">确定</text>
        </div>
        <div class="content">
            <text class="sub-hd">设置为</text>
            <div class="ability-list" v-for="(item,i) in deviceActions">
                <div :class="['row-sb','floor', i==0?'no-border':'']">
                    <text>{{item.propertyName}}</text>
                    <switch-bar v-if="item.property == 'power'" :checked="device.activeAction[item.property]" @change="switchAction(item,i)"></switch-bar>
                    <div v-if="item.property == 'mode'" class="row-e" @click="showPop(item.property)">
                        <text class="property-text">{{device[item.property]}}</text>
                        <image class="icon" :src="icon.more"></image>
                    </div>
                </div>
            </div>
        </div>
        <div class="pop-floor" v-for="(item,i) in deviceActions">
             <midea-popup v-if="item.property == 'mode'" :show="show[item.property]" :height="400" @mideaPopupOverlayClicked="closePop()">
                <div class="row-sb pop-hd">
                    <text class="pop-text" @click="closePop()">取消</text>
                    <text class="pop-text" @click="confirmProp()">确定</text>
                </div>
                <!-- <scroll-picker :listArray="" @onChange=""></scroll-picker> -->
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
        border: none;
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
    .pop-text{ font-size: 30px; color: #007AFF; padding: 25px; }
</style>

<script>
    import { url } from './config/config.js'

    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import MideaCell from '@/midea-component/cell.vue'
    import MideaPopup from '@/midea-component/popup.vue'
	import switchBar from '@/midea-rooms/components/switch.vue'
    import mideaList from '@/midea-rooms/components/list.vue'
    export default {
        components:{ switchBar, MideaPopup },
        mixins: [base],
        data(){
            return {
                icon: {
                    more: 'assets/img/more.png'
                },
                device: {
                    isCheck: true,
                    temperature: '28℃',
                    mode: 'aaa',
                    wind_speed: '3',
                    work_status: 'work',
                    activeAction: {
                        power: false,
                        mode: 'auto'
                    }
                },
                applianceActions: {
                    '0xAC': {
                        name: '空调',
                        actions: [
                            {
                                property: 'power',
                                propertyName: '电源',
                                action: {
                                    off: "关机",
                                    on: "开机"
                                },
                            },
                           {
                                property: 'mode',
                                propertyName: '模式',
                                action: {
                                    auto: "自动",
                                    fan: "送风",
                                    cool: "制冷",
                                    heat: "制热",
                                    dry: "抽湿"
                                }
                            }
                        ]
                    }
                },
                deviceActions: [],
                show: {}
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
                this.deviceName = nativeService.getParameters('deviceName')
                this.deviceId = nativeService.getParameters('deviceId')
                
                this.deviceActions = this.applianceActions[this.deviceType].actions

                for (let i=0; i<this.deviceActions.length; i++) {
                    if (['mode'].indexOf(this.deviceActions[i].property) > -1){
                        this.show[this.deviceActions[i].property] = false
                    }
                }
            },
            switchAction(action, i){
                this.device.activeAction[action.property] = !this.device.activeAction[action.property]
            },
            showPop(property){
                this.show[property] = true
                console.log(this.show)
            },
            closePop(property){
                this.show[property] = false
            },
            save(){
                let currentTask = {
                    applianceCode: this.deviceId,
                    command: {}
                }
                for (var x in this.device.activeAction) {
                    currentTask.command[x] = encodeURIComponent(this.device.activeAction[x]) //currentTask：当前设备的taskCommand
                }

                let tmpAllTask  = ''
                nativeService.getItem('task', (res)=>{
                    
                    let task = []
                    if (res.result == 'success') {
                        task = JSON.parse(res.data)
                        if (res.data.indexOf(this.deviceId) > -1){
                            for (var x in task) {
                                if (task[x].applianceCode == this.deviceId) {
                                    task[x] = currentTask
                                }
                            }
                        }else{
                            task.push(currentTask)
                            nativeService.setItem('task', task)
                        }
                    }else{
                        task.push(currentTask)
                        nativeService.setItem('task', task)
                    }
                    this.goTo('autoBindDevices', {}, {sceneType: this.sceneType})
                })
                
             
            }
        },
        created(){
            this.initData()
        }
    }
</script>


