// 范围弹窗选择器
<template>
    <div class="wrap">
        <div class="row-sb line">
            <div class="less" :style="style.less"></div>
            <div class="range" :style="style.range"></div>
            <div class="bigger" :style="style.bigger"></div>
        </div>
        <div class="range-min-btn" :style="style.minBtn" @click="minClick">
            <text class="active-text">{{rangeMin}}{{unit}}</text>
            <image class="icon btn" :src="icon.btn"></image>
        </div>
        <div class="range-max-btn" :style="style.maxBtn" @click="maxClick">
            <text class="active-text">{{rangeMax}}{{unit}}</text>
            <image class="icon btn" :src="icon.btn"></image>
        </div>
        <div class="row-sb desc">
            <text class="text">{{min}}{{unit}}</text>
            <text class="text">{{max}}{{unit}}</text>
        </div>
    </div>
</template>
<style>
    .wrap { padding-top: 56px; padding-bottom: 10px; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .icon{ width: 52px; height: 52px;}
    .line { margin-left: 26px; margin-right: 26px; }
    .less, .range, .bigger{ height: 4px; }
    .less, .bigger{ background-color: #E3E3E6; }
    .range{ background-color: #267AFF; }
    .range-min-btn, .range-max-btn{ position: absolute; top: 0px; text-align: center; }
    .desc{ margin-top: 25px; }
    .text{ color: #666666 }
    .active-text{ color: #267AFF }
</style>
<<script>
    import nativeService from '@/common/services/nativeService.js'
    import MideaPopup from '@/midea-component/popup.vue'
    
    export default {
        props: {
            wrapWidth: {
                type: Number,
                default: 750
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 0
            },
            rangeMin: {
                type: Number,
                default: 0
            },
            rangeMax: {
                type: Number,
                default: 0
            },
            unit: {
                type: String,
                default: ''
            }
        },
        component: { MideaPopup },
        computed: {
            style(){
                let tmp = {
                    less: {},
                    range: {},
                    bigger: {},
                    minBtn: {},
                    maxBtn: {}
                }

                let w = this.wrapWidth-52
                let len = this.max-this.min
                tmp.less.width = w* (this.rangeMin-this.min)/len
                tmp.range.width = w* (this.rangeMax-this.rangeMin)/len
                tmp.bigger.width = w* (this.max-this.rangeMax)/len

                tmp.minBtn.left = w* (this.rangeMin-this.min)/len
                tmp.maxBtn.right = w* (this.max-this.rangeMax)/len
                
                return tmp
            },
        },
        data(){
            return {
                icon: {
                    btn: 'assets/img/sence_ic_switch@3x.png'
                }
            }
        },
        methods: {
            minClick(e){
                this.$emit('minClicked', e)
            },
            maxClick(e){
                this.$emit('maxClicked', e)
            },
        },
        created(){
        }
    }
</script>

