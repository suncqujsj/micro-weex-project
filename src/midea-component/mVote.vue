<template>
<div class="box">
    <m-nav-list :list="navList" :cols="cols" @itemClicked="itemClicked">
    </m-nav-list>
</div>
</template>
<style scoped>
    .box{
        justify-content:space-around;
    }
</style>
<script>
    import mNavList from '@/midea-component/mNavList.vue'
    import nativeService from '@/common/services/nativeService'
    export default {
        components: { mNavList },

        props: {
            cols: {
                type: Number,
                default: 5
            },
            defaulSelectd: {
                type: Number,
                default: 5
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return{
                navList: [
                    {
                        "title": "",
                        "img": "../img/icon/select.png",
                        "img_actived": ""
                    },
                    {
                        "title": "",
                        "img": "../img/icon/unselect.png",
                        "img_actived": ""
                    },
                    {
                        "title": "",
                        "img": "../img/icon/unselect.png",
                        "img_actived": ""
                    },
                    {
                        "title": "",
                        "img": "../img/icon/unselect.png",
                        "img_actived": ""
                    },
                    {
                        "title": "",
                        "img": "../img/icon/unselect.png",
                        "img_actived": ""
                    }
                ],
                selected:0
            }
        },
        methods: {
            itemClicked(event) {
                //nativeService.toast("点击了第" + event.index + "个选项。\n内容为：" + JSON.stringify(event.item))
                if(this.disabled) return;
                let currentSelected = false;
                for(var i = 0;i<5;i++) {
                    if(i < event.index) {
                        this.navList[i].img = "../img/icon/select.png";
                    } else {
                        if(i == event.index) {
                            if(this.navList[i].img == "../img/icon/select.png") {
                                if(this.navList[i+1] && this.navList[i+1].img && this.navList[i+1].img == "../img/icon/select.png") {
                                    this.navList[i].img = "../img/icon/select.png";
                                    currentSelected = true;
                                } else {
                                    this.navList[i].img = "../img/icon/unselect.png";
                                    currentSelected = false;
                                }       
                            } else {
                                this.navList[i].img = "../img/icon/select.png";
                                currentSelected = true;
                            }
                        } else {
                            this.navList[i].img = "../img/icon/unselect.png";    
                        }
                    }

                }
                if(currentSelected) {
                   this.selected =  event.index + 1;    
                } else {
                    this.selected =  event.index;    
                }
               //nativeService.toast(this.selected+" "+this.cols);
               this.$emit('itemClicked',{selected:this.selected});
            }
        },
        created() {

            for(var i = 0;i< this.cols;i++) {
                if(i<this.defaulSelectd) {
                    this.navList[i].img = "../img/icon/select.png";    
                } else {
                    this.navList[i].img = "../img/icon/unselect.png";
                }
                
            }
        }
    };
</script>