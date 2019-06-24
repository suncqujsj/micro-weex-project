<style scoped lang="less">

    .recipe-collection-item {
        display: flex;
        flex-direction: column;
        margin-right: 30px;
    }

    .first-item {

        margin-left: 55px;
    }

    .collection-cover {
        height: 192px;
        width: 288px;
        margin-bottom: 10px;
        border-radius: 20px;
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
    <div class="recipe-collection-item" :class="[first && 'first-item']">

        <!--        :style="imgSize"-->

        <image resize="cover" class="collection-cover" :src="cover" :style="imgStyle"
               placeholder="https://via.placeholder.com/288x192?text=Loading"></image>

        <div class="info">
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
    export default {
        name: "recipeCollectionItem",
        props: {
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
            }
        },
        computed: {
            imgSize() {


                return {
                    width: imgWidth + 'px',
                    height: imgHeight + 'px'
                }
            }
        }
    }
</script>
