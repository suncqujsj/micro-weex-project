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
                try {
                    let c = await d();
                    nativeService.alert(c);
                }catch (e) {
                    nativeService.alert(e);
                }

                this.b = 777;
            },
            d(){
                return new Promise((resolve, reject) => {
                    resolve(10);
                });
            },
        }
    }
</script>


