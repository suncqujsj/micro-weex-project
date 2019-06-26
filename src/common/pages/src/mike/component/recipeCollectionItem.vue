<style scoped lang="less">

    @collection-item-cover-radius: 20px;
    .recipe-collection-item {
        display: flex;
        flex-direction: column;
        /*margin-right: 30px;*/
        position: relative;
    }

    .first-item {

        margin-left: 55px;
    }

    .collection-cover {

        margin-bottom: 10px;
        border-radius: @collection-item-cover-radius;
    }

    .cover-info {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        border-radius: @collection-item-cover-radius;

    }

    .cover-info-mask {
        position: absolute;
        left: 0;
        height: 170px;

        background-image: linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent);
        background-repeat: no-repeat;
        background-size: contain;
        border-radius: @collection-item-cover-radius;
    }

    .cover-play {
        position: absolute;

        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .play-icon {
        width: 144px;
        height: 144px;
    }

    .cover-title {
        color: #ffffff;
        font-size: 18px *2;
        padding-left: 40px;
        padding-bottom: 30px;
    }


    .info {
        display: flex;
        flex-direction: column;
        padding-left: 20px;
        padding-right: 20px;

    }

    .title {
        font-size: '15wx';
        color: #4d4d4d;
    }

    .other {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .other-item {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .fav-icon {
        width: 28px;
        height: 26px;
        margin-right: 10px;
    }

    .view-icon {
        width: 28px;
        height: 26px;
        margin-right: 10px;
    }

    .other-item-text {
        font-size: 27px;
        color: #969696;
    }

    .favs {
        margin-right: 40px;
    }
</style>
<template>
    <div class="recipe-collection-item" :class="[first && 'first-item']" @click="clickOnItem">

        <!--        :style="imgSize"-->

        <image resize="cover" class="collection-cover" :src="cover" :style="imgSize"
               placeholder="https://via.placeholder.com/288x192?text=Loading"></image>
        <div class="cover-info-mask" v-if="isShowCoverInfo" :style="coverInfoMaskStyle">

        </div>
        <div class="cover-info" v-if="isShowCoverInfo" :style="imgSize">

            <text class="cover-title" :style="{'fontSize':titleFontSize}">{{title}}</text>

        </div>

        <div class="cover-play" :style="imgSize" v-if="playBtnShown">
            <image class="play-icon" resize="contain" src="./img/mike/video_play.png"></image>
        </div>


        <div class="info" v-if="isShowUnderlineInfo">
            <text class="title">{{title}}</text>


            <div class="other">

                <div class="favs other-item">
                    <image src="./img/mike/heart_gray.png" resize="contain" class="fav-icon"></image>

                    <text class="other-item-text">1.2k</text>
                </div>

                <div class="views other-item">

                    <image src="./img/mike/eye_view.png" resize="contain" class="view-icon"></image>

                    <text class="other-item-text">600</text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import nativeService from "@/common/services/nativeService";

    export default {
        name: "recipeCollectionItem",
        props: {
            collectionId: {
                type: String,
                default: ''
            },
            recipeId: {
                type: String,
                default: ''
            },
            first: {
                type: Boolean,
                default: false
            },
            cover: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            fav_num: {
                type: String,
                default: ''
            },
            views: {
                type: String,
                default: ''
            },
            imgWidth: {
                type: Number,
                default: 288
            },
            imgHeight: {
                type: Number,
                default: 192
            },
            titleFontSize: {
                type: Number,
                default: 18 * 2
            },
            playBtnShown: {
                type: Boolean,
                default: false
            },

            infoDisplayStyle: {
                type: String,
                default: 'Underline' // Underline : 底部显示(附带收藏、阅读信息) Cover:图片上显示
            }
        },
        computed: {

            isShowUnderlineInfo() {
                return this.infoDisplayStyle === 'Underline'
            },
            isShowCoverInfo() {

                return this.infoDisplayStyle === 'Cover'
            },
            coverInfoMaskStyle() {

                return {
                    width: this.imgWidth + 'px',
                    top: (this.imgHeight - 170) + 'px'
                }
            },
            imgSize() {


                return {
                    width: this.imgWidth + 'px',
                    height: this.imgHeight + 'px'
                }
            }
        },
        methods: {
            clickOnItem() {

                if (this.recipeId && this.recipeId.length > 0) {


                    nativeService.goTo('detail.js', {animate: true}, {params: {id: this.recipeId}})
                    return;
                }

                if (this.collectionId && this.collectionId.length > 0) {

                    nativeService.goTo('detail.js', {animate: true}, {params: {id: this.collectionId}})
                }


            }
        },
    }
</script>
