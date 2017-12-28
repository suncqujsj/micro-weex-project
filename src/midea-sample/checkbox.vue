<template>
   <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
     <div style="padding:24px">
        <text style="font-size:28px">当前选中 {{checkedList.toString()}}</text>
     </div>
     <midea-checkbox-list :list="list"
         :needShowTopBorder="true"
        @mideaCheckBoxListChecked="itemChecked"></midea-checkbox-list>
     <!--<div style="padding:24px">
        <text style="font-size:28px">当前选中 {{imgCheckedList.toString()}}</text>
     </div>
     
     <midea-checkbox-list :list="list1"
        :needShowTopBorder="true"
        @mideaCheckBoxListChecked="imgItemChecked"></midea-checkbox-list>-->
  </div>
</template>
<style scoped>
 .wrapper{
   background-color:#F7F7F7;
    position:relative;
 }
</style>
<script>

  import mideaCheckboxList from '../midea-component/checkboxList.vue'
  import nativeService from '../common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  module.exports = {
    components: {mideaCheckboxList},
    data () {
      return {
         list: [
            { title: '选项1', value: 1 },
            { title: '选项2', value: 2, checked: true },
            { title: '选项3', value: 3 },
            { title: '选项4', value: 4 }
         ],
         list1: [
            { title: '一路开关面板', value: 1,itemImg:"/dist/src/img/icon/jiayun.switch.001.png" },
            { title: '二路开关面板', value: 2, checked: true,itemImg:"/dist/src/img/icon/jiayun.switch.002.png" },
            { title: '三路开关面板', value: 3,itemImg:"/dist/src/img/icon/jiayun.switch.003.png" },
            { title: '四路开关面板', value: 4,itemImg:"/dist/src/img/icon/jiayun.switch.004.png" }
         ],
         checkedList: [2],
         imgCheckedList: [2],
      }
    },
    methods: {
      itemChecked(e){
         this.checkedList = e.checkedList;
      },
      imgItemChecked(e){
         this.imgCheckedList = e.checkedList;
      }

    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>