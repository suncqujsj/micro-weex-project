<template>
    <div class="wrap" :style="wrapStyle" @viewappear="initData">
        <div class="header-floor">
            <midea-header title="设置名称" :isImmersion="isImmersion" bgColor="#fff" titleText="#000" @leftImgClick="goBack"  :showRightText="true" rightText="完成"  @rightTextClick="confirmNameEdit"></midea-header>
        </div>
        <div class="content">
            <div class="name-floor row-sb">
                <input class="input" type="text" :maxlength="15" :lines="1" placeholder="点击输入快捷操作名称" :value="autoName" @input="editAutoName" @change="editAutoName" />
                <div class="clear" @click="clearInput">
                    <image v-if="autoName.length > 0" class="clear-icon" :src="icon.clear"></image>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .header-floor{
        position: relative;
    }
    .delete{
        position: absolute;
        top: 30px;
        right: 25px;
    }
    .delete-text{
        font-size: 32px;
        color: #666;
    }
    .content{
        margin-top: 25px;
    }
    .name-floor{
        background-color: #fff;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 13px;
        padding-bottom: 11px;
    }
    .input{
        width: 500px;
        height: 70px;
    }
    .clear{
        width: 70px;
        height: 70px;
        padding: 15px;
    }
    .clear-icon{
        width: 40px;
        height: 40px;
    }
</style>
<script>
    import base from './base'

    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'

    const channelSetAutoName = new BroadcastChannel('autoBroadcast')

    export default {
        components:{ MideaHeader },
        mixins: [base],
        data(){
            return {
                autoName: '',
                icon: {
                    clear: 'assets/img/me_ic_return@3x.png'
                },
            }
        },
        computed: {
            wrapStyle(){
                let tmp = {
                    height: this.pageHeight+'px',
                    backgroundColor: '#f2f2f2'
                }
                return tmp
            },
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            initData(){
                this.autoName = decodeURIComponent(nativeService.getParameters('autoName'))
            },
            editAutoName(input){
                this.autoName = input.value
            },
            confirmNameEdit(){
                if (this.autoName == '') {
                    nativeService.toast('没有输入快捷操作名称哦！')
                    return
                }
                channelSetAutoName.postMessage({page: 'setAutoName', autoName: this.autoName})
                this.goBack()
            },
            clearInput(){
                this.autoName = ''
            }
        }
    }
</script>


