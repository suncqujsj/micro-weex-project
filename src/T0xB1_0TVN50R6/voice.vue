<style lang="less" type="text/less">
    @import "../common/less/common";

</style>

<template>
    <div class="bg-gray" :style="{height: wrapHeight}">

        <midea-header class="bg-white" title="智能语音" titleText="black" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back"></midea-header>

        <list style="margin-top: 24px" show-scrollbar="true">
            <template v-for="item in list">
                <midea-cell v-if="item.type === 'link'" :title="item.title" :hasArrow="true" :hasMargin="true" :hasTopBorder="false" :clickActivied="true" @mideaCellClick="test"></midea-cell>
                <midea-cell v-if="item.type === 'switch'" :title="item.title" @mideaCellClick="test" :hasArrow="false">
                    <midea-switch2 class="value" slot="value"> </midea-switch2>
                </midea-cell>
            </template>
        </list>

    </div>
</template>

<script>
    import mideaHeader from '@/midea-component/header.vue'
    import mideaCell from '@/midea-component/item.vue';
    import MideaSwitch2 from '@/midea-component/switch2.vue'

    import nativeService from "../common/services/nativeService";
    import commonMixin from  "./utils/mixins/common.js"
    import voiceMixin from  "@/common/util/mixins/voice.js"

    export default {
        mixins: [commonMixin, voiceMixin],
        data(){
            return {
                list:[
                    {
                        title: '语音功能',
                        type: 'switch',
                        value: false
                    },
                    {
                        title: '语音控制授权',
                        type: 'link',
                        value: ''
                    },
                    {
                        title: '软件更新',
                        type: 'link',
                        value: ''
                    }
                ]
            }
        },
        components: {mideaHeader, mideaCell, MideaSwitch2},
        created(){
            nativeService.alert(data);
            let context = this;
            nativeService.getDeviceInfo().then(function(data){
                nativeService.alert(data);
                context.aa(data.result.deviceId, 1);
                // nativeService.getUserInfo().then((resp) => {
                //     nativeService.alert(data.result.deviceId + '' + resp.uid);
                //      context.aa(data.result.deviceId, resp.uid);
                //
                // }).catch((error) => {
                //     nativeService.alert(JSON.stringify(error));
                // });
            });


        },
        computed:{
        },
        methods: {
            back: function(){
                nativeService.goBack();
            },
            test: function(){},
            link: function(item){
                nativeService.weexBundleToWeb({
                    url: item.link,
                    title: '测试'
                })
            }
        }
    }
</script>


