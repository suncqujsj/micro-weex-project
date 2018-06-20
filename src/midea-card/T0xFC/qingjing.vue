<template>
	<scroller class="content" show-scrollbar="false">
    <div class="box">
    	<div style="background-color: white">
    		<div style="height:100px;align-items: flex-end;justify-content: center;margin-right: 32px">
    			<image style="width:45px;height: 45px" src="./assets/img/smart_ic_deletesmall@2x.png"></image>
    		</div>
        	<midea-smart :showSwitchIcon="true" @change="onMideachange" :hasBottomBorder="false" :checked="mideaChecked2" :data="data"></midea-smart>
   		</div>
	    <div style="margin-top: 24px;background-color: white;">
	    	<div style="margin-left: 34px">
		    	<div style="height: 100px;justify-content: center;"><text>设置 {{selectValue}}</text></div>
	    	</div>
	    </div>
	    <div style="background-color: white;">
		    <div style="">
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
	</div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaSmart from '@/midea-card/T0xAC/components/smart.vue'
	import extendSelection from '@/midea-card/T0xAC/components/extend-selection.vue'
	const modal = weex.requireModule('modal');
	const dom = weex.requireModule('dom');
	var stream = weex.requireModule('stream');
    export default {
        components: {
            mideaSmart,
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
                 	title:"PM2.5高于70时，自动打开净化器。",
                 	detail:"说明文字说明文字说明文字"
                },
	            menus : [{
                        name: 'PM2.5高',
                        rightText: "70",
                        iconPath: '',
                    }],
            }
        },
        methods: {
            onMideachange(event) {
            		//modal.toast({ 'message': event.value, 'duration': 2 });
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
