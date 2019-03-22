<template>
    <common-weex :tabs="tabs" :constant="constant" v-if="pageShow"></common-weex>
</template>

<script>
    // config data
    import constant from "./config/constant";
    import  modes from "./config/modes.js";
    import  modes_0TQN50QL from "./config/modes_0TQN50QL.js";
    import  modes_0TQN36QL from "./config/modes_0TQN36QL.js";
    import autoMenu from "./config/auto-menu.js";
    import autoMenu_0TQN50QL from "./config/auto-menu_0TQN50QL.js";
    import autoMenu_0TQN36QL from "./config/auto-menu_0TQN36QL.js";
    import commonWeex from "@/common/pages/weex.vue";
    import nativeService from "@/common/services/nativeService";

    export default {
        data(){
            return {
                tabs:[
                    {
                        name:'自动菜单',
                        active:true,
                        rows:autoMenu
                    },
                    {
                        name:'加热模式',
                        active:false,
                        rows:[]
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
                var _tabs = self.loadOwnMode(data,tabs);
                self.tabs = JSON.parse(JSON.stringify(_tabs));
                self.pageShow = true;
            });
        },
        methods: {
           loadOwnMode(data,tabs){
               if(tabs.length>1){
                    if(data.result && data.result.deviceSn8=='0TQN50QL'){
                        tabs[0].rows = autoMenu_0TQN50QL;   
                        tabs[1].rows = modes_0TQN50QL;            
                    }
                    else if(data.result && data.result.deviceSn8=='0TQN36QL'){
                        tabs[0].rows = autoMenu_0TQN36QL; 
                        tabs[1].rows = modes_0TQN36QL;               
                    }
                    else{
                        tabs[0].rows = autoMenu;
                        tabs[1].rows = modes;
                    }
               }else{
                     if(data.result && data.result.deviceSn8=='0TQN50QL'){
                        tabs[0].rows = modes_0TQN50QL;            
                    }
                    else if(data.result && data.result.deviceSn8=='0TQN36QL'){
                        tabs[0].rows = modes_0TQN36QL;               
                    }
                    else{
                        tabs[0].rows = modes;
                    }
               }
               return tabs;
           }
        }
    }
</script>


