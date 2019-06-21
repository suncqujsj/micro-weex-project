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
        width: 436px;
        height: 56px;
        background-color: #e6e6e6;
        border-radius: 30px;

    }

</style>

<template>

    <div class="recipe-search-bar">

        <div class="breadcrumb">
            <text>more</text>
        </div>


        <div class="search-input-wrapper">

            <input type="text" class="search-input"></input>
        </div>
        <div class="camera">
            <text>Camera</text>
        </div>
    </div>
</template>

<script>
    export default {
        name: "recipeSearchBar"
    }
</script>

