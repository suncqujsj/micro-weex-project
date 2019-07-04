<!--
* Created by sf
* 2019/02/20 sf
-->

<template>
    <div class="loading-wrapper" v-if="display" @touchend="handleTouchend">
        <div class="mask" ref="mask" v-if="isMask" :style="{height:wrapHeight}" @touchend="handleTouchend">
            <div class="icon-text-wrapper">
                <image class="icon" :src="icon" ref="icon"></image>
                <text v-if="text" class="text">{{text}}</text>
            </div>
        </div>
        <midea-header class="fixed-top" titleText="white" title="" bgColor="transparent" leftImg="img/header/public_ic_back_white@3x.png"  @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png"></midea-header>
    </div>
</template>

<script>
    import MideaHeader from '@/midea-component/header.vue'

    const animation = weex.requireModule('animation');
    import commonMixin from "@/common/util/mixins/common";
    import nativeService from "@/common/services/nativeService";
    const gap = 20;

    export default {
        mixin:{commonMixin},
        components:{MideaHeader},
        props: {
            display: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'loading'
            },
            text: {
                type: String,
                default: ''
            },
            isMask: {
                type: Boolean,
                default: true
            },
            back: {
                type: Function,
                default: ()=>{}
            }
            // bgColor: {
            //     type: String,
            //     default: 'transparent'
            // },
            // loadingColor: {
            //     type: String,
            //     default: '#8a8a8f'
            // },
            // opacity: {
            //     type: String | Number,
            //     default: 0.8
            // }
        },
        data() {
            return {
                timer: null,
                deg:0
            };
        },
        computed: {
            icon() {
                return `img/status/${this.type}.png`
            }
        },
        created(){
            if(this.display && this.type === 'loading') {
                this.loop();
            }
        },
        watch: {
            display(nVal) {
                if (!nVal || this.type !== 'loading') {
                    this.reset();
                    return;
                }
                if(nVal) {
                    this.loop();
                }
            },
            type(nVal) {
                if (nVal !== 'loading') {
                    this.reset();
                    return;
                }

                if(!this.timer) {
                    this.loop();
                }
            },
            isMask(nVal) {
                this.$nextTick(() => {
                    this.maskFade(nVal);
                });
            }
        },
        methods: {
            // 阻止默认事件,点击穿透问题
            handleTouchend(e) {
                let {platform} = weex.config.env
                platform === 'Web' && e.preventDefault && e.preventDefault()
            },

            // 遮罩层动画
            maskFade(bool) {
                let maskEl = this.$refs['mask']
                animation.transition(maskEl, {
                    styles: {
                        opacity: bool ? 1 : 0
                    },
                    duration: 200,
                    timingFunction: 'ease-in',
                    delay: 0
                })
            },

            loop(){
                this.loadingAnimate();
                this.timer = setInterval(() => {
                    this.loadingAnimate();
                }, gap);
            },

            // 加载动画
            loadingAnimate() {
                let icon = this.$refs['icon'];
                this.deg += 5 ;
                let context = this;
                animation.transition(icon, {
                    styles: {
                        transform: 'rotate(' + context.deg  + 'deg)',
                        transformOrigin: 'center center'
                    },
                    duration: gap, //ms
                    timingFunction: 'linear',
                    delay: 0 //ms
                }, function () {
                })
            },
            reset(){
                clearInterval(this.timer);
                this.deg = 0;
            },
        },
        // mounted() {
        //     this.reset();
        // },
        destroyed() {
            this.reset();
        }
    }
</script>

<style lang="less" type="text/less" scoped>
    @import (reference) "../../../common/less/common";
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        .j-c;
        .a-c;
    }

    .icon-text-wrapper {
        .bg-white;
        .square(118*2px);
        .column;
        .a-c;
        .radius(13*2px);
    }

    .icon {
        .ma-t(30*2px);
        .square(64px);
    }

    .text {
        .ma-t(9*2px);
        .f-32;
        .lh(22*2px);
    }

    .fixed-top{
        .fixed_top;
    }
</style>
