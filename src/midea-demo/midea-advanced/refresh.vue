<template>
    <div>
        <midea-header title="Refresh" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller class="scroller">
            <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
                <!-- <image class="indicator" src="../assets/img/loading.gif"></image> -->
                <midea-lottie-view v-if="lottieData" class="lottie" :data="lottieData" :loop="true"></midea-lottie-view>
                <!-- <text class="indicator-text">正在同步状态...</text> -->
            </refresh>
            <div class="cell" v-for="num in lists" :key="num">
                <div class="panel">
                    <text class="text">{{num}}</text>
                </div>
            </div>
        </scroller>
    </div>
</template>
<style scoped>
.indicator-text {
  width: 750px;
  padding-top: 20px;
  color: #5f5f5f;
  font-size: 28px;
  text-align: center;
}
.indicator {
  height: 40px;
  width: 40px;
  color: #666666;
  margin-top: 20px;
}
.panel {
  width: 600px;
  height: 250px;
  margin-left: 75px;
  margin-top: 35px;
  margin-bottom: 35px;
  flex-direction: column;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  border-color: #dddddd;
  background-color: #f5f5f5;
}
.text {
  font-size: 50px;
  text-align: center;
  color: #41b883;
}

.refresh {
  height: 140px;
  width: 750px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lottie {
  width: 750px;
  height: 140px;
}
</style>
<script>  
import base from '../base'
const modal = weex.requireModule('modal')
import refreshJSON from '../assets/lottie/refresh.json'
export default {
    mixins: [base],
    data() {
        return {
            refreshing: false,
            lists: [1, 2, 3, 4, 5],
            lottieData: ""
        }
    },
    methods: {
        onrefresh(event) {
            console.log('is refreshing')
            this.refreshing = true
            setTimeout(() => {
                this.refreshing = false
            }, 2000)
        },
        onpullingdown(event) {


        }
    },
    mounted() {
        this.lottieData = JSON.stringify(refreshJSON)
    }
}


</script>