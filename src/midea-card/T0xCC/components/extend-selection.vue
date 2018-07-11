//手风琴菜单
<template>
    <scroller class="scroller" :style="style.scroller">
        <div v-for="(menu, mIndex) in menus" :class="['menu', mIndex == 0 ? 'menu-first': '']">
            <div class="menu-bar"  @click="makeSwitch"  :data-menu-name="menu.name">
                <!-- <image class="icon"></image> -->
                <text class="menu-name">{{menu.name}}</text>
                <div class="switch-wrap">
                	<text class="right-text">{{menu.rightText}}</text>
                    <image v-if="activeMenu==menu.name" class="switch" :src="switchOpen"></image>
                    <image v-else class="switch" :src="switchClose"></image>
                </div>
            </div>
            <div class="sub-menu" v-if="activeMenu == menu.name">
                <div class="extend-content">
	                <div class="extend-div">
	                	<slot name="selected"></slot>
	                	<slot name="detail">
		                	<div v-for="item in menu.subMenu" style="flex-direction: column;align-content: center;">
		                		<image  style="width:112px;height:112px" :src="item.img"></image>
		                		<text v-if="item.value" class="extend-text">{{item.value}}</text>
		                	</div>
	                	</slot>
	                </div>
                </div>
            </div>
        </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
    import mideaGridSelect from '@/component/optionList.vue'

    export default {
        props: {
            menus:{
                type: Array,
                default: function(){
                    let menus = [{
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
                        rightText:"0c",
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
                        rightText:"-9c",
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
                        rightText:"智能",
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
                    return menus
                }
            },
        },
        components: {
            mideaGridSelect
        },
        computed: {
            style(){
                return {
                    scroller: {
                        height: this.activeMenu?"600px" : "100px"//this.menus.length * 120 + 'px'
                    }
                }
            }
        },
        data() {
            return {
                activeMenu: '',
                switchOpen: './assets/img/smart_ic_detail@2x.png',
                switchClose: './assets/img/smart_ic_detail@2x.png',
                gridStyle: {
                    width: '222px'
                },
                headerHeight: '',
                listsHeight: '',
            }
        },
        methods: {
            makeSwitch(e){
                console.log(e)
                let theName = e.target.attr.dataMenuName
                this.activeMenu = (this.activeMenu == theName) ? '':theName
                this.$emit('makeSwitch', { e });
            },
            itemSelected(e){
            }
        },
        created() {
           
        }
    }
</script>

<style>
    .title {
        margin-top: 20px;
        margin-bottom: 30px;
        padding-left: 25px;
    }
    .menu {
        border-bottom-style: solid;
        border-width: 1px;
        border-color: #cccccc;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .menu-bar{
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
    .menu-first {
        border-top-style: solid;
    }
    .menu-name{
        width: 600px;
        font-family: PingFangSC-Regular;
		font-size: 32px;
		color: #686975;
		letter-spacing: -1.23px;
    }
    .switch-wrap{
        justify-content: right;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
        flex-direction: row;
        align-items: center;
    }
    .right-text {
    	font-family: PingFangSC-Regular;
		font-size: 28px;
		color: #666666;
		letter-spacing: -1.08px;
    }
    .switch {
        width: 30px;
        height: 30px;
    }

    .sub-menu {
        margin-top: -20px;
    }
    .grid-floor{
        justify-content: left;
        padding-top: 30px;
    }
    .extend-content {
    	width:750px;
    	background-color: #F1F1F1;
    	margin-left:-32px;
    	margin-top:30px;
    	margin-bottom: -20px;
    	opacity: 0.54;
    }
    .extend-div {
		flex-direction: row;
		justify-content:space-around;
		margin-top:30px;
		margin-bottom:30px;
		margin-left:20px;
		margin-right:20px;
    }
    .extend-text {
    	text-align: center;
    	margin-top:-10px;
    	font-family: PingFangSC-Regular;
		font-size: 20px;
		color: #666666;
		letter-spacing: -0.77px;
    }
</style>