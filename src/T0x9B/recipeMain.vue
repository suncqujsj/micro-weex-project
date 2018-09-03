//云菜谱主页
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
            </div>
            <div class="panel">
                <scroller class="scroller">
                    <div class="card-list">
                        <div v-for="item in recipeData">
                            <recipe-card :recipe="item" @goRecipe="goRecipe"></recipe-card>
                        </div>
                    </div>
                </scroller>
            </div>
            <div class="panel fav-panel">
                <div class="fav-type">
                    <text v-for="item in favTypeList" class="fav-type-item">{{item}}</text>
                    <text class="fav-type-item">更多</text>
                </div>
                <div class="fav-recipe">
                    <scroller>
                        <need-list :lists="favRecipeList" :cols="2" @itemClicked="goRecipe" :styles="favListStyle"></need-list>
                    </scroller>
                </div>
            </div>
            <div class="status-bar">
                <text class="text">{{status}}</text>
                <text class="text">{{workTime}}</text>
            </div>
        </div>
    </div>
</template>

<script>
    const storage = weex.requireModule('storage')
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
                    rightImg: 'assets/img/search.png',
                },
                bgColor: '#111',
                title: '云菜谱',
                status: '烹饪中',
                workTime: '10:30',
                carouselData: [
                    {
                        name: '早上吃什么',
                        desc: '面包+酸奶 酸奶很健康，面包饱腹。可以提供一段能量充足的上午时光',
                        imgPath: 'https://images-cn.ssl-images-amazon.com/images/G/28/cnbooks/event/children/2018/Apr/May_49off_PCATF._CB495162946_.jpg',
                        favorite: 'off'
                    },{
                        name: '中午吃什么',
                        desc: '沙拉+脆皮叉烧 健康沙拉有丰富膳食纤维，叉烧满满的蛋白质，又能满足口腹之欲，完美！',
                        imgPath: 'http://images.abi.com.cn:8080/news/201601/20160104164356978.jpg',
                        favorite: 'on'
                    },{
                        name: '晚上吃什么',
                        desc: '香蕉奶昔+熏鱼拉面 一天工作辛苦，简单又好吃的熏鱼拉面，再喝点奶昔，可以愉快的睡觉了',
                        imgPath: 'https://images-cn.ssl-images-amazon.com/images/G/28/Yuhao/2018POC/May/phase2_49/ATF_1._CB495129543_.jpg',
                        favorite: 'on'
                    }
                ],
                recipeData: [
                    {
                        name: '虎视眈眈记得看见了',
                        desc: '号地块数据库等级考试',
                        imgPath: 'https://images-cn.ssl-images-amazon.com/images/G/28/Yuhao/2018POC/May/phase2_49/ATF_1._CB495129543_.jpg',
                        scores: '4.5',
                        difficulty: '难',
                        duration: '90',
                        favorNum: '80',
                        isFavor: 'off',
                        hasVideo: true
                    }, {
                        name: '人体各方',
                        desc: '有核桃仁感人肺腑',
                        imgPath: 'http://images.abi.com.cn:8080/news/201601/20160104164356978.jpg',
                        scores: '5',
                        difficulty: '简单',
                        duration: '10',
                        favorNum: '150',
                        isFavor: 'on',
                        hasVideo: false
                    }, {
                        name: '截截图节电',
                        desc: '尽快回复VR额乬',
                        imgPath: 'https://tse4.mm.bing.net/th?id=OIP.LvHQvxcLRpnUTcVie9HABwHaDQ&pid=Api',
                        scores: '3',
                        difficulty: '难',
                        duration: '60',
                        favorNum: '50',
                        isFavor: 'on',
                        hasVideo: false
                    }
                ],
                favTypeList: ['烤肉', '蛋糕', '海鲜', '月饼', '面包', '主食', '饼干'],
                favRecipeList: [
                    {
                        name: '烤鸡',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    },
                    {
                        name: 'n蛋糕',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    },
                    {
                        name: '焗虾',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    }, {
                        name: '烤鸡',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    },
                    {
                        name: 'n蛋糕',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    },
                    {
                        name: '焗虾',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    }, {
                        name: '烤鸡',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    },
                    {
                        name: 'n蛋糕',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    },
                    {
                        name: '焗虾',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    }, {
                        name: '烤鸡',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    },
                    {
                        name: 'n蛋糕',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    },
                    {
                        name: '焗虾',
                        imgPath: 'http://www.ghost64.com/qqtupian/qqbiaoqing/151203558120/32.png'
                    },
                ],
                favListStyle: {
                    wrapWidth: '560px',
                    imgSize: '240px',
                    textJustify: 'center',
                    colWrapJustify: 'space-around'
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
            }
        },
        created(){
             storage.setItem('refer','', e=>{})
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
    width: 2250;
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
    position: fixed;
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
    margin-left: 25px;
    margin-right: 25px;
    margin-top: 25px;
}
.fav-panel{
    flex-direction: row;
    justify-content: space-between;
}
.fav-type{
    flex: 1
}
.fav-type-item{
    border-color: #aaa;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-right-width: 2px;
    border-right-style: solid;
    justify-content: center;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
}
.fav-recipe{
    flex: 4;
    padding-top: 20px;
    padding-left: 20px;
}
</style>
