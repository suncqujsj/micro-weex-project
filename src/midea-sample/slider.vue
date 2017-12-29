<template>
 <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">

   <midea-title-bar title="工作温度℃" bgColor="#EEF4F7"></midea-title-bar>
   <div style="height:320px;">
   <midea-slider @slideEnd="slideEnd" @tipFormat="tempFormat" :max="max" :min="min" :value="value" :step="step"
   :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :pointColor="pointColor" :tipTxt="tipTemp" ></midea-slider>
   </div>

   <midea-title-bar title="工作时长" bgColor="#EEF4F7"></midea-title-bar>
   <div style="height:380px;">
   <midea-slider @slideEnd="slideEnd" @tipFormat="timeFormat" max="120" min="0" value="84" :step="step"
   :axisH="axisH" :pointH="pointH" :axisColor="axisColor" :pointColor="pointColor" :tipTxt="tipTime" ></midea-slider>
   </div>

<!--
   <midea-title-bar title="跟随变化" bgColor="#EEF4F7"></midea-title-bar>
   <div style="height:200px;">
   <midea-slider @slideEnd="slideEnd" :showTip="true" max="100" min="0" value="60" unit="度" :step="10"
   ></midea-slider>
 -->

   </div>

</div>
</template>
<style scoped>
  
</style>
<script>

  import mideaTitleBar from '../midea-component/title-bar.vue'
  import mideaSlider from '../midea-component/slider.vue'

  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
  const picker = weex.requireModule('picker');

  export default {
    components: {mideaTitleBar,mideaSlider},
    data () {
        return{
           max:300, //最大值
           min: 0, //最小值
           value: 210, //初始化值
           step:5, //步长
           axisH: 10, //轴高度(px)
           pointH: 26, //圆球高度（px）
           axisColor: '#DFE5E7',//滑条颜色
           pointColor: '#0E90FF', //圆球颜色 
           showTip: false,
           tipTemp: '',
           tipTime: ''
        }
    },
    methods: {
      tempFormat(event) { 
           this.tipTemp = event.value + '℃';
      },
      timeFormat(event) { 
          let minute = parseInt(event.value/60);
          let seconds = event.value - minute * 60;
          this.tipTime = (minute > 9 ? minute : '0'+minute) + ':' +  (seconds > 9 ? seconds : '0'+ seconds);
      },
      slideChange(event) {
         nativeService.toast('slideChange:' + event.value);
         return false;
      },
      slideEnd(event) {
        nativeService.toast('slideEnd:' + event.value);
       // nativeService.toast(JSON.stringify(data));
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
      //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>