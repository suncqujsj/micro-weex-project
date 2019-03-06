<template>
    <common-weex :tabs="tabs" :constant="constant"></common-weex>
</template>

<script>
    // config data
    import constant from "./config/constant";
    import  modes from "./config/modes.js";
    import  modes_0TPN36FQ from "./config/modes_0TPN36FQ.js";
    import  modes_0TPN36R5 from "./config/modes_0TPN36R5.js";
    import autoMenu from "./config/auto-menu.js";
    import autoMenu_0TPN36FQ from "./config/auto-menu_0TPN36FQ.js";
    import autoMenu_0TPN36R5 from "./config/auto-menu_0TPN36R5.js";
    import commonWeex from "@/common/pages/weex.vue";
    import nativeService from "@/common/services/nativeService";

    export default {
        data(){
            return {
                tabs:[
                    {
                        name:'自动菜单',
                        active:false,
                        rows:[]
                    },
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
                var _tabs = self.loadOwnMode(data,tabs);
                self.tabs = JSON.parse(JSON.stringify(_tabs));
            });
        },
        methods: {
            loadOwnMode(data,tabs){
               if(tabs.length>1){
                    if(data.result && data.result.deviceSn8=='0TPN36FQ'){
                        tabs[0].rows = autoMenu_0TPN36FQ;   
                        tabs[1].rows = modes_0TPN36FQ;            
                    }
                    else if(data.result && data.result.deviceSn8=='0TPN36R5'){
                        tabs[0].rows = autoMenu_0TPN36R5; 
                        tabs[1].rows = modes_0TPN36R5;               
                    }
                    else{
                        tabs[0].rows = autoMenu;
                        tabs[1].rows = modes;
                    }
               }else{
                     if(data.result && data.result.deviceSn8=='0TPN36FQ'){
                        tabs[0].rows = modes_0TPN36FQ;            
                    }
                    else if(data.result && data.result.deviceSn8=='0TPN36R5'){
                        tabs[0].rows = modes_0TPN36R5;               
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


