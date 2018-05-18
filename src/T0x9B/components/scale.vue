// 滑动标尺 
<template>
    <div>
        <div>
            <text class="select-value">{{selectedValue}} g</text>
            <text class="select-value">|</text>
        </div>
        <scroller class="scale" scroll-direction="horizontal" @scroll="changeScale">
            <div class="scale-item" v-for="item in scaleItems">
                <image class="scale-bg" :src="scaleBg"></image>
                <text class="scale-value">{{item}}</text>
            </div>
        </scroller>
        
    </div>
</template>

<script>

    export default {
        props: {
            max: {
                type: Number,
                default: 2000 //刻度的最大值
            }
        },
        data() {
            return {
                selectedValue: 0, //选中的值
                scaleActive: false,
                eventt: ''
            }
        },
        computed: {
            scaleItems(){
                let tmpArray = []
                for (let i=0; i < this.max/10; i++){
                    tmpArray.push(i*10)
                }
                return  tmpArray
            },
            scaleBg(){
                // return this.scaleActive ? './img/oven/scal.png' : './img/oven/scal_on.png'
                return './img/oven/scal.png'
            }
        },
        methods: {
            changeScale(event){
                var x = -1 * event.contentOffset.x
                var selectedValue = Math.ceil((x+375)/10)
                this.selectedValue = selectedValue
            }
          
        },
        created(){
            
        }
    }
</script>

<style>
.select-value{
    margin-top: 150px;
    margin-bottom: 10px;
    text-align: center;
}
.scale{
    flex-direction: row;
    position: relative;
    margin-top: -30px;
}
.scale-item{
    width: 100px;
    height: 90px;
}
.scale-bg{
    width: 100px;
    height: 40px;
}
.scale-value{
    text-align: left;
}
.big{
    font-size: 38px;
}
</style>

