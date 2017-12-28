<template>
  <scroller class="scroller">
    <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
          <loading-indicator class="indicator" ></loading-indicator>
          <text class="indicator-text">正在同步状态...</text>
    </refresh>
    <div class="cell" v-for="num in lists">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </div>
  </scroller>
</template>
<style scoped>

  .indicator-text {
    width: 750px;
    padding-top: 20px;
    color: #5F5F5F;
    font-size: 28px;
    text-align: center;
  }
 .indicator {
    height: 60;
    width: 60;
    color: #00B9EF;
    margin-top:20px;
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

  .refresh{
    height: 140px;
    width: 750px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<script>
 const modal = weex.requireModule('modal')
  export default {
    data () {
      return {
        refreshing: false,
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      onrefresh (event) {
        console.log('is refreshing')
        this.refreshing = true
        setTimeout(() => {
          this.refreshing = false
        }, 2000)
      },
      onpullingdown (event) {
        
        
      }
    }
  }


</script>