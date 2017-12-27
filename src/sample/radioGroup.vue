<template>
    <scroller class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
        <midea-button text="默认选择列表" type="green" @mideaButtonClicked="isShow = true">
        </midea-button>
        <m-radio-group :show="isShow" title="选择设备" :items="list" :index="index" @close="isShow=false" @itemClick="itemClick"></m-radio-group>
        <text>{{result}}</text>

        <midea-button text="默认选择列表1" type="green" @mideaButtonClicked="isShow1 = true">
        </midea-button>
        <text>{{result1}}</text>
        <m-radio-group :show="isShow1" title="选择设备1" :items="list1" :index="index1" @close="isShow1=false" @itemClick="itemClick1"></m-radio-group>

        <midea-button text="点击背景不关闭" type="green" @mideaButtonClicked="isShow2 = true">
        </midea-button>
        <text>{{result2}}</text>
        <m-radio-group :show="isShow2" title="选择设备2" :items="list2" :index="index2" @close="isShow2=false" @itemClick="itemClick2" :hideOnMask="false"></m-radio-group>

        <midea-button text="自定义显示个数" type="green" @mideaButtonClicked="isShow3 = true">
        </midea-button>
        <text>{{result3}}</text>
        <m-radio-group :show="isShow3" title="选择设备3" :items="list3" :index="index3" :rows="3" @close="isShow3=false" @itemClick="itemClick3" keyField="otherKey" valueField="otherValue"></m-radio-group>

        <midea-button text="自定义显示字段" type="green" @mideaButtonClicked="isShow4 = true">
        </midea-button>
        <text>{{result4}}</text>
        <m-radio-group :show="isShow4" title="选择设备4" :items="list4" :index="index4" @close="isShow4=false" @itemClick="itemClick4" keyField="otherKey" valueField="otherValue"></m-radio-group>

        <midea-button text="自定义显示字段(组合)" type="green" @mideaButtonClicked="isShow5 = true">
        </midea-button>
        <text>{{result5}}</text>
        <m-radio-group :show="isShow5" title="选择设备5" :items="list5" :index="index5" @close="isShow5=false" @itemClick="itemClick5" keyField="otherKey" :valueField="['value',' ','otherValue']"></m-radio-group>

    </scroller>
</template>
<style scoped>

</style>
<script>
import mideaButton from "../component/button.vue";
import mRadioGroup from "../midea-component/mRadioGroup.vue";
import nativeService from "../common/services/nativeService";

module.exports = {
    components: { mideaButton, mRadioGroup },
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
            index: null,
            index1: null,
            index2: null,
            index3: null,
            index4: null,
            index5: null,
            list: [
                { value: "四路开关0", key: 0, otherKey: "other0", otherValue: "其他四路开关0" },
                { value: "四路开关1", key: 1, otherKey: "other1", otherValue: "其他四路开关1" },
                { value: "四路开关2", key: 2, otherKey: "other2", otherValue: "其他四路开关2" },
                { value: "四路开关3", key: 3, otherKey: "other3", otherValue: "其他四路开关3", disabled: true },
                { value: "四路开关4", key: 4, otherKey: "other4", otherValue: "其他四路开关4" },
                { value: "四路开关四路开关四路开关四路开关四路开关四路开关5", key: 5, otherKey: "other5", otherValue: "其他四路开关5" },
                { value: "四路开关6", key: 6, otherKey: "other6", otherValue: "其他四路开关6" },
                { value: "四路开关7", key: 7, otherKey: "other7", otherValue: "其他四路开关7" },
                { value: "四路开关8", key: 8, otherKey: "other8", otherValue: "其他四路开关8" },
                { value: "四路开关9", key: 9, otherKey: "other9", otherValue: "其他四路开关9" }
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
        this.isIos = weex.config.env.platform == "iOS" ? true : false;
    }
};
</script>