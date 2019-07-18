<style lang="less" type="text/less">

</style>

<template>
    <more-page :list="list" :constant="constant"></more-page>
</template>

<script>
    import morePage from "@/common/pages/more.vue";
    import list from "./config/more.js";
    import constant from "./config/constant";

    export default {
        data(){
            return {
                constant,
                list
            }
        },
        components: {morePage},
        created(){

        }
    }
</script>


