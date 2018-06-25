<template>
   <div class="wrap" :style="wrapStyle">
        <div class="row-sb hd">
            <text class="hd-text font-grey" @click="goBack">取消</text>
            <text class="hd-text">{{device.title}}</text>
            <text class="hd-text font-grey"  @click="save">确定</text>
        </div>
        <div class="content">
             <midea-list style="background-color:#fff" v-for="(item,idx) in conditions" :idx="idx" :hasWrapBorder="false" leftMargin="25px">
                <midea-cell title="到达某地时" height="146" :hasArrow="true" :clickActivied="true" :itemImg="condition.icon" @mideaCellClick="goAutoTriggers" :cellStyle="{paddingLeft: '30px'}"></midea-cell>
            </midea-list>
        </div>
   </div>
</template>

<style>
    .row-sb{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
     }
    .wrap{ background-color: #f2f2f2; }
    .hd{
        background-color: #fff;
        width: 750px;
        height: 88px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .hd-text{ font-size: 32px; }
    .font-grey {
        color: #666;
    }
</style>

<script>
    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    import mideaList from '@/midea-rooms/components/list.vue'
    import MideaCell from '@/midea-component/cell.vue'
    export default {
        components:{ },
        mixins: [base],
        data(){
            return {
                device: {
                    title: '空调'
                }
            }
        },
        computed: {
            wrapStyle(){
                let tmp = {
                    height: this.pageHeight+'px'
                }
                return tmp
            },
        },
        methods: {
            initData(){
                this.type = nativeService.getParameters('type')
            },
            goBack(){
                nativeService.goBack()
            },
            save(){

            },
          
        },
        created(){
            this.initData()
        }
    }
</script>


