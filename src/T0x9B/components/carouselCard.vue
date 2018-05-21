//厨电轮播卡片页
<template>
    <div class="card">
        <slider class="slider" interval="3000" auto-play="true" show-indicators="true">
            <div class="slider-item" v-for="item in sliderData">
                <image class="slider-img" resize="cove" :src="item.imgPath"  @click="goRecipe"></image>
                <div class="card-info">
                    <text class="card-name">{{item.name}}</text>
                    <text class="card-desc">{{item.desc}}</text>
                    <image class="favorite" :src="icon.favorites[item.favorite]"></image>
                </div>
            </div>
            <indicator class="indicator" :style="indicatorLeft"></indicator>
        </slider>
        <image class="mark-icon" :src="icon.mark" @click="goSerial"></image>
    </div>
</template>

<script>

    import nativeService from '@/common/services/nativeService.js'

    export default {
        components: {
        },
        computed: {
            indicatorLeft(){
                let len = this.sliderData.length
                return {
                    'left': (750 - 52 - 60*len) + 'px'
                }
            }
        },
        props: {
            sliderData: {
                type: Array,
                default: function() {
                    let data = [
                        {
                            name: '烤面包',
                            desc: '面包+酸奶 棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒棒',
                            imgPath: 'assets/img/tmp_bg.png',
                            favorite: 'off'
                        },{
                            name: '烤面包1',
                            desc: '面包+酸奶 棒棒棒1',
                            imgPath: 'assets/img/tmp_bg.png',
                            favorite: 'on'
                        }
                    ]
                    return data
                }
            },
            icon: {
                type: Object,
                default: function(){
                    return {
                        favorites: {
                            on: 'assets/img/fav_on.png',
                            off: 'assets/img/fav.png'
                        },
                        mark: 'assets/img/markie.png'
                    }
                }
            }
        },
        data() {
            return {
            }
        },
        methods:{
            goRecipe(e){
                this.$emit('goRecipe', e)
            },
            goSerial(e){
                // var path = 'serial.js'
                // nativeService.goTo(path);
                this.$emit('goSerial',e)
            }
        },
        created(){
           
        }
    }
</script>

<style>
.card{
    margin-top: 25px;
    margin-left: 25px;
    margin-right: 25px;
    background-color: #fff;
    border-radius: 10px;
}
.slider{
    width: 700px;
    height: 360px;
}
.slider-item{
    padding-top:50px;
}
.slider-img{
    margin-left: 20px;
    margin-right: 20px;
    width: 660px;
    height: 250px;
}
.card-info{
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 700px;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.card-name, .card-desc{
    font-size: 32px;
    lines: 1;
}
.card-name{
    flex:1;
}
.card-desc{
    flex: 3;
    color: #777;
}
.favorite{
    margin-left: 20px;
    width: 36px;
    height: 36px;
}
.mark-icon {
    position: absolute;
    left:-100px;
    top: -100px;
    width: 200px;
    height: 200px;
    transform: rotate(315deg)
}

.indicator {
    position: absolute;
    right: 0;
    top: -5px;
    height: 60px;
    flex-direction: flex-end;
    itemColor: #DDDDDD;
    itemSelectedColor: rgb(126,206,244)
}
</style>
