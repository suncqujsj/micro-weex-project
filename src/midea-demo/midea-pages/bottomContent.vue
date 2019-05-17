<template>
    <div>
        <midea-header title="底部弹框" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button @mideaButtonClicked="showComp" text='show'></midea-button>
        <heater-confirm-box :inputHeight='580' :show="show" @cancel='cancel'>
            <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='true' iconSrc='../assets/img/smart_ic_reline@3x.png' />
            <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='false' iconSrc='../assets/img/smart_ic_reline@3x.png' />
            <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='false' />
            <heater-cell title="半胆速热" desc='快速加热，提供少量热水' :isActive='false' />
        </heater-confirm-box>

    </div>
    
</template>
<style>

</style>
<script>
import base from '../base'
import nativeService from '../../common/services/nativeService';
import mideaButton from '@/midea-component/button.vue';
import heaterCell from '@/midea-component/newComp/heater_cell.vue'
import heaterConfirmBox from '@/midea-component/newComp/heater_confirmBox.vue'
export default {
    components:{heaterCell,heaterConfirmBox,mideaButton},
    mixins:[base],
    data(){
        return {
            show:true
        }
    },
    methods:{
        cancel(){
            this.show = false
        },
        showComp(){
            this.show = true
        }
    }
}
</script>
