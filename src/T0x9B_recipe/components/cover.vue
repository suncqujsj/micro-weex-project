//遮罩
<template>
    <div>
        <midea-overlay :opacity="0.7"></midea-overlay>
        <div class="content">
            <div><text class="text close" @click="coverOff">完成</text></div>
            <div class="msg">
                <image class="msg-icon icon" :src="icon.iconName"></image>
                <text class="text msg-text">{{msg}}</text>
            </div>
            <slider class="slider" :index="sliderIndex" @change="changeSliderIndex">
                <div class="slider-item">
                    <separator content="打个分吧"></separator>
                     <midea-vote :imgPath="voteImgPath" :styles="style.vote.box" :defaulSelectd='3' @itemClicked="voteSelected"></midea-vote>
                </div>
                <div class="slider-item">
                    <separator content="火候如何"></separator>
                    <div class="floor">
                        <div @click="coverOff">
                            <image class="icon" :src="icon.iconName"></image>
                            <text class="text">没熟</text>
                        </div>
                        <div @click="coverOff">
                            <image class="icon" :src="icon.iconName"></image>
                             <text class="text">糊了</text>
                        </div>
                        <div @click="sliderNext">
                            <image class="icon" :src="icon.iconName"></image>
                             <text class="text">完美</text>
                        </div>
                    </div>
                </div>
                <div class="slider-item">
                    <div class="take-photo floor">
                        <image class="icon" :src="icon.iconName"></image>
                        <text class="text take-photo-text">吃前秀一秀</text>
                    </div>
                </div>
                <indicator class="indicator"></indicator>
            </slider>
        </div>
    </div>
</template>

<script>
    import MideaOverlay from '@/midea-component/overlay.vue';
    import separator from '@/midea-component/separator.vue';
    import MideaVote from '@/midea-component/mVote.vue'
    import MideaNavlist from '@/midea-component/mNavList.vue'

    export default {
        props: {
           show: {
               type: Boolean,
               default: true
           },
           msg: {
               type: String,
               default: '您完成了这道菜2次'
           },
           icon: {
               type: Object,
               default: function(){
                   return {
                       iconName: 'assets/img/weight.png',
                   }
               }
           }
        },
        components: {
            MideaOverlay,
            separator,
            MideaVote
        },
        computed: {
            style(){
                return {
                    vote: {
                        box: {
                            width: '400px',
                            marginLeft: '25px'
                        }
                    }
                }
            }
        },
        data() {
            return {
                voteImgPath: {
                    star: 'assets/img/star.png',
                    unstar: 'assets/img/unstar.png',
                },
                sliderIndex: 0,
            }
        },
        methods: {
            coverOff(e){
                this.$emit('coverOff',e)
            },
            voteSelected(e) {
                this.currentSelected = e.selected;
                setTimeout(() => {
                    this.sliderNext()
                }, 300)
            },
            sliderNext(){
                this.sliderIndex += 1;
            },
            changeSliderIndex(e){
                this.sliderIndex = e.index;
            }
        },
        created() {
           
        }
    }
</script>

<style>
.text{
    color: #fff;
    text-align: center;
}
.content{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.floor{
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.icon{
    width: 100px;
    height: 100px;
}
.close{
    text-align: right;
    margin-right: 10px;
    margin-top: 10px;
}
.msg{
    margin-top: 300px;
    margin-bottom: 250px;
    text-align: center;
    justify-content: center;
}
.msg-icon{
    margin-left: 325px;
    margin-bottom: 25px;
}
.msg-text{
    text-align: center;
}
.slider{
    position: relative;
    padding-bottom: 50px;
    width: 650px;
    height: 300px;
    margin-left: 50px;
}
.slider-item{
    justify-content: center;
    text-align: center;
    width: 650px;
}
.indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
}
.take-photo{
    border-width: 2px;
    border-color: #aaa;
    border-style: solid;
    border-radius: 10px;
    background-color: #222;
    padding:50px;
    width: 550px;
    margin-left: 50px;
}
.take-photo{
    font-size: 40px;
}
</style>