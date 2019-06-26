<template>

    <div class="recipe-share-list-item">

        <image class="bg" src="./img/mike/round-shadow-bg.png" resize="contain"></image>

        <div class="share-content">
            <image class="menu-image" src="https://via.placeholder.com/604x352?text=Loading"></image>


            <div class="menu-info">

                <div class="basic">
                    <text class="menu-name">{{menu.name}}</text>
                    <text class="time">2019.6.10</text>
                </div>
                <div class="fav">
                    <image src="./img/mike/heart_gray.png" resize="contain" class="fav-icon"></image>

                    <text class="fav-num">1.2k</text>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "recipeShareListItem",
        props: {
            menu: {
                type: Object,
                default: {}
            },
        },
    }
</script>

<style scoped lang="less">

    .recipe-share-list-item {

        position: relative;
        margin-bottom: 50px;
    }

    .bg {
        width: 636px;
        height: 540px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .share-content {

        display: flex;
        flex-direction: column;
    }

    .menu-image {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        margin-left: 16px;
        width: 604px;
        height: 352px;

    }

    .menu-info {

        margin-left: 16px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 50px 0 40px 0;
    }

    .basic {
        padding-left: 50px;
    }

    .menu-name {
        font-size: 16px*2;
        color: #1a1a1a;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .time {
        font-size: 11px*2;
        color: #666666;
    }

    .fav {
        padding-right: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .fav-icon {
        width: 43px;
        height: 39px;
        margin-bottom: 14px;
    }

    .fav-num {
        font-size: 10px*2;
        color: #b3b3b3;

    }

</style>