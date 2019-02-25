//滚动文字条,似乎做不了
<template>
    <div>
        <scroller><text :class="['content', contentWidth]" ref="content">{{content}}</text></scroller>
    </div>
</template>

<script>
    const animation = weex.requireModule('animation')

    import nativeService from '@/common/services/nativeService.js'
    
    // import mideaBtn from '@/midea-component/button.vue'

    export default {
        props: {
       
        },
        components: {
        },
        data() {
            return {
               content: '滚动文字条，从左往右不断循环滚动，当长度小于屏幕时不滚动' 
            }
        },
        computed: {
            contentWidth(){

            }
        },
        methods: {
            scrollText(){
                let content = this.$ref.content
                animation.transition(content, {
                    styles: {
                        transform: translateX('750px'),
                        duration: 5000
                    },
                }, function(){
                   
                })
            }
        },
        created() {

        }
    }
</script>

<style>
    .content{
        word-wrap: none;
        white-space: nowrap;
    }
</style>