<template>
	<scroller class="content">
    <div class="box">
        <div>
	    	 <div class="card">
	        	<div class="card-left">
        			<div class="main-status-div">
        				<text class="main-status">24</text>
        				<text class="danwei">分</text>
	        		</div>
        			<text class="main-status-second" style="text-align: center;">室内温度</text>
	        		<div class="card-status-detail">
	        			<text class="main-status-third">精华煮 /松软</text>
	        		</div>
	        	</div>
	        	<div class="card-right">
	        		<div class="card-control" @click="powerOnoff">
	        			<image class="card-control-img" style="margin-right:35px" src="./assets/img/Smart_ic_alarm@2x.png"></image>
	        			<image class="card-control-img" :src="powerOnoffImg"></image>
	        		</div>
	        		<div class="card-icon">
	        			<image class="card-icon-img" resize="contain" src="./assets/img/smart_img_equip041@2x.png"></image>
	        		</div>
	        	</div>
	        </div>
        </div>
	    <scroller class="scroller-item" scroll-direction="horizontal">
		    <list class="scroller-list-item">
	        	<!--带向右箭头的链接 -->
		        <midea-item v-for="(item,i) in list" :key="item" :hasTopBorder="false" :hasBottomBorder="false" :title="item.name"   :hasArrow="true" :clickActivied="true" @onItemPress="showDel(item)" @mideaCellClick="cellClick(item)" :cantEdit="true" @onDelete="delItem(item)">
		        	 <text slot="title" class="cell-content">{{item.name}}</text>
		        	 <text slot="rightText" class="right-text">{{item.rightText}}</text>
		        </midea-item>
	        </list>
	    </scroller>
        <div style="flex-direction: row;flex-wrap: wrap;">
        	<cookbook v-for="(item3,index) in cookbook" :data="item3" @cookbookclick="mideaClick"></cookbook>
        </div>
    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
		import mideaSwitch from '@/midea-component/switch.vue'
		import mideaSmart from '@/midea-card/T0xAC/components/smart.vue'
		import mideaItem from '@/midea-component/item.vue'
		import cookbook from '@/midea-card/T0xAC/components/cookbook.vue'
		const modal = weex.requireModule('modal');
		const dom = weex.requireModule('dom');
		var stream = weex.requireModule('stream');
    export default {
        components: {
            mideaSwitch,
            mideaSmart,
            mideaItem,
            cookbook
        },
        data() {
            return {
                mideaChecked: true,
                mideaChecked2: false,
                currentTemperture:19,
                power:"off",
                currentStatus:"auto",
                data:{
                 	title:"连续烹饪次数过多，提醒饮食多样性",
                 	detail:"次数30次以上"
                },
                data2:{
                 	title:"宝宝最适宜温度",
                 	detail:"温度28C，风速最小"
                },
                data3:{
                 	title:"宝宝最适宜温度",
                 	detail:"空调/客厅"
                },
                list: [
                { 
                	"name": "电饭煲食谱",
                	"rightText":"更多"
                }],
                cookbook:[{
	    			title:"蓬松煎饼1",
	    			title_preimg:"./assets/img/smart_ic_a@2x.png",
	    			detail_first:"炖锅炖锅炖1 ",
	    			detail_second:"20分 | 简单 | 240千卡1",
	    			img_url:"./assets/img/test_pic_banner04@2x.png",
	    			targeturl:"a"
	    		},{
	    			title:"蓬松煎饼2",
	    			title_tailimg:"./assets/img/smart_ic_like@2x.png",
	    			detail_first:"炖锅炖锅炖2 ",
	    			detail_second:"20分 | 简单 | 240千卡2",
	    			img_url:"./assets/img/test_pic_banner04@2x.png",
	    			targeturl:"b"
	    		},{
	    			title:"蓬松煎饼3",
	    			detail_first:"炖锅炖锅炖3",
	    			detail_second:"20分 | 简单 | 240千卡3",
	    			img_url:"./assets/img/test_pic_banner04@2x.png",
	    			targeturl:"c"
	    		},{
	    			title:"蓬松煎饼4",
	    			title_preimg:"./assets/img/smart_ic_a@2x.png",
	    			title_tailimg:"./assets/img/smart_ic_like@2x.png",
	    			detail_first:"炖锅炖锅炖4",
	    			detail_second:"20分 | 简单 | 240千卡4",
	    			img_url:"./assets/img/test_pic_banner04@2x.png",
	    			targeturl:"d"
	    		}],
            }
        },
        methods: {
            onMideachange(event) {
            		//modal.toast({ 'message': event.value, 'duration': 2 });
            },
             onMideachange2(event) {
            		//modal.toast({ 'message': event.value, 'duration': 2 });
            },
            changeTemperture(event) {
	            	let currentSetTemperture = Math.ceil(event.contentOffset.x/52) +29;
	            	if(currentSetTemperture <= 17) {
	            		currentSetTemperture = 17;
	            	} else if (currentSetTemperture >= 30) {
	            		currentSetTemperture = 30;
	            	}
	            	this.currentTemperture = currentSetTemperture;
            },
            queryStatus () {
            	let self = this;
            	let params = {
            			"operation":"luaQuery",
            			"data":{}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            updateUI(data) {
            	console.log("yoram:");
            	console.dir(data);
            },
            powerOnoff() {
            	//nativeService.getPath((weexPath)=> {
		            	stream.fetch({
		            		method:'get',
		            		url:"/dist/T0xAC/dummy/delDevice.js",
		            		type:"json"
		            	},function(ret) {
		            		console.dir(nativeService.convertToJson(ret.data))
		            	},function(response) {
		            		console.dir(nativeService.convertToJson(response.data));
		            	})
		          // });
		        }
        },
        computed: {
				powerOnoffImg () {
		            let img = "./assets/img/smart_ic_play@2x.png";
		            if(this.power == "on") {
		                img = "./assets/img/smart_ic_play@2x.png";
		            } else {
		                img = "./assets/img/smart_ic_play@2x.png";
		            }
		            return img;
		        },
	        	statusImg() {
		        		let img = "./assets/img/smart_ic_cold_on@2x.png";
		        		if(this.currentStatus == "auto") {
		        			img = "./assets/img/smart_ic_auto_on@2x.png"
		        		} else if(this.currentStatus == "cold") {
		        			img = "./assets/img/smart_ic_cold_on@2x.png"
		        		}
		        		return img;
	        	}
        },
        mounted() {
            //this.queryStatus();
        }
    }
</script>


<style>
	.content {
		width:750px;
	}
	.box {
		margin-bottom: 150px;
	}
	.card {
		width:686;
		height:392px;
		margin-left:32px;
		margin-right:32px;
		margin-top:32px;
		background-color:#FFBD00;
		border-radius: 2px;
		flex-direction: row;
	}
	.scroller-item {
		height:120px;
		flex:1
	}
	.scroller-list-item {
		margin-top:32px;
		height:80px;
		width:750px
	}
	.card-control {
		align-items: flex-end;
		margin-top:44px;
		margin-right:44px;
		flex-direction: row;
		justify-content: flex-end;
	}
	.card-status-detail {
		flex-direction: row;
		justify-content: center;
		margin-bottom:60px;
		margin-top:8px;
	}
	.card-status-detail-img {
		width:56px;
		height:56px
	}
	.card-control-img {
		width:48px;
		height:50px
	}
	.card-icon {
		align-items: flex-end;
		margin-top:-60px;
	}
	.card-icon-img {
		width:314px;
		height:314px
	}
	.smart {
		flex-direction: column;
		justify-content: space-between;
		margin-top:20px;
	}
	.smart-title {
		flex-direction: row;
		justify-content: space-between;
		margin-left:32px;
		margin-right:32px;
	}
	.smart-content {
		margin-top:50px;
		margin-left:32px;
		margin-right:32px;
		border-bottom: inset
	}
	.smart-content-last {
		margin-top:50px;
		margin-left:32px;
		margin-right:32px;
	}
	.smart-text {
		font-family: PingFangSC-Regular;
		font-size: 36px;
		color: #000000;
		letter-spacing: 0;
	}
	.smart-img {
		width:48px;
		height: 48px;
	}
	.smart-detail {
		flex-direction: row;
		justify-content: space-between;
		margin-top:30px;
		padding-bottom: 20px;
	}
	.smart-detail-content {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #8A8A8F;
		letter-spacing: 0;
	}
	.main-status-div {
		flex-direction: row;
		margin-left:50px
	}
	.main-status {
		font-size: 128px;
		margin-top:60px;
		font-family: SFProText-Light;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
	.danwei {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #FFFFFF;
		letter-spacing: 0;
		margin-top: 80px;
	}
	.main-status-second {
		font-size: 28px;
		margin-left:10px;
		margin-top:-30px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
	.main-status-third {
		font-size: 28px;
		margin-left:10px;
		margin-top:8px;
		font-family: PingFangSC-Regular;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
	.card-left {
		flex-direction: column;
		width:343px;
		height:392px;
		align-items: center;
		justify-content: space-around;
	}
	.card-right {
		flex-direction: column;
		width:343px;
		height:392px;
		justify-content: space-between;
	}
	.cell-content {
		font-family: PingFangSC-Medium;
		font-size: 36px;
		color: #000000;
	}
	.right-text {
		font-family: PingFangSC-Regular;
		font-size: 28px;
		color: #000000;
		text-align: right;
		margin-right:25px;
	}
	.scroller-bar {
		margin-top:-72px;
	}
	.scroller {
		height:120px;
	}
	.scroller-div {
		width:1372px;
		flex-direction: row;
		justify-content: space-between;
	}
	.scroller-left {
		width:350px;
	}
	.scroller-main {
		width:233px;
		flex-direction: column;
	}
	.scroller-main-div {
		margin-left:102px;
		flex-direction: column;
	}
	.scroller-main-content {
		font-size: 24px;
	}
	.scroller-main-separate {
		font-size:16px;
		margin-left:14px;
	}
	.scroller-main-img-first {
		width:233px;
		height: 30px;
	}
	.scroller-main-img-second {
		width:32px;
		height: 32px;
		margin-left:100px;
		margin-top:-20px;
	}
	.scroller-right {
		width:350px;
	}

</style>
