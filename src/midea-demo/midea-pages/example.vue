<template>
    <div>
        <midea-header title="拼装" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller>
            
            <info-panel :state='0' :data='[1, 0, 40, 20, 10]' />
            <heater-cell2 itemImg='../assets/img/smart_ic_reline@3x.png' title='title' desc='desc' :hasSwitch='true' @clickSwitch='clickSwitch' :switchActive='switchActive' :hasArrow='false' :hasSubBottomBorder='true' />

            <heater-cell2 itemImg='../assets/img/smart_ic_reline@3x.png' title='title' desc='desc' rightText='righttext' />

            
            <heater-confirm-box :inputHeight='670' :show="show" @cancel='cancel'>
                <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='true' iconSrc='../assets/img/smart_ic_reline@3x.png' />
                <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='false' iconSrc='../assets/img/smart_ic_reline@3x.png' />
                <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='false' />
                <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='false' />
                <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='false' />
            </heater-confirm-box>

            <m-time-picket v-if="show1" :repeatType="repeatType" :selectedDays="selectedDays" @onRepeatSelect="repeatSelect" @onDayChange="onDayChange"></m-time-picket>
            
            <div v-if="show2" style="height:550px" >
                <top-circle-bg  :state='0' />
            </div>

            <midea-button @mideaButtonClicked="showComp" text='展示底部弹窗'></midea-button>
            <midea-button @mideaButtonClicked="showComp1" text='展示时间选择器'></midea-button>
            <midea-button @mideaButtonClicked="showComp2" text='展示lottie背景'></midea-button>
        </scroller>
    </div>
</template>
<style>

</style>
<script>
import base from '../base'
import nativeService from '../../common/services/nativeService';
import mideaButton from '@/midea-component/button.vue';
import heaterCell2 from '@/midea-component/newComp/heater_cell2.vue'
import infoPanel from '@/midea-component/newComp/infoPanel.vue'
import heaterCell from '@/midea-component/newComp/heater_cell.vue'
import heaterConfirmBox from '@/midea-component/newComp/heater_confirmBox.vue'
import mTimePicket from '@/midea-component/mTimePicket.vue'
import topCircleBg from '@/midea-component/newComp/top-circle-bg.vue'
export default {
    components:{heaterCell2,mideaButton,infoPanel,heaterCell,heaterConfirmBox,mTimePicket,topCircleBg},
    mixins:[base],
    data(){
        return {
            switchActive:true,
            show:false,
            show1:false,
            show2:false,
            repeatType:"3",
            selectedDays:"1111000",
            selectedType:"2",
            selectedDay:"1111000".split("")
        }
    },
    methods:{
        clickSwitch(){
            this.switchActive = !this.switchActive
        },
        cancel(){
            this.show = false
        },
        showComp(){
            this.show = true
        },
        showComp1(){
            this.show1 = !this.show1
        },
        showComp2(){
            this.show2 = !this.show2
        },
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
