<template>
    <div class="wrapper">
        <midea-header title="Progress" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-progress style="margin-top:24px" v-if="bgColorProgressVisible" :value="value" :bar-width="702"></midea-progress>
        <midea-button text="显示带背景色进度条" @mideaButtonClicked="showProgress('bgColorProgressVisible')">
        </midea-button>

        <midea-progress style="margin-top:24px" v-if="progressVisible" :value="value" :bar-width="702" :needGradient="true"></midea-progress>
        <midea-button text="显示带渐变颜色进度条" @mideaButtonClicked="showProgress('progressVisible')">
        </midea-button>

        <midea-button text="显示进度条面板" @mideaButtonClicked="showProgressDialog()">
        </midea-button>
        <midea-progress-dialog title="加载进度" :show="isShowDiaglog" :value="value" @onProgressDialogClose="onDialogClose">
        </midea-progress-dialog>
    </div>
</template>
<style scoped>
.wrapper {
  align-items: center;
}
</style>
<script> 
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaProgress from '@/midea-component/mProgress.vue';
import mideaProgressDialog from '@/midea-component/mProgressDialog.vue';
const modal = weex.requireModule('modal');

module.exports = {
    components: { mideaButton, mideaProgress, mideaProgressDialog },
    mixins: [base],
    data() {
        return {
            value: 0,
            uploading: false,
            progressVisible: false,
            bgColorProgressVisible: false,
            timer: null,
            isShowDiaglog: false
        }
    },
    methods: {
        showProgressDialog() {
            var self = this;
            self.isShowDiaglog = true;

            if (!self.uploading) {
                self.value = 0;
                self.uploading = true;
                self.timer = setInterval(function () {
                    if (self.value < 100) {
                        self.value++;
                    } else {
                        //setTimeout(() => {
                        self.uploading = false;
                        //}, 500);
                        clearInterval(self.timer);
                        self.isShowDiaglog = false;
                        self.value = 0;
                    }
                }, 100);
            }
        },
        onDialogClose() {
            clearInterval(this.timer);
            this.value = 0;
            this.uploading = false;
            this.isShowDiaglog = false;
        },
        showProgress(type) {
            var self = this;
            if (!self.uploading) {
                self.value = 0;
                self.uploading = true;
                self[type] = true;
                self.timer = setInterval(function () {
                    if (self.value < 100) {
                        self.value++;
                    } else {
                        setTimeout(() => {
                            self.uploading = false;
                            self[type] = false;
                        }, 500);
                        clearInterval(self.timer);
                    }
                }, 100);
            }
        }
    },
    created() {
        //this.isIos = weex.config.env.platform == 'iOS' ? true : false;
    }
};
</script>