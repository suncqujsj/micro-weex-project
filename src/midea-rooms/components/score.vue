<template>
    <div class="row-sb" :style="wrapStyle">
        <div v-for="item in indexList">
            <image v-if="item <= score" :src="starPath" class="star" :style="starStyle"></image>
            <image v-else :src="unstarPath" class="star" :style="starStyle"></image>
        </div>
    </div>
</template>
<style>
    .row-sb{
        flex-direction: row; align-items: center; justify-content: space-between;
    }
    .star{
        width: 50px;
        height: 50px;
    }
</style>
<script>
export default {
    props: {
        starWidth: {
            type: [Number, String],
            default: 50
        },
        score: {
            type: [Number, String],
            default: 0
        },
        starPath: {
            type: String,
            default: 'assets/img/scene_ic_ratefull@3x.png'
        },
        unstarPath: {
            type: String,
            default: 'assets/img/scene_ic_ratehalf@3x.png'
        },
    },
    computed: {
        wrapStyle(){
            return {
                width: (this.starWidth * 5) + 'px',
                height: this.starWidth + 'px',
            }
        },
        starStyle(){
            return {
                width: this.starWidth + 'px',
                height: this.starWidth + 'px'
            }
        }
    },
    data(){
        return {
            indexList: [1, 2, 3, 4, 5]
        }
    },
    mounted: {

    }
}
</script>


