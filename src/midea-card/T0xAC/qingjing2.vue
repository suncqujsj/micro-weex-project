<template>
	<scroller class="content" show-scrollbar="false">
    <div class="box">
    	<div style="background-color: white">
    		<div style="height:100px;align-items: flex-end;justify-content: center;margin-right: 32px">
    			<image style="width:45px;height: 45px" src="./assets/img/smart_ic_deletesmall@2x.png"></image>
    		</div>
        	<midea-smart :showSwitchIcon="true" @change="onMideachange2" :hasBottomBorder="false" :checked="mideaChecked2" :data="data"></midea-smart>
   		</div>
	    <div style="margin-top: 24px;background-color: white;">
	    	<div style="margin-left: 34px">
		    	<div style="height: 100px;justify-content: center;"><text>设置 {{selectValue}}</text></div>
	    	</div>
	    </div>
	    <div style="background-color: white;">
		    <div style="background-color:#F6F6F6;margin-top: 10px;opacity: 0.5">
		    	<extend-selection :menus="menus" @makeSwitch="mySwitch">
		    		<div slot="selected" class="cell-highline"></div>
		    		<scroller slot="detail" :offset-accuracy="43" @scroll="myScroll" style="width:750px;height:430px">
		    			<div v-for="n in 35">
		    				<text style="text-align: center;height:43px" v-if="n>12 && n<17" :ref="'item'+n"></text>
		    				<text style="text-align: center;height:43px" v-if="n>=17 && n<=30" :ref="'item'+n">{{n}}</text>
		    				<text style="text-align: center;height:43px" v-if="n>=30 && n<35" :ref="'item'+n"></text>
		    			</div>
		    		</scroller>
		    	</extend-selection>
		    </div>
		</div>
		<div style="background-color: white;">
		    <div style="background-color:#F6F6F6;margin-top: 10px;opacity: 0.5">
		    	<extend-selection :menus="menus2" @makeSwitch="mySwitch">
		    		<div slot="selected" class="cell-highline"></div>
		    		<scroller slot="detail" :offset-accuracy="43" @scroll="myScroll" style="width:750px;height:430px">
		    			<div v-for="n in 35">
		    				<text style="text-align: center;height:43px" v-if="n>12 && n<17" :ref="'item'+n"></text>
		    				<text style="text-align: center;height:43px" v-if="n>=17 && n<=30" :ref="'item'+n">{{n}}</text>
		    				<text style="text-align: center;height:43px" v-if="n>=30 && n<35" :ref="'item'+n"></text>
		    			</div>
		    		</scroller>
		    	</extend-selection>
		    </div>
		</div>
		<div style="background-color: white;">
		    <div style="background-color:#F6F6F6;margin-top: 10px;opacity: 0.5">
		    	<extend-selection :menus="menus3" @makeSwitch="mySwitch">
				    <div slot="detail">
			    		<div style="">
				    		<midea-radio-list :list="list" :cellStyle="cellStyle" :needShowTopBorder="true" @mideaRadioItemChecked="itemChecked"></midea-radio-list>
				    	</div>
			    	</div>
		    	</extend-selection>
		    </div>
		</div>
		<div style="background-color: white">
			<midea-smart :showSwitchIcon="true" @change="onMideachange2" :hasBottomBorder="false" :checked="mideaChecked2" :data="data2"></midea-smart>
			<midea-smart :showSwitchIcon="true" @change="onMideachange2" :hasBottomBorder="false" :checked="mideaChecked2" :data="data3"></midea-smart>
		</div>
	</div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSmart from '@/midea-card/T0xAC/components/smart.vue'
	import mideaRadioList from '@/midea-card/T0xAC/components/radioList.vue'
	import extendSelection from '@/midea-card/T0xAC/components/extend-selection.vue'
	const modal = weex.requireModule('modal');
	const dom = weex.requireModule('dom');
	var stream = weex.requireModule('stream');
    export default {
        components: {
            mideaSmart,
            mideaRadioList,
            extendSelection
        },
        data() {
            return {
                mideaChecked: true,
                mideaChecked2: false,
                checkedInfo: { title: '选项2', value: 2 },
                checkedInfo2: { title: '选项2', value: 2 },
                selectValue: "",
                cellStyle: {
                	backgroundColor: "#F6F6F6",
                	opacity: 0.5,
                },
                data:{
                 	title:"宝宝最适合。",
                 	detail:"温度28C，风速最小."
                },
                data2:{
                 	title:"上下摆风",
                 	detail:""
                },
                data3:{
                 	title:"左右摆风",
                 	detail:""
                },
                list: [
	                { title: '高', value: 1 },
	                { title: '中', value: 2 },
	                { title: '低', value: 3, checked: true },
	            ],
	            list2: [
	                { title: '制冷', value: 1, checked: true  },
	                { title: '制热', value: 2},
	            ],
	            menus : [{
                        name: '模式',
                        rightText: "制冷",
                        iconPath: '',
                    }],
                menus2 : [{
                        name: '温度',
                        rightText: "28",
                        iconPath: '',
                    }],
                menus3 : [{
                        name: '风速',
                        rightText: "中",
                        iconPath: '',
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
		    itemChecked(e) {
	            this.checkedInfo = e;
	       	},
	       	itemChecked2(e) {
	            this.checkedInfo2 = e;
	        },
	        mySwitch(event) {
	        	let el = this.$refs.item25[0];
	        	dom.scrollToElement(el,{})
	        	//modal.toast({ 'message': "hello world", 'duration': 2 });
	        }
        },
        computed: {
        },
        mounted() {
        }
    }
</script>

<style>
	.content {
		flex:1;
		width:750px;
		scroll-direction: vertical;
	}
	.box {
		margin-bottom:290px;
		background-color: #F2F2F2;
	}
	.cell-highline {
		border-top-width: 2px;
		border-top-color: #CDCDCD;
		border-bottom-width: 2px;
		border-bottom-color: #CDCDCD;
		height: 43px;
		width:750px;
		bottom:215px;
		position:absolute;
	}
</style>
