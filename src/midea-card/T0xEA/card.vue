<template>
	<scroller class="content">
    <div class="box">
        <div>
	    	 <div class="card" v-if="onlineStatus == '1'">
	        	<div class="card-left">
        			<div class="main-status-div">
        				<text class="main-status main-status-simple">{{display_value2}}</text>
        				<text class="danwei">{{danwei}}</text>
	        		</div>
        			<text class="main-status-second" style="text-align: center;"></text>
	        		<div class="card-status-detail">
	        			<text class="main-status-third">{{display_value}}</text>
	        		</div>
	        	</div>
	        	<div class="card-right">
	        		<div class="card-control">
	        			<image class="card-control-img" :src="controlStartPauseImg" @click="controlStartPause"></image>
	        		</div>
	        		<div class="card-icon" @click="showControlPanelPage">
	        			<image class="card-icon-img" resize="contain" src="./assets/img/smart_img_equip043@2x.png"></image>
	        		</div>
	        	</div>
	        </div>
	        <div class="card-power-off" v-else>
	        	<div class="control-div-offline">
	        		<image class="card-control-img" :src="powerIcon_offline" @click="reload"></image>
	        		<text class="text-offline">重连</text>
	        	</div>
	        	<div>
	        		<image class="icon-offline" src="./assets/img/smart_img_equip043@2x.png"></image>
	        	</div>
	        	<text class="text-offline-center">已离线</text>
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
	import Mock from './settings/mock'
	const modal = weex.requireModule('modal');
	const dom = weex.requireModule('dom');
	var stream = weex.requireModule('stream');
	const globalEvent = weex.requireModule('globalEvent');
	const bridgeModule = weex.requireModule('bridgeModule');
    export default {
        components: {
            mideaSwitch,
            mideaSmart,
            mideaItem,
            cookbook
        },
        data() {
            return {
            	deviceId:"",
            	deviceName: "",
            	deviceType: "",
            	deviceSubType: "",
            	deviceSn: "",
            	onlineStatus:"",
            	
            	pushKey: "receiveMessage",
            	pushKeyOnline: "receiveMessageFromApp",
                mideaChecked: true,
                mideaChecked2: false,
                
                powerIcon_offline: "./assets/img/smart_ic_reline@2x.png",
	            mode:"keep_warm",	//当前设备模式
	            work_status:"cooking",	//当前设备状态
	            display_value: "",//localStorage.getItem("EAdisplay_value") || "",
	            display_value2: "",//localStorage.getItem("EAdisplay_value2") || "",
	            danwei: "",//localStorage.getItem("EAdanwei") || "",
                return_work_status	:{
	            	cooking:"工作中",
	            	schedule:"预约中",
	            	keep_warm:"保温中",
	            	cancel:"待机中"
	            },
	            return_mode:{
	            	cook_rice:"香甜煮",
					fast_cook_rice:"超快煮",
					standard_cook_rice:"标准煮",
					gruel:"稀饭",
					cook_congee:"煮粥",  
					stew_soup:"煲汤",
					stewing:"蒸煮",
					heat_rice:"热饭",
					make_cake:"蛋糕",
					yoghourt:"酸奶",
					soup_rice:"煲仔饭",
					coarse_rice:"杂粮饭",
					five_ceeals_rice:"五谷饭",
					eight_treasures_rice:"八宝饭",
					crispy_rice:"锅巴饭",
					shelled_rice:"玄米",
					eight_treasures_congee:"八宝粥",
					infant_congee:"婴儿粥",
					older_rice:"长者饭",
					rice_soup:"米汤",
					rice_paste:"米糊",
					egg_custard:"蛋羹",
					warm_milk:"温奶",
					hot_spring_egg:"温泉蛋",
					millet_congee:"小米粥",
					firewood_rice:"柴火饭",
					few_rice:"少量饭",
					red_potato:"红薯",
					corn:"玉米",
					quick_freeze_bun:"速冻包",
					steam_ribs:"蒸排骨",
					steam_egg:"蒸鸡蛋",
					coarse_congee:"杂粮粥",
					steep_rice:"泡饭",
					appetizing_congee:"开胃粥",
					corn_congee:"玉米粥",
					sprout_rice:"发芽米",
					luscious_rice:"香甜饭",
					luscious_boiled:"香甜煮",
					fast_rice:"快速饭",
					fast_boil:"快速煮",
					bean_rice_congee:"豆米粥",
					fast_congee:"快速粥",
					baby_congee:"宝宝粥",
					cook_soup:"煲汤",
					congee_coup:"粥/汤",
					steam_corn:"蒸玉米",
					steam_red_potato:"蒸红薯",
					boil_congee:"煮粥",
					delicious_steam:"美味蒸",
					boil_egg:"煮鸡蛋",
					keep_warm:"保温",
					diy:"DIY",
					10000:"香甜煮",
					10001:"快速煮",
					10002:"标准煮",
					10003:"稀饭",
					10004:"煮粥",
					10005:"煲汤（排骨冬瓜汤）",
					10006:"蒸煮（蒸雪梨）",
					10007:"热饭",
					10008:"蛋糕",
					10009:"酸奶",
					10010:"煲仔饭",
					10011:"杂粮饭",
					10012:"五谷饭",
					10013:"原味八宝饭",
					10014:"锅巴",
					10015:"玄米",
					10016:"黑八宝粥",
					10017:"婴儿粥",
					10018:"长者饭",
					10019:"米汤",
					10020:"米糊",
					10021:"蛋羹",
					10022:"温奶",
					10023:"温泉蛋",
					10024:"小米粥",
					10025:"米酒",
					10026:"清蒸玉米",
					10027:"红豆沙粥",
					10028:"冬瓜瘦肉粥",
					10029:"鲜虾冬瓜粥",
					10030:"白萝卜陈皮煲猪骨",
					10031:"淮山苦瓜排骨汤",
					10032:"牛肉粥",
					10033:"蒸红薯",
					10034:"土豆排骨焖饭",
					10035:"玉米海带大骨汤",
					10036:"柴火饭",
					10037:"少量煮",
					10038:"速冻包",
					10039:"蒸排骨",
					10040:"菜饭",
					10041:"菜粥",
					10042:"当归淮山猪蹄汤",
					10043:"番茄鸡蛋汤",
					10044:"粉丝蒸虾",
					10045:"粉蒸叉烧排骨",
					10046:"鸡脚花生汤",
					10047:"山药排骨汤",
					10048:"辣蒸鲫鱼",
					10049:"皮蛋瘦肉粥",
					10050:"蒜蓉粉丝蒸扇贝",
					10051:"猪肝粥",
					10052:"冬瓜排骨红枣汤",
					10053:"西洋菜排骨汤",
					10054:"霸王花猪肺汤",
					10055:"川贝蜜枣排骨汤",
					10056:"雪耳雪梨炖肉",
					10057:"无花果瘦肉汤",
					10058:"花旗参水鸭汤",
					10059:"莲藕大骨汤",
					10061:"冬瓜绿豆老鸭汤",
					10060:"鱼头豆腐汤",
					10062:"茶树菇煲鸭汤",
					10063:"绿豆银耳汤",
					10064:"腊八粥",
					10065:"猪肝泥粥",
					10066:"鱼肉粟米粥",
					10067:"宝宝益智核桃仁粥",
					10068:"碎果仁麦片粥",
					10069:"百合薏仁粥",
					10070:"胡萝卜墨鱼粥",
					10071:"鸭肉薏米冬瓜汤",
					10072:"龙骨花胶汤",
					10073:"羊骨山药汤",
					10074:"栗子瘦肉排骨汤",
					10075:"莲子乌鸡汤",
					10076:"黄芪鸡汤",
					10077:"百合玉竹鸡汤",
					10078:"老姜炖牛展",
					10079:"荷叶瘦肉汤",
					10080:"当归羊肉汤",
					10081:"清补凉瘦肉汤",
					10082:"发芽米",
					10083:"玉米粥",
					10084:"煮鸡蛋",
					10085:"杂粮粥",
					10087:"蛋黄米糊",
					10095:"紫薯泥",
					10101:"豆腐鱼肉粥",
					10103:"水果麦片粥",
					10104:"番茄小米粥",
					10105:"小米山药粥",
					10106:"枣泥软饭",
					10107:"红薯软饭",
					10108:"豆腐烩饭",
					10109:"鲑鱼炖饭",
					10110:"三色什锦饭",
					10111:"南瓜鸡肉饭",
					10112:"清蒸鳕鱼",
					10113:"虾仁蒸蛋",
					10114:"蒸肉丸",
					10115:"蒸鱼饼",
					11001:"蒸煮（蒸雪梨）",
					11002:"热饭",
					11003:"蛋糕",
					11004:"酸奶",
					11005:"煲仔饭",
					11006:"锅巴饭",
					11007:"长者饭",
					11008:"红豆沙粥",
					11009:"冬瓜瘦肉粥",
					11010:"鲜虾冬瓜粥",
					11011:"白萝卜陈皮煲猪骨",
					11012:"煲汤（排骨冬瓜汤）",
					11013:"杂粮饭",
					11014:"小米粥",
					11015:"清蒸玉米",
					11016:"淮山苦瓜排骨汤",
					11017:"牛肉粥",
					11018:"蒸红薯",
					11019:"玉米海带大骨汤",
					11020:"速冻包",
					11021:"蒸排骨",
					11022:"当归淮山猪蹄汤",
					11023:"番茄鸡蛋汤",
					11024:"粉丝蒸虾",
					11025:"粉蒸叉烧排骨",
					11026:"鸡脚花生汤",
					11027:"山药排骨汤",
					11028:"辣蒸鲫鱼",
					11029:"皮蛋瘦肉粥",
					11031:"猪肝粥",
					11032:"冬瓜排骨红枣汤",
					11034:"霸王花猪肺汤",
					11035:"川贝蜜枣排骨汤",
					11036:"雪耳雪梨炖肉",
					11037:"无花果瘦肉汤",
					11038:"花旗参水鸭汤",
					11039:"莲藕大骨汤",
					11040:"鱼头豆腐汤",
					11041:"冬瓜绿豆老鸭汤",
					19900:"精华饭",
					61:"精华饭",
					62:"香浓粥",
					63:"一锅两煮",
					64:"原味蒸"
	            },
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
            mideaClick(event) {
            	//modal.toast({ 'message': event.value, 'duration': 2 });
            },
            queryStatus () {
            	let self = this;
            	let params = {
            			"operation":"luaQuery",
            			"name":"deviceinfo",
            			"data":{}
            		};
            	nativeService.sendLuaRequest(params,true).then(function(data) {
            		self.updateUI(data);
            	},function(error) {
            		console.log("error");
            	});
            },
            updateUI(data) {
            	if(data.errorCode == 0) {
	                let params = data.params || data.result;
	                this.mode = params.mode;
					this.work_status = params.work_status;
	            	if(params.work_status == "cooking") {//工作中
	            		this.display_value = (this.return_mode[this.mode]?this.return_mode[this.mode]:"") || "--";
		            	this.display_value2 = "烹饪中";
		            	if(this.mode == "keep_warm") {
		            		this.display_value = "";
		            		this.display_value2 = "保温中";
		            	}
		            	this.danwei = "";
	            	} else if(params.work_status == "schedule") {//预约中
	            		this.display_value = (this.return_mode[this.mode]?this.return_mode[this.mode]:"") || "--";
	            		this.display_value2 = "预约中"
	            		this.danwei = "";
	            	} else if(params.work_status == "keep_warm") {//保温中
	            		this.display_value = "";
	            		this.display_value2 = "保温中"
	            		this.danwei = "";
	            	} else {
	            		this.display_value = "已联网";
	            		this.display_value2 = "空闲中";
	            		this.danwei = "";
	            	}
	            }else {
	                modal.toast({ 'message': "连接设备超时", 'duration': 2 });
	            }
            },
            updateDeviceInfo(data) {
            	this.deviceId = data.deviceId;
            	this.deviceName = data.deviceName;
            	this.deviceType = data.deviceType;
            	this.deviceSubType = data.deviceSubType;
            	this.deviceSn = data.deviceSn;
            	this.onlineStatus = data.isOnline;
            },
            controlStartPause() {
            	let self = this;
            	if(this.work_status == "cooking" || this.work_status == "keep_warm") {
            		//pause logic
            		let params = {
	                	"operation":"luaControl",
	        			"name":"pause",
	        			"data":{
	        				"work_status": "cancel",
		                	"name": "pause"
	        			}
	                }
            		nativeService.sendLuaRequest(params,true).then(function(data) {
	            		self.updateUI(data);
	            	},function(error) {
	            		console.log("error");
	            	});
            	} else {
            		//start logic
            		let params = {
	                	"operation":"luaControl",
	        			"name":"start",
	        			"data":{
	        				"work_status": "cooking",
		                	"name": "start"
	        			}
	                }
            		nativeService.sendLuaRequest(params,true).then(function(data) {
	            		self.updateUI(data);
	            	},function(error) {
	            		console.log("error");
	            	});
            	}
            },
            handleNotification() {
            	console.log("handleNotification Yoram");
            	let me = this;
            	globalEvent.addEventListener(this.pushKey, (data) => {
            		me.queryStatus();
		        });
		        globalEvent.addEventListener(this.pushKeyOnline, (data) => {
            		if(data && data.messageType == "deviceOnlineStatus") {
            			if(data.messageBody && data.messageBody.onlineStatus == "online") {
            				me.onlineStatus = "1";
            			} else if(data.messageBody && data.messageBody.onlineStatus == "offline") {
            				me.onlineStatus = "0";
            			} else {
            				me.onlineStatus = "0";
            			}
            		}
		        });
            },
            showControlPanelPage() {
            	let params = {
            		controlPanelName:"controlPanel.html"
            	};
            	bridgeModule.showControlPanelPage(params);
            },
            reload() {
            	let params = {};
            	bridgeModule.reload(params,function(result) {
            		//successful
            	},function(error) {
            		//fail
            	});
            },
        },
        computed: {
			controlStartPauseImg () {
	            let img = "./assets/img/smart_ic_play@2x.png";
	            if(this.work_status == "cooking" || this.work_status == "keep_warm") {
	                img = "./assets/img/smart_ic_pause@2x.png";
	            } else {
	                img = "./assets/img/smart_ic_play@2x.png";
	            }
	            return img;
	        },
        },
        mounted() {
            let self = this;
            nativeService.getDeviceInfo().then(function(data) {
            	self.updateDeviceInfo(data.result);
            	self.handleNotification();
            	if(data.result.isOnline == 1) {
            		self.queryStatus();
            	}
            },function(error) {
            	modal.toast({ 'message': "连接设备超时", 'duration': 2 });
            })
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
		width:60px;
		height:60px
	}
	.icon-offline {
		width: 314px;
		height: 314px;
	}
	.card-icon {
		align-items: flex-end;
		margin-top:-60px;
	}
	.card-icon-img {
		width:314px;
		height:314px
	}
	.card-power-off {
		width:694px;
		height:392px;
		margin-left:28px;
		margin-right:28px;
		margin-top:28px;
		background-color: #D8D8DE;
		flex-direction: row;
		border-radius: 6px;
		justify-content: center;
		align-items: flex-end;
	}
	.text-offline {
		font-family: PingFangSC-Regular;
		font-size: 28px;
		color: #5D75F6;
		letter-spacing: 0;
		text-align: center;
	}
	.text-offline-center {
		position: absolute;
		right:300px;
		top:170px;
		align-items: center;
	}
	.control-div-offline {
		position: absolute;
		right:32px;
		top:32px;
		align-items: center;
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
	.main-status-simple {
		font-size: 75px;
		margin-top: 74px;
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
