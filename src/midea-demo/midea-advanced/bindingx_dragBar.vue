<template>
    <div>
        <midea-header title="dragBar拖动条" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div class="scroller">
            <midea-title-bar :title="'默认'+percentage" bgColor="#EEF4F7"></midea-title-bar>
            <div class="box-wrapper">
                <dragBar :value="percentage" @onChange="dataChanged"></dragBar>
            </div>

            <midea-title-bar :title="'自定义'+percentageA" bgColor="#EEF4F7"></midea-title-bar>
            <div class="box-wrapper">
                <div class="box">
                    <dragBar :value="percentageA" width=600 color="rgba(250,135,71,0.9)" bgColor="#EEF4F7" @onChange="dataChangedA"></dragBar>
                </div>
            </div>

            <midea-title-bar :title="'只可以滑动，不可以点击变化'+percentageB" bgColor="#EEF4F7"></midea-title-bar>
            <div class="box-wrapper">
                <div class="box-cust">
                    <dragBar :value="percentageB" width=600 :clickable="false" @onChange="dataChangedB" color="rgba(250,135,71,0.5)"></dragBar>
                </div>
            </div>

            <midea-title-bar :title="'禁止滑动'" bgColor="#EEF4F7"></midea-title-bar>
            <div class="box-wrapper">
                <div class="box-cust">
                    <dragBar :value="300" radius=15 width=600 :disable="true" @onChange="dataChangedA"></dragBar>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.scroller {
    flex: 1;
    overflow: hidden;
}
.box-wrapper {
    justify-content: center;
    align-items: center;
    padding: 30px 0px;
}
.box {
    overflow: hidden;
}
.box-cust {
    border-style: solid;
    border-color: rgb(0, 128, 0);
    border-width: 1px;
    border-radius: 16px;
    overflow: hidden;
}
</style>

<script>
import base from '../base'
import mideaHeader from '@/midea-component/header.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import dragBar from '@/midea-component/dragBar.vue'

import nativeService from '@/common/services/nativeService'


export default {
    components: {
        mideaTitleBar,
        dragBar
    },
    mixins: [base],
    data() {
        return {
            percentage: 100,
            percentageA: 200,
            percentageB: 200,
        }
    },
    methods: {
        dataChanged(e) {
            this.percentage = e
        },

        dataChangedA(e) {
            this.percentageA = e
        },

        dataChangedB(e) {
            this.percentageB = e
        }
    },
    mounted() {

    }
}
</script>