// 单选、多选项，根据mode值切换
<template>
    <div class="row-sb" :style="rowStyle" @click="itemClick">
        <div class="row-s">
            <image v-if="icon" :style="iconStyle" :src="icon"></image>
            <div>
                <text class="text" :style="titleStyle">{{title}}</text>
                <text v-if="desc" class="text" :style="descStyle">{{desc}}</text>
            </div>
        </div>
        <image v-if="mode=='checkbox' && isCheck" :style="check.style" :src="check.path"></image>
        <image v-if="mode=='radio' && status" :style="check.style" :src="check.path"></image>
    </div>
</template>

<style>
    .row-s { flex-direction: row; align-items: center; justify-content: flex-start; }
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .text{ font-size: 28px; }
</style>

<script>
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'

    export default {
        props: {
            title:{
                type: String,
                default: ''
            },
            desc: {
                type: String,
                default: ''
            },
            titleStyle: {
                type: Object,
                default: function(){
                    return {
                    }
                }
            },
            descStyle: {
                type: Object,
                default: function(){
                    return {
                        fontSize: '24px',
                        color: '#666',
                        marginTop: '8px'
                    }
                }
            },
            icon: {
                type: String,
                default: '',
            },
            iconStyle: {
                type: Object,
                default: function(){
                    return {
                        width: '60px',
                        height: '60px',
                        marginRight: '25px'
                    }
                }
            },
            check: {
                type: Object,
                default: function(){
                    return {
                        style:{
                            width: '40px',
                            height: '40px'
                        },
                        path: 'assets/img/done.png',
                    }
                }
            },
            status: {
                type: Boolean,
                default: false
            },
            rowStyle: {
                type: Object,
                default: function(){
                    return {
                        height: '85px',
                        paddingRight: '25px'
                    }
                }
            },
            mode: {
                type: String,
                default: 'checkbox'
            }
        },
        components:{ MideaHeader },
        data(){
            return {
                isCheck: this.status
            }
        },
        computed(){
            // isCheck(){
            //     if (this.mode == 'checkbox'){
            //         return this.status
            //     }else{
            //         return this.check
            //     }
            // }
        },
        methods: {
            itemClick(e){
                this.isCheck = !this.isCheck
                this.$emit('itemClick', e)
            }
        },
        created(){
        }
    }
</script>

