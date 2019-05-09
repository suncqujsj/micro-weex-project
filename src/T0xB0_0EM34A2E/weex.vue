<template>
    <common-weex :tabs="tabs" :constant="constant"></common-weex>
</template>

<script>
    // config data
    import constant from "./config/constant";
    import modes from "./config/modes.js";
    import autoMenu from "./config/auto-menu.js";
    import commonWeex from "@/common/pages/weex.vue";

    var numberRecord = 0; //记录跳页面的次数
    export default {
        data(){
            return {
                tabs:[
                    {
                        name:'Auto Menu',
                        active:true,
                        rows:autoMenu
                    },
                    {
                        name:'Heat Mode',
                        active:false,
                        rows:modes
                    },
                    // {
                    //     name:'test',
                    //     active:true,
                    //     rows:tests
                    // }
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


