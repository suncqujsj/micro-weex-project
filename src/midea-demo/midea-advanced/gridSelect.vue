<template>
    <div class="wrapper">
        <midea-header title="GridSelect" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div style="padding:24px">
            <text style="font-size:28px">自定义</text>
        </div>
        <div style="padding-left:24px;padding-right:24px">
            <midea-grid-select :cols="7" :customStyles="{width:'90px',height:'48px'}" :list="testData1" @select="itemSelected">
            </midea-grid-select>
        </div>
        <div style="padding:24px;">
            <midea-grid-select :cols="7" :customStyles="{width:'90px',height:'48px'}" :list="testData2" @select="itemSelected">
            </midea-grid-select>
        </div>

        <div style="padding:24px">
            <text style="font-size:28px">默认选中框</text>
        </div>
        <div style="padding-left:24px;padding-right:24px">
            <midea-grid-select :list="testData" @select="itemSelected">
            </midea-grid-select>
        </div>
        <div style="padding:24px">
            <text style="font-size:28px">单选选中框</text>
        </div>
        <div style="padding-left:24px;padding-right:24px">
            <midea-grid-select :list="testData" :single="true" @select="itemSelected">
            </midea-grid-select>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
  background-color: #f2f2f2;
  position: relative;
}
</style>
<script>  
import base from '../base'

import mideaGridSelect from '@/component/optionList.vue'
import nativeService from '@/common/services/nativeService'
const modal = weex.requireModule('modal');

module.exports = {
    components: { mideaGridSelect },
    mixins: [base],
    data() {
        return {
            testData: [
                {
                    'title': '北京',
                    'checked': true
                },
                {
                    'title': '上海'
                },
                {
                    'title': '广州',
                },
                {
                    'title': '深圳'
                },
                {
                    'title': '天津',
                },
                {
                    'title': '杭州'
                }
            ],
            testData1: [
                {
                    'title': '重复',
                    'checked': true
                },
                {
                    'title': '一次'
                }
            ],
            testData2: [
                {
                    'title': '一',
                    'index': 0
                },
                {
                    'title': '二',
                    'checked': true,
                    'index': 1

                },
                {
                    'title': '三',
                    'checked': true,
                    'index': 2

                },
                {
                    'title': '四',
                    'index': 3
                },
                {
                    'title': '五',
                    'index': 4
                },
                {
                    'title': '六',
                    'index': 5
                },
                {
                    'title': '日',
                    'index': 0
                }
            ]
        }
    },
    methods: {
        itemSelected(e) {
            //console.log(e.checkedList)
            //nativeService.toast(JSON.stringify(e.checkedList));
        }

    },
    created() {
        this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>