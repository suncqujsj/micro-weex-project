<style lang="less" type="text/less">

</style>

<template>
    <more-page :list="list"></more-page>
</template>

<script>
    import morePage from "@/common/pages/more.vue";
    import list from "./config/more.js";

    export default {
        data(){
            return {
                list
            }
        },
        components: {morePage},
        created(){

        }
    }
</script>


