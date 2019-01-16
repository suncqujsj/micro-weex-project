<template>
    <div class="wrapper">
        <div class="scroll-picker-wrap row-sb">
            <template v-for="(item, index) in time">
                <midea-scroll-picker v-if="hms[index]" :pickerIndex="index" :unit="units[index]" :wrapWidth="perPickerWidth" :listArray="item" :listItem="value[index]" @onChange="changeValue"></midea-scroll-picker>
            </template>
        </div>
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
    import mideaScrollPicker from '@/component/sf/custom/base/scrollPicker.vue'
    // import mideaScrollPicker from '@/midea-component/scrollPicker.vue'
    import nativeService from '@/common/services/nativeService'

    module.exports = {
        components: { mideaScrollPicker },
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

            }
        }
    };
</script>