<template>
    <div class="wrapper">
        <!--<div ref="tests" @click="move" class="box"></div>-->
        <!--<image ref="tests" src="img/loading.png" class="box"></image>-->
        <midea-button text="打开" type="primary" @mideaButtonClicked="mideaButtonClicked1">
        </midea-button>
        <sf-state :display="display" :isMask="true" :text="'更新完成'" :type="'success'"></sf-state>
    </div>
</template>

<script>
    const animation = weex.requireModule('animation')
    const modal = weex.requireModule('modal')
    import nativeService from "@/common/services/nativeService";
    import sfState from "@/component/sf/custom/state.vue"
    import mideaButton from '@/midea-component/button.vue'


    export default {
        data(){
            return{
               display:false,
            };
        },
        created(){
            // var context = this;
            // var t = setInterval(function(){
            //   context.move()
            // },20)
        },
        components:{sfState, mideaButton},
        methods: {
            mideaButtonClicked1(){
                this.display = true;
            }
        }
    }
</script>

<style scoped>
    .box {
        width: 64px;
        height: 64px;
        margin-left: 100px;
        margin-top: 100px;
    }
</style>