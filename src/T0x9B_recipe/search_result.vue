<template>
  <div class="midea-search">
      <div class="title-div" >
        <image :src="arrowIcon" class="title-div-img"></image>
        <text class="hint">返回</text>
      </div>
      <div class="demo demo1" @click="goToPage('search_keyword')">
        <midea-searchbar :disabled="isDisabled"
                          :setWidth="setWidth"
                       placeholder="搜索菜谱关键词"
                       @mideaSearchbarInputDisabledClicked="mideaSearchbarInputDisabledClicked"></midea-searchbar>
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
  .demo {
    height: 160px;
    width: 400px
  },
  .demo1 {
    margin-top: 20px;
  },
  .hint {
    margin-left: 24px;
    font-size: 30px;
    margin-top: 40px;
    color:white;
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  const storage = weex.requireModule('storage')
  import mideaSearchbar from '@/midea-component/mSearchbar.vue'
  import nativeService from '@/common/services/nativeService'

  export default {
    components: { mideaSearchbar },
    data: () => ({
      arrowIcon:"../img/header/tab_back@2x.png",
      isDisabled:true,
      setWidth:"450px"
    }),
    created () {
       storage.setItem('refer','', e=>{})
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
       // modal.toast({ 'message': 'input.onclick', 'duration': 1 });
        this.goToPage("search_keyword");
      },
      mideaSearchbarDepChooseClicked () {
        modal.toast({ 'message': 'dep.choose.click', 'duration': 1 });
      },
      mideaSearchbarInputReturned () {

      },
      mideaSearchbarInputReturned () {
        
      },
      goToPage(link) {
            var path = link + ".js";
            nativeService.goTo(path);
      }
    }
  };
</script>