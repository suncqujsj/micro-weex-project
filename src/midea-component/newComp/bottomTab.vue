<template>
    <div :class="['wrapper',hasTopBorder&&'top-border']">
        <div class="item" v-for="(item,index) in data" :key='index'>
            <image class="item-image" :src='item.srcImg' />
            <text class="item-text" >{{item.text}}</text>
        </div>
    </div>
</template>
<style>
.wrapper{
    width: 750px;
    height: 180px;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
}
.top-border{
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #e5e5e8;
}
.item{
    flex: 1;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.item-image{
    width: 96px;
    height: 96px;
}
.item-text{
    font-size: 24px;
    color: #232323;
    margin-top: 16px;
}
</style>
<script>
export default {
    props:{
        data:{
            type:Array,
            default:[
                {imgSrc:'',text:''}
            ]
        },
        hasTopBorder:{
            type:Boolean,
            default:true
        }
    }
}
</script>
