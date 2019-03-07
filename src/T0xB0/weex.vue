<template>
    <common-weex :tabs="tabs" :constant="constant" v-if="pageShow"></common-weex>
</template>

<script>
    // config data
    import constant from "./config/constant";
    import  modes from "./config/modes.js";
    import  modes_09X7321D from "./config/modes_09X7321D.js";
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
                constant:constant,
                pageShow: false
            }
        },
        components:{commonWeex},
        created(){
            let self = this;
            let tabs = JSON.parse(JSON.stringify(this.tabs));
             nativeService.getDeviceInfo().then(function(data){
                if(data.result && data.result.deviceSn8=='09X7321D'){
                    tabs[0].rows = modes_09X7321D;
                    if(tabs.length>1){
                        tabs[1].rows = modes_09X7321D;
                    }
                }else{
                    tabs[0].rows = modes;
                    if(tabs.length>1){
                        tabs[1].rows = modes;
                    }
                }
                self.tabs = JSON.parse(JSON.stringify(tabs));
                self.pageShow = true;
            });
        },
        methods: {
           
        }
    }
</script>


