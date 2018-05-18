//菜谱详情页
<template>
    <div class="wrap">
        <midea-header :title="title" :bgColor="bgColor" :showLeftImg="true" :showRightImg="true" :leftImg="icon.leftImg" :rightImg="icon.rightImg" @leftImgClick="goBack" @rightImgClick="goSearch"></midea-header>
       <div class="floor">
           <scroller>
               <div v-for="item in tagList">{{item}}</div>
           </scroller>
           <scroller>
               <div></div>
           </scroller>
       </div>
    </div>
</template>

<script>

    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'

    export default {
        components: {
            MideaHeader
        },
        computed: {
        },
        props: {
        },
        data() {
            return {
                icon: {
                    leftImg: './img/header/tab_back.png',
                    rightImg: 'assets/img/search.png',
                },
                bgColor: '#111',
                title: '收藏',
                typeList: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
                recipeList: [
                    {
                        name: 烤鸡排',
                        imgPath: 'assets/img/bg_tmp.png'
                    },
                    {
                        name: 烤鸡排',
                        imgPath: 'assets/img/bg_tmp.png'
                    },
                    {
                        name: 烤鸡排',
                        imgPath: 'assets/img/bg_tmp.png'
                    },
                    {
                        name: 烤鸡排',
                        imgPath: 'assets/img/bg_tmp.png'
                    },
                ]
            }
        },
        methods:{
            goBack(){
                nativeService.goBack();
            },
        },
        created(){

        }
    }
</script>

<style>
    .wrap{
        background-color: #f1f1f1;
    }
    .icon{
        width: 36px;
        height: 36px;
        margin-right: 10px;
    }
    .big-icon{
        width: 70px;
        height: 70px;
    }
    .text{
        color: #444;
        font-size: 32px;
        margin-right: 10px;
    }
    .block{
        margin-bottom: 30px;
        border-top-style: solid;
        border-top-color: #e5e5e5;
        border-top-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #e5e5e5;
        border-bottom-width: 2px;
        background-color: #fff;
    }
    .floor{
        padding-left: 25px;
        padding-right: 25px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    
</style>
