<template>
    <div class="wrapper">
        <midea-header title="手势密码" :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <div class="note-wrapper">
            <text class="note">手势密码加密的结果是：{{password}}</text>
        </div>
        <midea-gesture-password class="gesture" @finish="onfinish" ></midea-gesture-password>
    </div>
</template>
<style>
.note-wrapper{
    margin-top: 40px;
    margin-bottom: 100px;
    margin-left: 30px;
    margin-right: 30px;
    height: 100px;
}
.note{
    text-align: center;
    font-size: 32px;
    color: grey;
    line-height: 40px;
}
.gesture{
    margin-left: 25px;
    width: 700px;
    height: 700px;
}
</style>
<script>

import base from '../base'
export default {
    data(){
        return {
            password: '--'
        }
    },
    mixins: [base],
    methods: {
        onfinish (e) {
            this.password = e.data
        }
    }
}
</script>