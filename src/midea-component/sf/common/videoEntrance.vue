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
    <image v-if="show" class="icon position" :src="icon" @click="onVideoIconClicked"></image>
</template>

<script>

    export default {
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
            onVideoIconClicked(){
                this.$emit('onVideoIconClicked');
            }
        }
    };
</script>