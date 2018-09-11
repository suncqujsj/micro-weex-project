<template>
    <div class="wrapper">
        <midea-header title="Switch" :isImmersion="isImmersion" @leftImgClick="back"></midea-header>

        <midea-cell title="Midea切换按钮">
            <midea-switch2 :checked="mideaChecked" @change="onMideachange" :width="70" :height="38" slot="value"></midea-switch2>
        </midea-cell>
    </div>
</template>
<style scoped>
.wrapper {
  background-color: #f2f2f2;
}
.link-text {
  color: #333;
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
            checked: true,
            mideaChecked: true,
            iconOn: '../img/check/switch_on.png',
            iconOff: '../img/check/switch_off.png'
        }
    },
    methods: {

        onchange(event) {
            this.checked = event.value;
        },
        onMideachange(event) {
            this.mideaChecked = event.value;
            //nativeService.toast(this.checked);
        },
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>