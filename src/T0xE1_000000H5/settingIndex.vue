<template>
<div>
      <div>
      <midea-header 
      title="洗碗机" 
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="assets/img/home_btn_bace@2x.png" 
      rightImg="assets/img/home_btn_more@2x.png"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @rightImgClick="rightImgClick"></midea-header>
    </div>
        <scroller class="guide_list">
        <!-- <video class="video" :src="src" controls @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></video> -->
        <midea-video class="video" :src="src" autoplay="true" controls @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></midea-video>
          
          <div class="guide_list_item" v-for="(item,i) in list" @click="jumpNext(item)" >
            <text class="guide_item_text">
              {{item.name}}
            </text>
            <image style="width:12px;height:23px;" src="assets/img/arrow_right.png"></image>
          </div>
        </scroller>
</div>
</template>
<style scoped>
.video {
  width: 700px;
  height: 350px;
  margin-top: 20px;
}

 .guide_list {
    width: 700px;
    height: 1100px;
    margin-left: 25px;
    position: relative;
    /* margin-top: 30px; */
  }
  .guide_list_item{
    height: 120px;
    border-bottom-color: #c7c7c7;
    border-bottom-width: 1px;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    margin-left: -70px;
  }
  .guide_item_text{
    font-size: 30px;
  }
.demo_section {
  /* padding-left: 40px;
  padding-right: 40px;
  padding-top: 80px; */
}
.demo_title {
  font-size: 34px;
}
.demo_content {
  margin-top: 20px;
  font-size: 26px;
}
._center_title {
  text-align: center;
  margin: 60px;
  font-size: 40px;
}
</style>
<script>
import mideaHeader from '../midea-component/header.vue'
import nativeService from "../common/services/nativeService";
import mideaItem from '../midea-component/item.vue'
const modal = weex.requireModule('modal')
var stream = weex.requireModule('stream');
export default {
  components: {mideaItem,mideaHeader},
  data() {
    return {
      state: "----",
      src:
        "https://chuyu-meiyun.oss-cn-shenzhen.aliyuncs.com/H3_video.mp4",
      isTopShow: false,
      loadMore:true,
      startIndex:16,
       list:[ 
            {"name":"快速开始使用",type:'quickGuide',record:3},
            {"name":"了解你的洗碗机",type:'howWorkGuide',record:4},
            {"name":"使用贴士",type:'tipsGuide',record:5},
            {"name":"学习摆放碗碟",type:'learningGuide',record:6},
            {"name":"保管是什么",type:'safeKeepGuide',record:7},
            {"name":"智能助手是什么",type:'helperGuide' ,record:8},
            {"name":"注意事项",type:'attentionGuide',record:9},
            {"name":"故障排除",type:'fualtGuide',record:10},
            {"name":"联系客服",type:'connectGuide',"hasSeparate":true,record:11},
            {"name":"常见问题",type:'problemGuide',record:12}
          ]
    };
  },
  methods: {
    onstart(event) {
      this.state = "onstart";
    },
    onpause(event) {
      this.state = "onpause";
    },
    onfinish(event) {
      this.state = "onfinish";
       var self = this;
      var POST_URL = 'http://121.43.198.16:8080/h3-exp/exp/add';
      nativeService.getItem("sn", function(snObj) {
        nativeService.getItem("userId", function(userid) {
            var requestData = {
              userId: userid.data,
              sn: snObj.data,
              type: 1
            };
            stream.fetch({
                method: 'POST',
                url: POST_URL,
                headers:{'Content-Type':'application/json'},
                type:'json',
                body:JSON.stringify(requestData)
              }, function(ret) {
                if(!ret.ok){
                  nativeService.toast("request failed");
                }else{
                  
                }
              },function(response){
                console.log('get in progress:'+response.length);
              });

        })
      })
    },
    onfail(event) {
      this.state = "onfail";
      // alert(JSON.stringify(event));
    },
    showDel(item){
        
      },
    jumpNext(item){

      var self = this;
      var POST_URL = 'http://121.43.198.16:8080/h3-exp/exp/add';
      nativeService.getItem("sn", function(snObj) {
        nativeService.getItem("userId", function(userid) {
            var requestData = {
              userId: userid.data,
              sn: snObj.data,
              type: item.record
            };
            stream.fetch({
                method: 'POST',
                url: POST_URL,
                headers:{'Content-Type':'application/json'},
                type:'json',
                body:JSON.stringify(requestData)
              }, function(ret) {
                if(!ret.ok){
                  nativeService.toast("request failed");
                }else{
                  
                }
              },function(response){
                console.log('get in progress:'+response.length);
              });

        })
      })

       setTimeout(function(){
          if(item.type=='learningGuide'){
            var path = "settingLearningGuide.js";
              nativeService.goTo(path,false, true);
              return;
          }
          if(item.type=='tipsGuide'){
            var path = "settingTipsGuide.js";
              nativeService.goTo(path,false, true);
              return;
          }
          if(item.type=='attentionGuide'){
            var path = "settingAttentionGuide.js";
              nativeService.goTo(path,false, true);
              return;
          }
          nativeService.setItem("guideObj", {
            name: item.name,
            type: item.type
          });
          var path = "settingPage.js";
          nativeService.goTo(path,false, true);
      },300);
     
    },
     backClick() {
      var path = "memberIndex.js";
      nativeService.goTo(path,false, true);
    },
  }
};
</script>