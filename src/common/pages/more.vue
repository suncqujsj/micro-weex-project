<style lang="less" type="text/less">
    @import "../../common/less/common";

</style>

<template>
    <div class="bg-gray" :style="{height: wrapHeight}">

        <midea-header class="bg-white" title="更多功能" titleText="black" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back"></midea-header>

        <list style="margin-top: 24px;" show-scrollbar="false">
            <midea-cell :clickActivied="false" v-for="(item,index) in list" :hasBottomBorder="(list.length - 1) !== index" :key="index" :title="item.title" :rightText="item.rightText" :hasArrow="!!item.link" @mideaCellClick="link(item)">
            </midea-cell>
        </list>

    </div>
</template>

<script>
    import mideaHeader from '@/midea-component/header.vue'
    import mideaCell from '@/midea-component/item.vue';
    import nativeService from "@/common/services/nativeService";

    import commonMixin from  "@/common/util/mixins/common.js"

    export default {
        mixins: [commonMixin],
        props:{
            list:{
                type: Array,
                default: []
            }
        },
        components: {mideaHeader, mideaCell},
        created(){

        },
        computed:{
        },
        methods: {
            link: function(item){
                if(!item.link) return;
                nativeService.goTo(item.link, {animated: true});
                return;
                nativeService.weexBundleToWeb({
                    url: item.link,
                    title: '测试'
                })
            }
        }
    }
</script>


