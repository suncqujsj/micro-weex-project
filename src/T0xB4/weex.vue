<template>
    <common-weex :tabs="tabs" :constant="constant"></common-weex>
</template>

<script>
    // config data
    import constant from "./config/constant";
    import modes from "./config/modes.js";
    import modes_00T7388D from "./config/modes_00T7388D.js";
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
                constant:constant
            }
        },
        components:{commonWeex},
        created(){
            let self = this;
            let tabs = JSON.parse(JSON.stringify(this.tabs));
             nativeService.getDeviceInfo().then(function(data){
                if(data.result && data.result.deviceSn8=='00T7388D'){
                    tabs[0].rows = modes_00T7388D;            
                }
                else if(data.result && data.result.deviceSn8=='00T7389D'){
                    tabs[0].rows = modes_00T7388D;               
                }
                else{
                    tabs[0].rows = modes;
                }
                self.tabs = JSON.parse(JSON.stringify(tabs));
            });
        },
        methods: {
           
        }
    }
</script>


