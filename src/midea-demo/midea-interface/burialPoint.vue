<template>
    <div>
        <midea-header title="burialPoint埋点" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-button text="执行burialPoint" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
    </div>
</template>
<style>
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
        return {}
    },
    methods: {
        mideaButtonClicked() {
            nativeService.burialPoint({//埋点客厅
                pageName: 'testPageName',
                subAction: 'meiju_test_operate'
            })
        }
    },
    created() {
    }
};
</script>


