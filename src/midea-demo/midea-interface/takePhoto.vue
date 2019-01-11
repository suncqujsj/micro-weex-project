<template>
    <div class="wrapper">
        <midea-header title="takePhoto拍照" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <midea-title-bar title="接口参数:"></midea-title-bar>
        <textarea type="text" placeholder="Input Text" class="textarea" :value="messageParamString" @input="dataChange" rows=2 />
        <midea-button text="拍照" @mideaButtonClicked="mideaButtonClicked">
        </midea-button>
        <scroller>
            <midea-title-bar title="代码"></midea-title-bar>
            <text class="display-block"> nativeService.takePhoto(this.messageParam).then( (resp) => { this.result = resp })
            </text>
            <midea-title-bar title="结果"></midea-title-bar>

            <image v-if="result.filePath" :src="result.filePath" class="photo" :style="{width:'750px', height:result.height||'750px'}" @load="onImageLoad($event, result)"></image>
            <text class="display-block">{{result?('返回类型:'+typeof result):''}}</text>
            <text class="display-block">{{result}}</text>
        </scroller>
    </div>
</template>
<style scoped>
.textarea {
    font-size: 30px;
    width: 750px;
    border-color: gray;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 30px;
}
.display-block {
    font-size: 30px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.photo {
    width: 200px;
    height: 200px;
}
</style>
<script>
import base from '../base'

import mideaButton from '@/midea-component/button.vue'
import mideaTitleBar from '@/midea-component/title-bar.vue'
import nativeService from '@/common/services/nativeService'

module.exports = {
    components: { mideaButton, mideaTitleBar },
    mixins: [base],
    data() {
        return {
            messageParam: {
                compressRage: 10,
                type: 'jpg',
                isNeedBase64: false
            },
            result: ''
        }
    },
    computed: {
        messageParamString() {
            return JSON.stringify(this.messageParam)
        }
    },
    methods: {
        dataChange(event) {
            try {
                this.messageParam = JSON.parse(event.value)
            } catch (error) {
            }
        },
        mideaButtonClicked() {
            nativeService.takePhoto(this.messageParam).then(
                (resp) => {
                    this.result = resp
                }
            ).catch((error) => {
                this.result = "error: " + JSON.stringify(error || {})
            })
        },
        // 读取图片信息, 动态绑定图片高度
        onImageLoad(element) {
            // nativeService.alert("onImageLoad")
            if (element && element.size && !isNaN(element.size.naturalHeight) && !isNaN(element.size.naturalWidth)) {
                this.$set(this.result.height, 'height', ((element.size.naturalHeight * 750) / element.size.naturalWidth) || 750 + 'px')
            }
        }
    },
    created() {
    }
};
</script>