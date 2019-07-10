<style>
.flex-center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* background-color: rgba(0, 0, 0, 0.6) */
}

.wrap {
    background-color: #ffffff;
    width: 750px;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 0;
}

.slot-floor {
    width: 750px;
    background-color: #ffffff;
    font-size: 28px;
}

.bottom-btn {
    width: 750px;
    height: 96px;
    font-size: 32px;
    color: #666666;
    border-top-style: solid;
    border-top-color: #f6f6f6;
    border-top-width: 1px;
}

.bottom-offset {
    margin-bottom: 34px;
}
</style>
<template>
<div v-if="show" class="bg" :style="{backgroundColor:maskBgColor}" @click="cancel">
    <div class="wrap">
        <scroller class="slot-floor" :style="{height:inputHeight}" :show-scrollbar="false">
            <slot></slot>
        </scroller>
        <div :class="['bottom-btn','flex-center',isipx&&'bottom-offset']" @click="cancel">{{btnText}}</div>
    </div>
</div>
</template>

<script>
//之前的底部弹框，不带向上滑动动画效果，废弃
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        inputHeight: {
            type: Number,
            default: 608
        },
        btnText: {
            type: String,
            default: '取消'
        },
        maskBgColor:{
            type:String,
            default:'rgba(0, 0, 0, 0.6)'
        }
    },
    data() {
        return {}
    },
    computed: {
        isipx: function () {
            return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                ||
                weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                ||
                weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                ||
                weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
            );
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel')
        }
    },
    mounted() {},
    created() {}
}
</script>
