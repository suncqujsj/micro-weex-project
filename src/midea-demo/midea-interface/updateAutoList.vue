<template>
    <div class="wrapper">
        <midea-header title="updateAutoList更新自动化列表" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="更新自动化列表" @mideaButtonClicked="updateAutoList">
        </midea-button>
    </div>
</template>
<style scoped>
.textarea {
  font-size: 30px;
  width: 750px;
  border-color: gray;
  margin-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 30px;
}
</style>
<script>
import base from '../base'

import mideaHeader from '@/midea-component/header.vue'
import mideaButton from '@/midea-component/button.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaHeader, mideaButton },
    mixins: [base],
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        updateAutoList(){
            nativeService.updateAutoList()
        }
    },
    created() {
    }
};
</script>