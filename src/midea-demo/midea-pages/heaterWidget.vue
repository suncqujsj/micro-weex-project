<template>
    <div>
        <midea-header title="heaterWidget" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller>
            <info-panel :state='state' nowTem='40' hotWaterContent='50%' availableTime='≈10′' />
            <div v-for="(item,index) in btns" :key="index">
                <midea-button @mideaButtonClicked='click(index)' :text='item' />
            </div>
        </scroller>
    </div>
    
</template>
<style>

</style>
<script>
import base from '../base'
import nativeService from '../../common/services/nativeService';
import infoPanel from '@/midea-component/newComp/infoPanel.vue'
import mideaButton from '@/midea-component/button.vue'
export default {
    mixins:[base],
    components:{infoPanel,mideaButton},
    data(){
        return {
            state:0,
            btns:['保温','加热','待机','关机','离线']
        }
    },
    methods:{
        click(index){
            switch(index){
                case 0:
                    this.state = 0;
                    return
                case 1:
                    this.state = 1;
                    return
                case 2:
                    this.state = 3;
                    return
                case 3:
                    this.state = 4;
                    return
                case 4:
                    this.state = 5;
                    return
            }
        }
    }
}
</script>
