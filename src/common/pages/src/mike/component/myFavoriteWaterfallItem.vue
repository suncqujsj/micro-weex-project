<template>

    <div class="my-favorite-waterfall-item">

        <image class="image" src="https://via.placeholder.com/604x352?text=Loading" resize="cover"
               :style="imgStyle"></image>

        <text class="name">轻食塑身</text>
    </div>
</template>

<script>
    export default {
        name: "myFavoriteWaterfallItem",
        props: {
            imgWidth: {
                type: Number,
                default: 322
            },
            imgHeight: {
                type: Number,
                default: 200
            }
        },
        computed: {
            imgStyle() {
                return {
                    width: this.imgWidth + 'px',
                    height: this.imgHeight + 'px'
                }
            }
        }
    }
</script>

<style scoped lang="less">

    .my-favorite-waterfall-item {

        display: flex;
        flex-direction: column;

    }

    .image {

        border-radius: 20px;
    }

    .name {
        font-size: 12px*2;
        color: #333333;
        padding: 20px;
    }
</style>