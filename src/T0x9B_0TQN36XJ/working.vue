<template>
    <scroller :style="{height: wrapHeight}">
        <midea-header class="bg"  leftImg="assets/img/header/icon_back_white@3x.png" title="烤箱" titleText="white" bgColor="" :isImmersion="true"  :showLeftImg="true" @leftImgClick="backClick" ></midea-header>
        <div class="panel">
            <text class="panel-state">工作中</text>
            <div class="tabs">
                <div class="tab"><text >自动菜单</text></div>
                <div class="tab cur"><text >加热模式</text></div>
            </div>
        </div>
        <text class="r test" @click="doing">{{progress}}</text>
        <wxProgress :percent='progress' :bar_width='650'></wxProgress>
        <wxcProgress :percent="progress"
                   :wxc_radius='200'>
          <div class="cen">
               <text class="demo-text">{{progress}}%</text>
           </div>
       </wxcProgress>
    </scroller>
</template>

<style lang="less" type="text/less">
@import "../common/less/common";
    .root{
        height: 100%;
    }
    .bg {
        background-image: linear-gradient(to bottom, #FFCD00, #FFB632);
    }
    .panel-state{
        .f(30px);
        .white;
        .ta;
        .lh(30px);
        .ma-t(36px);
    }
    .tabs{
        .row;
    }
    .tab{
        .flex;
        .row;
        justify-content: center;
        .lh(50px);
        .f(14px);
        color:rgba(255,255,255,.8);
    }
    .cur{
        .f(18px);
        .white;
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
                progress:1
            }
        },
        components: {MideaHeader,wxcProgress,wxProgress},
        created(){
            // nativeService.toast(1);
            //模拟设备数据
            // nativeService.initMockData({
            //     query: query
            // });
            // this.queryStatus();
            // debugger;
             this.doing();

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
                setTimeout(function () {
                    context.doing();
                }, 1000);
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


