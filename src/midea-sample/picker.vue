<template>
 <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">

   <midea-title-bar title="选择地点"></midea-title-bar>
   <midea-cell title="地点"
                :hasTopBorder="true"
                :rightText="area?area:'请选择地点'"
                @mideaCellClick="pickArea"
               >
   </midea-cell>


   <midea-title-bar title="选择日期"></midea-title-bar>
   <midea-cell title="日期"
                :rightText="date?date:'请选择日期'"
                :hasTopBorder="true"
                @mideaCellClick="pickDate"
               >
    </midea-cell>
    <midea-cell title="时间"
                :rightText="time?time:'请选择时间'"
                @mideaCellClick="pickTime"
               >
    </midea-cell>
</div>
</template>
<style scoped>
  
</style>
<script>
  import mideaCell from '../component/cell.vue'
  import mideaTitleBar from '../midea-component/title-bar.vue'
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
  const picker = weex.requireModule('picker')
  export default {
    components: {mideaCell,mideaTitleBar},
    data () {
        return{
          "index":0,
          "date":"",
          "area":"",
          "time":""
        }
    },
    methods: {
       pickArea(){
          if(this.isIos ){
            const items = ['北京', '上海', '广州'];
            picker.pick({
              'index': this.index,
              'items': items,
              'title': '选择地点', //取消和确定中间那标题
              'cancelTxt': '取消', //取消按钮文字
              'confirmTxt': '确定', //确定按钮文字,
              'cancelTxtColor': '#020F13', //取消颜色
              'confirmTxtColor': '#020F13', //标题颜色
              'titleColor': '#020F13', //标题颜色
              'titleBgColor':'#E7EDEF' //标题栏颜色
            }, event => {
              if (event.result === 'success') {
                this.area = items[event.data];
                this.index = event.data;
              }
            })
          }else{
              var self=this;
              var items1 = [];
              for(var i=0;i<24;i++){
                items1.push(i+1);
              }
              var items2 = [];
              for (var j=0; j<60;j++){
                items2.push(j+1);
              }
              var items3 = [];
              for (var k = 0; k<60; k++) {
                items3.push(k+1);
              }
              var pickItem=[
                {
                  index:1,
                  item:items1,
                  label:"时"
                },
                {
                  index:2,
                  item:items2,
                  label:"分"
                },
                {
                  index:3,
                  item:items3,
                  label:"秒"
                }
              ]
              picker.pick({
                'items':pickItem,
               'title': '选择地点', //取消和确定中间那标题
               'cancelTxt': '取消', //取消按钮文字
               'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#020F13', //取消颜色
                'confirmTxtColor': '#020F13', //标题颜色
               'titleColor': '#020F13', //标题颜色
               'titleBgColor':'#E7EDEF' //标题栏颜色
              }, event => {
                var data=event.data;
                var dataArr=data.replace("[","").replace("]","").split(",");
                //nativeService.toast(dataArr[0]);
                var hour=parseInt(dataArr[0]);
                var minute=parseInt(dataArr[1]);
                var second=parseInt(dataArr[2]);
                pickItem[0].index=hour;
                pickItem[1].index=minute;
                pickItem[2].index=second;
                var area=pickItem[0].item[hour]+"时"+pickItem[1].item[minute]+"分"+(pickItem[2].item[second]+1)+"秒";
                 // nativeService.toast(area);
                self.area=area;
             });


          }
       },
       pickDate(){
            var self = this;
              picker.pickDate({
                  'value':this.date||'2016-11-28',
                  'max':'2029-11-28',
                  'min':'2015-11-28',
                  'title': '选择日期', //取消和确定中间那标题
                  'cancelTxt': '取消', //取消按钮文字
                  'confirmTxt': '确定', //确定按钮文字,
                  'cancelTxtColor': '#020F13', //取消颜色
                  'confirmTxtColor': '#020F13', //标题颜色
                  'titleColor': '#020F13', //标题颜色
                  'titleBgColor':'#E7EDEF' //标题栏颜色
                 
              },function (ret) {
                  var result = ret.result;
                  if(result == 'success')
                  {
                     self.date=ret.data;
                  }
              });
       },
       pickTime(){
          picker.pickTime({
            'value': this.time,
            'title': '选择时间', //取消和确定中间那标题
            'cancelTxt': '取消', //取消按钮文字
            'confirmTxt': '确定', //确定按钮文字,
             'cancelTxtColor': '#020F13', //取消颜色
            'confirmTxtColor': '#020F13', //标题颜色
            'titleColor': '#020F13', //标题颜色
            'titleBgColor':'#E7EDEF' //标题栏颜色
          }, event => {
            if (event.result === 'success') {
               this.time = event.data;
            }
          })
       }
    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>