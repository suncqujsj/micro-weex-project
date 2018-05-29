<template>
    <div class="progress-wrap" :style="styles.wrap">
        <image class="progress-bg" :src="bg" :style="styles.bg"></image>
        <div class="progress-content" :style="styles.content">
            <slot name="content"></slot>
        </div>
        <div class="cover">
            <!-- <image v-if="percent<100" ref="leftImg" resize="contain" :src="coverLImg" :style="styles.coverLeft"></image> -->
            <image ref="leftImg" resize="contain" :src="coverLImg" :style="styles.coverLeft"></image>
            <image v-if="percent<=50" ref="rightImg" resize="contain" :src="coverRImg" :style="styles.coverRight"></image>
            <image v-else ref="rightImg" resize="contain" :src="coverRImg1" :style="styles.coverRight"></image>
        </div>
    </div>
</template>

<style>
    .progress-wrap{
        position: relative;
    }
    .progress-bg, .cover{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .cover{
        flex-direction: row;
    }
</style>
<script>
    const animation = weex.requireModule('animation')
    const dom = weex.requireModule('dom')

    export default {
        props: {
            bg: {
                type: String,
                default: 'assets/img/cc.png'
            },
            w: {
                type: Number,
                default: 500
            },
            borderW: {
                type: Number,
                default: 50
            },
            contentBg: {
                type: String,
                default: ''
            },
            coverLImg: {
                type: String,
                default: 'assets/img/ccl.png'
            },
            coverRImg: {
                type: String,
                default: 'assets/img/ccr.png'
            },
            coverRImg1: {
                type: String,
                default: 'assets/img/ccr1.png'
            },
            percent: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
               
            }
        },
        computed: {
            styles(){
                return {
                    wrap:{
                        width: this.w + 'px',
                        marginLeft: (750 - this.w)/2 + 'px'
                    },
                    bg: {
                        width: this.w + 'px',
                        height: this.w + 'px'
                    },
                    content: {
                        margin: this.borderW + 'px',
                        width: (this.w - 2*this.borderW) + 'px',
                        height:(this.w - 2*this.borderW) + 'px',
                        borderRadius: (this.w/2 - this.borderW) + 'px',
                        backgroundColor: this.contentBg
                    },
                    coverLeft: {
                        width: this.w/2 + 'px',
                        height: this.w + 'px',
                        transform: 'rotate('+ this.leftDeg +'deg)',
                        transformOrigin: 'right center'
                    },
                    coverRight: {
                        width: this.w/2 + 'px',
                        height: this.w + 'px',
                        transform: 'rotate('+ this.rightDeg +'deg)',
                        transformOrigin: 'left center'
                    }
                }
            },
            btnImg(){
                let src = ''
                if (!start){

                }
                return src
            },
            leftDeg(){
                return this.percent > 50 ? 360*(this.percent-50)/100 : 0
            },
            rightDeg(){
                return this.percent > 50 ? 0 : 360*this.percent/100
                
            }
        },
        methods: {
        },
        created(){
            
        }
        
    }
</script>


