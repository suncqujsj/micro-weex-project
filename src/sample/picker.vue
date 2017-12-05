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
  import mideaTitleBar from '../component/title-bar.vue'
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('mideaTitleBar,modal');
  const picker = weex.requireModule('picker')
  export default {
    components: {mideaCell,mideaTitleBar},
    data () {
        return{
          "area":"请选择地点",
          "date":"请选择日期",
          "time":"请选择时间",
          "index":0
          
        }
    },
    methods: {
       pickArea(){
          const items = ['北京', '上海', '广州'];
          picker.pick({
            index: this.index,
            items
          }, event => {
            if (event.result === 'success') {
              this.area = items[event.data];
              this.index = event.data;
            }
          })
       },
       pickDate(){
          picker.pickDate({
            value: this.date,
            max: '2029-11-28',
            min: '2005-11-28'
          }, event => {
            if (event.result === 'success') {
              this.date = event.data;
            }
          })
       },
       pickTime(){
          picker.pickTime({
            value: this.time
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