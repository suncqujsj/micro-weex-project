/**
 * Created by sf
 * 2018/10/22
 */

import cmdFun from "../command/util.js"; //解析指令
import nativeService from '@/common/services/nativeService';
const globalEvent = weex.requireModule("globalEvent");
const storage = weex.requireModule('storage');

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
        viewappear(tabs){
            this.listenerDeviceReiveMessage(tabs);
        },
        onlongpressQuery(device){//隐藏调试，查看设备上报数据
            var self = this;
            var sendCmd = cmdFun.createQueryMessage(device);
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
        queryRunTimer(timeSet,tabs,device){
            var self = this;
            this.queryTimer = setInterval(function(){
                self.queryStatus(tabs,device);                
            },timeSet*1000);
        },
        queryStatus(tabs,device) {//传入模式配置数据tabs
            var self = this;
            var sendCmd = cmdFun.createQueryMessage(device);
            //nativeService.showLoading();
            // debugger;
            nativeService.startCmdProcess(
                "query",
                sendCmd,
                function (result) {
                    //nativeService.hideLoading();
                    var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
                    var arr = result_arr.split(",");
                    var analysisObj = cmdFun.analysisCmd(arr,tabs);
                    // nativeService.alert(analysisObj);
                    self.analysisFun(analysisObj,tabs);
                },
                function (result) {
                    //nativeService.hideLoading();
                    //nativeService.toast("查询失败" + JSON.stringify(result));
                }
            );
        },
        controlDevice(jsonCmd, callbackData){
            let context = this;
            let deviceCmd = cmdFun.createControlMessage(jsonCmd, callbackData);
            //this.testCmdFun(cmdFun.cmdTo16Hex(deviceCmd));
            nativeService.showLoading();
            // nativeService.alert(cmdFun.cmdToEasy(deviceCmd));
            // return;
            nativeService.startCmdProcess(
                "control",
                deviceCmd,
                function(result){
                    nativeService.hideLoading();
                    context.queryStatus(callbackData.tabs,callbackData.device);
                },
                function(result){
                    nativeService.hideLoading();
                    nativeService.toast('控制失败，请检查网络或者设置的参数');
                    //console.log('fail', result);
                }
            )
        },
        
        startOrPause(tabs,device){
            var self = this;
            var record = 3;
            if(this.btnText == "暂停"){
                record = 6;
            }
             if(this.btnText == "继续" || this.btnText == "开始"){
                record = 3;
            }
            var deviceCmd = cmdFun.cmdStartOrPause(record,device);
            nativeService.showLoading();
            nativeService.startCmdProcess(
                "control",
                deviceCmd,
                function(result){
                    nativeService.hideLoading();
                    self.queryStatus(tabs,device);
                },
                function(result){
                     nativeService.toast('控制失败，请检查网络或者设置的参数');
                    //console.log('fail', result);
                }
            )
        },
         cancleWorking(tabs,device){
            var self = this;
            var deviceCmd = cmdFun.cmdCancelWork(device);
            nativeService.showLoading();
            nativeService.startCmdProcess(
                "control",
                deviceCmd,
                function(result){
                  nativeService.hideLoading();
                  self.queryStatus(tabs,device);
                },
                function(result){
                    nativeService.toast('控制失败，请检查网络或者设置的参数');
                    //console.log('fail', result);
                }
            )
        },

        getStorageItem(key){
            // nativeService.alert('get:' + key);
            return new Promise(function(resolve, reject){
                storage.getItem(key, event => {
                    // nativeService.alert('get:' + event.data);
                    resolve(event.data);
                });
            });
        },
        setStorageItem(key, value){
            // nativeService.alert('set:' + key);
            return new Promise(function(resolve, reject){
                storage.setItem(key, JSON.stringify(value), event => {
                    nativeService.alert('get:' + event.data);
                    resolve(event.data);
                });
            });
        },

        getDeviceInfo: function(key){
            // nativeService.alert(key);
            let context = this;
            return this.getStorageItem(key).then(function(data){
                // nativeService.alert(typeof data);
                // return;
                if(data === 'undefined') {
                    // nativeService.toast('comein', 3000);
                    return nativeService.getDeviceInfo().then(function(data){
                        // nativeService.alert(data);
                        return context.setStorageItem(key, data);
                    });
                }

                // nativeService.alert(data);
                let dataJson = JSON.parse(data);
                if(dataJson && dataJson.result.deviceSn) {
                    let deviceSn = dataJson.result.deviceSn;
                    // nativeService.alert(deviceSn);
                    return new Promise(function(resolve, reject){
                        resolve(deviceSn);
                    });
                }
            });
        },

        listenerDeviceReiveMessage(tabs){//传入模式配置数据
            let context = this;
            // nativeService.toast(tabs);
            globalEvent.addEventListener("receiveMessage", function(e) {
                var str = e.data;
                nativeService.alert(str);
                var arr = str.split(",");
                var analysisObj = cmdFun.analysisCmd(arr,tabs); //解析04上行指令
                context.analysisFun(analysisObj,tabs);
            });

             //监听设备在线离线状态
             globalEvent.addEventListener("receiveMessageFromApp", (data) => {
               if(data && data.messageType == "deviceOnlineStatus") {
                   if(data.messageBody && data.messageBody.onlineStatus == "online") {
                       // this.onlineStatus = "1";
                   } else if(data.messageBody && data.messageBody.onlineStatus == "offline") {
                       // this.onlineStatus = "0";
                       nativeService.backToNative()
                   } else {
                       // this.onlineStatus = "0";
                   }
               }
           });
        },
    }
};

export default deviceMessageMixin;