<template>
    <div>
        <midea-header :title="title" :bgColor="style.header.bgColor" :titleText="style.header.textColor" :showLeftImg="true" :leftImg="icon.back" @leftImgClick="goBack"></midea-header>
        <midea-cell v-for="item in list" :title="item.name" height="120" :hasArrow="true" :clickActivied="true" :itemImg="item.icon"></midea-cell>
        <midea-cell title="售后服务" height="120" :hasArrow="false" :clickActivied="true" itemImg="assets/img/comment.png" :rightText="serviceNum"></midea-cell>
        <midea-cell title="语言设置" height="120" :hasArrow="true" :clickActivied="true" itemImg="assets/img/comment.png"></midea-cell>
    </div>
</template>

<style>

</style>

<script>

    import mideaCell from '@/midea-component/cell.vue'
    import MideaHeader from '@/midea-component/header.vue'
    import nativeService from '@/common/services/nativeService'
    export default {
        data(){
            return {
                title: '更多',
                icon: {
                    back: 'assets/img/b.png',
                },
                style: {
                    header: {
                        bgColor: '#fff',
                        textColor: '#333'
                    }
                },
                list:[
                    {
                        name: '用户手册',
                        icon: 'assets/img/comment.png'
                    },
                    {
                        name: '错误代码',
                        icon: 'assets/img/comment.png'
                    },
                    {
                        name: '故障提醒',
                        icon: 'assets/img/comment.png'
                    },
                    {
                        name: '耗材购买',
                        icon: 'assets/img/comment.png'
                    }
                ],
                serviceNum: '1-890-829-2342'
            }
        },
        components: { mideaCell, MideaHeader },
        methods: {
            goBack(){
                nativeService.goBack()
            }
        },
        created(){
            storage.setItem('refer','', e=>{})

        }
        
    }
</script>


