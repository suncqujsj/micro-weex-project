<style scoped lang="less">

    .recipe-search-bar {

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        background-color: #ffffff;
    }

    .search-input {
        /*border-width: 2px;*/

        /*border-color: #0e80d2;*/
        /*border-style: solid;*/
        width: 320px;
    }

    .search-input-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;

        justify-content: space-between;
        background-color: #e6e6e6;
        border-radius: 30px;

        width: 436px;
        height: 56px;
    }


    .icon {
        width: 46px;
        height: 38px;
    }

    .search-icon {
        margin-left: 20px;
        width: 28px;
        height: 29px;
    }

    .microphone-icon {
        width: 23px;
        height: 33px;
        margin-right: 25px;
    }

    .breadcrumb {
        padding-left: 40px;
    }

    .camera {
        padding-right: 40px;
    }

</style>

<template>

    <div class="recipe-search-bar">

        <div class="breadcrumb">
            <image src="./img/mike/menu_breadcrumb.png" resize="contain" class="icon">
        </div>


        <div class="search-input-wrapper">


            <image src="./img/mike/search.png" resize="contain" class="search-icon"></image>
            <input type="text" class="search-input"></input>

            <image src="./img/mike/microphone.png" resize="contain" class="microphone-icon"></image>
        </div>
        <div class="camera">
            <image src="./img/mike/camera_dark.png" resize="contain" class="icon">
        </div>
    </div>
</template>

<script>
    export default {
        name: "recipeSearchBar"
    }
</script>

