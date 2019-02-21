<!--
 * Created by sf
 * 2019/1/2
 -->

<style lang="less" type="text/less">
    @import "../../../common/less/component/childlock.less";
</style>

<template>
    <modal :show="show" @close="closeModal">
        <div slot="header">
            <modal-header leftImg="img/header/public_ic_home@3x.png" class="modal-header" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back2Native"></modal-header>
        </div>
        <div class="a-c j-c" slot="content" :style="{height: wrapHeight+'px'}">
            <div class="child-lock">
                <image class="child-lock-icon" src="img/childlock/large_childlock@3x.png"></image>
                <text class="child-lock-text">童锁已开启</text>
            </div>

            <div class="child-lock-close" @click="childLock(false)">
                <image class="child-lock-close-icon" src="img/childlock/mode_close@3x.png"></image>
                <text class="child-lock-close-text">关闭童锁</text>
            </div>
        </div>
    </modal>
</template>

<script>
    import modal from '@/component/sf/custom/modal.vue'
    import modalHeader from '@/component/sf/custom/modal-header.vue'

    import commonMixin from  "@/common/util/mixins/common.js"
    // import modalMixin from  "@/common/util/mixins/modal"


    export default {
        mixins: [commonMixin],
        props: {
            show: {
                type: Boolean,
                default: false
            },
            childLock: {
                type: Function,
                default: ()=>{}
            },
            closeModal: {
                type: Function,
                default: ()=>{}
            }
        },
        components:[modal, modalHeader],
        methods: {}
    };
</script>