//厨电轮播卡片页
<template>
    <div class="wrap">
        <midea-header :title="title" :bgColor="bgColor" :showLeftImg="true" :showRightImg="true" :leftImg="icon.leftImg" :rightImg="icon.rightImg" @leftImgClick="goBack" @rightImgClick="goSearch"></midea-header>
        <div class="notice">
            <text class="notice-text">为您推荐{{listLength}}个专属菜谱</text>
        </div>
        <div v-for="item in recipeData">
            <recipe-card :recipe="item"></recipe-card>
        </div>
    </div>
</template>

<script>

    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import RecipeCard from '@/T0x9B/components/recipeCard.vue'

    export default {
        components: {
            MideaHeader,
            RecipeCard
        },
        computed: {
            listLength(){
                return this.recipeData.length
            }
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
                title: '圣诞狂欢',
                recipeData: [
                    {
                        name: '虎视眈眈记得看见了',
                        desc: '号地块数据库等级考试',
                        imgPath: 'assets/img/tmp_bg.png',
                        scores: '4.5',
                        difficulty: '难',
                        duration: '90',
                        favorNum: '80',
                        isFavor: 'off',
                        hasVideo: true
                    }, {
                        name: '人体各方',
                        desc: '有核桃仁感人肺腑',
                        imgPath: 'assets/img/tmp_bg.png',
                        scores: '5',
                        difficulty: '简单',
                        duration: '10',
                        favorNum: '150',
                        isFavor: 'on',
                        hasVideo: false
                    }, {
                        name: '截截图节电',
                        desc: '尽快回复VR额乬',
                        imgPath: 'assets/img/tmp_bg.png',
                        scores: '3',
                        difficulty: '难',
                        duration: '60',
                        favorNum: '50',
                        isFavor: 'on',
                        hasVideo: false
                    }
                ]
            }
        },
        methods:{
            goBack(){
                nativeService.goBack();
            },
            goSearch(){
                let path = ''
                nativeService.goTo(path)
            }
        },
        created(){

        }
    }
</script>

<style>
.notice{
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-image: linear-gradient(to top,#666,#444);
}
.notice-text{
    color: #fff;
}
.wrap{
    background-color: #e5e5e5;
}
</style>
