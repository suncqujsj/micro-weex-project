//菜谱卡片页
<template>
    <div class="card" @click="onClicked">
        <image class="card-img" :src="recipe.imgPath" :style="imgStyle"></image>
        <div class="card-info">
            <text class="text card-name">{{recipe.name}}</text>
            <text class="text card-desc">{{recipe.desc}}</text>
        </div>
        <div class="card-info">
            <div>
                <text class="text color-grey">{{recipe.scores}}</text>
            </div>
            <div class="card-info-item">
                <text class="text color-grey">难度 </text>
                <text class="text color-light-grey">{{recipe.difficulty}}</text>
            </div>
            <div class="card-info-item">
                <image class="icon" :src="icon.duration"></image> 
                <text class="text color-grey">{{recipe.duration}}</text>
            </div>
            <div class="card-info-item" @click="favClick">
                <image class="icon" :src="icon.favor[isFavor]"></image>              
                <text class="text color-grey">{{recipe.favorNum}}</text>
              </div>
        </div>
        <image class="video-icon" v-if="recipe.hasVideo" :src="icon.video"></image>
    </div>
</template>

<script>

    import nativeService from '@/common/services/nativeService.js'

    export default {
        components: {
        },
        computed: {
        },
        props: {
            recipe: {
                type: Object,
                default: function(){
                    return {
                        name: '虎视眈眈记得看见了',
                        desc: '号地块数据库等级考试',
                        imgPath: './img/oven/tmp_bg.png',
                        scores: '4.5',
                        difficulty: '难',
                        duration: '90',
                        favorNum: '80',
                        isFavor: 'off'
                    }
                }
            },
            recipeName: {
                type: String,
                default: '烤面包'
            },
            recipeDesc: {
                type: String,
                default: '惺惺惜惺惺寻'
            },
            hasVideo: {
                type: Boolean,
                default: true
            },
            imgStyle: {
                type: Object,
                default:  function(){
                    return {
                        width: '650px',
                        height: '250px'
                    }
                }
            }
        },
        data() {
            return {
                icon: {
                    video: 'assets/img/play.png',
                    duration: 'assets/img/timer.png',
                    favor: {
                        on: 'assets/img/fav_on.png',
                        off: 'assets/img/fav.png',
                    },
                    hasVideo: true
                },
                isFavor: this.recipe.isFavor, 
                
            }
        },
        methods:{
           favClick(){
               let tmp = {
                   on: 'off',
                   off: 'on'
               }
               this.isFavor = tmp[this.isFavor]
           },
           onClicked(e){
               this.$emit('goRecipe', e)
           }
        },
        created(){
        }
    }
</script>

<style>
.text{
    font-size: 32px;
}
.card{
    padding-top:25px;
    padding-left: 25px;
    padding-right: 25px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 25px;
}
.card-img{
    margin-bottom: 6px;
}
.icon{
    width: 36px;
    height: 36px;
    margin-right: 10px;
}
.video-icon{
    width: 75px;
    height: 75px;
    position: absolute;
    top: 155px;
    left: 40px;
}

.card-info{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 650px;
    padding-bottom: 10px;
}
.card-name, .card-desc{
    lines: 1;
    max-width: 500px;
}
.card-desc{
    color: #555;
}
.card-info-item{
    flex-direction: row;
    align-items: center;
}
.color-grey{
    color: #444;
}
.color-light-grey{
    color: #999;
}
</style>
