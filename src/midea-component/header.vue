<template>
    <div class="wrapper" style="width:750px;">
        <div :style="headerStyleObj" class="box">
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
            default: null
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
        },
        custStyleObj: {
            type: Object,
            default: () => ({})
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
        },
        statusBarHeight: function () {
            let result = '20'
            if (weex.config.env.statusBarHeight){
                if (weex.config.env.platform == 'iOS') {
                    //iOS使用pt为单位
                    result = weex.config.env.statusBarHeight
                } else {
                    //安卓使用px为单位
                    result = weex.config.env.statusBarHeight / weex.config.env.scale
                }
            }
            return result
        },
        headerStyleObj: function () {
            let result, isImmersion
            if (this.isImmersion != null){
                isImmersion = this.isImmersion
            } else {
                isImmersion = weex.config.env.isImmersion=="false"?false:true
            }
            if (isImmersion) {
                //全屏显示，weex自行处理状态栏高度
                result = {
                    backgroundColor: this.bgColor, 
                    paddingTop: this.statusBarHeight + 'wx', 
                    height: (+this.statusBarHeight + 44) + 'wx',
                    ...this.custStyleObj
                }
            } else {
                //非全屏显示，APP已经处理状态栏高度
                result = {
                    backgroundColor: this.bgColor, 
                    height: '44wx',
                    ...this.custStyleObj
                }
            }

            return result
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

<style scoped>
.box {
  width: 750px;
  height: '44wx';
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  /* border-bottom-width:1px;
  border-bottom-color:#e2e2e2;
  background-color: #e2e2e2; */
}
.immersion {
  padding-top: 40px;
  height: 128px;
}
.immersion-ipx {
  padding-top: 88px;
  height: 176px;
}
.header-title {
  flex: 1;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  width: 574px;
  lines: 1;
  text-overflow: ellipsis;
  text-align: center;
}
.header-left-image-wrapper {
  width: 88px;
  height: 88px;
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
  height: 88px;
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
  height: 88px;
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