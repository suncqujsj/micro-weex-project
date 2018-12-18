<template>
    <common-working :tabs="tabs" :constant="constant"></common-working>
</template>

<script>
    // config data
    import constant from "./config/constant";
    import modes from "./config/modes.js";
    import autoMenu from "./config/auto-menu.js";
    import commonWorking from "@/common/pages/working.vue";
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
                        rows:modes
                    }
                ],
                constant:constant
            }
        },
        components: {commonWorking},
        created(){
         
        },
        methods: {    
       
        }
    }
</script>


