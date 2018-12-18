<template>
    <div class="wrap" v-if="show">
        <div class="mask" :style="maskStyle" @click="close"></div>
        <div class="content" :style="contentStyle">
            <slot></slot>
        </div>
    </div>
</template>

<style>
    .wrap  {
       position: fixed;
    }
    .mask{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .content{
        position: fixed;
    }
</style>

<script>
    const dom= weex.requireModule('dom');

    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            maskStyle: {
                type: Object,
                default(){
                    return{
                        backgroundColor: 'rgba(0,0,0, 0.8)'
                    }
                }
            },
            contentMargin: {
                type: String,
                default: '100px'
            },
            contentBg: {
                type: String,
                default: '#ffffff'
            },
            contentRadius: {
                type: String,
                default: '8px'
            },
            contentPadding: {
                type: String,
                default: '25px'
            }
        },
        computed:{
            contentStyle(){
                let tmp = {
                    left: this.contentMargin ,
                    right: this.contentMargin,
                    backgroundColor: this.contentBg,
                    borderRadius: this.contentRadius,
                    padding: this.contentPadding
                }
                let  weexHeight = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight
                tmp.top = weexHeight*0.3 + 'px'
                return tmp
            },
        },
        data(){
            return {
            }
        },
        methods: {
            close(e){
                this.$emit('close', e)
            }
        },
        created(){
         
        }
    }
</script>

