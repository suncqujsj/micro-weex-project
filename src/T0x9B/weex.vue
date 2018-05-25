<template>
    <div>
        <midea-header  :bgColor="style.header.bgColor" :titleText="style.header.textColor" :showLeftImg="true" :leftImg="icon.back" :showRightImg="true" :rightImg="icon.menu" @leftImgClick="goBack" @rightImgClick="goTo('setting')">
            <text class="back-text" style="position: absolute; left: 88px; top: 22px;" slot="customerContent" @click="goBack">返回</text>
        </midea-header>
        <scroller style="background-color: #f2f2f2;">
            <slider style="width: 700px; height:400px; margin: 25px; position: relative;">
                <div v-for="item in sliderData" @click="goTo('recipeMain')">
                    <image style="width:700px; height: 400px" :src="item"></image>
                </div>
                <indicator class="indicator" ></indicator>
            </slider>
            <div style="width: 700px; margin-left: 25px; margin-right: 25px;">
                <item v-for="listItem in list"  :styles="style.item" :style="listItem.bgImg" :title="listItem.name" :desc="listItem.desc"  :itemImg="listItem.itemImg" @itemClick="goTo(listItem.page)"></item>
            </div>
            <div style="width: 700px; margin-left: 25px; margin-right: 25px;">
                <item v-for="listItem in list"  :styles="style.item2" :title="listItem.name" :desc="listItem.desc"  :itemImg="listItem.itemImg" @itemClick="goTo('recipeMain')"></item>
            </div>
        </scroller>
    </div>
</template>

<style>
.indicator{
    bottom: 10px;
    color: #59a
}
</style>

<script>
    const storage = weex.requireModule('storage')
    import nativeService from '@/common/services/nativeService.js'
    import MideaHeader from '@/midea-component/header.vue'
    // import mideaItem from '@/midea-component/item.vue'
    import item from '@/T0x9B/components/item.vue'

    export default {
        data(){
            return {
                icon: {
                    back: 'assets/img/b.png',
                    menu: 'assets/img/menu.png'
                },
                style: {
                    header: {
                        bgColor: '#fff',
                        textColor: '#333'
                    },
                    item: {
                        wrap: {
                            borderRadius: '10px',
                            padding: '10px',
                            marginBottom: '25px'
                        },
                        img: {
                            width: '100px',
                            height: '100px',
                            marginLeft: '25px',
                            marginRight: '25px'
                        },
                        title: {
                            fontSize:'38px',
                            color: '#fff',
                            marginBottom: '5px'
                        },
                        desc: { 
                            fontSize: '26px',
                            color: '#fff'
                        }
                    },
                    item2: {
                        wrap: {
                            marginBottom: '25px',
                            backgroundColor: '#fff'
                        },
                        img: {
                            width: '180px',
                            height: '180px',
                            marginRight: '10px'
                        },
                        title: {
                            fontSize:'48px',
                            color: '#333',
                            marginBottom: '10px',
                            marginTop: '15px'
                        },
                        desc: { 
                            fontSize: '26px',
                            color: '#333',
                            width: '480px'
                        }
                    }
                },
                title: '111',
                sliderData: ['https://images-cn.ssl-images-amazon.com/images/G/28/cnbooks/event/children/2018/Apr/May_49off_PCATF._CB495162946_.jpg', 'http://images.abi.com.cn:8080/news/201601/20160104164356978.jpg', 'https://images-cn.ssl-images-amazon.com/images/G/28/Yuhao/2018POC/May/phase2_49/ATF_1._CB495129543_.jpg'],
                list: [
                    {
                        name: "加热模式",
                        desc: "多种组合加热模式，满足您的各种烹饪需求",
                        itemImg: "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png",
                        bgImg: {
                            backgroundImage: 'linear-gradient(to right,#3DADFF,#3377FE)'
                        },
                        page: 'mode'
                    },
                    { 
                        name: "自动菜单",
                        desc: "量身定制自动菜谱，让烹饪更简单",
                        itemImg: "http://tmp666.oss-cn-shenzhen.aliyuncs.com/img/icon/midea.env.002.png",
                        bgImg: {
                            backgroundImage: 'linear-gradient(to right,#3DADFF,#3377FE)'
                        },
                        page: 'auto'
                    },
                    { 
                        name: "云菜谱",
                        desc: "海量自动菜谱，每天烹饪不重样",
                        itemImg: "../img/check/checked.png",
                        bgImg: {
                            backgroundImage: 'linear-gradient(to right,#F89B55,#FB8636)'
                        },
                        page: 'recipeMain'
                    }
                ]
            }
        },
        components: {  MideaHeader, item },
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


