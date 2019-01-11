<template>
    <div class="wrapper">
        <midea-header title="scrollPicker 滚动选择器 " :isImmersion="isImmersion" @leftImgClick="back" :showRightImg="true" rightImg="../assets/img/smart_ic_reline@3x.png" @rightImgClick="reload"></midea-header>
        <scroller class="scroller">
            <!--<text class="padding14 desc">scrollPicker在弹窗中使用，也可以直接在当前页面使用，但不能在scroller中使用，除非此时scroller滚动功能还没有触发。也就是说页面高度小于屏幕高度时，是可以在scroll中使用scrollPicker的。（因为scroller互相嵌套，会有滚动冲突）</text>-->
            <!--<text class="sub-hd padding14">1.直接在界面上显示scrollPicker</text>-->
            <!--<midea-scroll-picker :listArray="list"  @onChange="changeValue"></midea-scroll-picker>-->
            <!--<text class="sub-hd padding14">2.弹窗中使用scrollPicker</text>-->
            <!--<midea-button text="单个scrollPicker" @mideaButtonClicked="showBox(1)"></midea-button>-->
            <!--<div class="scroll-picker-wrap row-sb">-->
                <!--<template v-for="(item, index) in time">-->
                    <!--<midea-scroll-picker v-if="hms[index]" :pickerIndex="index" :unit="units[index]" :wrapWidth="perPickerWidth" :listArray="item" :listItem="value[index]" @onChange="changeValue"></midea-scroll-picker>-->
                <!--</template>-->
            <!--</div>-->
            <!--<text class="sub-hd padding14">3.弹窗中使用多个scrollPicker</text>-->
            <!--<midea-button text="多个scrollPicker" @mideaButtonClicked="showBox(2)"></midea-button>-->
        </scroller>
        <!--<midea-confirm-box :show="show[1]" @leftBtnClick="cancel(1)" @rightBtnClick="confirm(1)" @mideaPopupOverlayClicked="close(1)">-->
            <!--<div class="scroll-picker-wrap">-->
                <!--<midea-scroll-picker :listArray="list" @onChange="changeValue"></midea-scroll-picker>-->
            <!--</div>-->
        <!--</midea-confirm-box>-->
        <midea-confirm-box :show="show[2]" @leftBtnClick="cancel(2)" @rightBtnClick="confirm(2)" @mideaPopupOverlayClicked="close(2)">
            <div class="scroll-picker-wrap row-sb">
                <template v-for="(item, index) in time">
                    <midea-scroll-picker v-if="hms[index]" :pickerIndex="index" :unit="units[index]" :wrapWidth="perPickerWidth" :listArray="item" :listItem="value[index]" @onChange="changeValue"></midea-scroll-picker>
                </template>
            </div>
        </midea-confirm-box>
    </div>
</template>
<style scoped>
    .row-sb{ flex-direction: row; align-items: center; justify-content: space-between; }
    .wrapper { background-color: #f2f2f2; }
    .scroller { padding-top: 20px; padding-bottom: 50px; }
    .padding5{ padding: 5px; }
    .padding14{ padding-left: 14px; padding-right: 14px; }
    .padding20{ padding: 20px; }
    .hd{ padding: 20px; font-size: 40px; }
    .sub-hd{margin-top: 30px;}
    .desc{ color: #959595; }
    .scroll-picker-wrap{ padding-top: 30px; padding-bottom: 30px; height: 458px; background-color: #ffffff; }
</style>
<script>

    import base from '@/midea-demo/base'
    import mideaButton from '@/midea-component/button.vue'
    import mideaConfirmBox from '@/midea-component/confirmBox.vue'
    import mideaScrollPicker from '@/component/sf/custom/base/scrollPicker.vue'
    // import mideaScrollPicker from '@/midea-component/scrollPicker.vue'
    import nativeService from '@/common/services/nativeService'

    module.exports = {
        components: { mideaConfirmBox, mideaScrollPicker, mideaButton },
        mixins: [base],
        props:{
            value: {
                type: Array,
                default: [0,0,0]
            },
            hms: {
                type: Array,
                default: [1,1,1]
            }
        },
        data() {
            return {
                show: {
                    1: false,
                    2: false,
                    3: false,
                },
                list: [
                    {index:0, value:0},
                    {index:1, value:1},
                    {index:2, value:2},
                    {index:3, value:3},
                    {index:4, value:4},
                    {index:5, value:5},
                    {index:6, value:6},
                    {index:7, value:7},
                    {index:8, value:8},
                    {index:9, value:9},
                ],
                time:this.initTime(),
                units:['时','分', '秒'],
                count:0,
            }
        },
        computed: {
            perPickerWidth(){
                return this.hms[0] ? 250 : 375;
            }
        },
        created(){
            this.initTime();
        },
        methods: {
            /**
             * 步长为1，起始为0的连续数组
             * */
            range(end){
                if(end<0) return [];
                let arr = new Array(end-1);
                for(let i=0; i<end;i++) {
                    arr[i] = i;
                }
                return arr;
            },
            initTime(){
                let hArr = this.range(12);
                let msArr = this.range(60);
                return [hArr, msArr,msArr];

            },
            showBox(index){
                this.show[index] = true
            },
            cancel(index){
                this.show[index] = false
                nativeService.toast('您点击了取消')
            },
            confirm(index){
                this.show[index] = false
                nativeService.toast('您点击了确定')
            },
            close(index){
                this.show[index] = false
            },
            changeValue(e){
                let time = this.value;
                time[e.index] = e.value;
                this.$emit('change', {value: time});
            }
        }
    };
</script>