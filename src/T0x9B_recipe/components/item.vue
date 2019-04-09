
<template>
    <div class="wrap" :style="styles.wrap" @click="onClick">
        <image class="img" :style="styles.img" :src="itemImg" ></image>
        <div>
            <text :style="styles.title">{{title}}</text>
            <text :style="styles.desc">{{desc}}</text>
        </div>
    </div>
</template>

<style>
    .wrap{
        flex-direction: row;
        justify-content: left;
    }
    .img{
        margin-right: 10px;
    }
</style>

<script>

    import mideaCell from '@/midea-component/cell.vue'
    import MideaHeader from '@/midea-component/header.vue'
    import nativeService from '@/common/services/nativeService'
    export default {
        props: {
            title: {
                type: String,
                default: '标题'
            },
            desc:  {
                type: String,
                default: '描述'
            },
            itemImg: {
                type: String,
                default: ''
            },
            styles: {
                type: Object,
                default: function(){
                    return {
                        wrap: {
                            borderRadius: '10px',
                        },
                        img: {
                            width: '100px',
                            height: '100px'
                        },
                        title: {
                            fontSize:'38px',
                        },
                        desc: { 
                            fontSize: '38px',
                        }
                    }
                }
            }
        },
        computed:{
            style(){
                return {
                    wrap: {
                        borderRadius: this.styles.wrapRadius + 'px',
                        backgroundColor: this.styles.bgColor
                    },
                    img: {
                        width: ( this.styles.imgWidth || 100 )+ 'px' ,
                        height: ( this.styles.imgWidth || 100 ) + 'px'
                    },
                    title: {
                        fontSize: this.styles.titleSize,
                        color: this.styles.color
                    },
                    desc: { 
                        fontSize: this.styles.descSize,
                        color: this.styles.color
                    }
                }
            }
        },
        data(){
            return {
               
            }
        },
        components: { mideaCell, MideaHeader },
        methods: {
            onClick(e){
                this.$emit('itemClick', e)
            }
        },
        created(){

        }
        
    }
</script>



