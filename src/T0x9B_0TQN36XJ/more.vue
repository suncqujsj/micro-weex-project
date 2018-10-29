<style lang="less" type="text/less">
    @import "../common/less/common";
    .bg{
        //.bg-gray;
    }
</style>

<template>
    <div class="bg">

        <midea-header title="更多功能" titleText="black" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back"></midea-header>

        <list show-scrollbar="true">
            <midea-cell :clickActivied="true" v-for="(item,index) in list" :key="index" :title="item.title" :has-arrow="true" @mideaCellClick="link(item)">
            </midea-cell>
        </list>

    </div>
</template>

<script>
    import mideaHeader from '@/midea-component/header.vue'
    import mideaCell from '@/midea-component/item.vue';
    import nativeService from "../common/services/nativeService";
    let navigator = weex.requireModule('navigator')

    export default {
        mixins: [],
        data(){
            return {
                list:[
                    {
                        title: '用户手册',
                        link:'https://m.ximalaya.com/wwys/v1/e/1?from=groupmessage&isappinstalled=0'
                    },
                    {
                        title: '其他',
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
                nativeService.weexBundleToWeb({
                    url: item.link,
                    title: '测试'
                })
            }
        }
    }
</script>


