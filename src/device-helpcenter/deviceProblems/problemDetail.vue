<template>
    <div class="wrapper">
        <midea-header ref="header" :title="title" bgColor="#ffffff" :isImmersion="isImmersion" :showLeftImg="true" @leftImgClick="back">
        </midea-header>
        <scroller class="scroller">
            <div class="group-gap-top"></div>
            <div class="detail-content" v-if="problemDetail">
                <div v-if="typeof problemDetail.detailTitle !== 'undefined'">
                    <text class="detail-title">{{problemDetail.detailTitle}}</text>
                </div>

                <div v-if="typeof problemDetail.descTypes !== 'undefined'">
                    <div class="detail-step" v-for="(descType, index0) in problemDetail.descTypes" :key="descType.descName">
                        <text class="detail-title">{{descType.descName}}</text>

                        <div v-for="(step1, index1) in descType.steps" :key="index1">
                            <text class="tip-info">{{(index1 + 1) + '. ' + step1}}</text>
                        </div>
                    </div>
                </div>

                <div v-if="typeof problemDetail.placeholder !== 'undefined'">
                    <text class="placeholder-info">{{problemDetail.placeholder}}</text>
                </div>

                <div v-if="typeof problemDetail.failTypes !== 'undefined'">
                    <div class="detail-step" v-for="(failType, index2) in problemDetail.failTypes" :key="failType.failName">
                        <text class="detail-title">{{failType.failName}}</text>
                        <text class="tip-info">{{failType.failDesc}}</text>
                        <text class="tip-title">{{failType.solution}}</text>
                        <text class="tip-info" v-if="typeof failType.tryAgain !== 'undefined'">{{failType.tryAgain}}</text>
                        <div v-for="(step2, index3) in failType.steps" :key="index3">
                            <text class="tip-info">{{(index3 + 1) + '. ' + step2}}</text>
                        </div>
                        <text class="tip-info" v-if="typeof failType.otherOpe !== 'undefined'">{{failType.otherOpe}}</text>
                        <text class="tip-info" v-if="typeof failType.otherOpeDesc !== 'undefined'">{{failType.otherOpeDesc}}</text>
                    </div>
                </div>

                <div v-if="typeof problemDetail.descSteps !== 'undefined'">
                    <div v-for="(step3, index4) in problemDetail.descSteps" :key="index4">
                        <text class="tip-info">{{(index4 + 1) + '. ' + step3}}</text>
                    </div>
                </div>

                <div v-if="typeof problemDetail.aboveInfo !== 'undefined'">
                    <text class="tip-info">{{problemDetail.aboveInfo}}</text>
                </div>

                <div v-if="typeof problemDetail.descInfos !== 'undefined'">
                    <div v-for="(info, index5) in problemDetail.descInfos" :key="index5">
                        <text class="tip-info">{{info}}</text>
                    </div>
                </div>

                <div class="detail-step" v-if="typeof problemDetail.detailStep !== 'undefined'">
                    <text class="detail-title">{{problemDetail.detailStep}}</text>
                </div>

                <div v-if="typeof problemDetail.tipTitle !== 'undefined'">
                    <text class="tip-title">{{problemDetail.tipTitle}}</text>
                </div>

                <div v-if="typeof problemDetail.tipInfo !== 'undefined'">
                    <text class="tip-info">{{problemDetail.tipInfo}}</text>
                </div>

                <div class="detail-step" v-if="typeof problemDetail.delTipTitle !== 'undefined'">
                    <text class="detail-title">{{problemDetail.delTipTitle}}</text>
                </div>

                <div v-if="typeof problemDetail.delTipInfo !== 'undefined'">
                    <text class="tip-info">{{problemDetail.delTipInfo}}</text>
                </div>

                <div class="detail-step" v-if="typeof problemDetail.outTipTitle !== 'undefined'">
                    <text class="detail-title">{{problemDetail.outTipTitle}}</text>
                </div>

                <div v-if="typeof problemDetail.outTipInfo !== 'undefined'">
                    <text class="tip-info">{{problemDetail.outTipInfo}}</text>
                </div>
            </div>
            <div class="group-gap-bottom"></div>
        </scroller>
    </div>
</template>

<script>
import base from '../base'
import nativeService from '../settings/nativeService'
import menus from '../menuData';

export default {
    mixins: [base],
    data() {
        return {
            id: '',
            title: '',
            menus: menus,
            problemDetail: null,
            scrollHeight: 1238
        }
    },

    methods: {
        // 获取本地存储的问题详情数据
        getDetail() {
            let groupId = this.id.substr(0, 2)
            let groupItems = this.menus.filter((item) => {
                return item.id == groupId
            })
            if (groupItems && groupItems.length > 0) {
                let subMenu = groupItems[0].subMenus.filter((item) => {
                    return item.id == this.id
                })
                if (subMenu && subMenu.length > 0) {
                    this.problemDetail = subMenu[0] || {}
                    this.title = this.problemDetail.title || '使用帮助';
                }
            }
        }
    },

    mounted() {
    },

    created() {
        this.id = nativeService.getParameters('id') || null
        this.getDetail();
    }
}
</script>

<style scoped>
.wrapper {
  flex: 1;
  background-color: #f2f2f2;
}

.scroller {
  flex: 1;
}

.group-gap-top {
  height: 24px;
}

.group-gap-bottom {
  height: 100px;
  background-color: #fff;
}
.detail-content {
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  background-color: #fff;
}

.detail-title {
  font-family: PingFangSC-Medium;
  font-size: 28px;
  font-weight: 600;
  color: #000;
}

.detail-step {
  padding-top: 24px;
}

.tip-title {
  padding-top: 40px;
  font-family: PingFangSC-Medium;
  line-height: 36px;
  font-size: 24px;
  font-weight: 600;
  color: #000;
}

.tip-info {
  padding-top: 8px;
  font-family: PingFangSC-Regular;
  line-height: 36px;
  font-size: 24px;
  color: #666;
}
.placeholder-info {
  padding-top: 8px;
  font-family: PingFangSC-Regular;
  line-height: 36px;
  font-size: 24px;
  color: #666;
}
</style>


