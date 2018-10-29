<template>
    <div>
        <web class="webview" :src="url"></web>
    </div>
</template>
<style scoped>
    .webview{
        flex:1;
    }
</style>
<script>
    export default {
        computed: {
            url(){
                if(this.$route && this.$route.params){
                    return this.$route.params.url
                }
                return 'http://m.taobao.com'
            }
        }
    }
</script>