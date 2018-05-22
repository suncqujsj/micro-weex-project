//手风琴菜单
<template>
    <scroller class="scroller" :style="style.scroller">
        <div class="title" ref="title">
            <text>全部分类</text>
        </div>
        <div v-for="(menu, mIndex) in menus" :class="['menu', mIndex == 0 ? 'menu-first': '']">
            <div class="menu-bar"  @click="makeSwitch"  :data-menu-name="menu.name">
                <!-- <image class="icon"></image> -->
                <text class="menu-name">{{menu.name}}</text>
                <div class="switch-wrap">
                    <image v-if="activeMenu==menu.name" class="switch" :src="switchOpen"></image>
                    <image v-else class="switch" :src="switchClose"></image>
                </div>
            </div>
            <div class="sub-menu" v-if="activeMenu == menu.name">
                <midea-grid-select :cols="3" class="grid-floor" :list="menu.subMenu" @select="itemSelected" :customStyles="gridStyle"></midea-grid-select>
            </div>
        </div>
    </scroller>
</template>

<script>
    import nativeService from '@/common/services/nativeService.js'
    import mideaGridSelect from '@/component/optionList.vue'

    export default {
        props: {
            menus:{
                type: Array,
                default: function(){
                    let menus = [{
                        name: 'AAAAAAAAAAAAAA',
                        iconPath: '',
                        subMenu: [{
                            title: 'a1',
                            key: ''
                        },{
                            title: 'a2',
                            key: ''
                        },{
                            title: 'a3',
                            key: ''
                        },{
                            title: 'a4',
                            key: ''
                        },{
                            title: 'a5',
                            key: ''
                        },{
                            title: 'a6',
                            key: ''
                        },{
                            title: 'a7',
                            key: ''
                        }]
                    },{
                        name: 'BBBBBBBBBB',
                        iconPath: '',
                        subMenu: [{
                            title: 'b1',
                            key: ''
                        }]
                    },{
                        name: 'CCCCCCCCCCCCCC',
                        iconPath: '',
                        subMenu: [{
                            title: 'c1',
                            key: ''
                        }]
                    }]
                    return menus
                }
            }
        },
        components: {
            mideaGridSelect
        },
        computed: {
            style(){
                return {
                    scroller: {
                        height: WXEnvironment.deviceHeight + 'px'
                    }
                }
            }
        },
        data() {
            return {
                activeMenu: '',
                switchOpen: 'assets/img/open.png',
                switchClose: 'assets/img/close.png',
                gridStyle: {
                    width: '222px'
                },
                headerHeight: '',
                listsHeight: '',
            }
        },
        methods: {
            makeSwitch(e){
                console.log(e)
                let theName = e.target.attr.dataMenuName
                this.activeMenu = (this.activeMenu == theName) ? '':theName
            },
            itemSelected(e){
            }
        },
        created() {
           
        }
    }
</script>

<style>
    .title {
        margin-top: 20px;
        margin-bottom: 30px;
        padding-left: 25px;
    }
    .menu {
        border-bottom-style: solid;
        border-width: 1px;
        border-color: #cccccc;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .menu-bar{
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
    .menu-first {
        border-top-style: solid;
    }
    .menu-name{
        width: 620px;
    }
    .switch-wrap{
        justify-content: right;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .switch {
        width: 30px;
        height: 30px;
    }

    .sub-menu {
        margin-top: -20px;
    }
    .grid-floor{
        justify-content: left;
        padding-top: 30px;
    }
</style>