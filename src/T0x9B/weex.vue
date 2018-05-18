//烤箱主页
<template>
    <div>
        <midea-header :title="title" :bgColor="bgColor" :showLeftImg="true" :showRightImg="true" :leftImg="icon.leftImg" :rightImg="icon.rightImg" @leftImgClick="goBack" @rightImgClick="goSearch"></midea-header>
        <div class="tabbar">
            <div class="tab tab-active" :style="{ left: activeTab * 250 + 'px'}"></div>
            <div v-for="(tab, i) in tabs" :key="i" class="tab" @click="activeTab = i">
                <text class="tab-title">{{tab}}</text>
            </div>
        </div>
        <div class="tab-panels" :style="{ left: activeTab * -750 + 'px'}">
            <div class="panel">
                <scroller class="scroller">
                    <carousel-card :slider-data="carouselData" @goRecipe="goRecipe" @goSerial="goSerial"></carousel-card>
                    <div class="card-list">
                        <div v-for="item in recipeData">
                            <recipe-card :recipe="item" @goRecipe="goRecipe"></recipe-card>
                        </div>
                    </div>
                </scroller>
                <div class="status-bar">
                    <text class="text">{{status}}</text>
                    <text class="text">{{workTime}}</text>
                </div>
            </div>
            <div class="panel">
                <div class="card-list">
                    <div v-for="item in recipeData">
                        <recipe-card :recipe="item"></recipe-card>
                    </div>
                </div>
            </div>
            <div class="panel fav-panel">
                <div class="fav-type">
                    <text v-for="item in favTypeList">{{item}}</text>
                </div>
                <div class="fav-recipe">
                    <scroller>
                        <nav-list :lists="favRecipeList" :cols="2" @itemClicked="goRecipe" :style="favListStyle" :type="favListStyle.type"></nav-list>
                    </scroller>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    import CarouselCard from '@/T0x9B/components/carouselCard.vue'
    import RecipeCard from '@/T0x9B/components/recipeCard.vue'
    import needList from '@//T0x9B/components/needList.vue'

    export default {
        components: {
            MideaHeader,
            CarouselCard,
            RecipeCard,
            needList
        },
        data() {
            return {
                activeTab: 0,
                tabs: ['推荐', '评分', '收藏'],
                icon: {
                    leftImg: './img/header/tab_back.png',
                    rightImg: 'assets/search.png',
                },
                bgColor: '#111',
                title: '云菜谱',
                status: '烹饪中',
                workTime: '10:30',
                carouselData: [
                    {
                        name: '早上吃什么',
                        desc: '面包+酸奶 酸奶很健康，面包饱腹。可以提供一段能量充足的上午时光',
                        imgPath: 'assets/tmp_bg.png',
                        favorite: 'off'
                    },{
                        name: '中午吃什么',
                        desc: '沙拉+脆皮叉烧 健康沙拉有丰富膳食纤维，叉烧满满的蛋白质，又能满足口腹之欲，完美！',
                        imgPath: 'assets/tmp_bg.png',
                        favorite: 'on'
                    },{
                        name: '晚上吃什么',
                        desc: '香蕉奶昔+熏鱼拉面 一天工作辛苦，简单又好吃的熏鱼拉面，再喝点奶昔，可以愉快的睡觉了',
                        imgPath: 'assets/tmp_bg.png',
                        favorite: 'on'
                    }
                ],
                recipeData: [
                    {
                        name: '虎视眈眈记得看见了',
                        desc: '号地块数据库等级考试',
                        imgPath: 'assets/tmp_bg.png',
                        scores: '4.5',
                        difficulty: '难',
                        duration: '90',
                        favorNum: '80',
                        isFavor: 'off',
                        hasVideo: true
                    }, {
                        name: '人体各方',
                        desc: '有核桃仁感人肺腑',
                        imgPath: 'assets/tmp_bg.png',
                        scores: '5',
                        difficulty: '简单',
                        duration: '10',
                        favorNum: '150',
                        isFavor: 'on',
                        hasVideo: false
                    }, {
                        name: '截截图节电',
                        desc: '尽快回复VR额乬',
                        imgPath: 'assets/tmp_bg.png',
                        scores: '3',
                        difficulty: '难',
                        duration: '60',
                        favorNum: '50',
                        isFavor: 'on',
                        hasVideo: false
                    }
                ],
                favTypeList: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
                favRecipeList: [
                    {
                        name: '烤鸡',
                        imgPath: ''
                    },
                    {
                        name: 'n蛋糕',
                        imgPath: 'http://pic165.nipic.com/pic/20180515/12398452_090008154000_4.jpg'
                    },
                    {
                        name: '焗虾',
                        imgPath: ''
                    }, {
                        name: '烤鸡',
                        imgPath: ''
                    },
                    {
                        name: 'n蛋糕',
                        imgPath: ''
                    },
                    {
                        name: '焗虾',
                        imgPath: ''
                    }, {
                        name: '烤鸡',
                        imgPath: ''
                    },
                    {
                        name: 'n蛋糕',
                        imgPath: ''
                    },
                    {
                        name: '焗虾',
                        imgPath: ''
                    }, {
                        name: '烤鸡',
                        imgPath: ''
                    },
                    {
                        name: 'n蛋糕',
                        imgPath: ''
                    },
                    {
                        name: '焗虾',
                        imgPath: ''
                    },
                ],
                favListStyle: {
                    img: {
                        height: '400px',
                    }
                }
            }
        },
        methods: {
            goBack(){
                nativeService.goBack();
            },
            goSearch(){
                nativeService.goTo('search.js')
            },
            goSerial(){
                nativeService.goTo('serial.js')
            },
            goRecipe(){
                nativeService.goTo('recipe.js')
            },
        }
    }
</script>


<style>

.tabbar {
    flex-direction: row;
    background-image: linear-gradient(to top,#666,#444);
}
.tab {
    height: 90px;
    width: 250px;
    justify-content: center;
    align-items: center;
}
.tab-title{
    color: #fff;
}
.tab-active {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #F6862B;
    transition: left 0.2s ease-in-out;
}
.title {
    font-size: 28px;
    color: #FFF;
    margin-top: 10px;
  }
.tab-panels {
    position: relative;
    width: 3750;
    flex: 1;
    flex-direction: row;
    align-items: stretch;
    background-color: #F5F5F5;
    transition: left 0.2s ease-in-out;
}
.panel {
    width: 750px;
}

.scroller{
    background-color: #e5e5e5;
}
.status-bar{
    position: absolute;
    bottom: 0;
    left:0;
    right: 0;
    height: 80px;;
    background-color: rgba(0, 0, 0, 0.7);
    flex-direction: row;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    align-items: center;
}
.text{
    color: #fff;
    font-size: 32px;
}
.card-list{
    margin-bottom: 100px;
}
.fav-panel{
    flex-direction: row;
    justify-content: space-between;
}
.fav-type{
    flex: 1
}
.fav-recipe{
    flex: 3
}
</style>
