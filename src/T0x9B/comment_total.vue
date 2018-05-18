<template>
  <div style="background-color: #f7f7f7;">
    <div class="midea-search">
       <div class="tab" :style="selectColor" @click="switchTab(1)">
        <text class="tab-text">全部(182)</text>
      </div>
       <div class="tab" :style="unselectColor" @click="switchTab(2)">
        <text class="tab-text">有图(30)</text>
      </div>
    </div>
    <div style="margin-top:60px" v-if="displayAll">
	    <div class="message-div">
	       <div class="message-div-first" ><image src="../img/icon/01.png" style="width:80px;height:80px"></image></div>
	       <div class="message-div-second">
	       	<text>Betty</text>
	       	<text style="margin-top:10px;margin-bottom: 10px;flex-wrap:wrap">what's your name?what can i do for you?Nice to meet your?what's your name?what can i do for you?Nice to meet your?'</text>
	       	<text>刚刚</text>
	       </div>
	    </div>
	     <div class="message-div" style="margin-top:10px">
	       <div class="message-div-first"><image src="../img/icon/02.png" style="width:80px;height:80px"></image></div>
	       <div class="message-div-second">
	       	<text>Betty</text>
	       	<text style="margin-top:10px;margin-bottom: 10px;flex-wrap:wrap">what's your name?what can i do for you?Nice to meet your?what's your name?what can i do for you?Nice to meet your?'</text>
	       	<text>刚刚</text>
	       </div>
	    </div>
	    <div class="message-div" style="margin-top:10px">
	       <div class="message-div-first"><image src="../img/icon/03.png" style="width:80px;height:80px"></image></div>
	       <div class="message-div-second">
	       	<text>Betty</text>
	       	<text style="margin-top:10px;margin-bottom: 10px;flex-wrap:wrap">what's your name?what can i do for you?Nice to meet your?what's your name?what can i do for you?Nice to meet your?'</text>
	       	<text>刚刚</text>
	       </div>
	    </div>
	    <div style="position: fixed;bottom:0px">
	    	<input type="text" placeholder="写下你的评论" class="input" :autofocus=true value="" @change="onchange" @input="oninput"/>
	    </div>
	   </div>
	  <div style="margin-top:60px" v-if="!displayAll">
	  	<div style="flex-direction: row;align-items:flex-start;background-color: white;">
	       <div style="margin-top:30px;margin-left:30px"><image src="../img/icon/01.png" style="width:80px;height:80px"></image></div>
	       <div style="margin-top:30px;margin-left:20px;margin-right:30px;margin-bottom10px;width:600px">
	       	<div style="flex-direction: row;justify-content:space-between">
	       		<div><text>Betty</text></div>
	       		<div style="flex-direction: row;align-items:center;">
	       			<text>评分</text>
	       		
	       		</div>
	       	</div>
	       	<text style="margin-top:10px;margin-bottom: 10px;flex-wrap:wrap">what's your name?what can i do for you?Nice to meet your?</text>
	       	<text>刚刚</text>
	       </div>
	    </div>
	    <div style="flex-direction: row">
	       	<text>6张</text>
	       	<text>12月15日</text>
	       	<text>note note</text>
	       </div>
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
  },
  .tab {
    width:375px;
    height:60px;

  },
  .tab-text {
  	color:white;
  	text-align:center;
  	font-size: 18px;
  	margin-top:20px
  },
  .message-div {
	    flex-direction: row;
	    align-items:center;
	    background-color: white;
  },
  .message-div-first {
  	margin-top:30px;
  	margin-left:30px
  },
  .message-div-second {
  	margin-top:30px;
  	margin-left:20px;
  	margin-right:30px;
  	margin-bottom:10px;
  	width:600px
  },
  .input {
    font-size: 30px;
    height: 80px;
    width: 700px;
    margin-top: 15px;
    margin-left:20px;
    margin-right:15px;
    margin-bottom: 15px;
    background-color: white;
    }
</style>

<script>
  const modal = weex.requireModule('modal');
  import mideaTab from '@/midea-component/mTab.vue'
	import mideaItem from '@/midea-component/item.vue'
	import mideaVote from '@/midea-component/mVote.vue'

  import nativeService from '@/common/services/nativeService'

  export default {
    components: { mideaTab,mideaItem,mideaVote },
    data: () => ({
      iconHeader:"../img/icon/03.png",
      list1: [
                { "name": "普京和特朗普未能会谈 克里姆宁宫 都怪美国", "desc": "美居活动 2017-12-25", "itemImg": "../img/icon/01.png" },
                { "name": "普京和特朗普未能会谈 克里姆宁宫 都怪美国", "desc": "美居活动 2017-12-25", "itemImg": "../img/icon/02.png" },
                { "name": "普京和特朗普未能会谈 克里姆宁宫 都怪美国", "desc": "美居活动 2017-12-25", "itemImg": "../img/icon/03.png" }
            ],
      selectColor:{backgroundColor:"#ef7c39"},
      unselectColor:{backgroundColor:"black"},
      displayAll:true
    }),
    created () {
      //setTitle('Searchbar');
    },
    methods: {
      tabClicked(tabIndex) {

      },
      goToPage(link) {
            var path = link + ".js";
            nativeService.goTo(path);
      },
      switchTab(tab) {
        if(tab == "1") {
          this.selectColor={backgroundColor:"#ef7c39"};
          this.unselectColor = {backgroundColor:"black"};
          this.displayAll = true;
        } else {
          this.selectColor={backgroundColor:"black"};
          this.unselectColor={backgroundColor:"#ef7c39"};
          this.displayAll = false;
        }
      },
      onchange:function(event) {
      	
      },
      oninput:function(event) {
      	
      }
    }
  };
</script>