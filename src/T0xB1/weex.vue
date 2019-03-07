<template>
    <common-weex :tabs="tabs" :constant="constant" v-if="pageShow"></common-weex>
</template>

<script>
    // config data
    import constant from "./config/constant";
    import modes from "./config/modes.js";
    import modes_0ET1065Q from "./config/modes_0ET1065Q.js";
    import autoMenu from "./config/auto-menu.js";
    import commonWeex from "@/common/pages/weex.vue";
    import nativeService from "@/common/services/nativeService";
    var numberRecord = 0; //记录跳页面的次数
    export default {
        data(){
            return {
                tabs:[
                    {
                        name:'加热模式',
                        active:true,
                        rows:modes
                    }
                ],
                constant:constant,
                pageShow: false
            }
        },
        components:{commonWeex},
        created(){
            let self = this;
            let tabs = JSON.parse(JSON.stringify(this.tabs));
             nativeService.getDeviceInfo().then(function(data){
                if(data.result && data.result.deviceSn8=='0ET1065Q'){
                    tabs[0].rows = modes_0ET1065Q;            
                }
                else{
                    tabs[0].rows = modes;
                }
                self.tabs = JSON.parse(JSON.stringify(tabs));
                self.pageShow = true;
            });
        },
        methods: {
           
        }
    }
</script>


