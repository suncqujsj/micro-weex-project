<template>
    <div v-if="show" class="wrap">
        <div class="box" :style="style.box" ref="modal">
            <div class="info-box">
                <image class="info-img" :src="icon.food"></image>
                <text class="info-text">{{content}}</text>
                <div class="floor">
                    <text class="btn" @click="cancel">取消</text>
                    <text class="btn cancel" @click="confirm">确认</text>
                </div>
            </div>
        </div>
    </div>
</template>
<script>  

    import mideaDualButton from '@/midea-component/dualButton.vue'
    import nativeService from '@/common/services/nativeService'
    const dom = weex.requireModule('dom');

    module.exports = {
        components: { mideaDualButton },
        props: {
            styles: {
                type: Object,
                default: function(){
                    return {
                        boxMargin: 175,
                        boxWidth: 400,
                    }
                }
            },
            show:{
                type: Boolean,
                default: false
            },
            content: {
                type: String,
                default: '请确认，食物已经放入微波炉~'
            }
        },
        data() {
            return {
                icon: {
                    food: 'assets/img/food.png'
                },
                wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
                modalHeight: 0
            }
        },
        computed: {
            style(){
                return {
                    box: {
                        left: this.styles.boxMargin + 'px',
                        right: this.styles.boxMargin + 'px',
                        width: this.styles.boxWidth + 'px',
                        top: (this.wrapHeight - this.modalHeight)*0.4 + 'px'
                    }
                }
            }
        },
        methods: {
            checkModalHeight(){
                let modal = this.$ref.modal
                dom.getComponentRect(modal, (result) => {
                    let size = result.size || {};
                    this.modalHeight = size.height;
                });
            },
            mideaButtonClicked() {
                nativeService.toast("button clicked");
            },
            cancel(){
                this.$emit('modalCancel')
            },
            confirm(){
                this.$emit('modalConfirm')
            }
        },
        created() {
        }
    };
</script>
<style scoped>
.wrap{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
}
.displayBtnStyle {
  text-align: center;
  border-radius: 0px;
}
.floor{
    flex-direction: row;
    border-top-width: 2px;
    border-top-style: solid;
    border-top-color: #cccccc;
}
.btn{
    flex: 1;
    text-align: center;
    border-right-width: 2px;
    border-right-style: solid;
    border-right-color: #cccccc;
    padding-top: 20px;
    padding-bottom: 20px;
}
.box{
    position: fixed;
}
.info-box{
    background-color: #ffffff;
    border-radius: 10px;
}
.info-img{
    width: 300px;
    height: 300px;
    margin-top: -150px;
    margin-left: 50px;
}
.info-text{
    text-align: center;
    padding: 25px;
}
.cancel{
    border-bottom-right-radius: 10px;
    border-right-color: #ffffff;
}
</style>
