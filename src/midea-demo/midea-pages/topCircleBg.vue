<template>
    <div>
        <midea-header title="净水器顶部的背景" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <top-circle-bg :state='widgetState' />
        
        <div style="height:550px" />
        <midea-button @mideaButtonClicked='click0' text='init' />
        <midea-button @mideaButtonClicked='click1' text='drink' />
        <midea-button @mideaButtonClicked='click2' text='producing' />
        <midea-button @mideaButtonClicked='click3' text='offline' />
    </div> 
</template>
<style>

</style>
<script>
import base from '../base'
import nativeService from '../../common/services/nativeService';
import mideaButton from '@/midea-component/button.vue';
import topCircleBg from '@/midea-component/newComp/top-circle-bg.vue'
export default {
    components:{topCircleBg,mideaButton},
    mixins:[base],
    data(){
        return {
            widgetState:0
        }
    },
    methods:{
        click0(){
            this.widgetState = 0
        },
        click1(){
            this.widgetState = 1
        },
        click2(){
            this.widgetState = 2
        },
        click3(){
            this.widgetState = 3
        }
    }
}
</script>
