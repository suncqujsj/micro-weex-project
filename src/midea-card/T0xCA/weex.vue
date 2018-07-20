<template>
    <scroller class="content">
    <div class="box">
        <div class="card">
	    	 <image src="./assets/img/test_pic_banner04@2x.png" style="width:686px;height:392px"></image>
        </div>
        <scroller class="scroller-item" scroll-direction="horizontal">
        	<list class="scroller-list-item" show-scrollbar="false">
	        	<!--带向右箭头,有详情的链接 -->
		    	<midea-item v-for="(item,j) in list" :key="item" :hasTopBorder="false" :hasBottomBorder="false" :title="item.name"   :hasArrow="true" :clickActivied="true" @onItemPress="showDel(item)" @mideaCellClick="cellClick(item)" :cantEdit="true" @onDelete="delItem(item)">
		        	 <text slot="title" class="cell-content">{{item.name}}</text>
		        	 <div slot="text" style="flex-direction: row;">
		        	 	<text class="cell-desc-text">冷藏</text>
		        	 	<text class="cell-desc-text">变温</text>
		        	 	<text class="cell-desc-text">冷冻</text>
		        	 </div>
		        	 <text slot="rightText" class="right-text">{{item.rightText}}</text>
		        </midea-item>
	        </list>
        </scroller>
        <div class="scroller-food-div">
	       <scroller class="scroller-food" scroll-direction="horizontal" show-scrollbar="false">
	       		<food v-for="(it,index) in foodData" :data="it" @foodclick="mideaClick"></food>
	       </scroller>
	    </div>
        <div class="smart">
	        <div class="smart-title">
	        	<text class="smart-text">温度和模式</text>
	        </div>
	    </div>
        <div>
	    	<extend :menus="menus"></extend>
	    </div>
	    <div class="smart">
	        <div class="smart-title">
	        	<text class="smart-text">智能</text>
	        	<image class="smart-img" src="./assets/img/smart_ic_more@2x.png"></image>
	        </div>
      	</div>
        <midea-smart @change="onMideachange2" :hasBottomBorder="false" :checked="mideaChecked2" :data="data2"></midea-smart>
    </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
		import mideaSwitch from '@/midea-component/switch.vue'
	import mideaSmart from '@/midea-card/midea-components/smart.vue'
		import food from '@/midea-card/T0xAC/components/food.vue'
		import mideaItem from '@/midea-component/item.vue'
		import extend from '@/midea-card/T0xAC/components/extend.vue'
		const modal = weex.requireModule('modal');
		const dom = weex.requireModule('dom');
		var stream = weex.requireModule('stream');
    export default {
        components: {
            mideaSwitch,
            mideaSmart,
            mideaItem,
            food,
            extend
        },
        data() {
            return {
                mideaChecked: true,
                mideaChecked2: false,
                currentTemperture:19,
                power:"off",
                currentStatus:"auto",
                data:{
                 	title:"每周三提醒清洗冰箱内侧",
                 	detail:""
                },
                data2:{
                 	title:"宝宝最适宜温度",
                 	detail:"温度28C，风速最小"
                },
                list: [
                { 
                	"name": "即将过期",
                	"rightText":"更多",
                	"desc":"冷藏"
                }],
                foodData:[{
	    			name:"橘子",
	    			img:"./assets/img/test_pic_orange@2x.png",
	    			detail:"1天后过期",
	    			desc:"冷冻",
	    			color:"#FF9500",
	    			targeturl:"/T0xAC/weex.vue"
	    		},{
	    			name:"鲜肉",
	    			img:"./assets/img/test_pic_vagetable@2x.png",
	    			detail:"5天后过期",
	    			desc:"冷藏",
	    			color:"#5AC8FA",
	    			targeturl:"/T0xAC/weex.vue"
	    		},{
	    			name:"橘子",
	    			img:"./assets/img/test_pic_orange@2x.png",
	    			detail:"1天后过期",
	    			desc:"冷冻",
	    			color:"#FF9500",
	    			targeturl:"/T0xAC/weex.vue"
	    		},{
	    			name:"鲜肉",
	    			img:"./assets/img/test_pic_vagetable@2x.png",
	    			detail:"5天后过期",
	    			desc:"冷藏",
	    			color:"#5AC8FA",
	    			targeturl:"/T0xAC/weex.vue"
	    		},{
	    			name:"橘子",
	    			img:"./assets/img/test_pic_orange@2x.png",
	    			detail:"1天后过期",
	    			desc:"冷冻",
	    			color:"#FF9500",
	    			targeturl:"/T0xAC/weex.vue"
	    		},{
	    			name:"鲜肉",
	    			img:"./assets/img/test_pic_vagetable@2x.png",
	    			detail:"5天后过期",
	    			desc:"冷藏",
	    			color:"#5AC8FA",
	    			targeturl:"/T0xAC/weex.vue"
	    		}],
	    		menus : [{
                        name: '冷藏',
                        rightText:"5c",
                        iconPath: '',
                        subMenu: [{
                            img: './assets/img/smart_ic_off_large@2x.png',
                            value: ''
                        },{
                            img: './assets/img/smart_ic_increase_large@2x.png',
                            value: ''
                        },{
                            img: './assets/img/smart_ic_reduce_large@2x.png',
                            value: ''
                        }]
                    },{
                        name: '变温',
                        rightText:"5c",
                        iconPath: '',
                        subMenu: [{
                            img: './assets/img/smart_ic_off_large@2x.png',
                            value: ''
                        },{
                            img: './assets/img/smart_ic_increase_large@2x.png',
                            value: ''
                        },{
                            img: './assets/img/smart_ic_reduce_large@2x.png',
                            value: ''
                        }]
                    },{
                        name: '冷冻',
                        rightText:"5c",
                        iconPath: '',
                        subMenu: [{
                            img: './assets/img/smart_ic_off_large@2x.png',
                            value: ''
                        },{
                            img: './assets/img/smart_ic_increase_large@2x.png',
                            value: ''
                        },{
                            img: './assets/img/smart_ic_reduce_large@2x.png',
                            value: ''
                        }]
                    },{
                        name: '模式',
                        rightText:"5c",
                        iconPath: '',
                        subMenu: [{
                            img: './assets/img/smart_ic_autoai_on@2x.png',
                            value: '智能'
                        },{
                            img: './assets/img/smart_ic_fastcool_off@2x.png',
                            value: '速冷'
                        },{
                            img: './assets/img/smart_ic_fastcold_off@2x.png',
                            value: '速冻'
                        }]
                    }]
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
            			"params":{}
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
		            let img = "./assets/img/smart_ic_power@2x.png";
		            if(this.power == "on") {
		                img = "./assets/img/smart_ic_power@2x.png";
		            } else {
		                img = "./assets/img/smart_ic_stop@2x.png";
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
	.scroller-item {
		height:120px;
		flex:1
	}
	.scroller-list-item {
		margin-top:32px;
		height:80px;
		width:750px
	}
	.scroller-food-div {
		flex-direction: row;
		flex-wrap: nowrap;
		margin-left: 32px
	}
	.scroller-food {
		flex:1;
		height:300px
	}
	.card {
		width:686;
		height:392px;
		margin-left:32px;
		margin-right:32px;
		margin-top:32px;
		background-color:#E9F1FF;
		border-radius: 2px;
		flex-direction: row;
	}
	.card-control {
		align-items: flex-end;
		margin-top:32px;
		margin-right:32px
	}
	.card-status-detail {
		flex-direction: row;
		justify-content: center;
		margin-bottom:60px;
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
		margin-right:-24px
	}
	.card-icon-img {
		width:282px;
		height:160px
	}
	.smart {
		flex-direction: column;
		justify-content: space-between;
		margin-top:40px;
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
	.main-status {
		font-size: 128px;
	}
	.main-status-second {
		font-size: 28px;
		margin-left:10px;
		margin-top:8px
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
	.cell-desc-text {
	    width: 100px;
	    margin-right: 30px;
	    opacity: 0.4;
		font-family: PingFangSC-Medium;
		font-size: 28px;
		color: #000000;
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
