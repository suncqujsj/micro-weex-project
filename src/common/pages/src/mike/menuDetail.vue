<template>
    <div class="menu-detail-page">

        <midea-header bgColor="transparent" leftImg="img/header/public_ic_gray@3x.png" title="mike" titleText="black"
                      :isImmersion="true" :showLeftImg="true">
            <div slot="customerContent" class="header-top-wrapper">
                <div class="header-top-inner-wrapper">
                    <div class="header-right-image-wrapper" @click="onCloudMenuIconClicked">
                        <image class="header-right-image" :src="'img/header/public_ic_cloud_recipe@3x.png'"></image>
                    </div>
                    <div class="header-right-image-wrapper" @click="childLock(true)">
                        <image class="header-right-image" :src="'img/header/public_ic_babylock@3x.png'"></image>
                    </div>
                    <div class="header-right-image-wrapper" @click="openMorePage">
                        <image class="header-right-image" :src="'img/header/me_ic_set@3x.png'"></image>
                    </div>
                </div>
            </div>
        </midea-header>
        <text>Menu Detail Page</text>
    </div>
</template>

<script>

    import MideaHeader from '@/midea-component/header.vue'

    export default {
        name: "menuDetail",
        components: [MideaHeader]
    }
</script>

<style scoped lang="less">

    @import "../../../less/recipeHome.less";

    .menu-detail-page {
        

    }
</style>