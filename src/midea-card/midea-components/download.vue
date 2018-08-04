<template>
	<div class="mark">
		<div style="position: relative;">
			<div class="content" v-if="ismark">
					<!--<image v-if="isloading" class="loadingImg" src="./img/loading.gif"></image>-->	
			    	<text class="wrapper" v-if="isloading">{{loadingText}}%</text>
					<div v-if="!isloading">
						<text class="text_download">功能组件更新(约{{bytesToSize(bytes)}})</text>
				        <text class="text_wifi" v-if="!iswifi">您正在使用非WiFi网络</text>
				        <div class="btn_download">
					        <div class="btn_giveup" @click="giveup()"><text class="giveup_text">忽略</text></div>
					        <midea-button :btnStyle="{width: '200px',height: '80px',borderRadius: '7px'}" text="更新" type="green" @mideaButtonClicked="downloading()"></midea-button>
					    </div>
					</div>
		     </div>
	     </div>
     </div>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
	import mideaButton from '@/midea-component/button.vue';
	
//	import Mock from './settings/mock'
    export default {
    	props: {
    		deviceId: {
    			type: String,
	     	    default: ''
    		},
    		deviceTpye: {
    			type: String,
	     	    default: ''
    		}
	    },
        components: {
            mideaButton
        },
        data() {
            return {
            	ismark: false,
            	bytes: 0,
            	loadingText: '0',
            	isloading: false,
            	iswifi: true,
				nodeviceInfo: [],
				deviceId: "",
				deviceInfo: {
					'deviceId': '',
					'version': ''
				}
            }
        },
        methods: {
        	bytesToSize(bytes) {  
        		let byteS = bytes * 1024;
			　　	if (byteS === 0) return '0 B';
			　　	var k = 1024;
			　　	let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
			　　	let i = Math.floor(Math.log(byteS) / Math.log(k))　　
			　　	return (byteS / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
			},
        	giveup() {
//      		nativeService.alert("确定忽略此版本？",() => {
        			this.ismark = false;
	     		    if(this.nodeviceInfo.length > 0){
	     		    	for(let i = 0; i < this.nodeviceInfo.length;i++){
							if(this.nodeviceInfo[i].deviceId === this.deviceInfo.deviceId){
								this.nodeviceInfo[i] = this.deviceInfo;
							}else{
								this.nodeviceInfo.push(this.deviceInfo);
							}
						}
	     		    }else{
	     		    	this.nodeviceInfo.push(this.deviceInfo);
	     		    }
					nativeService.setItem("downDeviceData",this.nodeviceInfo,(data) => {
						nativeService.toast("忽略成功");
					});
//      		})
     		    
        	},
        	downloading() {
        		this.isloading = true;
        		this.downLoadDevicePlugin();
        	},
            getDevicePluginInfo(){
            	nativeService.getDevicePluginInfo({'deviceId':this.deviceId}).then((resp) => {
            		nativeService.hideLoading();
            		let res = JSON.parse(resp);
						let that = this;
						let isshow = [];
						that.bytes = res.packageSize;
						that.deviceInfo.version = res.version;
						if(res.needUpdate){
							if(that.nodeviceInfo.length > 0){
								for(let i = 0; i < that.nodeviceInfo.length;i++){
									if(that.nodeviceInfo[i].deviceId === that.deviceInfo.deviceId){
										if(that.nodeviceInfo[i].version === res.version){
											that.ismark = false;
										}else{
											
											that.ismark = true;
										}
									}else{
										isshow.push(i);
									}
								}
							}else{
								that.ismark = true;
								
							}
						}else{
							that.ismark = false;
						}
						
						if(that.nodeviceInfo.length > 0){
							if(isshow.length === that.nodeviceInfo.length){
								that.ismark = true;
							}
						}
            	}).catch((error) => {
            		nativeService.hideLoading();
		            this.ismark = false;
            	})
            },
            getNetworkStatus(){
            	nativeService.getNetworkStatus().then(
	                (resp) => {
//						let res = JSON.parse(resp);
						if(resp.status === "1" || resp.status === 1){
							if(resp.type === "1" || resp.type === 1){
		                    	this.iswifi = true;
		                    }else{
		                    	this.iswifi = false;
		                    }
		                    this.getDevicePluginInfo();
						}else{
							nativeService.toast('当前网络不可用')
						}
	                }
	            ).catch((error) => {
	            	nativeService.hideLoading();
	            	nativeService.toast(error)
	            	this.iswifi = false;
	            })
            },
            download(){
				nativeService.downLoadDevicePlugin({'deviceId':this.deviceId},(resp) => {
					let res = JSON.parse(resp);
				    // let status = parseInt(res.status);
				    switch (res.status){
				        case 3:
				            nativeService.toast('下载失败');
				            his.isloading = false;
				            break;
				        case 6:
				            nativeService.toast('解压失败');
				            break;
				        case 7:
				            nativeService.toast('下载成功');
				            this.isloading = false;
							nativeService.reload((value) => {
//								nativeService.toast(value);
							},(err) => {
//								nativeService.toast(err);
							});
				            break;
				    }
					this.loadingText = res.progress;
				},(error) => {
					 nativeService.toast(error)
				})
            },
            downLoadDevicePlugin(){
//          	this.download();
            	nativeService.getNetworkStatus().then(
	                (resp) => {
						if(resp.status === "1" || resp.status === 1){
							if(resp.type != "1" && resp.type != 1){
		                    	if(this.iswifi){
		                    		this.iswifi = false;
		                    		nativeService.alert('您已切换到非WiFi模式，确定继续下载？',(val) => {
		                    			this.download();
		                    		})
		                    	}
		                    }else{
		                    	this.download();
		                    }
						}else{
							nativeService.toast('当前网络不可用')
						}
	                }
	            ).catch((error) => {
					nativeService.toast(error)
	            	this.iswifi = false;
	            })
            },
			getDeviceInfor(){
				nativeService.showLoading();
				nativeService.getDeviceInfo().then(
					(resp) => {
						let result;
						if(resp.result){
							result = resp.result;
						}else{
							result = resp;
						}
						this.deviceId = result.deviceId;
						this.deviceInfo.deviceId = result.deviceType;
//						this.getDevicePluginInfo();
						this.getNetworkStatus();
				}).catch((error) => {
					nativeService.hideLoading();
					nativeService.toast(error)
				})
			}
        },
        computed: {
				
        },
        mounted() {
        	
        },
        created(){
//      	nativeService.removeItem("downDeviceData");
			nativeService.getItem("downDeviceData",(resp) => {
				if(resp.result == 'success'){
					let res = JSON.parse(resp.data);
					for(let i = 0;i < res.length;i++){
						if(res[i].deviceId != ''){
							this.nodeviceInfo.push(res[i])
						}
					}
				}
				this.getDeviceInfor();
			})
			
        }
    }
</script>

<style>
	.mark{
		position: absolute;
        top: 0px;
		left: 0px;
	}
	.text_download{
		color: #FFFFFF;
		margin-top: 120px;
		font-size: 28PX;
		text-align: center;
	}
	.text_wifi{
		text-align: center;
		color: #FFFFFF;
		font-size: 28PX;
	}
	.content {
		position: absolute;
		left: 32px;
		width:694px;
		height:392px;
     	background-color: #000;
     	opacity: 0.85;
     	align-items: center;
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
    	font-size: 32px;
		color: #FFFFFF;
		line-height: 76px;
		text-align: center;
	}
	.btn_download{
		/*width: 430px;*/
		margin-top: 20px;
		justify-content:space-between;
		flex-direction: row;
	}
	.loadingImg{
		width: 50px;
		height: 50px;
		margin-top: 160px;
	}
	.wrapper{
		color: #FFFFFF;
		margin-top: 160px;
		/*margin-top: 15px;*/
		font-size: 28px;
	}
</style>
