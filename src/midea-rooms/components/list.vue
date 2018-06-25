//item左边可以有留白的列表
<template>
    <div>
        <div class="item" :style="itemStyle">
            <slot></slot>
        </div>
    </div>
</template>

<style>
</style>

<script> 
    export default {
        props: {
            idx: {
                type: Number,
                default: 0
            },
            hasWrapBorder: {
                type: Boolean,
                default: false
            },
            leftMargin: {
                type: String,
                default: '25px'
            },
            height: {
                type: String,
                default: '80px'
            },
            renderData:{
                type: Array,
                default: function(){
                    return [1,2]
                }
            }
        },
        computed:{
            wrapBorderStatus(){
                let tmp = ''
                if (this.idx==0){
                    if ( this.hasWrapBorder){
                        tmp = 'border-top-active'
                    }else{
                        tmp = 'border-top-off'
                    }
                }
                return tmp
            },
            itemStyle(){
                let tmp = {}
                if (this.hasWrapBorder){
                    tmp.borderBottomWidth = '2px'
                    tmp.borderBottomStyle = 'solid'
                    tmp.borderBottomColor = '#e5e5e5'
                }else{
                    tmp.borderTopWidth = '2px'
                    tmp.borderTopStyle = 'solid'
                    tmp.borderTopColor = '#e5e5e5'
                }
                if (this.idx == 0){
                    if ( this.hasWrapBorder){
                        tmp.borderTopWidth = '2px'
                        tmp.borderTopStyle = 'solid'
                        tmp.borderTopColor = '#e5e5e5'
                    }else{
                        tmp.borderTopColor = 'transparent'
                    }
                }
                tmp.marginLeft = this.leftMargin 
                return tmp
            }
        },
        data(){
            return {
            }
        },
        methods: {
        },
        created(){
        }
    }
</script>


