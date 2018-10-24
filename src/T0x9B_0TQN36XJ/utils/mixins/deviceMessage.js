/**
 * Created by sf
 * 2018/10/22
 */

import nativeService from "../../../common/services/nativeService";
import cmdFun from "../util.js"; //解析指令
const globalEvent = weex.requireModule("globalEvent");

const deviceMessageMixin = {
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
        goBack(){
            nativeService.backToNative()
        },
        goTo(url){
            let path = url + '.js'
            nativeService.goTo(path,false, true)
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
                    // nativeService.toast("查询失败" + JSON.stringify(result));
                }
            );
        },
        controlDevice(jsonCmd, working){
            // return;
            let context = this;
            let deviceCmd = cmdFun.createControlMessage(jsonCmd, working);
            nativeService.alert(deviceCmd);
            // return;
            nativeService.startCmdProcess(
                "control",
                deviceCmd,
                function(result){
                    context.queryStatus();
                },
                function(result){
                    console.log('fail', result);
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
                nativeService.alert(data);
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