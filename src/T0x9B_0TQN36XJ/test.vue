<style lang="less" type="text/less">
    @import "../common/less/common";

</style>

<template>
    <div class="bg-gray" :style="{height: wrapHeight}">

        <midea-header class="bg-white" title="智能语音" titleText="black" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back"></midea-header>

        <list style="margin-top: 24px" show-scrollbar="true">
            <template v-for="item in list">
                <midea-cell v-if="item.type === 'link'" :title="item.title" :hasArrow="true" :hasMargin="true" :hasTopBorder="false" :clickActivied="true" @mideaCellClick="item.event"></midea-cell>
                <midea-cell v-if="item.type === 'switch'" :title="item.title" @mideaCellClick="test" :hasArrow="false">
                    <midea-switch2 class="value" slot="value"> </midea-switch2>
                </midea-cell>
            </template>
        </list>

        <midea-confirm :show="show" @mideaPopupOverlayClicked="popupOverlayBottomClick" :title="title" :content="content" :leftBtnText="leftBtnText" :rightBtnText="rightBtnText" @leftBtnClick="leftBtnClick" @rightBtnClick="rightBtnClick">
        </midea-confirm>

    </div>
</template>

<script>
    import mideaHeader from '@/midea-component/header.vue'
    import mideaCell from '@/midea-component/item.vue';
    import mideaSwitch2 from '@/midea-component/switch2.vue'
    import mideaConfirm from '@/midea-component/confirm.vue'

    import nativeService from "../common/services/nativeService";
    import commonMixin from  "./utils/mixins/common.js"

    export default {
        mixins: [commonMixin],
        data(){
            return {
                list:[
                    {
                        title: '语音功能',
                        type: 'switch',
                        value: false,
                        event: this.test
                    },
                    {
                        title: '语音控制授权',
                        type: 'link',
                        value: '',
                        event: this.alert
                    },
                    {
                        title: '软件更新',
                        type: 'link',
                        value: '',
                        event: this.test
                    }
                ],
                show: false,
                title: '授权协议',
                content: '以下是语音控制的授权协议，点击确定授权默认您同意我们的协议。',
                leftBtnText: '取消',
                rightBtnText: '确定授权'
            }
        },
        components: {mideaHeader, mideaCell, mideaSwitch2, mideaConfirm},
        created(){

        },
        computed:{
        },
        methods: {
            back: function(){
                nativeService.goBack();
            },
            test: function(){},
            alert: function(){
                this.show = true;
            },
            link: function(item){
                nativeService.weexBundleToWeb({
                    url: item.link,
                    title: '测试'
                })
            },
            leftBtnClick() {

            },
            rightBtnClick() {

            },
            popupOverlayBottomClick() {
                this.show = false;
            },
            mideaCheckBoxListChecked(e) {
                this.checkedList = e.checkedList;
            }
        }
    }
</script>


