<template>
    <div class="menu-detail-page" :style="{height: wrapHeight}">


        <midea-header class="bg-gray" :title="language.morePageTitle" titleText="black" :isImmersion="true"
                      :showLeftImg="true" @leftImgClick="back"></midea-header>
        <!--        <midea-header bgColor="eeeeee" leftImg="img/header/public_ic_gray@3x.png" title="mike" titleText="black"-->
        <!--                      :isImmersion="isImmersion" :showLeftImg="true">-->
        <!--            <div slot="customerContent" class="header-top-wrapper">-->
        <!--                <div class="header-top-inner-wrapper">-->
        <!--                    <div class="header-right-image-wrapper" @click="onCloudMenuIconClicked">-->
        <!--                        <image class="header-right-image" :src="'img/header/public_ic_cloud_recipe@3x.png'"></image>-->
        <!--                    </div>-->
        <!--                    <div class="header-right-image-wrapper" @click="childLock(true)">-->
        <!--                        <image class="header-right-image" :src="'img/header/public_ic_babylock@3x.png'"></image>-->
        <!--                    </div>-->
        <!--                    <div class="header-right-image-wrapper" @click="openMorePage">-->
        <!--                        <image class="header-right-image" :src="'img/header/me_ic_set@3x.png'"></image>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </midea-header>-->
    </div>
</template>

<script>

    import commonMixin from "@/common/util/mixins/common"
    import MideaHeader from '@/midea-component/header.vue'

    export default {
        name: "menuDetail",
        mixins: [commonMixin],
        components: [MideaHeader],
        data() {
            return {
                isImmersion: true
            }
        },
    }
</script>

<style scoped lang="less">

    @import "../../../less/recipeHome.less";

    .menu-detail-page {

        background-color: #fff6d6;
        width: 750;
        flex: 1;
        flex-direction: column;

    }
</style>