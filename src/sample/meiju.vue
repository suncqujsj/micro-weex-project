<template>
 <div class="wrapper">

   <midea-title-bar title="美居slider"></midea-title-bar>
   <div style="height:280px;margin-top:60px;">

   <meiju-slider :max="100" :min="10"  :value="50" :step="5" :axisH="10" :pointH="30" pointColor='#0066CC' axisColor='#CCCC99'
    @slideChange="slideChange"   @slideEnd="slideEnd"  ></meiju-slider>
   </div>

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
<script>  import base from './base'
  import mideaCell from '@/component/cell.vue'
  import mideaTitleBar from '@/component/title-bar.vue'
  import nativeService from '@/common/services/nativeService'
  const modal = weex.requireModule('modal');
  const picker = weex.requireModule('picker')
  export default {
    components: {mideaCell,mideaTitleBar},
    data () {
        return{
          
        }
    },
    methods: {
      slideChange(event) {
         nativeService.toast('slideChange:' + event.value);
         return false;
      },
      slideEnd(event) {
        nativeService.toast('slideEnd:' + event.value);
        return false;
      },
      pickDate(){
           picker.meijuPickDate({
                'value': '2016-11-28', //默认初始化值，如果format='MMDD',则value格式为：'11-28',以此类推
                'max': '2029-11-28', //最大范围值
                'min': '2015-11-28', //最小范围
                'label':'年-月-日', //日期后的标签文字,如果format='MMDD'，则label为：'月-日'，以此类推
                'format': 'YYMMDD', //日期格式，YYMMDD:显示年月日，MMDD:'月日'， M:'月'， D:'日'
                'title': '选择日期', //取消和确定中间那标题
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定' //确定按钮文字
            },function (ret) {
                var result = ret.result;
                if(result == 'success')
                {
                  nativeService.toast('meijuPickDate:' + ret.data);
                  
                }
            });
       },
       pickTime(){
          picker.meijuPickTime({
            'value': '23:58:32',
            'label':'时-分-秒',
            'format': 'HHIISS',
            'title': '选择时间',
            'cancelTxt': '取消',
            'confirmTxt': '确定'
          }, event => {
            if (event.result === 'success') {
               nativeService.toast('meijuPickTime:' + event.data);
            }
          })
       }
    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>