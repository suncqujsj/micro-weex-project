<style lang="less" type="text/less">

</style>

<template>
    <sf-video :constant="constant"></sf-video>
</template>

<script>
    import sfVideo from "@/common/pages/src/video.vue";
    import constant from "./config/constant";

    export default {
        data(){
            return {
                constant
            }
        },
        components: {sfVideo},
        created(){

        }
    }
</script>


