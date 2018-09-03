<template>
<div class="box" :style="styles.box">
    <m-nav-list :list="navList" :cols="cols" @itemClicked="itemClicked" :disableClick="disabled">
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
                type: [Number, String],
                default: 5
            },
            disabled: {
                type: Boolean,
                default: false
            },
            styles: {
                type: Object,
                default: function(){
                    return {
                        box: {
                            width: '750px'
                        }
                    }
                }
            },
            imgPath: {
                type: Object,
                default: function(){
                    return {
                        star: '../img/star.png',
                        unstar: '../img/unstar.png'
                    }
                }
            }
        },
        data () {
            return{
                navList: [
                    {
                        "title": "",
                        "img": this.imgPath.star,
                        "img_actived": ""
                    },
                    {
                        "title": "",
                        "img": this.imgPath.unstar,
                        "img_actived": ""
                    },
                    {
                        "title": "",
                        "img": this.imgPath.unstar,
                        "img_actived": ""
                    },
                    {
                        "title": "",
                        "img": this.imgPath.unstar,
                        "img_actived": ""
                    },
                    {
                        "title": "",
                        "img": this.imgPath.unstar,
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
                        this.navList[i].img = this.imgPath.star;
                    } else {
                        if(i == event.index) {
                            if(this.navList[i].img == this.imgPath.star) {
                                if(this.navList[i+1] && this.navList[i+1].img && this.navList[i+1].img == this.imgPath.star) {
                                    this.navList[i].img = this.imgPath.star;
                                    currentSelected = true;
                                } else {
                                    this.navList[i].img = this.imgPath.unstar;
                                    currentSelected = false;
                                }       
                            } else {
                                this.navList[i].img = this.imgPath.star;
                                currentSelected = true;
                            }
                        } else {
                            this.navList[i].img = this.imgPath.unstar;    
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
                    this.navList[i].img = this.imgPath.star;    
                } else {
                    this.navList[i].img =this.imgPath.unstar;
                }
                
            }
        }
    };
</script>