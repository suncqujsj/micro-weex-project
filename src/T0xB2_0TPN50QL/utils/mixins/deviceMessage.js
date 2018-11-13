/**
 * Created by sf
 * 2018/10/22
 */

import cmdFun from "../util.js"; //解析指令
import nativeService from '@/common/services/nativeService';
const globalEvent = weex.requireModule("globalEvent");

const deviceMessageMixin = {
    data () {
        return {
            loading: true
        }
    },
    methods: {
        viewdisappear(){
            globalEvent.removeEventListener("receiveMessage");
            globalEvent.removeEventListener("receiveMessageFromApp");
            clearInterval(this.queryTimer);
            clearInterval(this.countDownTimer);
        },
        viewappear(){
            this.listenerDeviceReiveMessage();
        },
        onlongpressQuery(){//隐藏调试，查看设备上报数据
            var self = this;
            var sendCmd = cmdFun.createQueryMessage();
            nativeService.toast("下发03查询:"+JSON.stringify(sendCmd),2);
            nativeService.startCmdProcess(
                "query",
                sendCmd,
                function (result) {
                    var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
                    var arr = result_arr.split(",");
                    var easyCmd = cmdFun.cmdToEasy(arr)
                    nativeService.alert(easyCmd);
                },
                function (result) {
                    nativeService.toast("查询失败" + JSON.stringify(result));
                }
            );
        },
        onlongpressGoToMenu(){//隐藏查看云菜谱
            nativeService.weexBundleToWeb({
                url: "http://39.108.117.20/dist/build_index.html#/",
                title: '云菜谱'
            })
        },
        childLock: function(childLock){

            if(this.loading) return;

            this.loading=true;

            let context = this;
            let deviceCmd = cmdFun.cmdLock({childLock});
            nativeService.startCmdProcess(
                "control",
                deviceCmd,
                function(result){
                    context.loading = false;
                    context.queryStatus();
                },
                function(result){
                    context.loading = false;
                    console.log('fail', result);
                }
            )
        },
        goBack(){
            nativeService.backToNative()
        },
        goTo(url){
            let path = url + '.js'
            nativeService.goTo(path, {animated: false, replace: true})
        },
        queryStatus() {
            var self = this;
            var sendCmd = cmdFun.createQueryMessage();
            //nativeService.showLoading();
            // debugger;
            nativeService.startCmdProcess(
                "query",
                sendCmd,
                function (result) {
                    //nativeService.hideLoading();
                    //nativeService.alert(JSON.stringify(result));
                    var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
                    var arr = result_arr.split(",");
                    var analysisObj = cmdFun.analysisCmd(arr);
                    self.analysisFun(analysisObj);
                },
                function (result) {
                    //nativeService.hideLoading();
                    //nativeService.toast("查询失败" + JSON.stringify(result));
                }
            );
        },
        controlDevice(jsonCmd, working){
            let context = this;
            let deviceCmd = cmdFun.createControlMessage(jsonCmd, working);
            //nativeService.alert(deviceCmd);
            // return;
            nativeService.startCmdProcess(
                "control",
                deviceCmd,
                function(result){
                    context.queryStatus();
                },
                function(result){
                    nativeService.toast('控制失败，请检查网络或者设置的参数');
                    //console.log('fail', result);
                }
            )
        },
        listenerDeviceReiveMessage(){
            let context = this;
            globalEvent.addEventListener("receiveMessage", function(e) {
                var str = e.data;
                // nativeService.alert(str);
                var arr = str.split(",");
                var analysisObj = cmdFun.analysisCmd(arr); //解析04上行指令
                context.analysisFun(analysisObj);
            });

             //监听设备在线离线状态
             globalEvent.addEventListener("receiveMessageFromApp", (data) => {
                //nativeService.toast(data);
               if(data && data.messageType == "deviceOnlineStatus") {
                   if(data.messageBody && data.messageBody.onlineStatus == "online") {
                       // this.onlineStatus = "1";
                   } else if(data.messageBody && data.messageBody.onlineStatus == "offline") {
                       // this.onlineStatus = "0";
                   } else {
                       // this.onlineStatus = "0";
                   }
               }
           });
        },
    }
};

export default deviceMessageMixin;