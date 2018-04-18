<template>
   <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
      <midea-button text="点击弹出顶部面板"
        type="green" @mideaButtonClicked="openTopOverlay">
      </midea-button>

      <midea-button text="点击弹出底部面板"
        type="green" @mideaButtonClicked="openBottomOverlay">
      </midea-button>

      <midea-button text="点击弹出左侧面板"
        type="green" @mideaButtonClicked="openLeftOverlay">
      </midea-button>

      <midea-button text="点击弹出右侧面板"
        type="green" @mideaButtonClicked="openRightOverlay">
      </midea-button>

       <midea-popup 
               :show="isBottomShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               height="472">
         <div class="btn-grp">
              <text class="btn-grp-text" @click="cancel"> 取消</text>
              <text class="btn-grp-text" @click="confirm"> 确定</text>
         </div>
         <scroller class="demo-content">
             <midea-checkbox-list :list="list"
                 :needShowTopBorder="true"
                 @mideaCheckBoxListChecked="mideaCheckBoxListChecked">
              </midea-checkbox-list>
         </scroller>
      </midea-popup>
      <midea-popup 
               :show="isTopShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="top"
               height="400">
         <div class="demo-content">
             这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
         </div>
      </midea-popup>
      <midea-popup 
               :show="isLeftShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="left"
               width="375">
         <div class="demo-content">
             这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
         </div>
      </midea-popup>
      <midea-popup 
               :show="isRightShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="right"
               width="375">
         <div class="demo-content">
             这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
         </div>
      </midea-popup>
  </div>
</template>
<style scoped>
 .btn-grp{
    padding-left:24px;padding-right:24px;height:72px;flex-direction:row;
    align-items:center;justify-content: space-between;background-color:#F7F7F7;
 }
 .btn-grp-text{
   color:#00B9EF;font-size:28px;
 }
</style>
<script>  import base from './base'

  import mideaButton from '@/component/button.vue'
  import mideaPopup from '@/component/popup.vue'
  import mideaCheckboxList from '@/component/checkboxList.vue'
  import nativeService from '@/common/services/nativeService'
  const modal = weex.requireModule('modal');
  
  module.exports = {
    components: {mideaButton,mideaPopup,mideaCheckboxList},
    data () {
        return{
          isBottomShow:false,
          isTopShow:false,
          isLeftShow:false,
          isRightShow:false,
          list: [
            { title: '一路开关面板', value: 1,itemImg:"../img/icon/jiayun.switch.001.png" },
            { title: '二路开关面板', value: 2, checked: true,itemImg:"../img/icon/jiayun.switch.002.png" },
            { title: '三路开关面板', value: 3,itemImg:"../img/icon/jiayun.switch.003.png" },
            { title: '四路开关面板', value: 4,itemImg:"../img/icon/jiayun.switch.004.png" }
          ],
          checkedList: [2]
        }
    },
    methods: {
      popupOverlayBottomClick(){
          this.isBottomShow=false;
          this.isTopShow=false;
          this.isLeftShow=false;
          this.isRightShow=false;
      },
      openBottomOverlay(){
         this.isBottomShow=true;
      },
      openTopOverlay(){
         this.isTopShow=true;
      },
      openLeftOverlay(){
         this.isLeftShow=true;
      },
      openRightOverlay(){
         this.isRightShow=true;
      },
      confirm(){
          this.isBottomShow=false;
      },
      cancel(){
          this.isBottomShow=false;
      },
      mideaCheckBoxListChecked(e){
         this.checkedList = e.checkedList;
      }
    },
    created () {
      this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
  };
</script>