<template>
    <div class="wrapper" style="width:750px;">
        <div :style="{backgroundColor:bgColor}" class="box" :class="[isImmersion && 'immersion']">
            <div class="header-left-image-wrapper" @click="leftImgClick">
                <image v-if="showLeftImg" class="header-left-image" :src="leftImg"></image>
            </div>
            <div>
                <text :style="{color:titleText, fontSize:fontSize+'px'}">{{title}}</text>
            </div>
            <div class="header-right-image-wrapper" @click="rightImgClick" :style="style.rightWrap">
                <slot name="rightContent">
                    <image v-if="showRightImg" class="header-right-image" :src="rightImg"></image>
                    <text class="right-text">{{rightText}}</text>
                </slot>
            </div>
        </div>
    </div>
</template>
<style scoped>
.box {
  width: 750px;
  height: 88px;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.header {
  height: 88px;
  background-color: #0e90ff;
}
.immersion {
  padding-top: 40px;
  height: 128px;
}
.header-left-image-wrapper {
  width: 88px;
  height: 88px;
  display: flex;
  justify-content: center;
  padding-left: 32px;
}
.header-right-image-wrapper {
  height: 88px;
  display: flex;
  justify-content: center;
  padding-left: 12px;
}
.header-left-image {
  height: 44px;
  width: 24px;
}
.header-right-image {
  height: 44px;
  width: 44px;
  margin-right: 25px;
}
.header-right-text-wrap{
    height: 88px;
    display: flex;
    justify-content: center;
    padding-right: 25px;
}
.right-text{
    color: #fff;
    font-size: 32px;
    margin-right: 25px;
}
</style>
<script>
import nativeService from '@/common/services/nativeService'
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        bgColor: {
            type: String,
            default: '#0E90FF'
        },
        fontSize: {
            type: String,
            default: '36'
        },
        titleText: {
            type: String,
            default: '#fff'
        },
        isImmersion: {
            type: Boolean,
            default: false
        },
        leftImg: {
            type: String,
            default: '../img/header/tab_back.png'
        },
        rightImg: {
            type: String,
            default: '../img/header/tab_seting.png'
        },
        showLeftImg: {
            type: Boolean,
            default: true
        },
        showRightImg: {
            type: Boolean,
            default: false
        },
        showRightText: {
            type: Boolean,
            default: false
        },
        rightText: {
            type: String,
            default: ''
        },
        styles: {
            type: Object,
            default: function(){
                return {
                    rightWrapWidth: '88px',
                }
            } 
        }
    },
    computed: {
        style(){
            return {
                wrapRight: {
                    width: this.styles.rightWrapWidth,
                }
            }
        }
    },
    data() {
        return {
        }
    },
    methods: {
        leftImgClick() {
            if (!this.showLeftImg) {
                return;
            }
            this.$emit('leftImgClick')
        },
        rightImgClick() {
            if (!this.showRightImg && !this.showRightText) {
                return;
            }
            this.$emit('rightImgClick')
        }
    },
};
</script>