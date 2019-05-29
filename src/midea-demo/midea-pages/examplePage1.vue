<template>
    <div>
        <midea-header title="拼装示例1" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller>
            
            <info-panel :state='0' />

            <heater-cell2 itemImg='../assets/img/smart_ic_reline@3x.png' title='设置温度'  rightText='60C' :hasSubBottomBorder='true'/>

            <heater-cell2 itemImg='../assets/img/smart_ic_reline@3x.png' title='节能模式' desc='一键45C，热量不浪费' :hasSwitch='true' @clickSwitch='clickSwitch' :switchActive='switchActive' :hasArrow='false' :hasSubBottomBorder='true' />

            <heater-cell2 itemImg='../assets/img/smart_ic_reline@3x.png' title='E+增容' desc='突破最高温度限制，提供更多热水'  :hasSwitch='true' @clickSwitch='clickSwitch2' :switchActive='switchActive2' :hasArrow='false' />

            
            <heater-confirm-box :inputHeight='670' :show="show" @cancel='cancel'>
                <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='true' iconSrc='../assets/img/smart_ic_reline@3x.png' />
                <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='false' iconSrc='../assets/img/smart_ic_reline@3x.png' />
                <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='false' />
                <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='false' />
                <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='false' />
            </heater-confirm-box>

            <midea-button @mideaButtonClicked="showComp" text='展示底部弹窗'></midea-button>
            <bottom-tab :data='bottomTabAry' />
        </scroller>
        <div style="height:180px;"/>
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
import bottomTab from '@/midea-component/newComp/bottomTab.vue'
export default {
    components:{heaterCell2,mideaButton,infoPanel,heaterCell,heaterConfirmBox,bottomTab},
    mixins:[base],
    data(){
        return {
            switchActive:true,
            switchActive2:true,
            show:false,
            bottomTabAry:[
                {srcImg:'../assets/img/smart_ic_reline@3x.png',text:'关机'},
                {srcImg:'../assets/img/smart_ic_reline@3x.png',text:'半胆速热'},
                {srcImg:'../assets/img/smart_ic_reline@3x.png',text:'预约'}
            ]
        }
    },
    methods:{
        clickSwitch(){
            this.switchActive = !this.switchActive
        },
        clickSwitch2(){
            this.switchActive2 = !this.switchActive2
        },
        cancel(){
            this.show = false
        },
        showComp(){
            this.show = true
        }
    }
}
</script>
