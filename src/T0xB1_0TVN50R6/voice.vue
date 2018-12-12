<style lang="less" type="text/less">
    @import "../common/less/common";

</style>

<template>
    <div class="bg-gray" :style="{height: wrapHeight}">

        <midea-header class="bg-white" title="智能语音" titleText="black" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back"></midea-header>

        <list style="margin-top: 24px" show-scrollbar="true">
            <template v-for="item in list">
                <midea-cell v-if="item.type === 'link'" :title="item.title" :hasArrow="true" :hasMargin="true" :hasTopBorder="false" :clickActivied="true" @mideaCellClick="test"></midea-cell>
                <midea-cell v-if="item.type === 'switch' && !item.hide" :title="item.title" :hasArrow="false">
                    <midea-switch2 :checked="item.value" @change="onchange" slot="value"> </midea-switch2>
                </midea-cell>
            </template>
        </list>

    </div>
</template>

<script>
    import mideaHeader from '@/midea-component/header.vue'
    import mideaCell from '@/midea-component/item.vue';
    import mideaSwitch2 from '@/midea-component/switch2.vue'

    import nativeService from "../common/services/nativeService";
    import commonMixin from  "./utils/mixins/common.js"
    import voiceMixin from  "@/common/util/mixins/voice.js"

    export default {
        mixins: [commonMixin, voiceMixin],
        data(){
            return {
                index:0,
                list:[
                    {
                        title: '语音功能',
                        type: 'switch',
                        value: false,
                        hide: false
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
        components: {mideaHeader, mideaCell, mideaSwitch2},
        created(){},
        computed:{
        },
        methods: {
            back: function(){
                nativeService.goBack();
            }
        }
    }
</script>


