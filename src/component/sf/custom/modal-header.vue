<template>
    <div class="wrapper">
        <div  class="box" :class="[isImmersion?(isipx? 'immersion-ipx': 'immersion'):'']">
            <div class="header-left-image-wrapper" @click="leftImgClick">
                <image v-if="showLeftImg" class="header-left-image" :src="leftImg"></image>
            </div>
            <div @click="headerClick">
                <text class="header-title" :style="{color:titleText, fontSize:fontSize+'px'}">{{title}}</text>
            </div>
            <div class="header-right-image-wrapper" @click="rightImgClick">
                <slot name="rightContent">
                    <image v-if="showRightImg" class="header-right-image" :src="rightImg"></image>
                </slot>
            </div>
            <div v-if="showRightText" class="header-right" @click="rightTextClick">
                <text class="header-right-text" :style="{color: rightColor}">{{rightText}}</text>
            </div>
            <slot name="customerContent">
            </slot>
        </div>
    </div>
</template>
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
            default: '#ffffff'
        },
        fontSize: {
            type: String,
            default: '32'
        },
        titleText: {
            type: String,
            default: '#000000'
        },
        isImmersion: {
            type: Boolean,
            default: false
        },
        leftImg: {
            type: String,
            default: './img/header/public_ic_back@3x.png'
        },
        rightImg: {
            type: String,
            default: './img/header/me_ic_set@3x.png'
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
        rightColor: {
            type: String,
            default: '#666666'
        }
    },
    computed: {
        isipx: function () {
            return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                );
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
            if (!this.showRightImg) {
                return;
            }
            this.$emit('rightImgClick')
        },
        rightTextClick() {
            if (!this.showRightText) {
                return;
            }
            this.$emit('rightTextClick')
        },
        headerClick() {
            this.$emit('headerClick')
        }
    },
};
</script>

<style lang="less" type="text/less" scoped>
    @height:96px;
.box {
  /*width: 750px;*/
  height:@height;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.immersion {
  padding-top: 40px;
  padding-left: 16px;
  height: 128px;
}
.immersion-ipx {
  padding-top: 88px;
  padding-left: 16px;
  height: 176px;
}
.header-title {
  flex: 1;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  /*width: 574px;*/
  lines: 1;
  text-overflow: ellipsis;
  text-align: center;
}
.header-left-image-wrapper {
  width: 88px;
  height: @height;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 10px;
}
.header-left-image {
  height: 58px;
  width: 58px;
}
.header-right-image-wrapper {
  width: 88px;
  height: @height;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-right: 32px;
}
.header-right-image {
  height: 44px;
  width: 44px;
}
.header-right {
  position: absolute;
  right: 0px;
  height: @height;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-right-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  padding-left: 20px;
  padding-right: 32px;
  text-align: right;
}
</style>