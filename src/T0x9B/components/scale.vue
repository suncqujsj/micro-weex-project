// 滑动标尺 
<template>
    <div class="wrap">
        <div>
            <text class="select-value">{{selectedValue}} g</text>
            <text class="select-value selected-bar">|</text>
        </div>
        <scroller class="scale" scroll-direction="horizontal" @scroll="changeScale" show-scrollbar="false">
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
                eventt: '',
                scaleBg: 'assets/img/scal.png'
            }
        },
        computed: {
            scaleItems(){
                let tmpArray = []
                for (let i=0; i <= this.max/10; i++){
                    tmpArray.push(i*10)
                }
                return  (['','',''].concat(tmpArray)).concat(['',''])
            }
        },
        methods: {
            changeScale(event){
                var x = (-1 * event.contentOffset.x  > 0) ? -1 * event.contentOffset.x  : 0
                var selectedValue = Math.ceil(x/12.5) > this.max ? this.max : Math.ceil(x/12.5)
                this.selectedValue = selectedValue
            }
        },
        created(){
            
        }
    }
</script>

<style>
.wrap{
    margin-bottom: 25px;
}
.select-value{
    margin-top: 25px;
    text-align: center;
    color: #FB9045;
    font-size: 60px;
}
.selected-bar{
    color: #7ECEF4;
    font-size: 32px;
}
.scale{
    height: 90px;
    margin-top: -30px;
}
.scale-item{
    width: 125px;
    height: 90px;
    border-width: 1px;
    border-color: #111;
    border-style: solid;
}
.scale-bg{
    width: 125px;
    height: 40px;
}
.scale-value{
    text-align: left;
}
</style>

