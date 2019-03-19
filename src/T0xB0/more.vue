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
                list,
                pageShow: false
            }
        },
        components: {morePage},
        created(){
            let self = this;
            let list = JSON.parse(JSON.stringify(this.list));
             nativeService.getDeviceInfo().then(function(data){
                var _list = self.loadOwnMode(data,list);
                self.list = JSON.parse(JSON.stringify(_list));
                self.pageShow = true;
            });
        },
        methods: {
            loadOwnMode(data,_list){       
                if(data.result && data.result.deviceSn8=='09X7321D'){
                    _list[0].rightText = "X7";   
                }
                else if(data.result && data.result.deviceSn8=='08X7321D'){
                    _list[0].rightText = "X7";  
                }
                else{
                   _list[0].rightText = "X7"; 
                }                    
                return _list;               
           }
        }
    }
</script>


