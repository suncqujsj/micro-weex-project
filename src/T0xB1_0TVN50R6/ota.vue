<style lang="less" type="text/less">
    @import "../common/less/common";
    .wrap{
        padding: 0 19*2px;
        .bg-white;
        .ma-t(24px);
    }

    .item-top{
        height: 36*2px;
    }
    .item-left,.item-desc{
        .f(13*2px);
    }
    .item-desc{
        margin-bottom: 23px;
    }
    .update-button{
        .radius(12*2px);
    }
</style>

<template>
    <div class="bg-gray" :style="{height: wrapHeight}">

        <midea-header class="bg-white" title="语音固件升级" titleText="black" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back"></midea-header>

        <div class="wrap">
            <midea-cell style="padding: 0;" :title="hasNewVer?'待更新':'已是最新版本'" :hasArrow="false" :hasMargin="false" :hasTopBorder="false" :clickActivied="false" ></midea-cell>
            <!--<text>{{state}}</text>-->
            <div class="firmware-item">
                <div class="item-top row a-c">
                    <text class="item-left flex">v {{verNo}}</text>
                    <midea-button v-if="hasNewVer && !pressed" class="update-button" text="更新" type="primary" :btnStyle="{'width': '88px', 'height':'40px','border-radius':'24px'}" :textStyle="{'font-size':'26px'}" @mideaButtonClicked="upgrade"></midea-button>
                </div>
                <text class="item-desc">{{verDesc}}</text>
            </div>
        </div>
    </div>
</template>

<script>
    import mideaHeader from '@/midea-component/header.vue'
    import mideaCell from '@/midea-component/cell.vue'
    import mideaButton from '@/midea-component/button.vue'


    import nativeService from "../common/services/nativeService";
    import commonMixin from  "@/common/util/mixins/common"
    import voiceOtaMixin from  "@/common/util/mixins/voiceOta"

    export default {
        mixins: [commonMixin, voiceOtaMixin],
        data(){
            return {
                t:null,
                verNo: 1,
                verDesc: null,
                verId: null,
                pressed:false,
                state:null
            }
        },
        computed:{
        },
        components: {mideaHeader, mideaCell, mideaButton},
        created(){
            nativeService.getDeviceInfo().then((data)=>{ // 获取deviceId
                if(data.result && data.result.deviceId ) {
                    this.deviceId = data.result.deviceId;
                    // this.deviceId = "mock.2199023365119"; // status '' hasNewVer=false
                    // this.deviceId = 2199023365121; // upgraded hasNewVer=false
                    // this.deviceId = "mock.1";
                }
                return this.getUpgradeState();
            }).then((resp)=>{
                // nativeService.alert(resp);
                let returnDataJson = JSON.parse(resp.returnData);
                if(returnDataJson.code === '4007') { // 语音模块没有上报过状态
                    nativeService.toast(returnDataJson.msg);
                    return;
                }
                let data = returnDataJson.data;
                if(data.status === 'upgrading') { // 发现固件在升级中
                    // nativeService.toast(data);
                    this.setData(true, data);
                    this.markButtonPressedState();
                    nativeService.showLoadingWithMsg('更新中...');
                    this.state = 'ing';
                    this.fetchUpgradeState();
                    return;
                }

                this.checkUpgradeVersion().then((resp)=>{ // 发现当前无固件在升级中
                    // nativeService.alert(resp);
                    let data = JSON.parse(resp.returnData).data;
                    if(data.hasNewVer) {
                        this.setData(true, data.nextFmVer);
                        this.verId = data.nextFmVer.verId;
                        return;
                    }

                    this.setData(false, data.nextFmVer);
                });
            });
        },
        methods:{
            markButtonPressedState(){
                this.pressed = true;
            },
            upgrade(){
                if(this.pressed) return;
                this.UpgradeFireware().then((resp)=>{ // 点击按钮，让设备升级语音固件
                    nativeService.alert(resp);
                    let returnData = JSON.parse(resp.returnData);
                    if(returnData.code === '200') {
                        this.markButtonPressedState();
                        nativeService.showLoadingWithMsg('更新中...');
                        this.state = 'ing';
                        this.fetchUpgradeState();
                        return;
                    }

                    nativeService.showLoadingWithMsg('请稍后再试');
                });
            },
            fetchUpgradeState(){ // 定时主动查询是否更新完成
                this.t = setInterval(()=>{
                    this.getUpgradeState().then((result)=>{
                        nativeService.toast('轮询中');
                        let data = JSON.parse(result.returnData).data;
                        if(data.status === 'upgraded') {
                            this.hasNewVer = false;
                            this.state = 'ed';
                            nativeService.showLoadingWithMsg('更新完毕');
                            clearInterval(this.t);
                        }
                    });
                },5000);
            },
        }
    }
</script>


