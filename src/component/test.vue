<template>
  <div class="wrapper" ref="wrapper">
  
      <midea-button text="底部弹出" :btnStyle="{width:'500px'}"
        type="green" @mideaButtonClicked="openBottomOverlay">
      </midea-button>

      <midea-button text="上部弹出" 
        type="green" @mideaButtonClicked="openTopOverlay">
      </midea-button>

      <midea-button text="打开对话框"  
        type="green" @mideaButtonClicked="openDialog">
      </midea-button>

     <!-- <div style="flex-direction:row;align-items:center;justify-content: space-between;padding-left:24px;padding-right:24px">
        <midea-button text="左边" :btnStyle="{width:'340px'}"
          type="green">
        </midea-button> 
        <midea-button text="右边" :btnStyle="{width:'340px'}"
          type="delete">
        </midea-button>
      </div>-->

      <midea-dual-button leftBtnText="左边" rightBtnText="右边"
        leftBtnType="green"
        rightBtnType="delete"
        @leftBtnClicked="openDialog"
        @rightBtnClicked="openDialog"
      >
      </midea-dual-button>

       
       
          <!--  <midea-checkbox-list :list="list"
                 :needShowTopBorder="false"
                 @mideaCheckBoxListChecked="mideaCheckBoxListChecked">
            </midea-checkbox-list>-->
       <!--<text class="checked-text">选中项 {{checkedList.toString()}}</text>-->

      <!--<midea-checkbox title="默认"
          itemImg="http://10.74.144.55:8080/
      <midea-checkbox title="默认选中"
                    :checked="true"></midea-checkbox>dist/img/icon/jiayun.light.002.png"
          @mideaCheckBoxItemChecked="mideaCellClick"
      ></midea-checkbox>
      <midea-checkbox title="未选中不可更改"
                    :disabled="true"></midea-checkbox>
      <midea-checkbox title="选中不可更改"
                    :disabled="true"
                    :checked="true"></midea-checkbox>-->
    <div style="padding:12px;">
      <midea-grid-select
        :cols="7"
        :customStyles="{width:'90px',height:'48px'}"
        :list="testData1"
        @select="onSelect">
      </midea-grid-select>
    </div>
    <div style="padding:12px;">
      <midea-grid-select
        :cols="7"
        :customStyles="{width:'90px',height:'48px'}"
        :list="testData2"
        @select="onSelect">
      </midea-grid-select>
    </div>
    
  <midea-cell title="美的智慧生活"
                desc="测试"
                height="120"
                rightText="设置"
                :has-top-border="true"
                :has-arrow="true"
                itemImg="http://10.74.144.55:8080/dist/img/icon/jiayun.light.002.png"
                @mideaCellClick="mideaCellClick"
               >
     </midea-cell>

     <midea-cell label="标题"
                :has-top-border="false"
                @mideaCellClick="mideaCellClick"
                >
                <text class="link-text" slot="text" v-if="selected==1"> 不可关联</text>
                <text class="link-text" slot="text" v-if="selected==2"> 已关联</text>
     </midea-cell>

      <midea-dialog title="使用协议"
                :show="show"
                @mideaDialogCancelBtnClicked="mideaDialogConfirmBtnClicked"
                @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked"
                content="美的智慧生活解决方案"
                :single="single"
                >
      </midea-dialog>
    <!--<wxc-overlay
      :show="show"
      v-on:wxcOverlayBodyClicked="wxcOverlayBodyClicked"
      opacity="0.6"></wxc-overlay>-->
       <midea-popup 
               :show="isBottomShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               height="400">
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

     <midea-popup ref="popUp"
               :show="isTopShow"
               @mideaPopupOverlayClicked="popupOverlayBottomClick"
               pos="left"
               height="400">
         
         <scroller class="demo-content">
              <midea-radio-list :list="list"
                 @mideaRadioItemChecked="mideaRadioItemChecked"></midea-radio-list>
         </scroller>
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
 .link-text{
   color:#9FA0A0;
   font-size:24px;
 }
 .demo-image{
   width:240px;
   height:240px;
 }
  
  .btn-wrapper{
    margin-top:20px;
    padding-left:20px;
    padding-right:20px;
    padding-top:16px;
    padding-bottom:16px;
 }
 .btn-green{
     border-radius: 8px;
     border-style: solid;
     border-color: #00B9EF;
     background-color: #00B9EF;
     border-width: 1px;
     height:84px;
     color:#fff;
     align-items: center;
     justify-content: center;
  }
  .btn-gray{
     border-radius: 8px;
     border-style: solid;
     border-color: #CCC;
     background-color: #CCC;
     border-width: 1px;
     height:84px;
     align-items: center;
     justify-content: center;
  }
  .btn-green-txt{
    color: #FFF;
    font-size:28px;
    font-weight: bold;
  }
  
  .btn-green:active {
    background-color:#00A9EF;
  }
  
  .btn-gray:active {
      background-color: #CCC;
  }

</style>
<script>

  import mideaPopup from './popup.vue';
  import mideaCell from './cell.vue';
  import mideaButton from './button.vue';
  import mideaDualButton from './dualButton.vue';
  import mideaDialog from './dialog.vue';
  import mideaCheckboxList from './checkboxList.vue';
  import mideaRadioList from './radioList.vue';
  import mideaGridSelect from './optionList.vue';
  const modal = weex.requireModule('modal');
  const dom= weex.requireModule('dom');
  module.exports = {
    components: {mideaPopup,mideaCell,mideaButton,mideaDialog,mideaCheckboxList,mideaRadioList,mideaGridSelect,mideaDualButton},
    data: () => ({
      isBottomShow: false,
      isTopShow:false,
      show: false,
      single: false,
      selected:1,
      list: [
        { title: '选项1', value: 1,itemImg:"http://10.74.144.55:8080/dist/img/icon/jiayun.light.002.png" },
        { title: '选项2', value: 2, checked: true },
        { title: '选项3', value: 3 },
        { title: '选项4', value: 4 }
      ],
      testData1: [
          {
            'title': '重复',
            'checked': true
          },
          {
            'title': '一次'
          }
       ],
      testData2: [
          {
            'title': '一',
            'index':0
          },
          {
            'title': '二',
            'checked': true,
            'index':1

          },
          {
            'title': '三',
            'checked': true,
            'index':2

          },
          {
            'title': '四',
            'index':3
          },
          {
            'title': '五',
            'index':4
          },
          {
            'title': '六',
            'index':5
          },
          {
            'title': '日',
            'index':0
          }
      ],
      checkedList: [2],
      checkedInfo: { title: '选项2', value: 2 }
    }),
    methods: {
      confirm(){
          this.isBottomShow=false;
      },
      cancel(){
          this.isBottomShow=false;
      },
      mideaRadioItemChecked(e){
          this.checkedInfo = e;
          this.isTopShow=false;
      },
      mideaCheckBoxListChecked(e){
         this.checkedList = e.checkedList;
         //weex.requireModule('modal').toast({"message":'121212',duration:1});
      },
      mideaDialogConfirmBtnClicked(){
         this.show=false;
      },
      mideaDialogConfirmBtnClicked(){
         this.show=false;
      },
      mideaCellClick(){
        //weex.requireModule('modal').toast({"message":'121212',duration:1});
      },
      openOverlay () {
        this.isBottomShow = true;
      },
      openBottomOverlay(){
         this.isBottomShow = true;
      },
      openTopOverlay(){
         this.isTopShow = true;
      },
      openDialog(){
          this.show=true;
          //this.count+
          /*var ref=this.$refs.wrapper;
          dom.getComponentRect(ref, function(result){
            var size=result.size||{};
            modal.toast({ message:size.height, duration: 1 });
          });*/
          //modal.toast({ message:"名称"+this.count, duration: 1 });
      },
      popupOverlayBottomClick () {
        this.isBottomShow = false;
        this.isTopShow = false;
      },
      onSelect (e) {
          console.log(JSON.stringify(e.checkedList));
          /*{
            selectIndex: index,
            checked: !checked,
            checkedList: this.dList.filter(item => item.checked)
          }*/
       // Vue.set(this, res, `本次选择的index：${selectIndex}\n是否选中：${checked ? '是' : '否'}\n选中列表：${checkedList.map(item => item.title).join(',')}`);
      }
    }
  };
</script>