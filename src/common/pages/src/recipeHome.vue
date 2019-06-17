<template>
  <waterfall column-count="2" column-width="auto">
    <cell class="cell" v-for="num in lists">
      <div class="panel" :style="{height: 300+num*40 + 'px'}">
        <text class="text">{{num}}</text>
      </div>
    </cell>
    <header class="footer" ref="footer"  @appear="footerAppear">
      <text class="text">loading...</text>
    </header>
  </waterfall>
</template>

<script>
  export default {
    data () {
      let repeatItems = [];  
      let items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
      for (let i = 0; i < 3; i++) {
        repeatItems.push(...items)
      } 
      return {
        lists: repeatItems
      }
    },
    methods: {
      footerAppear: function(e) {
        let items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        this.lists.push(...items);
      }
    }
  }
</script>

<style scoped>
  .panel {
    margin-top: 45px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
  .text {
    font-size: 88px;
    text-align: center;
    color: #41B883;
  }
  .footer {
    height: 94px;
    justify-content: center;
    align-items: center;
    background-color: #00cc99;
  }
</style>