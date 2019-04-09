<style lang="less" type="text/less">

</style>

<template>
    <time-picker :value="value" :hms="hms" @change="onChange"></time-picker>
</template>

<script>

    import nativeService from '@/common/services/nativeService';
    import timePicker from '@/midea-component/sf/custom/timePicker.vue'

    export default {
        data(){
            return {
                value: [1,1,0],
                hms:[1,1,1]
            }
        },
        created(){
        },
        components:{timePicker},
        methods: {
            onChange(e){
                // nativeService.alert(e.value);
            }
        }
    }
</script>


