<template>
    <div class="box" @click="mideaClick">
        <image :src="data.recipeThumb + imageType" class="img"></image>
        <text class="cookbook-title">{{data.recipeName}}</text>
        <text class="cookbook-detail">{{recipeDesc}}</text>
    </div>
</template>


<script>
const modal = weex.requireModule('modal');
export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
    },
    data() {
        return {
            imageType: "/334_226"
        }
    },
    methods: {
    },
    computed: {
        recipeDesc() {
            let difficultyDesc
            switch (this.data.difficulty) {
                case 1:
                    difficultyDesc = '容易'
                    break;
                case 2:
                    difficultyDesc = '中等'
                    break;
                case 3:
                    difficultyDesc = '困难'
                    break;
                case 4:
                    difficultyDesc = '较难'
                    break;
            }
            return this.data.costTime + '分钟 | ' + difficultyDesc + ' | ' + this.data.kcal + '大卡'
        }
    }
}
</script>


<style>
.box {
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 44px;
}
.img {
  width: 334px;
  height: 226px;
  border-radius: 4px;
}
.title-img {
  width: 40px;
  height: 40px;
}
.cookbook-title {
  margin-top: 20px;
  width: 334px;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 28px;
  color: #000000;
}
.cookbook-detail {
  margin-top: 8px;
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #8a8a8f;
}
</style>
