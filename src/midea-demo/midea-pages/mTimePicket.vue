<template>
    <div class="wrapper">
        <midea-header title="时间选择器" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        
        <m-time-picket :repeatType="repeatType" :selectedDays="selectedDays" @onRepeatSelect="repeatSelect" @onDayChange="onDayChange"></m-time-picket>
    </div>
</template>
<style scoped>
.wrapper {
	width:750px;
}
</style>
<script>  

import base from '../base'
import nativeService from '@/common/services/nativeService'
import mTimePicket from '@/midea-component/mTimePicket.vue'
import mideaButton from '@/midea-component/button.vue'
module.exports = {
    components: { mTimePicket,mideaButton},
    mixins: [base],
    data() {
        return {
            repeatType:"3",
            selectedDays:"1111000",
            selectedType:"2",
            selectedDay:"1111000".split("")
        }
    },
    methods: {
      repeatSelect(event) {
      	this.selectedType = event.value;
      	nativeService.toast(event.value)
      },
      onDayChange(event) {
      	this.selectedDay = event.value;
      	nativeService.toast(event.value)
      }
    },
    created() {
    }
};
</script>