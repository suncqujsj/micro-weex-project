<template>
  <div>
    <div class="midea-search">
        <div class="title-div" @click="goBack">
          <image :src="arrowIcon" class="title-div-img"></image>
          <text class="hint">取消</text>
        </div>
        <div class="demo demo1">
          <midea-searchbar 
                            :setWidth="setWidth"
                         placeholder="搜索菜谱关键词"
                         @mideaSearchbarInputDisabledClicked="mideaSearchbarInputDisabledClicked"></midea-searchbar>
        </div>

    </div>
    <div style="margin-top:105px">
     <midea-item v-for="(item,i) in list" :key="item" :hasTopBorder="i==0?true:false" :title="item.name" :hasArrow="false" :clickActivied="true" @onItemPress="showDel(item)" :cantEdit="true" @onDelete="delItem(item)">
              </midea-item>
    </div>
  </div>
</template>

<style scoped>
  .midea-search {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: row;
    background-color: black;
    width:750px;
    height:105px
  },
	.title-div {
		flex-direction: row;
	},
	.title-div-img {
		width: 20px;
		height: 25px;
		margin-top:48px;
		margin-left:20px
	},
  .scroller {
    flex: 1;
  }

  .wrapper {
    background-color: #FFFFFF;
  }

  .demo {
    height: 160px;
    width: 400px
  }

  .demo1 {
    margin-top: 20px;
  }

  .value-text {
    margin: 24px;
    font-size: 30px;
    color: #333333;
  }

  .hint {
    margin-left: 24px;
    font-size: 30px;
    margin-top: 40px;
    color:white;
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  import mideaSearchbar from '@/midea-component/mSearchbar.vue'
  import mideaItem from '@/midea-component/item.vue'
  import nativeService from '@/common/services/nativeService'

  export default {
    components: { mideaSearchbar,mideaItem },
    data: () => ({
      arrowIcon:"./img/header/tab_back.png",
      isDisabled:true,
      setWidth:"560px",
       list: [
                { "name": "云食普" },
                 { "name": "云食普1" },
                 { "name": "云食普2" },
                 { "name": "云食普3" },
                 { "name": "云食普4" },
                 { "name": "云食普5" },
                 { "name": "云食普6" },
            ],
    }),
    created () {
      //setTitle('Searchbar');
    },
    methods: {
      setValue () {
        //this.$refs['midea-searchbar'].setValue('点击了手动设置输入框内容的开关');
      },

      mideaSearchbarInputOnFocus () {
        modal.toast({ 'message': 'onfocus', 'duration': 1 });
      },
      mideaSearchbarInputOnBlur () {
        modal.toast({ 'message': 'onbulr', 'duration': 1 });
      },
      mideaSearchbarCloseClicked () {
        modal.toast({ 'message': 'close.click', 'duration': 1 });
      },
      mideaSearchbarInputOnInput (e) {
        this.value = e.value;
      },
      mideaSearchbarCancelClicked () {
        modal.toast({ 'message': 'cancel.click', 'duration': 1 });
      },
      mideaSearchbarInputDisabledClicked () {
        modal.toast({ 'message': 'input.onclick', 'duration': 1 });
      },
      mideaSearchbarDepChooseClicked () {
        modal.toast({ 'message': 'dep.choose.click', 'duration': 1 });
      },
      mideaSearchbarInputReturned () {

      },
      mideaSearchbarInputReturned () {
        
      },
      showDel(item) {
          this.showDelModal = true;
          this.editItem = item;
      },
      delItem(item) {

      },
      goBack(){
        nativeService.goBack();
      },
      goToPage(link) {
          var path = link + ".js";
          nativeService.goTo(path);
      }
    }
  };
</script>