<template>
<div :class="['wrap',isActive&&'wrap-active']" @click="clickItem">
    <div class="content">
        <div class="title"><text :class="['title-text',isActive&&'title-text-active']">{{title}}</text></div>
        <div class="desc"><text :class="['desc-text',isActive&&'desc-text-active']">{{desc}}</text></div>
    </div>
    <image class="icon" :src='iconSrc' />
</div>
</template>

<style>
.wrap {
    margin: 32px 32px 0 32px;
    border-radius: 8px;
    height: 160px;
    width: 686px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    background-color: #F6F6F6;
}

.wrap-active {
    background-color: #FFAA10;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 36px 0;
    height: 160px;
}

.title {}

.desc {}

.title-text {
    font-size: 32px;
    color: #000000;
}

.title-text-active {
    font-size: 32px;
    color: #ffffff;
}

.desc-text {
    font-size: 24px;
    color: #8a8a8f;
}

.desc-text-active {
    font-size: 24px;
    color: #ffffff;
}

.icon {
    width: 96px;
    height: 96px;
}
</style>

<script>
// 电热水器底部弹框confirmBox用的cell
export default {
    props: {
        title: {
            type: String,
            default: 'title'
        },
        desc: {
            type: String,
            default: 'desc'
        },
        iconSrc: {
            type: String,
            default: ''
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clickItem() {
            this.$emit('click', this.title)
        }
    }
}
</script>
