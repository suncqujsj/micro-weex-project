<template>
<div class="wrapper" style="width:750px;">
    <div :style="{backgroundColor:bgColor}" class="box" :class="[isImmersion && 'immersion']" >
        <div class="header-left-image-wrapper" @click="leftImgClick" >
            <image v-if="showLeftImg" class="header-left-image" :src="leftImg"></image>
        </div>
        <div :style="{fontSize:fontSize+'px'}" ><text :style="{color:titleText}">{{title}}</text></div>
        <div class="header-right-image-wrapper" @click="rightImgClick" >
            <image v-if="showRightImg" class="header-right-image" :src="rightImg"></image>
        </div> 
    </div>
</div>
</template>
<style scoped>
    .box{
        width: 750px;
        height: 88px;
        display: inline-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items:center;
    }
    .header{
        height: 88px;
        background-color:#0E90FF;
    }
    .immersion{
        padding-top: 40px;
        height: 128px;
    }
    .header-left-image-wrapper {
        width: 88px;
        height: 88px;
        display: flex;
        justify-content: center;
        padding-left: 32px;
    }
    .header-right-image-wrapper {
        width: 88px;
        height: 88px;
        display: flex;
        justify-content: center;
        padding-left: 12px;
    }
    .header-left-image {
        height:44px;
        width: 24px;
    }
    .header-right-image {
        height:44px;
        width: 44px;
    }
</style>
<script>
    import nativeService from '../common/services/nativeService'
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            bgColor: {
                type: String,
                default: '#0E90FF'
            },
            fontSize:{
                type: String,
                default: '36'
            },
            titleText: {
                type: String,
                default: '#fff'
            },
            isImmersion: {
                type: Boolean,
                default: false
            },
            leftImg: {
                type: String,
                default: nativeService.convertImgPath('../img/header/tab_back@2x.png')
            },
            rightImg: {
                type: String,
                default: nativeService.convertImgPath('../img/header/tab_seting@2x.png')
            },
            showLeftImg: {
                type: Boolean,
                default: true
            },
            showRightImg: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return{
            }
        },
        methods: {
            leftImgClick () {
                if(!this.showLeftImg) {
                    return;
                }
                this.$emit('leftImgClick')
            },
            rightImgClick () {
                if(!this.showRightImg) {
                    return;
                }
                this.$emit('rightImgClick')
            }
        },
    };
</script>