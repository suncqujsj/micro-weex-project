<style lang="less" type="text/less">

</style>

<template>
    <sf-voice :constant="constant"></sf-voice>
</template>

<script>
    import sfVoice from "@/common/pages/src/voice.vue";
    import constant from "./config/constant";

    export default {
        data(){
            return {
                constant
            }
        },
        components: {sfVoice},
        created(){

        }
    }
</script>


