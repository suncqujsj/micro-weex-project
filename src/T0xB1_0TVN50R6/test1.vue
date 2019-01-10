<style lang="less" type="text/less">

</style>

<template>
    <time-picker :value="value" :max="max" @change="onChange"></time-picker>
</template>

<script>

    import nativeService from '@/common/services/nativeService';
    import timePicker from '@/component/sf/custom/timePicker.vue'

    export default {
        data(){
            return {
                value: [1,1,0],
                max:[1,1,0]
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


