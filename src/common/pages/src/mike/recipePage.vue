<style lang="less" type="text/less">
.search-tag{
  height: 200px;
  width: 750px;
}


.panel {
    width: 600px;
    height: 300px;
    margin-left: 75px;
    margin-top: 35px;
    margin-bottom: 35px;
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
</style>
<template>
  <list class="list" @loadmore="loadmore"  loadmoreoffset=50 show-scrollbar=false>
      <cell class="cell">
        <div class="panel">
          <text class="text">666</text>
        </div>
      </cell>
      <header>
         <div class="search-tag">
          <text class="text">我会吸附在顶部</text>
        </div>
      </header>
      <cell class="cell" v-for="num in lists">
        <div class="panel">
          <text class="text">{{num}}</text>
        </div>
      </cell>
    </list>
</template>

<script>
  export default {
    props: [],
    data(){
        return {
            lists: ['A', 'B', 'C', 'D', 'E',1,2,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,11,1,88],
        }
    },
    methods:{
        loadmore(){
            let self = this;
            // setTimeout(() => {
            //   for(var i=0; i< 10; i++){
            //     self.lists.push(i+'dd');
            //   }
            // }, 100);
        }
    }
  }
</script>
