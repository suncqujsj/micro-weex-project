<style lang="less" type="text/less">
    @import "../common/less/common";
    .cell-wrap{
        .pos(r);
    }
    .red-dot{
        .round(16px);
        background-color: rgb(254,59,48);
        /*position: absolute;*/
        /*right: 66px;*/
        /*top:30px;*/
    }
</style>

<template>
    <div class="bg-gray" :style="{height: wrapHeight}">

        <midea-header class="bg-white" title="智能语音" titleText="black" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back"></midea-header>

        <list style="margin-top: 24px" show-scrollbar="true">
            <template v-for="item in list">
                    <midea-cell  v-if="item.type === 'link'" :title="item.title" :hasArrow="false" :hasMargin="true" :hasTopBorder="false" :clickActivied="true" @mideaCellClick="item.event">
                        <div slot="value" class="flex" style="width: 16px;height:16px;position:relative">
                            <div class="red-dot"></div>
                        </div>
                    </midea-cell>
                <template v-if="item.type === 'switch' && !item.hide">
                    <midea-cell :title="item.title" :hasArrow="false">
                        <midea-switch2 :checked="item.value" @change="item.onchange" slot="value"> </midea-switch2>
                    </midea-cell>
                </template>
            </template>
        </list>
        <text>{{upgradeAvailable? '有更新':'无更新'}}</text>
    </div>
</template>

<script>
    import mideaHeader from '@/midea-component/header.vue'
    import mideaCell from '@/midea-component/item.vue';
    import mideaSwitch2 from '@/component/sf/custom/switch.vue'

    import nativeService from "../common/services/nativeService";
    import commonMixin from  "@/common/util/mixins/common"
    import voiceMixin from  "@/common/util/mixins/voice.js"
    import voiceOtaMixin from  "@/common/util/mixins/voiceOta"

    export default {
        mixins: [commonMixin, voiceMixin, voiceOtaMixin],
        data(){
            return {
                authIndex:0,
                controlIndex:1,
                list:[
                    {
                        title: '语音控制授权',
                        type: 'switch',
                        value: false,
                        hide: true,
                        onchange: this.onAuthSwitchChange
                    },
                    {
                        title: '语音开关',
                        type: 'switch',
                        value: false,
                        hide: false,
                        onchange: this.onControlSwitchChange
                    },
                    {
                        title: '语音固件升级',
                        type: 'link',
                        value: '',
                        event: ()=>{this.openPage('ota')}
                    }
                ],
                upgradeAvailable: false,
            }
        },
        components: {mideaHeader, mideaCell, mideaSwitch2},
        created(){
            nativeService.getDeviceInfo().then((data)=>{ // 获取deviceId
                if(data.result && data.result.deviceId ) {
                    // this.deviceId = data.result.deviceId;
                    // this.deviceId = "mock.2199023365119"; // status '' hasNewVer=false
                    this.deviceId = 2199023365121; // upgraded hasNewVer=false
                }
                return this.getUpgradeState();
            }).then((resp)=>{
                let data = JSON.parse(resp.returnData).data;
                if(data.status === 'upgrading') { // 发现固件在升级中
                    this.updateState();
                    return;
                }

                this.checkUpgrade().then((resp)=>{ // 发现当前无固件在升级中
                    // nativeService.alert(resp);
                    let data = JSON.parse(resp.returnData).data;
                    if(data.hasNewVer) this.updateState();

                });
            });
        },
        methods:{
            updateState(){
                this.upgradeAvailable = true;
            }
        }
    }
</script>


