<template>
<div>
     <midea-header 
      title="水电统计" 
      titleText="black" 
      :isImmersion="true"
      bgColor="#ffffff"
      leftImg="assets/img/home_btn_bace@2x.png" 
      rightImg="assets/img/setting.png"
      :showRightImg="false"  
      @leftImgClick="backClick" 
      @rightImgClick="rightImgClick"></midea-header>
    
 <div ref="swipeArea" class="swipe-area" v-on:swipe="onSwipe($event,item)">
     <div style="margin-top:40px" class="flex_center">
        <text class="water_dec">已累计为你节省了</text><text class="water_value">{{waterSaved}}L</text>
        <text class="water_dec">水量</text>
    </div>
   <div style="margin-top:60px">
        <div class="date_setion">
           <div>.</div>
            <div class="date_content">
                <div :class="['date_item',item.isActive && 'date_item_active',item.hasBorder && 'has_border']" v-for="(item,i) in dateCheck1"
                @click="setDateClick(item,'chart1')">
                    <text>{{item.name}}</text>
                </div>
            </div>
        </div>
        <midea-linechart-view class="linechart" :data="chartJson1"></midea-linechart-view>
    </div>

     <div style="margin-top:80px">
        <div class="date_setion">
            <div>.</div>
            <div class="date_content">
                 <div :class="['date_item',item.isActive && 'date_item_active',item.hasBorder && 'has_border']" v-for="(item,i) in dateCheck2"
                 @click="setDateClick(item,'chart2')">
                    <text>{{item.name}}</text>
                </div>
            </div>
        </div>
        <midea-linechart-view class="linechart" :data="chartJson2"></midea-linechart-view>
    </div>

     <image class="up_icon" src="assets/img/home_arrow_up@2x.png"></image>

    </div>
   
</div>
</template>
<style scoped>
.flex_center {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.swipe-area {
  display: flex;
  flex: 1;
}
.date_setion{
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 750px;
  margin-bottom: 30px;
}
.water_dec{
    font-size: 24px;
    margin-left: 10px;
}
.water_value{
margin-left: 10px;
font-size: 40px;
color: #2d7df5;
}
.up_icon{
  width: 32px;
  height: 18px;
  position: absolute;
  bottom: 10px;
  left: 370px;
}
.date_content{
   flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 60px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 40px;
}
.date_item{
  width: 133px;
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.date_item_active{
    background-color:aliceblue;
    border-radius: 40px;
    border-color: #ddd;
    border-width: 1px;
}
.has_border{
    /* border-right-color: #ddd;
    border-right-width: 1px; */
}
.demo_section {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 80px;
}
.demo_title {
  font-size: 34px;
}
.demo_content {
  margin-top: 20px;
  font-size: 26px;
}
.linechart {
  width: 730px;
  margin-left: 10px;
  height: 350px;
}
</style>
<script>

import mideaHeader from '../midea-component/header.vue'
import nativeService from "../common/services/nativeService";
var stream = weex.requireModule('stream');
var POST_URL = 'http://121.43.198.16:8080/datacount/washm/we/bydev';
export default {
  components: { mideaHeader },
  data() {
    return {
      uid:'',
      applianceId: '',
      queryType: 'week',
      waterSaved:'',
      dateCheck1:[
          {key: 0,name:'周',hasBorder:true,isActive: true,
           xValue:['周一','周二','周三','周四','周五','周六','周日']
            },
          {key: 1,name:'月',hasBorder:true,isActive: false,
            xValue:['1日','7日','14日','21日','31日']
          },
          {key: 2,name:'年',hasBorder:false,isActive: false,
            xValue:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
          },
      ],
      dateCheck2:[
          {key: 0,name:'周',hasBorder:true,isActive: true,
           xValue:['周一','周二','周三','周四','周五','周六','周日']
            },
          {key: 1,name:'月',hasBorder:true,isActive: false,
            xValue:['1日','7日','14日','21日','31日']
          },
          {key: 2,name:'年',hasBorder:false,isActive: false,
            xValue:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
          },
      ],
      chartJson1: {
                "x": {
                    "value": [1, 2, 3, 4, 5, 6, 7],
                    "label": ['周一','周二','周三','周四','周五','周六','周日']
                },
                "y": [
                    {
                        "value": [0, 0, 0, 0, 0, 0, 0],
                        "title": "水量(L)",
                        "color": "#2AD2FC", //折线颜色
                        "starcolor": "#ffffff", //区域背景渐变开始颜色（从下自上）
                        "endcolor": "#2AD2FC", //区域背景渐变结束颜色（从下自上）
                        "smooth":1,  //0直线，1平滑
                    },
                   
                ],
                "description": "",
                "legend": {
                    "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "HORIZONTAL" //"HORIZONTAL"/"BOTTOM_RIGHT"
                },
                "unit": {
                    "x": "",
                    "y": "L"
                }
            },

             chartJson2: {
                "x": {
                    "value": [1, 2, 3, 4, 5, 6, 7],
                    "label": ['周一','周二','周三','周四','周五','周六','周日']
                },
                "y": [
                    {
                        "value": [0, 0, 0, 0, 0, 0, 0],
                        "title": "电量(度)",
                        "color": "#1B81FB", //折线颜色
                        "starcolor": "#ffffff", //区域背景渐变开始颜色（从下自上）
                        "endcolor": "#1B81FB", //区域背景渐变结束颜色（从下自上）
                        "smooth":1,  //0直线，1平滑
                    }
                   
                ],
                "description": "",
                "legend": {
                    "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "HORIZONTAL" //"HORIZONTAL"/"BOTTOM_RIGHT"
                },
                "unit": {
                    "x": "",
                    "y": "度"
                }
            }
    };
  },

  methods: {
    backClick() {
      var path = "memberIndex.js";
      nativeService.goTo(path, false, true);
    },
    setDateClick(item,which){
        var query_type = 'week';
        if(item.name=='周'){
            query_type = 'week';
        }
         if(item.name=='月'){
            query_type = 'month';
        }
         if(item.name=='年'){
            query_type = 'year';
        }
        var requestData = {
            uid: this.uid,
            applianceId: this.applianceId,
            queryType: query_type//week/month/year
          };
        this.chartFun(item,which,requestData);
        
    },
     onSwipe(event, item) {
      this.eventObject = event;
      if (event.direction == "up") {
        var path = "standby.js";
        nativeService.goTo(path, false, true);
      }
    },
    chartFun(item,which,requestData){
         var self = this;
        var currentArr = [];
        var chartObj1 = JSON.parse(JSON.stringify(this.chartJson1));
        var chartObj2 = JSON.parse(JSON.stringify(this.chartJson2));
        if(which=="chart1"){
            currentArr = this.dateCheck1;
        }
         if(which=="chart2"){
            currentArr = this.dateCheck2;
        }
        for(var i=0; i<currentArr.length; i++){
            if(item.key==currentArr[i].key){
                currentArr[i].isActive = true;
            }else{
                currentArr[i].isActive = false;
            }
        }

        //  if(item.name=='周'){
        //         if(which=="chart1"){
        //             chartObj1.x.label = currentArr[0].xValue;
                    
        //         }
        //         if(which=="chart2"){
        //             chartObj2.x.label = currentArr[0].xValue;
        //         }
        //     }
        //     if(item.name=='月'){
        //         if(which=="chart1"){
        //             chartObj1.x.label = currentArr[1].xValue;
        //         }
        //         if(which=="chart2"){
        //             chartObj2.x.label = currentArr[1].xValue;
        //         }
        //     }
        //     if(item.name=='年'){
        //         if(which=="chart1"){
        //             chartObj1.x.label = currentArr[2].xValue;
        //         }
        //         if(which=="chart2"){
        //             chartObj2.x.label = currentArr[2].xValue;
        //         }
        //     }

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
                //   nativeService.alert(ret.data.content.result);
                  var result = ret.data.content.result;
                  var waterSaved = ret.data.content.waterSaved;
                  self.waterSaved = waterSaved;
                  var yE = [], yW = [], xLabel = [];
                  for(var i=0; i<result.length; i++){
                      yE.push(result[i].yE);
                      yW.push(result[i].yW);
                      xLabel.push(result[i].x);
                  }
                
                  chartObj1.y[0].value = yW;
                  chartObj2.y[0].value = yE;
                  chartObj1.x.label = xLabel;
                  chartObj2.x.label = xLabel;
                  if(which=="chart1"){
                        self.dateCheck1 = currentArr;
                        self.chartJson1 = JSON.parse(JSON.stringify(chartObj1));
                    }
                    if(which=="chart2"){
                        self.dateCheck2 = currentArr;
                        self.chartJson2 = JSON.parse(JSON.stringify(chartObj2));
                    }
                    
                }
                },function(response){
                console.log('get in progress:'+response.length);
                });
    }
  },
  created() { 
    var self = this;
    nativeService.getItem("applianceId", function(applianceIdObj) {
      nativeService.getItem("userId", function(userid) {
          var requestData = {
            uid: userid.data,
            applianceId: applianceIdObj.data,
            queryType: 'week'//week/month/year
          };
          self.uid = userid.data;
          self.applianceId = applianceIdObj.data;
            var item = {key: 0,name:'周',hasBorder:true,isActive: true,
                        xValue:['周一','周二','周三','周四','周五','周六','周日']
                        };
          self.chartFun(item,'chart1',requestData);
          self.chartFun(item,'chart2',requestData);
      })
    })
  },
  mounted() {   
    
  }
};
</script>