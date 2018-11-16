<style lang="less" type="text/less">
    @import "../common/less/common";

</style>

<template>
    <div class="bg-gray" :style="{height: wrapHeight}">

        <midea-header class="bg-white" title="更多功能" titleText="black" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back"></midea-header>

        <list style="margin-top: 24px" show-scrollbar="true">
            <midea-cell :clickActivied="true" v-for="(item,index) in list" :key="index" :title="item.title" :has-arrow="false" @mideaCellClick="link(item)">
            </midea-cell>
        </list>

    </div>
</template>

<script>
    import mideaHeader from '@/midea-component/header.vue'
    import mideaCell from '@/midea-component/item.vue';
    import nativeService from "../common/services/nativeService";

    import commonMixin from  "./utils/mixins/common.js"

    export default {
        mixins: [commonMixin],
        data(){
            return {
                list:[
                    {
                        title: '销售型号：蒸汽炉 TPN50EQL-SSL',
                        link:'https://m.ximalaya.com/wwys/v1/e/1?from=groupmessage&isappinstalled=0'
                    },
                    {
                        title: '插件版本号：weex5.0.2',
                        link: 'http://www.baidu.com'
                    }
                ]
            }
        },
        components: {mideaHeader, mideaCell},
        created(){

        },
        computed:{
        },
        methods: {
            back: function(){
                nativeService.goBack();
            },
            link: function(item){
                return;
                nativeService.weexBundleToWeb({
                    url: item.link,
                    title: '测试'
                })
            }
        }
    }
</script>


