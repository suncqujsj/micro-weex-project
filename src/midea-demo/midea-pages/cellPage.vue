<template>
    <div>
        <midea-header title="cell" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <heater-cell itemImg='../assets/img/smart_ic_reline@3x.png' title='title' desc='desc' :hasSwitch='true' @clickSwitch='clickSwitch' :switchActive='switchActive' switch-type="primary" :hasArrow='false' :hasSubBottomBorder='true' :hapticFeedbackActive='true'/>
        <heater-cell itemImg='../assets/img/smart_ic_reline@3x.png' title='title' desc='desc' rightText='righttext' />
    </div>
    
</template>
<style>

</style>
<script>
import base from '../base'
import nativeService from '../../common/services/nativeService';
import mideaButton from '@/midea-component/button.vue';
import heaterCell from '@/midea-component/newComp/heater_cell2.vue'
export default {
    components:{heaterCell,mideaButton},
    mixins:[base],
    data(){
        return {
            switchActive:true
        }
    },
    methods:{
        clickSwitch(){
            this.switchActive = !this.switchActive
        }
    }
}
</script>
