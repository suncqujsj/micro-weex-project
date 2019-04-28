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
            loading: false,
            device: null,
            tabs: null
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
             nativeService.getDeviceInfo().then(function(data){
                nativeService.alert(data);
            });

            var self = this;
            var sendCmd = cmdFun.createQueryMessage(this.device);
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
            let deviceCmd = cmdFun.cmdLock({childLock},this.device);
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
        goTo(url){
            let path = url + '.js'
            nativeService.goTo(path, {animated: false, replace: true})
        },
        queryRunTimer(timeSet){
            var self = this;
            this.queryTimer = setInterval(function(){
                self.queryStatus();   
                // nativeService.toast(111);
            },timeSet*1000);
        },
        initData(tabs,device){
            this.tabs = tabs;
            this.device = device;
        },
        queryStatus(tabs=this.tabs,device=this.device, cb=null) {//传入模式配置数据tabs
            if(device) {
                this.initData(tabs, device);
            }
            var self = this;
            // nativeService.alert(this.device);
            nativeService.hideLoading();
            var sendCmd = cmdFun.createQueryMessage(this.device);
            // nativeService.alert(this.device);

            //nativeService.showLoading();
            // debugger;
            nativeService.startCmdProcess(
                "query",
                sendCmd,
                function (result) {
                    //nativeService.hideLoading();
                    var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
                    var arr = result_arr.split(",");
                    // nativeService.alert(arr);
                    var analysisObj = cmdFun.analysisCmd(arr,self.tabs);
                    self.analysisFun(analysisObj,self.tabs);

                    // let load_time = (new Date()).getTime() - self.startTime.getTime();
                    // nativeService.alert(self.startTime)
                    // cb && cb();
                },
                function (result) {
                    //nativeService.hideLoading();

                    //nativeService.toast("查询失败" + JSON.stringify(result));
                }
            );
        },
        sendLightCmd(lightValue){
            let context = this;
            let deviceCmd = cmdFun.cmdLight(lightValue, this.device);
            // this.testCmdFun(cmdFun.cmdTo16Hex(deviceCmd));
            // return;
            nativeService.showLoading();
            nativeService.startCmdProcess(
                "control",
                deviceCmd,
                function(result){
                    nativeService.hideLoading();
                    // nativeService.alert(result);
                    context.queryStatus();
                },
                function(result){
                    nativeService.hideLoading();
                    nativeService.toast('控制失败，请检查网络或者设置的参数');
                    //console.log('fail', result);
                }
            )
        },
        setting(cmdObj){
            if(!this.hasSetting){
                return;
            }
            var _isRecipe = false;
            let {constant,tabs} = this;
            
            if(cmdObj.mode.value == 0xE0){
                _isRecipe = true;
            }
            var _item = cmdFun.getCurrentModeItem(tabs,cmdObj.recipeId.value,cmdObj.mode.value,_isRecipe);
            
            this.modeText = _item.text;
            this.currentItem = _item;
            // nativeService.alert(_item);
            var time = cmdObj.timeRemaining.hour*60+cmdObj.timeRemaining.minute;
            if(_item.time.range && _item.time.range.length>0){
                let leastTime = _item.time.range[0];
                if(time<leastTime){
                    time = leastTime;
                }
            }
            this.current.time = time;
            this.current.second = cmdObj.timeRemaining.second;
            this.current.temperature = cmdObj.temperature.upLowTemperature;
            this.current.preheat = cmdObj.displaySign.preheat?true:false;
            this.current.fireAmount = cmdObj.fire.value;
            this.current.steamAmount = cmdObj.steam.value;
            this.current.weight = cmdObj.weight.value;
            this.current.probeTemperature = cmdObj.probeSetttingTemperature.value;
            this.current.isProbeSettingTemperature = cmdObj.temperature.upLowTemperature;
            // this.currentItem.steamSwitch.default = cmdObj.steam.value?true:false;
            // nativeService.toast(this.current,3);
            this.openDialog();
        },
        controlDevice(jsonCmd, callbackData){
            let context = this;

            // 蒸汽烤箱0TQN36QL判断探针温度与设定的常规温度
            if(this.device.extra1.sn8 =='0TQN36QL'){
                if(jsonCmd.isProbeSettingTemperature < jsonCmd.probeTemperature){
                    nativeService.toast('设定的温度不能低于探针温度哦');
                    return;
                }
            }
           
            let deviceCmd = cmdFun.createControlMessage(jsonCmd, callbackData);
            // this.testCmdFun(cmdFun.cmdTo16Hex(deviceCmd));
            // return;
            nativeService.showLoading();
            // nativeService.alert(cmdFun.cmdToEasy(deviceCmd));
            nativeService.startCmdProcess(
                "control",
                deviceCmd,
                function(result){
                    nativeService.hideLoading();
                    var result_arr = result.replace(/\[|]/g, ""); //去掉中括号
                    var arr = result_arr.split(",");
                    // nativeService.alert(arr[11]);
                    if(parseInt(arr[11])==254){
                        if(parseInt(arr[13])==6){
                            nativeService.toast('参数错误');
                            return;
                        }
                        if(parseInt(arr[13])==7){
                            nativeService.toast('腔体温度过高，请冷却后使用！');
                            return;
                        }
                    
                    }
                    context.queryStatus();
                },
                function(result){
                    nativeService.hideLoading();
                    nativeService.toast('控制失败，请检查网络或者设置的参数');
                    //console.log('fail', result);
                }
            )
        },
        
        startOrPause(){
            var self = this;
            var record = 3;
            if(this.btnText == this.getLanguage("pause")){
                record = 6;
            }
             if(this.btnText == this.getLanguage("resume") || this.btnText == this.getLanguage("start")){
                record = 3;
            }
            var deviceCmd = cmdFun.cmdStartOrPause(record,this.device);
            nativeService.showLoading();
            nativeService.startCmdProcess(
                "control",
                deviceCmd,
                function(result){
                    nativeService.hideLoading();
                    self.queryStatus();
                },
                function(result){
                     nativeService.toast('控制失败，请检查网络或者设置的参数');
                    //console.log('fail', result);
                }
            )
        },
         cancleWorking(){
            var self = this;
            var deviceCmd = cmdFun.cmdCancelWork(this.device);
            nativeService.showLoading();
            nativeService.startCmdProcess(
                "control",
                deviceCmd,
                function(result){
                  nativeService.hideLoading();
                  self.queryStatus();
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

        listenerDeviceReiveMessage(){//传入模式配置数据
            let context = this;
            globalEvent.addEventListener("receiveMessage", function(e) {
                nativeService.hideLoading();
                context.settingClickRecord = false;
                var str = e.data;
                var arr = str.split(",");
                // nativeService.alert(cmdFun.cmdToEasy(arr));
                if(parseInt(arr[9])==0x0A){
                    return;
                }
                var analysisObj = cmdFun.analysisCmd(arr,context.tabs);
                context.analysisFun(analysisObj,context.tabs);
            });

             //监听设备在线离线状态
             globalEvent.addEventListener("receiveMessageFromApp", (data) => {
                 // 网络状态判断
                 if(data.messageType === 'networkStatusChanged') {
                     if(data.messageBody.status === 1) {
                         this.hideWarningDialog();
                         return;
                     }

                     this.setWarningDialog('主人，您的手机没有网络。');
                 }


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