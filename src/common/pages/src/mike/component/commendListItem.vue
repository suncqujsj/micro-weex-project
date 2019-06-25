<template>

    <div class="commend-list-item">


        <text class="type commend-text">{{type}}</text>

        <text class="degree commend-text">{{degree}}</text>

        <text class="time commend-text">{{time}}</text>
    </div>

</template>

<script>
    export default {
        name: "commendListItem",
        props: {
            type: {
                type: String,
                default: ''
            },
            degree: {
                type: String,
                default: ''
            },
            time: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style scoped lang="less">

    .commend-list-item {

        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #bfbfbf;
        border-radius: 20px;
        padding: 30px 55px;
        margin-bottom: 15px;

    }

    .commend-text {

        color: #fefefe;
        font-size: 17px*2;

    }

    .type {
        margin-right: 33px;
    }

    .degree {
        margin-right: 26px;
    }

</style>