<template>
    <div>
        <midea-header :title="title" :bgColor="style.header.bgColor" :titleText="style.header.textColor" :showLeftImg="true" :leftImg="icon.back" @leftImgClick="goBack"></midea-header>
        <div style="width: 660px; margin-top: 90px; margin-left: 45px; margin-right: 45px;">
            <midea-navlist :cols="3" :list="list" :customStyles="style.list.item" :imgStyle="style.list.img" :titleStyle="style.list.title" @itemClicked="goTo('modeSet')"></midea-navlist>
        </div>
    </div>
</template>

<style>

</style>

<script>

    import mideaNavlist from '@/midea-component/mNavList.vue'
    import MideaHeader from '@/midea-component/header.vue'
    import nativeService from '@/common/services/nativeService'
    export default {
        data(){
            return {
                title: '加热模式',
                icon: {
                    back: 'assets/img/b.png',
                },
                style: {
                    header: {
                        bgColor: '#fff',
                        textColor: '#333'
                    },
                    list: {
                        item: {
                            width: '220px',
                            height: '250px'
                        },
                        img: {
                            width: '160px',
                            height: '160px',
                            borderRadius: '80px'
                        },
                        title: {
                            fontSize: '28px'
                        }
                    }
                },
                list:[
                   {
                       img: 'assets/img/menu.png',
                       title: '下管加热'
                   },
                   {
                       img: 'assets/img/menu.png',
                       title: '上下管'
                   },
                   {
                       img: 'assets/img/menu.png',
                       title: '上管加热'
                   },
                   {
                       img: 'assets/img/menu.png',
                       title: '风扇'
                   },
                   {
                       img: 'assets/img/menu.png',
                       title: '热风对流'
                   },
                   {
                       img: 'assets/img/menu.png',
                       title: '上管+风扇'
                   },
                   {
                       img: 'assets/img/menu.png',
                       title: '立体烧烤'
                   },
                   {
                       img: 'assets/img/menu.png',
                       title: '热风对流'
                   },
                   {
                       img: 'assets/img/menu.png',
                       title: '上下管+风扇'
                   }
                ],
                
            }
        },
        components: { mideaNavlist, MideaHeader },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            goTo(url){
                let path = url + '.js'
                nativeService.goTo(path)
            }
        },
        created(){
            storage.setItem('refer','', e=>{})
        }
        
    }
</script>


