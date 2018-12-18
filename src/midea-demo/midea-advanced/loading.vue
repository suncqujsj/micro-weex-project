<template>
    <div>
        <midea-header title="Loading" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller class="scroller">
            <div class="cell" v-for="num in lists" :key="num">
                <div class="panel">
                    <text class="text">{{num}}</text>
                </div>
            </div>
            <text class="loading-end" v-if="loadingEnd">- 已经到底啦 -</text>
            <loading class="loading" @loading="onloading" :display="showLoading" v-if="!loadingEnd">
                <!-- <text class="indicator-text">加载中...</text> -->
                <image class="indicator" src="../assets/img/loading.gif"></image>
            </loading>

        </scroller>
    </div>
</template>

<script>  
import base from '../base'
import mideaTitleBar from '@/midea-component/title-bar.vue'
const modal = weex.requireModule('modal')

const LOADMORE_COUNT = 4

export default {
    components: { mideaTitleBar },
    mixins: [base],
    data() {
        return {
            showLoading: 'hide',
            loadingEnd: false,
            lists: [1, 2, 3, 4, 5]
        }
    },
    methods: {
        onloading(event) {
            //modal.toast({ message: 'loading', duration: 1 })
            this.showLoading = 'show'
            setTimeout(() => {
                const length = this.lists.length
                if (length > 12) {
                    this.loadingEnd = true;
                } else {
                    for (let i = length; i < length + LOADMORE_COUNT; ++i) {
                        this.lists.push(i + 1)
                    }
                    this.showLoading = 'hide'
                }

            }, 1500)
        }
    }
}
</script>

<style scoped>
.loading-end {
  width: 750px;
  line-height: 96px;
  background-color: #f2f2f2;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #C7C7CC;
  letter-spacing: 0;
  text-align: center;
}
.indicator-loading {
  width: 750px;
  height: 120px;
  color: #0e90ff;
  font-size: 42px;
  text-align: center;
}
.indicator-text {
  width: 750px;
  color: #5f5f5f;
  font-size: 28px;
  text-align: center;
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
.loading {
  height: 140px;
  width: 750px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.indicator {
  height: 40px;
  width: 40px;
  color: #666666;
  margin-top: 20px;
}
</style>