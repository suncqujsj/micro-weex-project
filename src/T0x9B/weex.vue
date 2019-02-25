<template>
    <common-weex :tabs="tabs" :constant="constant"></common-weex>
</template>

<script>
    // config data
    import constant from "./config/constant";
    import  modes from "./config/modes.js";
    import  modes_0TQN50QL from "./config/modes_0TQN50QL.js";
    import  modes_0TQN36QL from "./config/modes_0TQN36QL.js";
    import autoMenu from "./config/auto-menu.js";
    import commonWeex from "@/common/pages/weex.vue";
    import nativeService from "@/common/services/nativeService";

    export default {
        data(){
            return {
                tabs:[
                    // {
                    //     name:'自动菜单',
                    //     active:false,
                    //     rows:autoMenu
                    // },
                    {
                        name:'加热模式',
                        active:true,
                        rows:[]
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
                if(data.result && data.result.deviceSn8=='0TQN50QL'){
                    tabs[0].rows = modes_0TQN50QL;            
                }
                else if(data.result && data.result.deviceSn8=='0TQN36QL'){
                    tabs[0].rows = modes_0TQN36QL;               
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


