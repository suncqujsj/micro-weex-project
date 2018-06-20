<template>
    <div>
        <midea-header :title="title" @leftImgClick="leftImgClick"></midea-header>
        <nav-list :list="navList"></nav-list>
        <list >  
            <midea-item :title="childrenLock">
                <switch slot="value"></switch>
            </midea-item>
            <midea-item :title="cloudRecipe" :hasArrow="true" :clickActivied="true" @mideaCellClick="goTo('recipe')"></midea-item>
        </list>
        <div style="background-color: #ffffff; padding-left:20px; padding-right: 20px; padding-top: 20px;">
            <text>首页服务等</text>
        </div>
        <div class="end"> 
            <div class="line"></div>
            <text class="end-text">到底了</text>
            <div class="line"></div>
        </div>
    </div>
</template>

<script>
    import base from './base'
    import nativeService from '@/common/services/nativeService';

    import mideaHeader from '@/midea-component/header.vue'
    import navList from '@/midea-component/mNavList.vue'
    import mideaItem from '@/midea-component/item.vue'

    export default {
        components: {
            mideaHeader,
            navList,
            mideaItem,
        },
        mixins: [base],
        data(){
            return {
                title: '蒸汽烤箱Z001',
                navList: [{
                        title: '启动',
                        imgPath: ''
                    }, {
                        title: '暂停',
                        imgPath: ''
                    }, {
                        title: '取消',
                        imgPath: ''
                    }, {
                        title: '自动菜单',
                        imgPath: ''
                    }, {
                        title: '蒸汽模式',
                        imgPath: ''
                    }, {
                        title: '加热模式',
                        imgPath: ''
                    }, {
                        title: '清洁模式',
                        imgPath: ''
                    }, {
                        title: '速热模式',
                        imgPath: ''
                    }
                ],
                childrenLock: '童锁',
                cloudRecipe: '云食谱',
            }
        },
        methods: {
            goTo: function(page){
                console.log(1)
                var path = page + '.js'
                nativeService.goTo(path)
            },
            leftImgClick: function(){
            },
            goToRecipe: function(){
                console.log(1)
            }
        },
        created(){

        }
    }
</script>

<style>
.end{
    margin-top: 30px;
    margin-bottom: 30px;
    flex-direction: row;
    justify-content: center;
}
.end-text{
    margin-left: 20px;
    margin-right: 20px;
    height: 30px;
    font-size: 30px;
    align-items: center;
    text-align: center;
    color: #999999;
    background-color: #ffffff;
}
.line{
    margin-top: 16px;
    width: 200px;
    height: 2px;
    background-color: #aaaaaa;
}

</style>
