<!--
 * Created by sf
 * 2018/12/29
 -->

<style lang="less" type="text/less">
    @import (reference) "../../../common/less/common";
    .icon{
        .square(52px);
    }
    .position{
        .pos(a);
        top:160px;
        right: 32px;
    }
</style>

<template>
    <image v-if="show" class="icon position" :src="icon" @click="openPage('video')"></image>
</template>

<script>
    import commonMixin from  "@/common/util/mixins/common"

    export default {
        mixins:[commonMixin],
        props:{
            show: {
                type: Boolean,
                default: false
            }
        },
        computed:{
            icon(){
                return `img/particular/video_entrance_icon.png`
            }
        },
        methods:{
        }
    };
</script>