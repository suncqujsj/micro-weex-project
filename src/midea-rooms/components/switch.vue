<template>
    <div class="wrap" @click="onSwitch">
        <text></text>
        <div v-if="isActive" class="row-s content" ref="switchBar" style="transform: translateX(0px)">
            <div class="left-bar"></div>
            <div class="right-bar"></div>
            <image class="icon" :src="icon.btn"></image>
        </div>
        <div v-else class="row-s content" ref="switchBar" style="transform: translateX(-61px)">
            <div class="left-bar"></div>
            <div class="right-bar"></div>
            <image class="icon" :src="icon.btn"></image>
        </div>
    </div>
</template>

<style>
    .row-s { flex-direction: row; align-items: center; justify-content: flex-start; }
    .wrap{
        width: 104px;
        height: 90px;
        overflow: hidden;
    }
    .content{
        width: 160px;
        height: 48px;
        margin-top: 22px;
    }
    .left-bar, .right-bar{
        height: 6px;
        width: 80px;
        border-radius: 2px;
    }
    .left-bar{
        background-color: #5D75F6;
    }
    .right-bar{
        background-color: #E5E5E8;
    }
    .icon{
        width: 48px;
        height: 48px;
        position: absolute;
        top: 0;
        left: 58px;
    }
</style>

<script>
    const animation = weex.requireModule('animation')
    const modal = weex.requireModule('modal')
    export default {
        props: {
            isActive: {
                type: Boolean,
                default: true
            },
        },
        computed(){
        },
        data(){
            return {
                icon: {
                    btn: 'assets/img/smart_ic_switch_l@2x.png'
                },
                barStyle: {}
            }
        },
        methods: {
            onSwitch(){
                this.isActive = !this.isActive;
                this.executeAnimation()

                this.$emit('onSwitch', {value: this.isActive})
            },
            executeAnimation(){
                let that = this
                let switchBar = this.$refs.switchBar

                if (this.isActive) {
                    animation.transition(switchBar, {
                        styles: {
                            transform: 'translateX(0px)',
                        },
                        duration: 100, 
                        timingFunction: 'linear',
                        delay: 0
                    }, function () {
                    });
                }else{
                    animation.transition(switchBar, {
                        styles: {
                            transform: 'translateX(-61px)',
                        },
                        duration: 100,
                        timingFunction: 'linear',
                        delay: 0
                    }, function () {
                    });

                }
            }
        },
        mounted(){
            this.executeAnimation()
        }
    }
</script>