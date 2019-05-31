<style lang="less" type="text/less">

</style>

<template>
    <sf-ota :constant="constant"></sf-ota>
</template>

<script>
    import sfOta from "@/common/pages/src/ota.vue";
    import constant from "./config/constant";

    export default {
        data(){
            return {
                constant
            }
        },
        components: {sfOta},
        created(){

        }
    }
</script>


