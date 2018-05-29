<template>
  <div class="midea-demo">
   
      <text class="value-text"
            @click="setValue">点我可设置输入框内容2</text>
      <div class="demo">
        <midea-searchbar 
                        placeholder="input search"
                       @mideaSearchbarCancelClicked="mideaSearchbarCancelClicked"
                       @mideaSearchbarInputReturned="mideaSearchbarInputReturned"
                       @mideaSearchbarInputOnInput="mideaSearchbarInputOnInput"
                       @mideaSearchbarCloseClicked="mideaSearchbarCloseClicked"
                       @mideaSearchbarInputOnFocus="mideaSearchbarInputOnFocus"
                       @mideaSearchbarInputOnBlur="mideaSearchbarInputOnBlur"></midea-searchbar>
        <text class="value-text">{{value}}</text>

      </div>

      <text class="hint">禁用输入框</text>
      <div class="demo demo1">
        <midea-searchbar :disabled="isDisabled"
                       placeholder="无法输入"
                       @mideaSearchbarInputDisabledClicked="mideaSearchbarInputDisabledClicked"></midea-searchbar>
      </div>
<!--
      <text class="hint">一直显示取消按钮,同时theme="yellow"</text>
      <div class="demo demo1">
        <midea-searchbar :always-show-cancel="showCancel"
                       theme="yellow"
                       @mideaSearchbarCancelClicked="mideaSearchbarCancelClicked"></midea-searchbar>
      </div>

      <text class="hint">带有目的地模式的输入框、theme="yellow"</text>
      <div class="demo demo1">
        <midea-searchbar class="searchbar"
                       placeholder="搜索目的地"
                       theme="yellow"
                       mod="hasDep"
                       dep-name="杭州出发"
                       @mideaSearchbarDepChooseClicked="mideaSearchbarDepChooseClicked"
                       @mideaSearchbarInputDisabledClicked="mideaSearchbarInputDisabledClicked"></midea-searchbar>
      </div>
-->
  </div>
</template>

<style scoped>
  .midea-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #F6F9F8;
  }

  .scroller {
    flex: 1;
  }

  .wrapper {
    background-color: #FFFFFF;
  }

  .demo {
    height: 160px;
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
    color: #333333;
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  import mideaSearchbar from '@/midea-component/mSearchbar.vue'

  export default {
    components: { mideaSearchbar },
    data: () => ({
      value: '',
      showCancel: true,
      isDisabled: true
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
        
      }
    }
  };
</script>