<template>
    <div class="wrapper">
        <midea-header title="Switch" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <midea-cell :title="'Midea切换按钮'">
            <div slot="value">
                <midea-switch2 :checked="mideaChecked" @change="onMideachange" slot="value"></midea-switch2>
            </div>
        </midea-cell>
        <midea-cell :title="'Midea切换按钮失败复原'">
            <div slot="value">
                <midea-switch2 :checked="mideaCheckedA" @change="onMideachangeA"></midea-switch2>
            </div>
        </midea-cell>
        <midea-cell :title="'Midea切换按钮失败复原'">
            <div slot="value">
                <midea-switch2 :checked="mideaCheckedB.isChecked" @change="onMideachangeB"></midea-switch2>
            </div>
        </midea-cell>
    </div>
</template>
<style scoped>
.wrapper {
    background-color: #f2f2f2;
}
.link-text {
    color: #333333;
    font-size: 24px;
}
</style>
<script>  
import base from '../base'
import mideaCell from '@/component/cell.vue'
import mideaSwitch2 from '@/midea-component/switch2.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');

module.exports = {
    components: { mideaSwitch2, mideaCell },
    mixins: [base],
    data() {
        return {
            mideaChecked: true,
            mideaCheckedA: true,
            mideaCheckedB: {
                isChecked: false
            }
        }
    },
    methods: {
        onMideachange(event) {
            this.mideaChecked = event.value;
        },
        onMideachangeA(event) {
            this.mideaCheckedA = event.value;
            setTimeout(() => {
                //模拟请求耗时
                this.mideaCheckedA = !event.value;
            }, 500);
        },
        onMideachangeB(event) {
            this.mideaCheckedB.isChecked = event.value;
            setTimeout(() => {
                //模拟请求耗时
                this.mideaCheckedB.isChecked = !event.value;
            }, 500);
        },
    },
    created() {
    }
};
</script>