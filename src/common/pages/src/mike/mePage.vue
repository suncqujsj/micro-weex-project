<style lang="less" type="text/less">
    @header-height: 580px;
    .hearder-section {
        height: @header-height;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .head-bg {
        position: absolute;
        width: 750px;
        height: @header-height;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }

    .header-icon {
        border-radius: 100px;

    }

    .header-name {
        color: #fefefe;
        font-size: 40px;
        margin-top: 20px;
    }

    .header-sub-name {
        color: #fefefe;
        margin-top: 10px;
    }

    .select-tags {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 55px;
    }

    .tag-item {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 200px;
    }

    .yellow-item {
        color: #ffbc05;
    }

    .tag-item-icon {
        height: 50px;
        width: 50px;
    }


    .tag-item-number {
        margin-top: 24px;
        color: rgba(254, 254, 254, 0.3);
        font-size: 10.5px*2;
    }

</style>
<template>
    <div>
        <div class="hearder-section">

            <image class="head-bg" src="./img/mike/mike_me_bg.png" resize="cover"></image>
            <image class="header-icon"
                   :src="user.avatar"
                   style="width:200px;height:200px"></image>
            <text class="header-name">{{user.nickName}}</text>
            <text class="header-sub-name">ID：</text>
            <div class="select-tags">
                <div class="tag-item" @click="clickOnTagItem(0)">
                    <image class="tag-item-icon eat-icon" resize="contain"
                           :src="eatenImg"></image>
                    <text class="tag-item-number" :class="[isEatenShown && 'yellow-item']">264</text>
                </div>
                <div class="tag-item" @click="clickOnTagItem(1)">
                    <image class="tag-item-icon heart-icon" resize="contain"
                           :src="favImg"></image>
                    <text class="tag-item-number" :class="[isFavShown && 'yellow-item']">264</text>
                </div>
                <div class="tag-item" @click="clickOnTagItem(2)">
                    <image class="tag-item-icon share-icon" resize="contain"
                           :src="shareImg"></image>
                    <text class="tag-item-number" :class="[isSharedShown && 'yellow-item']">264</text>
                </div>
            </div>
        </div>

        <done-recipe/>
    </div>
</template>

<script>
    import doneRecipe from './component/doneRecipe.vue';
    import nativeService from "@/common/services/nativeService";


    export default {
        props: [],
        data() {
            return {
                selectingTag: 0, // 0 : eaten 1 : hearted/faved 2 : shared

                user: {}
            }
        },
        components: {doneRecipe},

        computed: {
            isEatenShown() {
                return this.selectingTag === 0;
            },
            isFavShown() {
                return this.selectingTag === 1;
            },
            isSharedShown() {
                return this.selectingTag === 2;
            },
            eatenImg() {
                return this.isEatenShown ? './img/mike/eat_yellow.png' : './img/mike/eat_light_gray.png'
            },
            favImg() {
                return this.isFavShown ? './img/mike/heart_yellow.png' : './img/mike/heart_light_gray.png'
            },
            shareImg() {
                return this.isSharedShown ? './img/mike/share_yellow.png' : './img/mike/share_light_gray.png'
            }

        },
        created() {

            this.loadUserInfo();
        },
        methods: {

            clickOnTagItem(index) {

                this.selectingTag = index;
            },

            loadUserInfo() {
                nativeService.getUserInfo().then(res => {
                    this.user = res;
                })
            }

        }
    }
</script>