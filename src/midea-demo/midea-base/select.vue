<template>
    <div class="wrapper">
        <midea-header title="Select" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller class="wrapper">
            <midea-button text="默认选择列表" @mideaButtonClicked="isShow = true">
            </midea-button>
            <midea-select :show="isShow" title="选择设备" :items="list" :index="index" @close="isShow=false" @itemClick="itemClick"></midea-select>
            <text>{{result}}</text>

            <midea-button text="默认选择列表1" @mideaButtonClicked="isShow1 = true">
            </midea-button>
            <text>{{result1}}</text>
            <midea-select :show="isShow1" title="选择设备1" :items="list1" :index="index1" @close="isShow1=false" @itemClick="itemClick1"></midea-select>

            <midea-button text="点击背景不关闭" @mideaButtonClicked="isShow2 = true">
            </midea-button>
            <text>{{result2}}</text>
            <midea-select :show="isShow2" title="选择设备2" :items="list2" :index="index2" @close="isShow2=false" @itemClick="itemClick2" :hideOnMask="false"></midea-select>

            <midea-button text="自定义显示个数" @mideaButtonClicked="isShow3 = true">
            </midea-button>
            <text>{{result3}}</text>
            <midea-select :show="isShow3" title="选择设备3" :items="list3" :index="index3" :rows="9" @close="isShow3=false" @itemClick="itemClick3" keyField="otherKey" valueField="otherValue"></midea-select>

            <midea-button text="自定义显示字段" @mideaButtonClicked="isShow4 = true">
            </midea-button>
            <text>{{result4}}</text>
            <midea-select :show="isShow4" title="选择设备4" :items="list4" :index="index4" @close="isShow4=false" @itemClick="itemClick4" keyField="otherKey" valueField="otherValue"></midea-select>

            <midea-button text="自定义显示字段(组合)" @mideaButtonClicked="isShow5 = true">
            </midea-button>
            <text>{{result5}}</text>
            <midea-select :show="isShow5" title="选择设备5" :items="list5" :index="index5" @close="isShow5=false" @itemClick="itemClick5" keyField="otherKey" :valueField="['value',' ','otherValue']"></midea-select>

        </scroller>
    </div>
</template>
<style scoped>
.wrapper {
  background-color: #f2f2f2;
}
</style>
<script>  
import base from '../base'
import mideaButton from "@/midea-component/button.vue";
import mideaSelect from "@/midea-component/mSelect.vue";
import nativeService from "@/common/services/nativeService";

module.exports = {
    components: { mideaButton, mideaSelect },
    mixins: [base],
    data() {
        return {
            isShow: false,
            isShow1: false,
            isShow2: false,
            isShow3: false,
            isShow4: false,
            isShow5: false,
            result: "",
            result1: "",
            result2: "",
            result3: "",
            result4: "",
            result5: "",
            index: 1,
            index1: 1,
            index2: 2,
            index3: 2,
            index4: 2,
            index5: 4,
            list: [
                { value: "清蒸鱼", key: 0, otherKey: "other0", otherValue: "清蒸鱼" },
                { value: "蒜蓉粉蒸虾", key: 1, otherKey: "other1", otherValue: "蒜蓉粉蒸虾" },
                { value: "清蒸大闸蟹", key: 2, otherKey: "other2", otherValue: "清蒸大闸蟹" },
                { value: "蒜蓉粉蒸扇贝", key: 3, otherKey: "other3", otherValue: "蒜蓉粉蒸扇贝", disabled: true },
                { value: "蒸排骨", key: 4, otherKey: "other4", otherValue: "蒸排骨" },
                { value: "粉蒸肉", key: 5, otherKey: "other5", otherValue: "粉蒸肉" },
                { value: "香菇蒸滑鸡", key: 6, otherKey: "other6", otherValue: "香菇蒸滑鸡" },
                { value: "蒸氺蛋", key: 7, otherKey: "other7", otherValue: "蒸氺蛋" },
                { value: "蒸米饭", key: 8, otherKey: "other8", otherValue: "蒸米饭" }
            ]
        };
    },
    computed: {
        list1() {
            return this.list.slice(1, 3);
        },
        list2() {
            return this.list;
        },
        list3() {
            return this.list;
        },
        list4() {
            return this.list;
        },
        list5() {
            return this.list;
        }
    },
    methods: {
        itemClick(event) {
            nativeService.toast(event.index);
            this.index = event.index;
            this.result =
                "返回 => index:" + event.index + " key:" + event.key + "\n" + "object:" + JSON.stringify(event.item);
        },
        itemClick1(event) {
            nativeService.toast(event.index);
            this.index1 = event.index;
            this.result1 =
                "返回 => index:" + event.index + " key:" + event.key + "\n" + "object:" + JSON.stringify(event.item);
        },
        itemClick2(event) {
            nativeService.toast(event.index);
            this.index2 = event.index;
            this.result2 =
                "返回 => index:" + event.index + " key:" + event.key + "\n" + "object:" + JSON.stringify(event.item);
        },
        itemClick3(event) {
            nativeService.toast(event.index);
            this.index3 = event.index;
            this.result3 =
                "返回 => index:" + event.index + " key:" + event.key + "\n" + "object:" + JSON.stringify(event.item);
        },
        itemClick4(event) {
            nativeService.toast(event.index);
            this.index4 = event.index;
            this.result4 =
                "返回 => index:" + event.index + " key:" + event.key + "\n" + "object:" + JSON.stringify(event.item);
        },
        itemClick5(event) {
            nativeService.toast(event.index);
            this.index5 = event.index;
            this.result5 =
                "返回 => index:" + event.index + " key:" + event.key + "\n" + "object:" + JSON.stringify(event.item);
        }
    },
    created() {
        //this.isIos = weex.config.env.platform == "iOS" ? true : false;
    }
};
</script>