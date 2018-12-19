<template>
    <div class="wrapper">
        <midea-header title="List" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <list>
            <midea-item v-for="(item,i) in list2" :key="item" :hasTopBorder="i===0?true:false" :title="item.name" :hasArrow="false" :clickActivied="true" @onItemPress="showDel(item)" :cantEdit="true" @onDelete="delItem(item)">
                <midea-switch2 :checked="mideaChecked" @change="onMideachange" width="106" height="48" slot="value"></midea-switch2>
            </midea-item>
            <midea-item v-for="(item,i) in list" :key="item" :hasTopBorder="false" :title="item.name" :hasArrow="true" :clickActivied="true" @onItemPress="showDel(item)" :cantEdit="true" @onDelete="delItem(item)">
            </midea-item>
            <midea-item v-for="(item,i) in list1" :key="item" :hasTopBorder="false" :title="item.name" :hasArrow="false" :desc="item.desc" :itemImg="item.itemImg" height="220" :clickActivied="true" @onItemPress="showDel(item)" :cantEdit="true" @onDelete="delItem(item)">
            </midea-item>

        </list>
        <midea-operation-modal :show="showDelModal" @close="closeDelModal" @onDelete="deleteRow">
        </midea-operation-modal>
    </div>
</template>
<style scoped>
.wrapper {
  background-color: #f2f2f2;
}
.indicator {
  height: 60;
  width: 60;
  color: #00b9ef;
}
.text-indicator {
  width: 750;
  color: #999999;
  font-size: 28px;
  text-align: center;
}
.refresh-view {
  height: 120px;
  width: 750px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<script> 
import base from '../base'

import mideaItem from '@/midea-component/item.vue'
import mideaCell from '@/component/cell.vue'
import mideaSwitch2 from '@/midea-component/switch2.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');

export default {
    components: { mideaItem, mideaCell, mideaSwitch2 },
    mixins: [base],
    data() {
        return {
            refreshing: 'hide',
            showDelModal: false,
            startIndex: 16,
            loadMore: true,
            mideaChecked: true,
            list: [
                { "name": "云食普" },
            ],
            list2: [
                { "name": "童锁" },
            ],
            list1: [
                { "name": "普京和特朗普未能会谈 克里姆宁宫 都怪美国", "desc": "美居活动 2017-12-25", "itemImg": "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png" },
                { "name": "普京和特朗普未能会谈 克里姆宁宫 都怪美国", "desc": "美居活动 2017-12-25", "itemImg": "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png" },
                { "name": "普京和特朗普未能会谈 克里姆宁宫 都怪美国", "desc": "美居活动 2017-12-25", "itemImg": "../img/check/checked.png" }
            ]
        }
    },
    methods: {
        deleteRow() {
            this.showDelModal = false;
        },
        closeDelModal() {
            this.showDelModal = false;
        },
        showDel(item) {
            this.showDelModal = true;
            this.editItem = item;
        },
        delItem(item) {

        },
        onMideachange(event) {
            this.mideaChecked = event.value;
            //nativeService.toast(this.checked);
        },
    },
    created() {
        //this.isIos=weex.config.env.platform=='iOS'?true:false;
    }
};
</script>