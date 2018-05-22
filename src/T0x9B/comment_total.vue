<template>
  <div style="background-color: #f7f7f7;">
    <midea-header :title="title" :bgColor="bgColor" :showLeftImg="true" :leftImg="icon.leftImg" :showRightText="true" rightText="秀一秀" @leftImgClick="goBack" @rightImgClick="goShow" :style="headerStyle"></midea-header>
    <div class="midea-search">
       <div class="tab" :style="selectColor" @click="switchTab(1)">
        <text class="tab-text">全部(182)</text>
      </div>
       <div class="tab" :style="unselectColor" @click="switchTab(2)">
        <text class="tab-text">有图(30)</text>
      </div>
    </div>
    <div  v-if="displayAll" style="flex:1">
    	<scroller >
		    <div class="message-div">
		       <div class="message-div-first" ><image src="http://img.jf258.com/uploads/2013-07-11/223807319.jpg" style="width:80px;height:80px"></image></div>
		       <div class="message-div-second">
		       	<text>Betty</text>
		       	<text style="margin-top:10px;margin-bottom: 10px;flex-wrap:wrap">what's your name?what can i do for you?Nice to meet your?what's your name?what can i do for you?Nice to meet your?'</text>
		       	<text>刚刚</text>
		       </div>
		    </div>
	     	<div class="message-div" style="margin-top:10px">
		       <div class="message-div-first"><image src="http://img.jf258.com/uploads/2013-07-13/210631606.jpg" style="width:80px;height:80px"></image></div>
		       <div class="message-div-second">
		       	<text>Betty</text>
		       	<text style="margin-top:10px;margin-bottom: 10px;flex-wrap:wrap">what's your name?what can i do for you?Nice to meet your?what's your name?what can i do for you?Nice to meet your?'</text>
		       	<text>刚刚</text>
		       </div>
		    </div>
		    <div class="message-div" style="margin-top:10px">
		       <div class="message-div-first"><image src="http://img.jf258.com/uploads/2013-07-07/025358907.jpg" style="width:80px;height:80px"></image></div>
		       <div class="message-div-second">
		       	<text>Betty</text>
		       	<text style="margin-top:10px;margin-bottom: 10px;flex-wrap:wrap">what's your name?what can i do for you?Nice to meet your?what's your name?what can i do for you?Nice to meet your?'</text>
		       	<text>刚刚</text>
		       </div>
		    </div>
		    <div>
		    	<div style="position: fixed;bottom:0px">
		    		<input type="text" return-key-type="send" placeholder="写下你的评论" class="input" value="" @change="onchange" @input="oninput"/>
		    	</div>
		    </div>
		    </scroller>
	   </div>
	  <div v-if="!displayAll" style="flex:1">
	  	<scroller>
		  	<div class="comment-img-div" >
		       <div class="comment-img-img"><image src="http://img.jf258.com/uploads/2013-08-05/063625267.jpg" style="width:80px;height:80px"></image></div>
		       <div class="comment-img-content">
		       	<div class="comment-img-content-title">
		       		<div><text>Betty</text></div>
		       		<div class="comment-img-content-vote">
		       			<text>评分</text>
		       			<div style="margin-left:10px"><midea-vote :styles="voteStyle" :disabled="true" :defaulSelectd='3'></midea-vote></div>
		       		</div>
		       	</div>
		       	<text class="comment-img-content-detail">what's your name?what can i do for you?Nice to meet your?</text>
		       	<text>刚刚</text>
		       </div>
		    </div>
		    <div class="comment-img-status">
		       	<text>6张</text>
		       	<text>12月15日</text>
		       	<div style="flex-direction: row;">
		       		<image src="./assets/img/fav.png" class="image"></image>
		       		<text>10</text>
		       		<image src="./assets/img/comment.png" class="image" style="margin-left:15px"></image>
		       		<text>2</text>
		       	</div>
		    </div>
		 </scroller >
	  </div>
  </div>
</template>

<style scoped>
  .midea-search {
    flex-direction: row;
  },
  .tab {
    width:375px;
    padding-top: 15px;
    padding-bottom: 15px;
  },
  .tab-text {
  	color:white;
  	text-align:center;
  	font-size: 32px;
  	margin-top:9px
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
    },
  .comment-img-div {
  	flex-direction: row;
  	align-items:flex-start;
  	background-color: white;
  },
  .comment-img-img {
  	margin-top:30px;
  	margin-left:30px
  },
  .comment-img-content {
  	margin-top:30px;
  	margin-left:20px;
  	margin-right:30px;
  	margin-bottom:10px;
  	width:600px
  },
  .comment-img-content-detail {
  	margin-top:10px;
  	margin-bottom: 10px;
  	flex-wrap:wrap
  },
  .comment-img-content-title {
  	flex-direction: row;
  	align-items:center;
  	justify-content:space-between;
  },
  .comment-img-content-vote {
  	flex-direction: row;
  	align-items:center;
  	width:300px
  },
  .comment-img-status {
  	flex-direction: row;
  	justify-content: space-around;
  	background-color: white;
  },
  .image {
  	width:40px;
  	height:40px
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  import mideaTab from '@/midea-component/mTab.vue'
	import mideaItem from '@/midea-component/item.vue'
	import mideaVote from '@/midea-component/mVote.vue'
  import MideaHeader from '@/midea-component/header.vue'

  import nativeService from '@/common/services/nativeService'

  export default {
    components: { mideaTab,mideaItem,mideaVote, MideaHeader },
    data: () => ({

      icon: {
        leftImg: './img/header/tab_back.png',
      },
      title: '评论',
      bgColor: '#111',
      selectColor:{backgroundColor:"#ef7c39"},
      unselectColor:{backgroundColor:"black"},
      displayAll:true,
      headerStyle:{
        rightWrapWidth: '120px',
      },
      voteStyle: {
        box: {
            width: '220px',
            height: '50px'
        }
    },
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
      goBack(){
        nativeService.goBack();
      },
      goShow(){
        nativeService.goTo('work_show.js')
      },
      goSearch(){
        nativeService.goTo('search');
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