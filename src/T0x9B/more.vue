<style lang="less" type="text/less">

</style>

<template>
    <more-page :list="list" :constant="constant" v-if="pageShow"></more-page>
</template>

<script>
    import morePage from "@/common/pages/more.vue";
    import list from "./config/more.js";
    import constant from "./config/constant";
    import nativeService from "@/common/services/nativeService";
    export default {
        data(){
            return {
                list: list,
                constant,
                pageShow: false,
            }
        },
        components: {morePage},
        created(){
            let self = this;
            let list = JSON.parse(JSON.stringify(this.list));
             nativeService.getDeviceInfo().then(function(data){
                if(data.result && data.result.deviceSn8=='0TQN36QL'){
                    list[0].rightText ='蒸汽烤箱 TQN36FQL_SS';      
                }
                else if(data.result && data.result.deviceSn8=='0TQN50QL'){
                    list[0].rightText ='蒸汽烤箱 TQN50EQL_TS';      
                }
                else if(data.result && data.result.deviceSn8=='0TQN36XJ'){
                    list[0].rightText ='蒸汽烤箱 0TQN36XJ_SS';      
                }
                else{
                    list[0].rightText ='蒸汽烤箱';        
                }
                self.list = JSON.parse(JSON.stringify(list));
                self.pageShow = true;
            });
        }
    }
</script>


