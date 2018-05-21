//食材列表
<template>
    <div class="wrap" :style="style.wrap">
        <div><text class="title">{{title}}</text></div>
        <div class="column-wrap" :style="style.columnWrap">
            <div v-for="column in dList">
                <div class="column" @click="onClick">
                    <div class="item" :style="style.item" v-for="item in column">
                        <image  v-if="item.imgPath" :src="item.imgPath" :style="style.img"></image>
                        <div class="item-text" :style="style.text">
                            <text v-if="item.name" class="text">{{item.name}}</text>
                            <text v-if="item.value" class="text">({{item.value}}</text>
                            <text v-if="item.unit" class="text">{{item.unit}})</text>
                            <image v-if="item.sell" class="icon" :src="icon.cart"></image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'

    export default {
        components: {
        },
        computed: {
            dList(){
                let tmp = {}
                const list = this.lists.concat([])
                let len = Math.ceil(list.length/this.cols) //子数组长度
                for (let i=0; i<this.cols; i++){
                    tmp[i] = list.splice(0, len)
                }

                return tmp
            },
            style(){
                return {
                    wrap: {
                        width: this.styles.wrapWidth
                    },
                    columnWrap: {
                        flexDirection: 'row',
                        justifyContent: this.styles.colWrapJustify
                    },
                    item: {
                        borderColor: this.styles.itemBorderColor
                    },
                    img: {
                        width: this.styles.imgSize,
                        height: this.styles.imgSize,
                    },
                    text: {
                        flexDirection:  'row',
                        justifyContent: this.styles.textJustify,
                        textItems: 'center'
                    }
                }
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            cols: {
                type: Number,
                default: 2
            },
            lists: {
                type: Array,
                default: function(){
                    return  [
                        {
                            name: 'name1',
                            value: 'args1',
                            sell: false,
                            unit: '',
                            imgPath: ''
                        },
                        {
                            name: 'name2',
                            value: 'args2',
                            sell: false,
                            unit: '',
                            imgPath: ''
                        },
                        {
                            name: 'name3',
                            value: 'args3',
                            sell: false,
                            unit: '',
                            imgPath: ''
                        },
                    ]
                }
            },
            styles: {
                type: Object,
                default: function(){
                    return {
                        wrapWidth: '700px',
                        itemBorderColor: '#fff',
                        imgSize: '200px',
                        textJustify: 'flex-start',
                        colWrapJustify: 'space-around'
                    }
                }
            }
        },
        data() {
            return {
                icon: {
                    cart: 'assets/img/cart.png'
                }
            }
        },
        methods:{
            onClick(e){
                this.$emit('itemClicked',e)
            }
        },
        created(){
        }
    }
</script>

<style>
    .text{
        font-size: 32;
        color: #333;
        margin-right: 10;
    }
    .icon{
        width: 32;
        height: 32;
    }
    .title{
        font-weight: bold;
        font-size: 36;
        margin-bottom: 10;
    }
    .item{
        border-width: 1px;
        border-style: solid;
        border-color: #777;
        flex-direction: column;
        margin-bottom: 30px;
        background-color: #fff;
    }
</style>
