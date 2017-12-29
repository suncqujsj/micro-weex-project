<template>
  <scroller class="scroller">
    <div class="cell" v-for="num in lists">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </div>
    <text class="loading-end" v-if="loadingEnd">———— 到底了 ————</text>
    <loading class="loading" @loading="onloading" :display="showLoading" v-if="!loadingEnd">
       <text class="indicator-text">加载中...</text>
       <loading-indicator class="indicator" ></loading-indicator>
    </loading>

  </scroller>
</template>

<script>
  import mideaTitleBar from '../midea-component/title-bar.vue'
  const modal = weex.requireModule('modal')

  const LOADMORE_COUNT = 4

  export default {
     components: {mideaTitleBar},
    data () {
      return {
        showLoading: 'hide',
        loadingEnd: false,
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      onloading (event) {
        //modal.toast({ message: 'loading', duration: 1 })
        this.showLoading = 'show'
        setTimeout(() => {
          const length = this.lists.length
          if(length > 12) {
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
  .loading-end{
      width: 750px;
      padding: 30px 0;
      background-color: #EEF4F7;
      color: #B4C0CB;
      text-align: center;
  }
  .indicator-loading{
    width: 750px;
    height: 120px;
    color: #0E90FF;
    font-size: 42px;
    text-align: center;
  }
  .indicator-text {
    width: 750px;
    color: #5F5F5F;
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
    border-color: #DDDDDD;
    background-color: #F5F5F5;
  }
  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }
  .loading {
       height: 140px;
    width: 750px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
 .indicator {
    height: 60;
    width: 60;
    color: #00B9EF;
    margin-top:20px;
  }
</style>