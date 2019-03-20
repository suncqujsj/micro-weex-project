<template>
    <div class="box">
        <text>{{a}}</text>
        <text>{{count}}</text>
    </div>
</template>

<script>
    const animation = weex.requireModule('animation')
    const modal = weex.requireModule('modal')
    import nativeService from "@/common/services/nativeService";
    import commonMixin from "@/common/util/mixins/common"


    export default {
        mixins:[commonMixin],
        data(){
            return{
                a:1
            };
        },
        created(){
        },
        methods: {
           aa(){
               this.counts('test');
               return this.a;
           }
        }
    }
</script>

<style scoped>
    .box {
        width: 64px;
        height: 64px;
        margin-left: 100px;
        margin-top: 100px;
    }
</style>