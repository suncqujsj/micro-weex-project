<template>
    <common-working :pages="pages" :constant="constant"></common-working>
</template>

<script>
    // config data
    import constant from "./config/constant";
     import pages from "./config/pages.js";
    import commonWorking from "@/common/pages/working_double.vue";
    export default {
        data(){
            return {
                pages: pages,
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


