<style lang="less" type="text/less">
    @import "../common/less/common";

</style>

<template>
    <div class="bg-gray" :style="{height: wrapHeight}">

        <midea-header class="bg-white" title="智能语音" titleText="black" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back"></midea-header>

        <list style="margin-top: 24px" show-scrollbar="true">
            <template v-for="item in list">
                <midea-cell v-if="item.type === 'link'" :title="item.title" :hasArrow="true" :hasMargin="true" :hasTopBorder="false" :clickActivied="true" @mideaCellClick="item.event"></midea-cell>
                <template v-if="item.type === 'switch' && !item.hide">
                    <midea-cell :title="item.title" :hasArrow="false">
                        <midea-switch2 :checked="item.value" @change="item.onchange" slot="value"> </midea-switch2>
                    </midea-cell>
                </template>
            </template>
        </list>

    </div>
</template>

<script>
    import mideaHeader from '@/midea-component/header.vue'
    import mideaCell from '@/midea-component/item.vue';
    import mideaSwitch2 from '@/component/sf/custom/switch.vue'

    import nativeService from "../common/services/nativeService";
    import commonMixin from  "@/common/util/mixins/common"
    import voiceMixin from  "@/common/util/mixins/voice.js"

    export default {
        mixins: [commonMixin, voiceMixin],
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
                        title: '语音固件升级(ing)',
                        type: 'link',
                        value: '',
                        event: ()=>{this.openPage('ota')}
                    }
                ]
            }
        },
        components: {mideaHeader, mideaCell, mideaSwitch2},
        created(){},
        computed:{
        }
    }
</script>


