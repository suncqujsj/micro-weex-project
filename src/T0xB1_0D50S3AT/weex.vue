<template>
    <common-weex :pages="pages" :constant="constant"></common-weex>
</template>

<script>
    // config data
    import constant from "./config/constant";
    import pages from "./config/pages.js";
    import commonWeex from "@/common/pages/multiCavity/weex.vue";
    import nativeService from "@/common/services/nativeService";

    var numberRecord = 0; //记录跳页面的次数
    export default {
        data(){
            return {
                pages: pages,
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


