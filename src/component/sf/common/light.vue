<!--
 * Created by sf
 * 2018/12/29
 -->

<style lang="less" type="text/less">
    @import (reference) "../../../common/less/common";
    .light_section{

    }
   .light_icon{
        .pos(a);
        top: 0px;
        right: 136px;
        width: 83px;
        height: 288px;
    }
    .light_on{
        right: 108px;
        width: 140px;
        height: 330px;
    }
</style>

<template>
    <image v-if="hasLight" :class="['light_icon',lightValue && 'light_on']" :src="lightIcon"
    @click="event(lightValue)"></image>
</template>

<script>
    import deviceMessageMixin from  "@/common/util/mixins/deviceMessage"

    export default {
        mixins:[deviceMessageMixin],
        props:{
            hasLight: false,
            lightValue: {
                type: Number,
                default: 0
            },
            event: {
                type: Function,
                default: ()=>{}
            }
        },
        computed:{
            lightIcon(){
                return `img/light_${this.lightValue ? 'on' : 'off'}@3x.png`
            }
        },
        methods:{

        }
    };
</script>