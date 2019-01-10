<style lang="less" type="text/less">

</style>

<template>
    <time-picker :value="value" :hms="hms" @change="onChange"></time-picker>
</template>

<script>

    import nativeService from '@/common/services/nativeService';
    import timePicker from '@/component/sf/custom/timePicker.vue'

    export default {
        data(){
            return {
                value: [1,1,0],
                hms:[1,0,0]
            }
        },
        created(){
            nativeService.showLoadingWithMsg('更新中')
        },
        components:{timePicker},
        methods: {
            onChange(e){
                // nativeService.alert(e.value);
            }
        }
    }
</script>


