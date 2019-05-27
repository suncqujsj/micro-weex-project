<template>
    <div>
        <midea-header title="拼装示例2" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller>
            <title-bar title='设置温度' />
            <midea-cell title='温度' rightText='60'  :hasArrow='true' />

            <title-bar title='用水时间' />
            <midea-cell title='加热完成时间' rightText='上午 8:00'  :hasArrow='true' />

            <title-bar title='加热完成后，进入保温状态' />




            <m-time-picket :repeatType="repeatType" :selectedDays="selectedDays" @onRepeatSelect="repeatSelect" @onDayChange="onDayChange"></m-time-picket>
            
        </scroller>
    </div>
</template>
<style>

</style>
<script>
import base from '../base'
import nativeService from '../../common/services/nativeService';
import mideaButton from '@/midea-component/button.vue';
import mTimePicket from '@/midea-component/mTimePicket.vue'
import titleBar from '@/midea-component/title-bar.vue'
import mideaCell from '@/midea-component/cell2.vue'
export default {
    components:{mideaButton,mTimePicket,titleBar,mideaCell},
    mixins:[base],
    data(){
        return {
            repeatType:"3",
            selectedDays:"1111000",
            selectedType:"2",
            selectedDay:"1111000".split("")
        }
    },
    methods:{
        repeatSelect(event) {
            this.selectedType = event.value;
            nativeService.toast(event.value)
        },
        onDayChange(event) {
            this.selectedDay = event.value;
            nativeService.toast(event.value)
        }
    }
}
</script>
