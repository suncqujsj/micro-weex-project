<template>
    <scroller class="wrapper">
        <midea-header title="Switch" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>

        <midea-cell :title="'Midea切换按钮'">
            <div slot="value">
                <midea-switch2 ref="switch" @change="onMideachange"></midea-switch2>
            </div>
        </midea-cell>
        <midea-cell :title="'Midea切换按钮失败复原'">
            <div slot="value">
                <midea-switch2 ref="switchA" @change="onMideachangeA"></midea-switch2>
            </div>
        </midea-cell>
        <midea-cell :title="'Midea切换按钮失败复原'">
            <div slot="value">
                <midea-switch2 ref="switchB" @change="onMideachangeB"></midea-switch2>
            </div>
        </midea-cell>
        <div style="padding:20px;">
            <text style="font-size:32px;color:red;">switch的命名不要命名为midea-switch，由于历史原因，这个名字会有冲突造成显示问题。可以使用midea-switch2</text>
        </div>
    </scroller>
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
import mideaCell from '@/midea-component/cell.vue'
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
                this.$refs["switchA"].switchValue(!event.value)
            }, 500);
        },
        onMideachangeB(event) {
            this.mideaCheckedB.isChecked = event.value;
            setTimeout(() => {
                //模拟请求耗时
                this.$refs["switchB"].switchValue(!event.value)
            }, 500);
        },
    },
    mounted() {
        this.$refs["switch"].switchValue(this.mideaChecked)
        this.$refs["switchA"].switchValue(this.mideaCheckedA)
        this.$refs["switchB"].switchValue(this.mideaCheckedB.isChecked)
    },
    created() {
    }
};
</script>