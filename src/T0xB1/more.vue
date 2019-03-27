<style lang="less" type="text/less">

</style>

<template>
    <more-page :list="list" v-if="pageShow"></more-page>
</template>

<script>
    import morePage from "@/common/pages/more.vue";
    import list from "./config/more.js";
    import nativeService from "@/common/services/nativeService";
    export default {
        data(){
            return {
                list: list,
                pageShow: false,
            }
        },
        components: {morePage},
        created(){
            let self = this;
            let list = JSON.parse(JSON.stringify(this.list));
             nativeService.getDeviceInfo().then(function(data){
                if(data.result && data.result.deviceSn8=='0ET1065Q'){
                    list[0].rightText ='大烤箱 ET1065QL-01SE';      
                }
                else{
                    list[0].rightText ='大烤箱';        
                }
                self.list = JSON.parse(JSON.stringify(list));
                self.pageShow = true;
            });
        }
    }
</script>


