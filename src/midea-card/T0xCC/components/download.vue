<template>
     <div class="mark" v-if="ismark">
		<text class="wrapper" v-if="isloading">{{loadingText}}</text>
		<div v-if="!isloading">
			<text class="text_download">功能组件更新(约4M)</text>
    		<text class="text_wifi" v-if="!iswifi">您正在使用非WiFi网络</text>
    		<div class="btn_download">
    			<div class="btn_giveup" @click="giveup()"><text class="giveup_text">忽略</text></div>
    			<midea-button :btnStyle="{width: '200px',height: '80px',borderRadius: '7px'}" text="下载" type="green" @mideaButtonClicked="downloading()"></midea-button>
    		</div>
		</div>
	</div>
</template>

<script>
	import mideaButton from '@/midea-component/button.vue';
	import nativeService from '@/common/services/nativeService.js'
	const modal = weex.requireModule('modal');
    export default {
    	props: {
    	},
        components: {
            mideaButton
        },
        data() {
            return {
                loadingText: '下载中...',
                loadinging: true,
            	isloading: false,
            	ismark: true,
            	isupdata: true,
            	iswifi: false,
            }
        },
        methods: {
            mideaClose(){
        		this.showDialog = false;
        		let that = this;
        		let testEl = that.$refs.test;
        		let i = 50;
        		timer();
        		testEl.style.top = '50px';
        		function timer() {
        			setTimeout(() => {
        				i = i + 50;
        				testEl.style.top = i + 'px';
//      				nativeService.toast(i);
        				if (i < 500) {
        					timer();
        				}
        			},200)
        		}
        	},
        	giveup() {
        		this.ismark = false;
        	},
        	downloading() {
        		this.isloading = true;
//      		nativeService.showLoading();
        		this.downLoadDevicePlugin();
        	},
        	getDevicePluginInfo(){
            	nativeService.getDevicePluginInfo(this.deviceId).then(
	                (res) => {
						if(parseInt(res.needUpdate) == 1){
							this.ismark = true;
						}else{
							this.ismark = false;
						}
	                }
	            ).catch((error) => {
	            	this.ismark = false;
	            })
            },
            getNetworkStatus(){
            	nativeService.getNetworkStatus().then(
	                (resp) => {
//	                    this.result = resp;
	                    if(parseInt(resp.type) == 1){
	                    	this.iswifi = true;
	                    }else{
	                    	this.iswifi = false;
	                    }
	                    this.getDevicePluginInfo();
	                }
	            ).catch((error) => {
	            	this.iswifi = false;
	            })
            },
            downLoadDevicePlugin(){
            	nativeService.downLoadDevicePlugin(this.deviceId,(resp) => {
            		let res = resp;
            		let status = parseInt(res.status);
            		switch (status){
            			case 0:
            			    this.loadingText = '等待下载'
            				break;
            			case 1:
            			    this.loadingText = '下载中...'
            				break;
            			case 2:
            			    this.loadingText = '暂停'
            				break;
            			case 3:
            			    this.loadingText = '下载失败'
            				break;
            			case 4:
            			    this.loadingText = '下载成功'
            				break;
            			case 5:
            			    this.loadingText = '解压中...'
            				break;
            			case 6:
            			    this.loadingText = '解压失败'
            				break;
            			case 7:
            			    this.loadingText = '解压成功'
            				break;
            		}
            		let progress = parseInt(res.progress);
            		if (progress == 100) {
            			nativeService.toast('下载成功');
            			this.ismark = false;
            			this.isloading = false;
            		}
	            },(error) => {
	                nativeService.toast(error)
	            })
            }
        },
        mounted() {
			console.log("yoram yoram");
        }
    }
</script>


<style>
	.mark{
		position: absolute;
        top: 28px;
		left: 28px;
		width:694px;
		height:392px;
     	background-color: #000;
     	opacity: 0.8;
     	align-items: center;
	}
	.wrapper {
		margin-top: 160px;
		width: 694px;
		color: #FFFFFF;
		text-align: center;
	}
	.text_download{
		color: #FFFFFF;
		margin-top: 120px;
		font-size: 28PX;
		text-align: center;
	}
	.indicator {
	    margin-top: 16px;
	    height: 40px;
	    width: 40px;
	    color: #FFFFFF;
	  }
	.text_wifi{
		text-align: center;
		color: #FFFFFF;
		font-size: 28PX;
	}
	.btn_giveup{
		width: 200px;
		height: 80px;
		margin-top: 20px;
		margin-right: 30px;
		margin-bottom: 20px;
		border-radius: 7px;
		border-style:solid;
		border-width: 1px;
		border-color: #CCCCCC;
	}
	.giveup_text{
		color: #FFFFFF;
		line-height: 76px;
		text-align: center;
	}
	.btn_download{
		margin-top: 20px;
		justify-content:space-between;
		flex-direction: row;
	}
</style>
