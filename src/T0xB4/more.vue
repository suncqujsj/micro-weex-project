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
                if(data.result && data.result.deviceSn8=='00T7388D'){
                    list[0].rightText ='小烤箱 T7-388D';      
                }
                else if(data.result && data.result.deviceSn8=='00T7389D'){
                    list[0].rightText ='小烤箱 T7-389D';                 
                }
                else if(data.result && data.result.deviceSn8=='00T7329E'){
                    list[0].rightText ='小烤箱 T7-329E';                 
                }
                else{
                    list[0].rightText ='小烤箱 T7-388D';        
                }
                self.list = JSON.parse(JSON.stringify(list));
                self.pageShow = true;
            });
        }
    }
</script>


