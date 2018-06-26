<template>
     <div class="box" @click="mideaClick">
    	<image :src="data.img" class="img"></image>
    	<div class="food-name" :style="{borderBottomColor:data.color}">
    		<text class="fb-text">{{data.name}}</text>
    	</div>
    	<div class="food-detail">
    		<text class="fb-text-detail">{{data.detail}}</text>
    		<text class="fb-text-desc">{{data.desc}}</text>
    	</div>
    </div>
</template>

<script>
	const modal = weex.requireModule('modal');
    export default {
    	props: {
    		data:{
	    		type:Object,
	    		default:() => ({
	    			name:"橘子",
	    			img:"./assets/img/test_pic_orange@2x.png",
	    			detail:"1天后过期",
	    			desc:"冷冻",
	    			color:"border-bottom-color:#FF9500;",
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
            	this.$emit('foodclick', { value: this.data.targeturl})
            }
        },
        computed: {

        }
    }
</script>


<style>
	.box {
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width:218px
	}
	.img {
		width:218px;
		height:168px
	}
	.food-name {
		margin-left:5px;
		margin-right:5px;
		border-bottom-color: #FF9500;
		border-bottom-width: 3px;
		text-align: center;
		width:210px;
		padding-bottom: 10px;
	}
	.food-detail {
		align-items: flex-start;
		justify-content: flex-start;
		width:218px;
		margin-top:10px
	}
	.fb-text {
		font-family: PingFangSC-Regular;
		font-size: 32px;
		color: #000000;
		text-align: center;
	}
	.fb-text-detail {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #000000;
	}
	.fb-text-desc {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #8A8A8F;
	}
</style>
