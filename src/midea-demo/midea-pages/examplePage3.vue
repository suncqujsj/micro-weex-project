<template>
<div>
    <midea-header title="拼装示例3" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
    <top-circle-bg :state='0' />
    <scroller>
        <div class="text-panel">
        <div class="text-content"><text class="text1">20</text><text class="text2">TDS</text></div>
        <div class="label"><text class="text3">可直饮</text></div>
        <p class="text4">顺德区水质TDS均值 200</p>
        </div>

        <heater-cell2 itemImg='../assets/img/smart_ic_reline@3x.png' title='7天生产净水 7500L' :hasSubBottomBorder='true' :hasArrow='true' />

        <heater-cell2 itemImg='../assets/img/smart_ic_reline@3x.png' title='PCB 复合滤芯' desc='预计剩余天数 300' :hasSubBottomBorder='true' :hasArrow='true' rightText='75%'/>

        <heater-cell2 itemImg='../assets/img/smart_ic_reline@3x.png' title='RO 反渗透滤芯' desc='剩余天数 400' :hasSubBottomBorder='false' :hasArrow='true' rightText='75%'/>

    </scroller>
</div>
</template>

<style>
.text-panel{
    height: 620px;
    width: 750px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.text-content{
    width: 750px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 50px;
}
.text1 {
    font-size: 200px;
}

.text2 {
    position: relative;
    top: 50px;
    font-size: 28px;
}

.label {
    border-radius: 32px;
    background-color: rgba(91, 211, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 32px;
    height: 64px;
}

.text3 {
    font-size: 32px;
    color: #50CFFF;
}

.text4 {
    font-size: 24px;
    color: #8A8A8F;
    margin-top: 64px;
}
</style>

<script>
import base from '../base'
import nativeService from '../../common/services/nativeService';
import mideaButton from '@/midea-component/button.vue';
import heaterCell2 from '@/midea-component/newComp/heater_cell2.vue'
import topCircleBg from '@/midea-component/newComp/top-circle-bg.vue'
export default {
    components: {
        heaterCell2,
        mideaButton,
        topCircleBg
    },
    mixins: [base],
    data() {
        return {}
    },
    methods: {}
}
</script>
