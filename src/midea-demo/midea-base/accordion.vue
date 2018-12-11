<template>
    <div class="wrapper">
        <midea-header title="Accordion" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller>
            <midea-accordion title="米种设置">
                <div slot="content" class="accordion-content">
                    <div v-for="(item, index) in list" class="accordion-item" :key="index" @click="selectItem(item, index)">
                        <div class="icon-wrpper">
                            <image v-if="selectedIndex==index" class="check-icon" src="../assets/img/public_ic_done@3x.png" resize="contain"></image>
                        </div>
                        <div class="label-wrpper">
                            <text class="accordion-item-label" :class="[selectedIndex === index?'accordion-item-label-active':'']">{{item.title}}</text>
                        </div>
                    </div>
                </div>
            </midea-accordion>

            <midea-accordion title="设置">
                <div slot="content">
                    <midea-checkbox-list :list="list">
                    </midea-checkbox-list>
                </div>
            </midea-accordion>

            <midea-accordion title="设置">
                <div slot="content">
                    <midea-checkbox-list :list="list">
                    </midea-checkbox-list>
                </div>
            </midea-accordion>
        </scroller>
    </div>
</template>

<style>
.accordion-content {
  background-color: #f6f6f6;
}
.accordion-item {
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
}
.icon-wrpper {
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 60px;
  width: 70px;
}
.check-icon {
  height: 40px;
  width: 40px;
}
.label-wrpper {
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-right: 24px;
  border-bottom-color: #e5e5e8;
  border-bottom-width: 1px;
}
.accordion-item-label {
  flex: 1;
  line-height: 40px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #666666;
}
.accordion-item-label-active {
    color: #267aff;
}
</style>

<script>
import base from '../base'
import MideaAccordion from '@/midea-component/accordion.vue'
import mideaCheckboxList from '@/midea-component/checkboxList.vue'

import nativeService from '@/common/services/nativeService'
export default {
    components: { MideaAccordion, mideaCheckboxList },
    mixins: [base],
    data: () => ({
        list: [
            { title: '一路开关面板', value: 1 },
            { title: '二路开关面板', value: 2 },
            { title: '三路开关面板三路开关面板三路开关面板三路开关面板三路开关面板', value: 3 },
            { title: '四路开关面板', value: 4 }
        ],
        selectedIndex: null,
        menus: [
            {
                name: '标题标题标题标题标题',
                iconPath: '',
                subMenu: [{
                    title: 'a1',
                    key: ''
                }, {
                    title: 'a2',
                    key: ''
                }, {
                    title: 'a3',
                    key: ''
                }, {
                    title: 'a4',
                    key: ''
                }, {
                    title: 'a5',
                    key: ''
                }, {
                    title: 'a6',
                    key: ''
                }, {
                    title: 'a7',
                    key: ''
                }]
            }, {
                name: '标题标题标题标题标题标题标题',
                subMenu: [{
                    title: 'b1',
                    key: ''
                }]
            }
        ]
    }),
    methods: {
        selectItem(item, index) {
            this.selectedIndex = index
            nativeService.toast("选中了第" + this.selectedIndex + "项")
        }
    },
    created() {
    }
};
</script>