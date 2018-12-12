<style lang="less" type="text/less">
    @import "../common/less/common";

</style>

<template>
    <div class="bg-gray">

        <midea-header class="bg-white" title="测试" titleText="black" :isImmersion="true"  :showLeftImg="true" @leftImgClick="back"></midea-header>

        <midea-switch2 v-if="!hide" style="margin: 100px;" :checked="checked" @change="onchange" slot="value"> </midea-switch2>

        <midea-button text="显示开关" type="secondary" @mideaButtonClicked="mideaButtonClicked">            </midea-button>


    </div>
</template>

<script>
    import mideaHeader from '@/midea-component/header.vue'
    import mideaCell from '@/midea-component/item.vue';
    import mideaSwitch2 from '@/midea-component/switch2.vue'
    import mideaButton from '@/midea-component/button.vue'

    import nativeService from "../common/services/nativeService";

    export default {
        data(){
            return {
                checked:false,
                hide:true
            }
        },
        components: {mideaHeader, mideaCell, mideaSwitch2, mideaButton},
        created(){},
        computed:{
        },
        methods: {
            back: function(){
                nativeService.goBack();
            },
            onchange(event) {
                // nativeService.alert(event.value);
            },
            mideaButtonClicked(){
                this.hide = false;
            }
        }
    }
</script>


