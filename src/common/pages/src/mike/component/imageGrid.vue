<template>

    <div class="image-grid">


        <div v-for="(item,index) in images" class="image-item" :class="[index%3>0 && 'have-interval-item']">

            <image class="image" :src="item.src"
            ></image>
        </div>
    </div>
</template>

<script>
    export default {
        name: "imageGrid",
        props: {
            images: {
                type: Array,
                default: []
            },
        },
    }
</script>

<style scoped lang="less">


    .image-grid {

        display: flex;
        flex-direction: row;
        align-items: flex-start;

        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .image-item {
        margin-bottom: 13px;

    }

    .image {
        width: 215px;
        height: 215px;

    }

    .have-interval-item {

        margin-left: 12.5px;
    }
</style>