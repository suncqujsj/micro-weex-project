<style lang="less" type="text/less">
.search-tag{
  height: 200px;
  width: 750px;
}


.recipe-section {
    width: 650px;
    height: 300px;
    margin-left: 50px;
    margin-top: 35px;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    // border-width: 2px;
    // border-style: solid;
    // border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }
   .text {
    font-size: 50px;
    text-align: center;
    color:#333;
  }
  .recipe-section-title {
    font-size: 40px;
    text-align: left;
    color:#333;
  }
</style>
<template>
  <list class="list" @loadmore="loadmore"  loadmoreoffset=50 show-scrollbar=false>
      <cell class="cell">
        <div class="recipe-section ">
          <text class="text">666</text>
        </div>
      </cell>
      <header>
         <div class="search-tag">
          <text class="text">我会吸附在顶部</text>
        </div>
      </header>
      <cell class="cell" v-for="item in collectionData">
        <div class="recipe-section">
          <text class="recipe-section-title">人气推荐</text>
          <image src="http://121.41.75.163:8000/source/image/20180905/1536112973897g364.jpg" style="width:100px;height:200px"></image>
          <text>{{item.collectionName}}</text>
        </div>
      </cell>
    </list>
</template>

<script>
  import nativeService from "@/common/services/nativeService";

  export default {
    props: [],
    data(){
        return {
            collectionData:[],
        }
    },
    created() {
      let self = this;
        //测试接口
        let _url = "http://120.25.95.38:8200/cloud-menu/home/midea/menu/collection/all";
        let _body = JSON.stringify({});
       let requestData = {url: _url,body:_body};
        nativeService.sendHttpRequest(requestData).then(function(res){
          self.collectionData = res.data;
          nativeService.alert(res);
        }).catch((resp)=>{
          nativeService.alert(resp);
        })
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
