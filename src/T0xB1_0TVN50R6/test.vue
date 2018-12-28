<style lang="less" type="text/less">

</style>

<template>
    <div style="margin-top: 200px;">
        <text>{{a}}</text>
        <text>{{b}}</text>
    </div>
</template>

<script>

    import nativeService from '@/common/services/nativeService';

    export default {
        data(){
            return {
                a:123,
                b:456
            }
        },
        created(){
            this.test();
        },

        methods: {
            async test(){
                this.a = 666;
                this.b = 777;
                let c = await nativeService.getDeviceInfo();
            }
        }
    }
</script>


