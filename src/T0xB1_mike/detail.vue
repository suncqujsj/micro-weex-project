<template>
    <menu-detail></menu-detail>
</template>

<script>
    import constant from "./config/constant";
    import modes from "./config/modes.js";
    import autoMenu from "./config/auto-menu.js";

    import MenuDetail from "@/common/pages/src/mike/menuDetail.vue";

    export default {
        name: "detail",
        data() {
            return {

                constant: constant
            }
        },
        components: {MenuDetail}
    }
</script>

<style scoped lang="less">


</style>