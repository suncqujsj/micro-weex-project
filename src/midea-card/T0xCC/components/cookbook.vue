<template>
     <div class="box" @click="mideaClick">
    	<image :src="data.img_url" class="img"></image>
    	<div class="cookbook-title-div">
    		<div class="cookbook-pretitle-div">
    			<image v-if="data.title_preimg" class="title-img" :src="data.title_preimg"></image>
    			<text class="cookbook-title">{{data.title}}</text>
    		</div>
    		<image v-if="data.title_tailimg" class="title-img" :src="data.title_tailimg"></image>
    	</div>
    	<div  style="margin-top:20px"><text class="cookbook-detail">{{data.detail_first}}</text></div>
    	<div><text class="cookbook-detail">{{data.detail_second}}</text></div>
    </div>
</template>

<script>
	const modal = weex.requireModule('modal');
    export default {
    	props: {
    		data:{
	    		type:Object,
	    		default:() => ({
	    			title:"蓬松煎饼1",
	    			title_preimg:"./assets/img/smart_ic_a@2x.png",
	    			title_tailimg:"./assets/img/smart_ic_like@2x.png",
	    			detail_first:"炖锅炖锅炖1 ",
	    			detail_second:"20分 | 简单 | 240千卡1",
	    			img_url:"./assets/img/test_pic_banner04@2x.png",
	    			targeturl:"/T0xAC/weex.vue"
	    		})
	    	},
    	},
        data() {
            return {
                
            }
        },
        methods: {
            mideaClick(event) {
            	this.$emit('cookbookclick', { value: this.data.targeturl})
            }
        },
        computed: {

        }
    }
</script>


<style>
	.box {
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		margin-left:32px;
		margin-top:30px
	}
	.img {
		width:330px;
		height:220px
	}
	.title-img {
		width:40px;
		height:40px
	}
	.cookbook-title {
		font-family: PingFangSC-Regular;
		font-size: 32px;
		color: #000000;
	}
	.cookbook-title-div {
		flex-direction: row;
		justify-content: space-between;
		margin-top:20px;
		width:330px;
	}
	.cookbook-pretitle-div {
		flex-direction: row;
		justify-content: flex-start
	}
	.cookbook-detail {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #8A8A8F;
	}
</style>
