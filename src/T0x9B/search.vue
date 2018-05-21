<template>
    <div>
        <div class="midea-search">
            <div class="title-div" @click="goBack">
                <image :src="arrowIcon" class="title-div-img"></image>
                <text class="hint">返回</text>
            </div>
            <div class="demo demo1" @click="goToPage('search_keyword')">
                <midea-searchbar :disabled="isDisabled" :setWidth="setWidth" placeholder="搜索菜谱关键词" @mideaSearchbarInputDisabledClicked="mideaSearchbarInputDisabledClicked"></midea-searchbar>
            </div>
        </div>
        <div class="accordion">
            <accordion :menus="menus"></accordion>
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
  .accordion{
      margin-top: 105px;
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  import mideaSearchbar from '@/midea-component/mSearchbar.vue'
  import accordion from '@/T0x9B/components/accordion.vue'
  import nativeService from '@/common/services/nativeService'

  export default {
    components: { mideaSearchbar, accordion },
    data: () => ({
        arrowIcon:"./img/header/tab_back.png",
        isDisabled:true,
        setWidth:"550px",
        menus: [{
            name: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            iconPath: '',
            subMenu: [{
                title: 'a1',
                key: ''
            },{
                title: 'a2',
                key: ''
            },{
                title: 'a3',
                key: ''
            },{
                title: 'a4',
                key: ''
            },{
                title: 'a5',
                key: ''
            },{
                title: 'a6',
                key: ''
            },{
                title: 'a7',
                key: ''
            }]
        },{
            name: 'BBBBBBBBBB',
            subMenu: [{
                title: 'b1',
                key: ''
            }]
        },{
            name: 'CCCCCCCCCCCCCC',
            subMenu: [{
                title: 'c1',
                key: ''
            }]
        },{
            name: 'DDDDDDDDDDDDDDD',
            subMenu: [{
                title: 'd1',
                key: ''
            }]
        },{
            name: 'EEEEEEEEEEEEEE',
            subMenu: [{
                title: 'e1',
                key: ''
            }]
        },{
            name: 'FFFFFFFFFFF',
            subMenu: [{
                title: 'f1',
                key: ''
            }]
        },{
            name: 'GGGGGGGGGGGGGGGGGG',
            subMenu: [{
                title: 'g1',
                key: ''
            }]
        },{
            name: 'HHHHHHHHHHHHHHHHHHH',
            subMenu: [{
                title: 'h1',
                key: ''
            }]
        },{
            name: 'IIIIIIIIIIIIIIIIIIIIIII',
            subMenu: [{
                title: 'i1',
                key: ''
            }]
        },{
            name: 'JJJJJJJJJJJJJJJJJJJ',
            subMenu: [{
                title: 'j1',
                key: ''
            }]
        },{
            name: 'KKKKKKKKKKKKKKKKKKKKK',
            subMenu: [{
                title: 'k1',
                key: ''
            }]
        },{
            name: 'LLLLLLLLLLLLLLLLLLLLLL',
            subMenu: [{
                title: 'l1',
                key: ''
            }]
        },{
            name: 'MMMMMMMMMMMMMM',
            subMenu: [{
                title: 'm1',
                key: ''
            }]
        },{
            name: 'NNNNNNNN',
            subMenu: [{
                title: 'n1',
                key: ''
            }]
        },{
            name: 'OOOOOOOO',
            subMenu: [{
                title: 'o1',
                key: ''
            }]
        },{
            name: 'PPPPPPPPPPP',
            subMenu: [{
                title: 'p1',
                key: ''
            }]
        },{
            name: 'QQQQQQQQQQQQQQQQQQQ',
            subMenu: [{
                title: 'q1',
                key: ''
            }]
        },{
            name: 'RRRRRRRRRRRRR',
            subMenu: [{
                title: 'r1',
                key: ''
            }]
        }]
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
      goBack(){
          nativeService.goBack()
      },
      goToPage(link) {
            var path = link + ".js";
            nativeService.goTo(path);
      }
    }
  };
</script>