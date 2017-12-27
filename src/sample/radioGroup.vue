<template>
  <div class="wrapper" :style="{paddingTop:isIos?'40px':'0px'}">
    <midea-button text="点击弹出选择列表" type="green" @mideaButtonClicked="openSelect">
    </midea-button>
    <m-radio-group :show="isShow" title="选择设备" :items="list" :index="index" @close="isShow=false" @itemClick="itemClick"></m-radio-group>
    <text>{{result}}</text>

    <midea-button text="点击弹出选择列表1" type="green" @mideaButtonClicked="openSelect1">
    </midea-button>
    <text>{{result1}}</text>
    <m-radio-group :show="isShow1" title="选择设备1" :items="list1" :index="index1" :hideOnMask="false" @close="isShow1=false" @itemClick="itemClick1"></m-radio-group>

    <midea-button text="点击弹出选择列表2" type="green" @mideaButtonClicked="openSelect2">
    </midea-button>
    <text>{{result2}}</text>
    <m-radio-group :show="isShow2" title="选择设备2" :items="list2" :index="index2" :rows="3" @close="isShow2=false" @itemClick="itemClick2"></m-radio-group>
  </div>
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
      result: "",
      result1: "",
      result2: "",
      index: null,
      index1: null,
      index2: null,
      list: []
    };
  },
  computed: {
    list1() {
      return this.list.slice(1, 3);
    },
    list2() {
      return this.list;
    }
  },
  methods: {
    openSelect() {
      this.isShow = true;
    },
    openSelect1() {
      this.isShow1 = true;
    },
    openSelect2() {
      this.isShow2 = true;
    },
    itemClick(event) {
      nativeService.toast(event.index);
      this.index = event.index;
      this.result = "第" + event.index + "个：" + JSON.stringify(event.item);
    },
    itemClick1(event) {
      nativeService.toast(event.index);
      this.index1 = event.index;
      this.result1 = "第" + event.index + "个：" + JSON.stringify(event.item);
    },
    itemClick2(event) {
      nativeService.toast(event.index);
      this.index2 = event.index;
      this.result2 = "第" + event.index + "个：" + JSON.stringify(event.item);
    }
  },
  created() {
    this.isIos = weex.config.env.platform == "iOS" ? true : false;
    for (let index = 0; index < 10; index++) {
      this.list.push({
        value: "四路开关" + index,
        key: index
      });
    }
  }
};
</script>