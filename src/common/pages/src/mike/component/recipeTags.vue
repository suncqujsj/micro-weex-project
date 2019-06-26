<template>

    <scroller class="recipe-tags" scroll-direction="horizontal" show-scrollbar="false">

        <div class="tag-item" v-for="(tag,index) in tags" :class="[tag.selected  && 'checked',index===0 && 'first']"
             @click="clickOnTag(tag)">
            <text class="tag-text" :class="[tag.selected  && 'tag-text-checked']">{{tag.name}}</text>
        </div>
    </scroller>
</template>

<script>

    export default {
        name: "recipeTags",
        props: {
            tags: {
                type: Array,
                default: []
            },
        },
        mounted() {

        },
        methods: {
            clickOnTag(tag) {

                this.tags.forEach((item) => {
                    item.selected = item.id === tag.id;
                })

                this.$emit("onRecipeTagChanged", tag)
            }
        },
    }
</script>

<style scoped lang="less">

    .recipe-tags {
        height: 64px;
        width: 750px;
        margin-bottom: 10px;

        display: flex;
        flex-direction: row;
    }

    .tag-item {

        justify-content: center;
        align-items: center;

        padding: 8px 30px;
        border-radius: 30px;


    }

    .first {
        margin-left: 30px;
    }

    .tag-text {
        font-size: 13px*2;
        color: #808080;
    }

    .tag-text-checked {
        color: #ffffff;
    }

    .checked {

        background-color: #095cb9;
    }
</style>