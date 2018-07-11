<template>
    <div :style="wrapStyle">
        <web :style="webStyle" src="http://www.midea.com"></web>
    </div>
</template>
<style>

</style>
<script>
    import base from './base'
    import nativeService from '@/common/services/nativeService.js'
    export default {
        mixins: [base],
        data(){
            return {
                uid: ''
            }
        },
        computed:{
            wrapStyle(){
                let tmp = {}
                if (this.isipx) {
                    tmp.marginTop = '64px'
                }else{
                    tmp.marginTop = '40px'
                }
                return tmp
            },
            webStyle(){
                return {
                    width: '750px',
                    height: this.pageHeight + 'px'
                }
            }
        },
        created() {
            this.uid = nativeService.getParameters('uid')
        },
    }
</script>


