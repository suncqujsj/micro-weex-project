<template>
    <div class="all_section" :style="{height: wrapHeight}">
        <midea-header class="bg"  leftImg="assets/img/header/icon_back_white@3x.png" title="烤箱" titleText="white" bgColor="" :isImmersion="true"  :showLeftImg="true" @leftImgClick="backClick" ></midea-header>
        <div class="progress_section" :style="progress_style">
            <wxcProgress :percent="progress"
                    :wxc_radius='progress_radius'>
                      <text class="number_prev">时</text>
            <div class="cen">
              
                <text class="number-text">{{progress}}</text>
            </div>
                <text class="number_next">{{tag_next}}</text>
            
        </wxcProgress>
        </div>
        <div class="detail_section">
            <text class="detail_text">高火180°</text>
        </div>
    </div>
</template>

<style lang="less" type="text/less">
@import "../common/less/common";
    .root{
        height: 100%;
    }
    .all_section{
        background-color: #FFCF23;
        width: 750px;
    }
    .bg {
        background-image: linear-gradient(to bottom, #FFCD00, #FF9217);
    }
    .progress_section{
        .pos(r);
    }
    .cen{
        .flex;
        .row;
        .j-c;
        .a-c;
    }
    .number-text{
        .f(160px);
        .white;
    }
    .number_prev{
        .pos(a);
        top: 100px;
        left: 120px;
        .white;
        .f(32px);
    }
    .number_next{
        .pos(a);
        top: 100px;
        right: 120px;
        .white;
        .f(32px);
    }
    .detail_section{
        .flex;
        .row;
        .j-c;
    }
    .detail_text{
        .white;
        .f(36px);
        margin-top: 60px;
    }
</style>

<script>
    const storage = weex.requireModule('storage')
    import MideaHeader from '@/midea-component/header.vue'
    // import mideaItem from '@/midea-component/item.vue'
    import nativeService from "../common/services/nativeService";
    import cmdFun from "./util.js"; //解析指令
    import query from "../dummy/query";
    import {wxcProgress, wxProgress} from "@/component/sf/wx-progress";


    export default {
        data(){
            return {
                wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
                test:'123',
                progress:1,
                progress_radius: 250,
                tag_next: '分'
            }
        },
        components: {MideaHeader,wxcProgress,wxProgress},
        created(){
            // nativeService.toast(1);
            //模拟设备数据
            // nativeService.initMockData({
            //     query: query
            // });
            // this. ();
            // debugger;
             this.doing();

        },
        computed: {
            progress_style(){
                let {wrapHeight,progress_radius} = this;
                return{
                    marginTop: `${wrapHeight/2-progress_radius*2}px`
                }
            }
        },
        methods: {
            goBack(){
                nativeService.goBack()
            },
            backClick(){
               this.goTo("working");
            },
            doing: function(){
                if(this.progress === 100) {
                    return;
                }
                ++this.progress;
                // this.progress += '1';
                let context = this;
                const platform = weex.config.env.platform;//weex没有window对象，调试需要区分下
                if (platform == 'Web') {
                     window.setTimeout(function () {
                        context.doing();
                    }, 1000);
                }else{
                    setTimeout(function () {
                        context.doing();
                    }, 1000);
                }
               
            },
            queryStatus() {
                var self = this;
                var sendCmd = cmdFun.createQueryMessage();
                // nativeService.alert(JSON.stringify(sendCmd));
                //nativeService.showLoading();
                // debugger;
                nativeService.startCmdProcess(
                    "query",
                    sendCmd,
                    function (result) {
                        //nativeService.hideLoading();
                        nativeService.alert(JSON.stringify(result));
                        var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
                        var arr = result_arr.split(",");
                        //nativeService.alert(arr[11]);
                        var analysisObj = cmdFun.analysisCmd(arr);
                        // self.analysisFun(analysisObj);
                        // nativeService.toast(analysisObj);
                        // self.test = JSON.stringify(analysisObj);
                    },
                    function (result) {
                        //nativeService.hideLoading();
                        nativeService.toast(result);
                        // nativeService.toast("查询失败" + JSON.stringify(result));
                    }
                );
            },
            goTo(url){
                let path = url + '.js'
                nativeService.goTo(path)
            }
        }
    }
</script>


