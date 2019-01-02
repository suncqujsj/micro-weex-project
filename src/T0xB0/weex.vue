<template>
    <common-weex :tabs="tabs" :constant="constant"></common-weex>
</template>

<script>
    // config data
    import constant from "./config/constant";
    import modes from "./config/modes.js";
    import autoMenu from "./config/auto-menu.js";
    import commonWeex from "@/common/pages/weex.vue";
    import nativeService from "@/common/services/nativeService";
    var numberRecord = 0; //记录跳页面的次数
    export default {
        data(){
            return {
                tabs:[
                    {
                        name:'自动菜单',
                        active:false,
                        rows:autoMenu
                    },
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
           
        },
        methods: {
           
        }
    }
</script>


