import nativeService from './nativeService'
import config from '../config/configMapping'
export default {
    stype: 0,
    scene: {},
    sceneList: [],
    applianceList: [],
    applianceNodeList: [],
    deviceList: [],
    commonSceneList: [], //普通场景列表
    currentDomainId: 0,
    haveEdit: false,
    tmpData: {
        condition: {},
        task: {},
        operation: "",
        entryPage: "",
        navigate: "init",
        isEdit: 0,
        userRoleList: [],

    },
    initCondtion() {
        this.tmpData.userRoleList = [];
        this.tmpData.condition = {
            "type": "",
            "modelId": "",
            "serviceType": "",
            "deviceID": "",
            "deviceName": "",
            "event": {},
            "endpoint": 1,
            "cmp": 0,
            "dayofweek": [],
            "timeofday": "0000",
            "index": 0,
            "eventDesc": ""
        };
    },
    initTask() {
        this.tmpData.task = {
            "type": "",
            "modelId": "",
            "serviceType": "",
            "deviceID": "",
            "taskName": "",
            "event": {},
            "endlist": [],
            "index": 0,
            "eventDesc": "",
            "classType": ""
        };
    },
    initAutoScene() {
        this.stype = 1;
        this.haveEdit = false;
        this.initScene();
    },
    initCommScene() {
        this.stype = 2;
        this.initScene();
    },
    initScene() {
        this.scene = {
            id: '',
            name: '',
            type: this.stype, //场景类型：1为自运行场景，2为普通场景,3 为定时任务,4 时段 //类型为数字
            enable: true,
            conditions: [],
            tasks: [],
            title: {
                t1: "",
                t2: ""
            },
            group: {
                time: 0,
                interval: 0,
                operation: 0,
                sensor: 0
            } //time,interval,appliance,monitor,sensor
        }
    },
    addScene(succFunc, failFunc) {
        var sName = this.scene.name;
        if (!sName) {
            sName = this.getSceneName();
            this.scene.name = sName;
        }
        if (this.validateScene("all_no_id")) {
            var callName = "addScene";
            var callParams = {
                "stype": this.stype,
                "data": {
                    "sType": this.scene.type,
                    "sName": sName,
                    "enable": this.scene.enable ? 1 : 0,
                    "IF": angular.copy(this.scene.conditions),
                    "TH": angular.copy(this.scene.tasks),
                    "activeTime": angular.copy(this.scene.activeTime)
                }
            };
            //alert("scene :" + JSON.stringify(callParams.data));
            console.log(JSON.stringify(callParams));
            this.nativeCall(callName, callParams, function(data) {
                var sceneID = data.sceneID;
                succFunc({ "sceneID": sceneID });
            }, failFunc);
        }
    },
    updateScene(succFunc, failFunc) {
        var sName = this.scene.name;
        if (!sName || this.scene.type == '1' || this.scene.type == '3') {
            sName = this.getSceneName();
            this.scene.name = sName;
        }
        if (this.validateScene("all")) {
            var callName = "updateScene";
            var callParams = {
                "sceneID": parseInt(this.scene.id),
                "stype": this.stype,
                "data": {
                    "sType": this.scene.type,
                    "sName": sName,
                    "enable": this.scene.enable ? 1 : 0,
                    "IF": angular.copy(this.scene.conditions),
                    "TH": angular.copy(this.scene.tasks),
                    "activeTime": angular.copy(this.scene.activeTime)
                }
            };
            console.log(JSON.stringify(callParams));
            this.nativeCall(callName, callParams, succFunc, failFunc);
        }
    },
    saveOrUpdateScene(succFunc, failFunc) {
        if (this.scene.id) {
            this.updateScene(succFunc, failFunc);
        } else {
            this.addScene(succFunc, failFunc);
        }
    },
    delScene(succFunc, failFunc) {
        if (this.validateScene("id")) {
            var callName = "delScene";
            var callParams = {
                "sceneID": parseInt(this.scene.id)
            };
            this.nativeCall(callName, callParams, succFunc, failFunc)
        }
    },
    getSceneName() {
        var _conditions = this.scene.conditions;
        var _name = "自定义";
        if (_conditions.length > 0) {
            var titles = this.genConditionTitle(_conditions[0]);
            _name = titles[0] + ' ' + titles[1];
        }
        return _name;
    },
    listScene(succFunc, failFunc) {
        if (this.validateScene("type")) {
            var callName = "sceneList";
            var callParams = {
                "stype": this.stype
            };
            var _that = this;
            this.nativeCall(callName, callParams, function(data) {
                if (data && data.scene_list) {
                    var sceneDataList = data.scene_list;
                    setTimeout(function() {
                        _that.getAllApplianceList(function() {
                            _that.formatSceneList(sceneDataList, succFunc, failFunc);
                        }, function() {
                            _that.formatSceneList(sceneDataList, succFunc, failFunc);
                        });
                    }, 0);
                } else {
                    //_that.prompAlert("err_callback_data");
                    failFunc();
                }
            }, failFunc);
        }
    },
    formatSceneList(sceneDataList, succFunc, failFunc) {
        var _that = this;
        var sceneObjList = [];
        var isSelectSceneTask = false;
        //alert("scene_list:"+JSON.stringify(sceneDataList));
        for (var i = 0; i < sceneDataList.length; i++) {
            var sceneid = sceneDataList[i].sceneid;
            var info = sceneDataList[i].info;
            var formatDatas = _that.formatSceneData(sceneid, info);
            var sceneObj = formatDatas[0];
            var isSelectSceneTaskObj = formatDatas[1];
            if (isSelectSceneTaskObj) {
                isSelectSceneTask = true;
            }
            sceneObjList.push(sceneObj);
            //alert("sceneObjList:"+JSON.stringify(sceneObjList));
        }
        if (isSelectSceneTask) {
            setTimeout(function() {
                _that.syncSelectSceneTaskEventDesc(sceneObjList, function() {
                    succFunc(sceneObjList);
                });
            }, 0);
        } else {
            succFunc(sceneObjList);
        }
    },
    getSceneList(stype, succFunc, failFunc) {
        if (this.commonSceneList.length > 0) {
            succFunc(this.commonSceneList);
        } else {
            var callName = "sceneList";
            var callParams = {
                "stype": stype
            };
            var _that = this;
            this.nativeCall(callName, callParams, function(data) {
                if (data && data.scene_list) {
                    var sceneDataList = data.scene_list;
                    var sceneObjList = [];
                    for (var i = 0; i < sceneDataList.length; i++) {
                        var sceneid = sceneDataList[i].sceneid;
                        var info = sceneDataList[i].info;
                        var scene = {
                            id: sceneid,
                            name: info["sName"]
                        };
                        sceneObjList.push(scene);
                        _that.commonSceneList.push(scene);
                    }
                    succFunc(sceneObjList);
                } else {
                    failFunc();
                }
            }, failFunc);
        }

    },
    genSceneConditionGroup(conditions) {
        var time = 0;
        var interval = 0;
        var operation = 0;
        var sensor = 0;
        if (conditions.length > 0) {
            for (var i = 0; i < conditions.length; i++) {
                var condition = conditions[i];
                if (condition.modelId == "click") {
                    operation = 1;
                } else if (condition.modelId == "time") {
                    time = 1;
                } else if (condition.modelId == "interval") {
                    interval = 1;
                } else {
                    var group = this.genNodeGroup(condition.modelId);
                    if (group == "operation") {
                        operation = 1;
                    } else if (group == "sensor") {
                        sensor = 1;
                    }
                }
            }
        }
        return {
            time: time,
            interval: interval,
            operation: operation,
            sensor: sensor
        };
    },
    genSceneConditionTitle(conditions) {
        var title = "";
        if (conditions.length > 0) {
            var condition = conditions[0];
            var titles = this.genConditionTitle(condition);
            if (!titles[2]) {
                title = titles[0] + " " + titles[1];
            } else {
                title = titles[0];
            }
        }
        return title;
    },
    genConditionTitle(condition) {
        var title1 = "";
        var title2 = "";
        var title3 = "";
        if (condition.modelId == "click") {
            title1 = "点击";
            title2 = "执行";
        } else if (condition.modelId == "time") {
            var titles = this.genTimeTitle(condition.timeofday, condition.dayofweek);
            title1 = titles[0];
            title2 = titles[1];
            title3 = titles[2];
        } else if (condition.modelId == "interval") {
            var titles = this.getTimeIntervalTitle(condition.timeofday, condition.dayofweek);
            title1 = titles[0];
            title2 = titles[1];
            title3 = titles[2];
        } else {
            var _type = condition.type;
            if (_type == 0x01) {
                var titles = this.genNodeTitle(condition, "condition");
                title1 = titles[0];
                title2 = titles[1];
                title3 = titles[2];
            } else {
                var titles = this.genApplianceTitle(condition, "condition");
                title1 = titles[0];
                title2 = titles[1];
                title3 = titles[2];
            }
        }
        return [title1, title2, title3];
    },
    genConditionImg(condition) {
        var _img = "";
        if (condition.modelId == "click") {
            _img = "../lib/img/scene/list-trigger_@2x.png";
        } else if (condition.modelId == "time") {
            _img = "../lib/img/scene/list-time_@2x.png";
        } else if (condition.modelId == "interval") {
            _img = "../lib/img/scene/list-time-interval_@2x.png";
        } else {
            var _type = condition.type;
            if (_type == 0x01) {
                _img = this.genSceneNodeImg(condition, "condition");
            } else {
                _img = this.genSceneApplianceImg(condition, "condition");
            }
        }
        return _img;
    },
    genSceneTaskTitle(tasks) {
        var title = "";
        if (tasks.length > 0) {
            var task = tasks[0];
            var titles = this.genTaskTitle(task);
            if (!titles[2]) {
                title = titles[0] + " " + titles[1];
            } else {
                title = titles[0];
            }
        }
        return title;
    },
    genTaskTitle(task) {
        var title1 = "";
        var title2 = "";
        var title3 = "";
        var _type = task.type;
        var _modelId = task.modelId;
        if ("scene" == _modelId || "scene-relate" == _modelId) {
            title1 = "执行场景";
            for (var i = 0; i < this.commonSceneList.length; i++) {
                if (this.commonSceneList[i]['id'] == task.event.sceneID) {
                    title2 = this.commonSceneList[i]['name'];
                }
            }

        } else if ("message" == _modelId) {
            title1 = "推送通知至手机";
            title2 = " ";
        } else if (_type == 0x01 || (_modelId == 'daikin.cac.001' || _modelId == 'midea.cac.001' || _modelId == '485_daikin.cac.001' || _modelId == '485_midea.cac.001' || _modelId == 'midea.bosheng.001' || _modelId == 'midea.bosheng.002' || _modelId == '485_laffey.RFH.001' || _modelId == '485_laffey.ventilation.001')) {
            var titles = this.genNodeTitle(task, "task");
            title1 = titles[0];
            title2 = titles[1];
            title3 = titles[2];
        } else {
            var titles = this.genApplianceTitle(task, "task");

            title1 = titles[0];
            title2 = titles[1];
            title3 = titles[2];
        }

        return [title1, title2, title3];
    },
    syncSelectSceneTaskEventDesc(sceneList, callback) {
        var _stype = 2;
        var _that = this;
        _that.getSceneList(_stype, function(data) {
            //  alert(sceneList.length.length);
            for (var i = 0; i < sceneList.length; i++) {
                var scene = sceneList[i];
                var isUpdate = _that.updateSelectSceneTaskEventDesc(scene.tasks, data);
                if (isUpdate) {
                    scene.title.t2 = _that.genSceneTaskTitle(scene.tasks);
                }
            }
            callback();
        }, function(err) {
            callback();
        });
    },
    updateSelectSceneTaskEventDesc(tasks, _sceneList) {
        var isUpdate = false;
        for (var j = 0; j < tasks.length; j++) {
            var task = tasks[j];
            if ("scene" == task.modelId) {
                var eventDesc = '';
                for (var i = 0; i < this.commonSceneList.length; i++) {
                    if (this.commonSceneList[i]['id'] == task.event.sceneID) {
                        eventDesc = this.commonSceneList[i]['name'];
                    }
                }
                task.eventDesc = eventDesc;
                //alert("eventDesc:"+task.eventDesc);
            }
        }
        return isUpdate;
        //alert("tasks:"+JSON.stringify(tasks));
    },
    genTaskImg(task) {
        var _img = "";
        var _type = task.type;
        var _modelId = task.modelId;
        if ("scene" == _modelId) {
            _img = "../lib/img/scene/control_scene_@2x.png";
        } else if ("message" == _modelId) {
            _img = "../lib/img/scene/send_masege_@2x.png";
        } else if (_type == 0x01) {
            _img = this.genSceneNodeImg(task, "task");
        } else {
            _img = this.genSceneApplianceImg(task, "task");
        }
        return _img;
    },
    getScene(succFunc, failFunc) {
        var _that = this;
        if (this.validateScene("id")) {
            var callName = "getSceneDetail";
            var callParams = {
                "sceneID": parseInt(this.scene.id)
            };
            this.nativeCall(callName, callParams, function(data) {
                console.log('=====' + JSON.stringify(data));
                var info = data.info;
                _that.getAllApplianceList(function() {
                    _that.formatScene(_that.scene.id, info, succFunc);
                }, function() {
                    _that.formatScene(_that.scene.id, info, succFunc);
                })
            }, failFunc);
        }
    },
    formatScene(sceneid, info, succFunc) {
        var _that = this;
        var formatDatas = this.formatSceneData(sceneid, info);

        var sceneObj = formatDatas[0];
        var isSelectSceneTask = formatDatas[1];
        if (isSelectSceneTask) {
            _that.syncSelectSceneTaskEventDesc([sceneObj], function() {
                //alert("sceneObj:"+JSON.stringify(sceneObj));
                succFunc(sceneObj);
            });
        } else {
            //alert("sceneObj:"+JSON.stringify(sceneObj));
            succFunc(sceneObj);
        }
    },
    formatSceneData(sceneid, info) {
        var _that = this;
        var title1 = "";
        var isCondition1Remove = false;
        var isTask1Remove = false;
        var group = {};
        var conditions = [];
        if (info["IF"] != undefined && info["IF"].length > 0) {
            var conditionsData = info["IF"];
            title1 = _that.genSceneConditionTitle(conditionsData);
            group = _that.genSceneConditionGroup(conditionsData);
            for (var i = 0; i < conditionsData.length; i++) {

                var condition = Object.assign({}, conditionsData[i]);
                condition.index = i + 1;
                condition.deviceImg = _that.genConditionImg(condition);
                //if(!condition.deviceName||!condition.eventDesc){
                var conditionTitles = _that.genConditionTitle(condition);

                condition.deviceName = conditionTitles[0] || condition.deviceName;
                condition.eventDesc = conditionTitles[1] || condition.eventDesc;
                condition.isRemoveDevice = conditionTitles[2];
                if (i == 0) {
                    isCondition1Remove = conditionTitles[2];
                }
                //}
                conditions.push(condition);

            }
        }

        var title2 = "";
        var tasks = [];
        var isSelectSceneTask = false;
        if (info["TH"] != undefined && info["TH"].length > 0) {
            var tasksData = info["TH"];
            title2 = _that.genSceneTaskTitle(tasksData);
            for (var i = 0; i < tasksData.length; i++) {
                var task = Object.assign({}, tasksData[i]);

                task.index = i + 1;
                task.taskName = task.taskName || "";
                task.deviceImg = _that.genTaskImg(task);
                if ("scene" == task.modelId) {
                    isSelectSceneTask = true;
                }
                //if (!task.taskName || !task.eventDesc) {
                var taskTitles = _that.genTaskTitle(task);
                task.taskName = taskTitles[0] || task.taskName;
                task.eventDesc = taskTitles[1] || task.eventDesc;

                task.isRemoveDevice = taskTitles[2];
                //}
                if (task.delaytime == undefined) {
                    task.delaytime = "";
                }
                /*if(task.delayrate == undefined){
                 task.delayrate = 0;
                 }*/
                //if(task.delayDesc == undefined){
                if (task.delaytime) {
                    var delayTimeNum = parseInt(task.delaytime);
                    var minuteNum = Math.floor((delayTimeNum % 3600) / 60);
                    var secondNum = (delayTimeNum % 3600) % 60;
                    var delayDesc = "延时";
                    if (minuteNum > 0) {
                        delayDesc += minuteNum + "分";
                    }
                    if (secondNum > 0) {
                        delayDesc += secondNum + "秒";
                    }
                    /*if (task.delayrate == 0) {
                     delayDesc += ", 一次";
                     }else{
                     delayDesc += ", 每次";
                     }*/
                    task.delayDesc = delayDesc;
                } else {
                    task.delayDesc = "";
                }
                //}
                if (i == 0) {
                    isTask1Remove = taskTitles[2];
                }
                tasks.push(task);
            }
        }
        var sceneObj = {
            id: sceneid,
            activeTime: info["activeTime"],
            name: info["sName"],
            type: info["sType"],
            enable: info["enable"],
            conditions: conditions,
            tasks: tasks,
            title: {
                t1: title1,
                t2: title2,
                isCondition1Remove: isCondition1Remove,
                isTask1Remove: isTask1Remove
            },
            group: group
        };
        return [sceneObj, isSelectSceneTask];
    },
    exeScene(succFunc, failFunc) {
        if (this.validateScene("id")) {
            var callName = "executeNow";
            var callParams = {
                "topic": "/scene/exe",
                "data": {
                    "sceneID": parseInt(this.scene.id)
                }
            };
            this.nativeCall(callName, callParams, succFunc, failFunc);
        }
    },
    enableScene(succFunc, failFunc) {
        if (this.validateScene("id")) {
            var callName = "enableScene";
            var callParams = {
                "sceneID": parseInt(this.scene.id),
                "enable": 1
            };
            this.nativeCall(callName, callParams, succFunc, failFunc);
        }
    },
    disableScene(succFunc, failFunc) {
        if (this.validateScene("id")) {
            var callName = "enableScene";
            var callParams = {
                "sceneID": this.scene.id,
                "enable": 0
            };
            this.nativeCall(callName, callParams, succFunc, failFunc);
        }
    },
    ableScene(sceneId, enable, succFunc, failFunc) {
        var callName = "enableScene";
        var callParams = {
            "sceneID": parseInt(sceneId),
            "enable": enable
        };
        this.nativeCall(callName, callParams, succFunc, failFunc);
    },
    validateScene(props) {
        /*if (props == "applianceId" || props == "all") {
         if (!window.deviceId) {
         this.prompAlert("emp_applianceId");
         return false;
         }
         if (props == "applianceId") {
         return true;
         }
         }
         if (props == "id" || props == "all") {
         if (!this.scene.id) {
         this.prompAlert("emp_sceneId");
         return false;
         }
         if (props == "id") {
         return true;
         }
         }
         if (props == "type" || props == "all" || props == "all_no_id") {
         if (!this.scene.type) {
         this.prompAlert("emp_sceneType");
         return false;
         }
         if (props == "type") {
         return true;
         }
         }
         if (props == "all" || props == "all_no_id") {
         if (!this.scene.name) {
         this.prompAlert("emp_sceneName");
         return false;
         }
         }*/
        return true;
    },
    validateSceneStandalone() {
        var conditions = this.scene.conditions;
        for (var i = 0; i < conditions.length; i++) {
            var condition = conditions[i];
            return this.validateNodeStandalone(condition);
        }
        return false;
    },
    validateNodeStandalone(condition) {
        if (condition.modelId == "click") {
            return true;
        } else if (condition.modelId == "time") {
            return true;
        } else if (condition.modelId == "interval") {
            return true;
        }
        var _type = condition.type;
        if (_type == 0x01) {
            var _deviceConfig = config.deviceMapping[condition.modelId];
            if (_deviceConfig.standalone) {
                return true;
            }
        } else {
            for (var item in config.supportItem) {
                var itemCondfig = config.supportItem[item];
                if (itemCondfig.serviceType == condition.serviceType) {
                    if (itemCondfig.standalone) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    genNodeGroup(modelId) {
        var _deviceConfig = config.deviceMapping[modelId];
        if (_deviceConfig && _deviceConfig.group) {
            return _deviceConfig.group;
        }
        return "operation";
    },
    genApplianceTitle(info, dataType) {
        var serviceType = info.serviceType;
        var tName = this.getApplianceName(info.deviceID);
        var tEvent = "";
        var isRemoveDevice = false;
        if (tName == undefined || tName == "") {
            console.log(info);
            isRemoveDevice = true; //名字找不到设备已删除
        }

        for (var item in config.supportItem) {
            var itemCondfig = config.supportItem[item];
            if (itemCondfig.serviceType == serviceType) {
                switch (serviceType) {
                    case "Gateway":
                        if (dataType == "condition") {
                            if (!tName) {
                                tName = info.deviceName || "网关";
                            }
                            tEvent = "响警报";
                        } else {
                            if (!tName) {
                                tName = info.taskName || "网关";
                            }
                            var onOff = info.event.OnOff;
                            var toggleDefence = info.event.switch;
                            if (onOff != undefined && onOff == 1) {
                                tEvent = "响警报";
                            }
                            if (toggleDefence != undefined && toggleDefence == 'on') {
                                tEvent = "开启布防模式";
                            }
                            if (toggleDefence != undefined && toggleDefence == 'off') {
                                tEvent = "关闭布防模式";
                            }
                        }
                        break;
                    case "Camera-YS":
                        if (!tName) {
                            tName = info.taskName || "摄像头";
                        }
                        var catchVideo = info.event.catchVideo;
                        var catchPhoto = info.event.catchPhoto;
                        var viewLive = info.event.viewLive;
                        if (catchPhoto != undefined && catchPhoto == 1) {
                            tEvent = "抓拍照片(三张)";
                        } else if (catchVideo != undefined && catchVideo == 1) {
                            tEvent = "抓拍视频";
                        } else if (viewLive != undefined && viewLive == 1) {
                            tEvent = "查看直播";
                        }

                        break;
                    case "Central-AC":
                        if (!tName) {
                            tName = info.taskName || "中央空调";
                        }
                        var ccMapping = config.ccMapping;

                        var onOff = info.event.OnOff;
                        var operationMode = info.event.operationMode;
                        var targetTemp = info.event.targetTemp;
                        var targetTempDecPoint = info.event.targetTempDecPoint || 0;
                        targetTemp = targetTemp + (targetTempDecPoint / 10);
                        var windSpeed = info.event.windSpeed;

                        if (onOff == 1) {
                            tEvent = ccMapping.OnOff["key" + onOff] + "，" + ccMapping.operationMode["key" + operationMode];
                            //除湿模式不能调节风速
                            if (operationMode == 2) {
                                tEvent += "，" + targetTemp + "℃";
                                //送风模式不能调节温度
                            } else if (operationMode == 1) {
                                tEvent += "，风速" + ccMapping.windSpeed["key" + windSpeed];
                            } else {
                                tEvent += "，风速" + ccMapping.windSpeed["key" + windSpeed] + "，" + targetTemp + "℃";
                            }
                        } else {
                            tEvent = ccMapping.OnOff["key" + onOff];
                        }
                        break;
                    case "Air-condition":
                        if (!tName) {
                            tName = info.taskName || "空调";
                        }
                        var airConditionMapping = config.airConditionMapping;

                        var onOff = info.event.OnOff;
                        var operationMode = info.event.operationMode;
                        var targetTemp = info.event.targetTemp / 100;
                        var targetWind = info.event.windSpeed;

                        if (onOff == 1) {
                            tEvent = airConditionMapping.OnOff["key" + onOff] + "，" + airConditionMapping.operationMode["key" + operationMode];
                            if (operationMode == 5) {
                                tEvent += "，温度自动";
                            } else {
                                tEvent += "，" + targetTemp + "℃";
                            }
                            if (targetWind == 102) {
                                tEvent += "，风速自动";
                            } else {
                                tEvent += "，风速" + targetWind + "%";
                            }
                        } else {
                            tEvent = airConditionMapping.OnOff["key" + onOff];
                        }
                        break;
                    case "Water-heater":
                        if (!tName) {
                            tName = info.taskName || "热水器";
                        }
                        var waterHeaterMapping = config.waterHeaterMapping;
                        var onOff = info.event.OnOff;
                        var stat = info.event.stat;

                        if (typeof onOff != 'undefined') {
                            var targetTemp = info.event.targetTemp;
                            if (onOff == 1) {
                                tEvent = waterHeaterMapping.OnOff["key" + onOff] + "，温度" + targetTemp + "°";
                            } else {
                                tEvent = waterHeaterMapping.OnOff["key" + onOff];
                            }
                        }
                        if (typeof stat != 'undefined') {
                            tEvent = waterHeaterMapping.stat["key" + stat];
                        }
                        break;
                    case "Air-humidifier":
                        if (!tName) {
                            tName = info.taskName || "加湿器";
                        }
                        var fdMapping = config.fdMapping;
                        var onOff = info.event.OnOff;
                        tEvent = fdMapping.OnOff["key" + onOff];
                        break;
                    case "Sweeper-robot":
                        if (!tName) {
                            tName = info.taskName || "扫地机器人";
                        }
                        var funCmd = info.event.funCmd;
                        if (funCmd == 2) {
                            tEvent = "自动清扫";
                        } else if (funCmd == 1) {
                            tEvent = "充电";
                        }
                        break;
                    case "Fan":
                        if (!tName) {
                            tName = info.taskName || "风扇";
                        }
                        var fanMapping = config.fanMapping;
                        var onOff = info.event.OnOff;
                        /*var windSpeed = info.event.windSpeed;
                        var Shake = info.event.Shake;

                        if (onOff == 1) {
                            tEvent = fanMapping.OnOff["key" + onOff] + "，风速" + windSpeed + "%，摆头" + Shake + "°";
                        } else {
                            tEvent = fanMapping.OnOff["key" + onOff];
                        }*/
                        tEvent = fanMapping.OnOff["key" + onOff];
                        break;
                    case "Air-purifier":
                        if (!tName) {
                            tName = info.taskName || "空气净化器";
                        }
                        var onOff = info.event.OnOff;
                        if (onOff == 1) {
                            tEvent = config.airPurifierMapping.OnOff["key" + onOff];
                            var operationMode = info.event.operationMode;
                            tEvent += "，" + config.airPurifierMapping.operationMode["key" + operationMode];

                            if (operationMode == 6) {
                                var windSpeed = info.event.windSpeed;
                                tEvent += "，" + config.airPurifierMapping.windSpeed["key" + windSpeed];
                            }
                        } else {
                            tEvent = config.airPurifierMapping.OnOff["key" + onOff];
                        }
                        break;
                    case "Clothes-hanger":
                        if (!tName) {
                            tName = info.taskName || "晾衣架";
                        }
                        if (info.event) {
                            var funCmdName = config.AirerMappiing.funCmd[info.event.funCmd];
                            if (funCmdName != undefined) {
                                tEvent = funCmdName;
                            }
                        }
                        break;
                    case "Smoke-machine":
                        if (!tName) {
                            tName = info.taskName || "抽油烟机";
                        }
                        if (info.event) {
                            var funCmdName = config.SmokeMachineMapping.funCmd[info.event.funCmd];
                            if (funCmdName != undefined) {
                                tEvent = funCmdName;
                            }
                        }
                        break;
                    case "Hope-music":
                        if (!tName) {
                            tName = info.taskName || "向往背景音乐";
                        }
                        if (info.event) {
                            var HopeCmd = info.event.HopeCmd;
                            if (HopeCmd != undefined) {
                                tEvent = config.deviceMapping["midea.music.player"].event.HopeCmd[HopeCmd];
                            }
                        }
                        break;
                    case "Washer":
                        if (!tName) {
                            tName = info.taskName || "洗衣机";
                        }
                        var washerMapping = config.washerMapping;
                        var stat = info.event.stat;
                        if (typeof stat != 'undefined') {
                            tEvent = washerMapping.stat["key" + stat];
                        }
                        break;
                    case "Kitchen":
                        var kitchenMapping = config.kitchenMapping;
                        var stat = info.event.stat;
                        var funCmd = info.event.funCmd;
                        if (!tName) {
                            tName = info.taskName || "灶具";
                        }
                        if (typeof stat != 'undefined') {
                            tEvent = kitchenMapping.stat["key" + stat];
                        }
                        if (typeof funCmd != 'undefined') {
                            tEvent = kitchenMapping.funCmd["key" + funCmd];
                        }

                        break;
                    case "Electric-cooker":
                    case "Induction-cooker":
                    case "Pressure-cooker":
                        var cookerMapping = config.cookerMapping;
                        var stat = info.event.stat;
                        if (typeof stat != 'undefined') {
                            tEvent = cookerMapping.stat["key" + stat];
                        }

                        break;
                    case "Air-dehumidifier":
                        var AirDehumidifierMapping = config.AirDehumidifierMapping;
                        var OnOff = info.event.OnOff;
                        if (typeof OnOff != 'undefined') {
                            tEvent = AirDehumidifierMapping.OnOff["key" + OnOff];
                        }

                        break;
                    default:

                        // statements_def
                        break;
                }
            }

        }
        return [tName, tEvent, isRemoveDevice];
    },
    genSceneApplianceImg(info, dataType) {
        var serviceType = info.serviceType;
        var _img = "../lib/img/scene/control_home_device_@2x.png";
        return _img;
    },
    genNodeTitle(info, dataType) {

        var deviceConfig = config.deviceMapping[info.modelId];
        var tName = this.getApplianceNodeName(info.deviceID);
        var tEvent = "";
        var isRemoveDevice = false;
        //alert("@@@"+tName);
        if (tName == undefined || tName == "") {
            isRemoveDevice = true; //名字找不到设备已删除
        }
        switch (info.modelId) {
            case "luftmon.alphair.001":
                if (!tName) {
                    tName = info.deviceName || "空气盒子";
                }
                var event = info.event || {};
                var cmp = info.cmp;
                if (event.ZoneStatus != undefined) {
                    tEvent = event.ZoneStatus == 1 ? "PM2.5高" : "";
                }
                if (event.currTemp != undefined) {
                    tEvent = tEvent + "温度" + (cmp == 1 ? '>' : '<') + event.currTemp / 100 + "°";
                }
                if (event.currHum != undefined) {
                    tEvent = tEvent + "湿度" + (cmp == 1 ? '>' : '<') + event.currHum / 100 + "%";
                }
                if (event.Pm25Value != undefined) {
                    tEvent = tEvent + "PM2.5" + (cmp == 1 ? '>' : '<') + event.Pm25Value;
                }
                break;
            case "485_daikin.cac.001":
                if (!tName) {
                    tName = info.deviceName || "中央空调";
                }
                var airConditionMapping = config.airConditionMapping;

                if (info.endlist != undefined && info.endlist.length > 0) {
                    var onOff = info.endlist[0].event.OnOff;
                    var operationMode = info.endlist[0].event.operationMode;
                    var targetTemp = info.endlist[0].event.targetTemp;
                    var targetWind = info.endlist[0].event.windSpeed;

                    if (onOff == 1) {
                        tEvent = airConditionMapping.OnOff["key" + onOff] + "，" + airConditionMapping.operationMode["key" + operationMode];
                        if (operationMode == 5) {
                            tEvent += "，温度自动";
                        } else {
                            tEvent += "，" + targetTemp + "℃";
                        }
                        if (targetWind == 0) {
                            tEvent += "，风速自动";
                        } else {
                            tEvent += "，风速" + targetWind + "档";
                        }
                    } else {
                        tEvent = airConditionMapping.OnOff["key" + onOff];
                    }

                }

                break;

            case "485_midea.cac.001":
                if (!tName) {
                    tName = info.deviceName || "中央空调";
                }
                var airConditionMapping = config.midea485Mapping;

                if (info.endlist != undefined && info.endlist.length > 0) {
                    var onOff = info.endlist[0].event.OnOff;
                    var operationMode = info.endlist[0].event.operationMode;
                    var targetTemp = info.endlist[0].event.targetTemp;
                    var windSpeed = info.endlist[0].event.windSpeed;
                    if (onOff == 1) {
                        tEvent = airConditionMapping.OnOff["key" + onOff] + "，" + airConditionMapping.operationMode["key" + operationMode];
                        if (windSpeed != undefined && operationMode != 1 && operationMode != 3 && operationMode != 5) {
                            tEvent += "，" + airConditionMapping.windSpeed["key" + windSpeed]
                        }
                        if (targetTemp != undefined && operationMode != 5) {
                            tEvent += "，" + targetTemp + "℃";
                        }
                    } else {
                        tEvent = airConditionMapping.OnOff["key" + onOff];
                    }

                }

                break;
            case "midea.cac.001":
                if (!tName) {
                    tName = info.deviceName || "美的中央空调";
                }
                var airConditionMapping = config.airConditionMapping;

                if (info.endlist != undefined && info.endlist.length > 0) {
                    var onOff = info.endlist[0].event.OnOff;
                    var operationMode = info.endlist[0].event.operationMode;
                    var targetTemp = info.endlist[0].event.targetTemp / 100;
                    var targetWind = info.endlist[0].event.windSpeed;

                    if (onOff == 1) {
                        tEvent = airConditionMapping.OnOff["key" + onOff] + "，" + airConditionMapping.operationMode["key" + operationMode];
                        if (operationMode == 5) {
                            tEvent += "，温度自动";
                        } else {
                            tEvent += "，" + targetTemp + "℃";
                        }
                        // if (targetWind == 0) {
                        //     tEvent += "，风速自动";
                        // } else {
                        //     tEvent += "，风速" + targetWind + "档";
                        // }
                    } else {
                        tEvent = airConditionMapping.OnOff["key" + onOff];
                    }

                }
                break;
            case "daikin.cac.001":
                if (!tName) {
                    tName = info.deviceName || "大金中央空调";
                }

                var airConditionMapping = config.airConditionMapping;

                if (info.endlist != undefined && info.endlist.length > 0) {
                    var onOff = info.endlist[0].event.OnOff;
                    var operationMode = info.endlist[0].event.operationMode;
                    var targetTemp = info.endlist[0].event.targetTemp / 100;
                    var targetWind = info.endlist[0].event.windSpeed;

                    if (onOff == 1) {
                        tEvent = airConditionMapping.OnOff["key" + onOff] + "，" + airConditionMapping.operationMode["key" + operationMode];
                        if (operationMode == 5) {
                            tEvent += "，温度自动";
                        } else {
                            tEvent += "，" + targetTemp + "℃";
                        }
                        // if (targetWind == 0) {
                        //     tEvent += "，风速自动";
                        // } else {
                        //     tEvent += "，风速" + targetWind + "档";
                        // }
                    } else {
                        tEvent = airConditionMapping.OnOff["key" + onOff];
                    }

                }
                break;
            case "485_laffey.RFH.001":
                if (!tName) {
                    tName = info.deviceName || "拉菲地暖";
                }
                if (info.endlist != undefined && info.endlist.length > 0) {
                    var rfhMapping = config.rfhMapping;
                    var onOff = info.endlist[0].event.OnOff;
                    var operationMode = info.endlist[0].event.operationMode;
                    var targetTemp = info.endlist[0].event.targetTemp;
                    if (onOff == 1) {
                        tEvent = rfhMapping.OnOff["key" + onOff] + "，" + rfhMapping.operationMode["key" + operationMode];
                        tEvent += "，" + targetTemp + "℃";
                    } else {
                        tEvent = rfhMapping.OnOff["key" + onOff];
                    }
                }
                break;
            case "485_laffey.ventilation.001":
                if (!tName) {
                    tName = info.deviceName || "拉菲新风";
                }
                if (info.endlist != undefined && info.endlist.length > 0) {
                    var ventilationMapping = config.ventilationMapping;
                    var onOff = info.endlist[0].event.OnOff;
                    var operationMode = info.endlist[0].event.operationMode;
                    var intakeLevel = info.endlist[0].event.intakeLevel;
                    var exhaustLevel = info.endlist[0].event.exhaustLevel;
                    if (onOff == 1) {
                        tEvent = ventilationMapping.OnOff["key" + onOff] + "，" + ventilationMapping.operationMode["key" + operationMode] +
                            "，进风档位" + ventilationMapping.intakeLevel["key" + intakeLevel] +
                            "，排风档位" + ventilationMapping.exhaustLevel["key" + exhaustLevel];
                    } else {
                        tEvent = ventilationMapping.OnOff["key" + onOff];
                    }
                }
                break;
            case "midea.bosheng.001":
            case "midea.bosheng.002":
                if (!tName) {
                    tName = info.deviceName || "泊声背景音乐";
                }
                var bgMusicMapping = config.bgMusicMapping;
                var endlist = info.event || [];
                for (var i = 0; i < endlist.length; i++) {
                    var obj = endlist[i];
                    //if(obj.MediaSrc==2){
                    if (i > 0) {
                        tEvent += " "
                    }
                    tEvent += obj.roomName + ",";
                    //var Volume= Math.floor(obj.Volume/31*100);
                    var Volume = obj.Volume;
                    if (obj.Cmd == 0) {
                        tEvent += bgMusicMapping.Cmd["key" + obj.Cmd];
                    }
                    if (obj.Cmd == 1) {
                        tEvent += bgMusicMapping.PlayMode["key" + obj.PlayMode] + ",音量" + Volume;
                    }
                    if (obj.Cmd == 2) {
                        tEvent += bgMusicMapping.Cmd["key" + obj.Cmd] + (obj.songName || "") + "," + bgMusicMapping.PlayMode["key" + obj.PlayMode] + ",音量" + Volume;
                    }
                    if (obj.Cmd == 3) {
                        tEvent += obj.sceneName;
                    }
                    /*}else{
                                          tEvent +=(obj.songName||"")
                                        }*/
                }
                break;
            case "jiayun.switch.006":
            case "midea.switch.006":
                if (!tName) {
                    tName = info.deviceName || "一键报警器";
                }
                if (info.event != undefined && info.event.ZoneStatus != undefined) {
                    tEvent = info.event.ZoneStatus == 1 ? "一键按钮触发" : "";
                }
                break;
            case "jiayun.env.004":
            case "midea.env.004":
                if (!tName) {
                    tName = info.deviceName || "水浸探测器";
                }
                if (info.event != undefined && info.event.ZoneStatus != undefined) {
                    tEvent = info.event.ZoneStatus == 1 ? "检测到溢水" : "";
                }
                break;
            case "lumi.sensor_magnet":
            case "midea.magnet.001":
            case "midea.magnet.002":
            case "jiayun.magnet.001":
                if (!tName) {
                    tName = info.deviceName || "门磁";
                }
                if (info.event != undefined && info.event.ZoneStatus != undefined) {
                    tEvent = info.event.ZoneStatus == 1 ? "打开" : "关闭";
                } else if (info.event != undefined && info.event.staticTime != undefined) {
                    tEvent = info.event.staticTime + "分钟未关闭";
                }
                break;
            case "midea.ir.001":
            case "jiayun.ir.001":
                if (!tName) {
                    tName = info.deviceName || "红外";
                }
                if (info.event != undefined && info.event.ZoneStatus != undefined) {
                    tEvent = info.event.ZoneStatus == 1 ? "有人移动" : "";
                } else if (info.event != undefined && info.event.staticTime != undefined) {
                    tEvent = info.event.staticTime + "分钟无人移动";
                }
                break;
            case "midea.env.001":
            case "jiayun.env.001":
                if (!tName) {
                    tName = info.deviceName || "可燃气体探测器";
                }
                if (info.event != undefined && info.event.ZoneStatus != undefined) {
                    tEvent = info.event.ZoneStatus == 1 ? "泄露" : "";
                }
                break;
            case "midea.env.002":
            case "jiayun.env.002":
                if (!tName) {
                    tName = info.deviceName || "火灾烟感探测器";
                }
                if (info.event != undefined && info.event.ZoneStatus != undefined) {
                    tEvent = info.event.ZoneStatus == 1 ? "探测器报警" : "";
                }
                break;
            case "midea.switch.005":
            case "jiayun.switch.005":
            case "laffey.switch.005":
                if (!tName) {
                    tName = info.deviceName || "场景面板";
                }
                switch (info.endpoint) {
                    case 1:
                        tEvent = "点击" + (this.getApplianceNodeEndpointName(info.deviceID, 1) || "就餐或睡眠") + "按钮";
                        break;
                    case 2:
                        tEvent = "点击" + (this.getApplianceNodeEndpointName(info.deviceID, 2) || "会客或夜起") + "按钮";
                        break;
                    case 3:
                        tEvent = "点击" + (this.getApplianceNodeEndpointName(info.deviceID, 3) || "离家或阅读") + "按钮";
                        break;
                    case 4:
                        tEvent = "点击" + (this.getApplianceNodeEndpointName(info.deviceID, 4) || "回家或晨起") + "按钮";
                        break;
                    default:
                        // statements_def
                        break;
                }
                break;
            case "midea.doorlock.001":
                if (!tName) {
                    tName = info.deviceName || "门锁";
                }
                if (info.event != undefined) {
                    var _DoorState = info.event.DoorState;
                    var _LockState = info.event.LockState;
                    if (_DoorState != undefined) {
                        var _DoorStateDesc = deviceConfig.event.DoorState[_DoorState];
                        if (_DoorStateDesc != undefined) {
                            tEvent += _DoorStateDesc;
                        }
                    }
                    if (_LockState != undefined) {
                        var _LockStateDesc = deviceConfig.event.LockState[_LockState];
                        if (_LockStateDesc != undefined) {
                            tEvent += _LockStateDesc;
                        }
                    }
                }
                break;
            case "kaadas.doorlock.001":
            case "hutlon.doorlock.001":
            case "yangge.doorlock.001":
                if (!tName) {
                    tName = info.deviceName || "门锁";
                }
                var modelId = info.modelId;
                if (info.event != undefined) {
                    var _eventDesc = "";
                    var _DoorState = info.event.DoorState;
                    if (_DoorState != undefined) {
                        var _DoorStateDesc = deviceConfig.event.DoorState[_DoorState];
                        if (_DoorStateDesc != undefined) {
                            tEvent += _DoorStateDesc + "(所有用户)";
                        }
                    } else {
                        var userNo = info.cacheEvent.userNo || "";
                        var userRole = info.cacheEvent.userRole;
                        var singleType = info.cacheEvent.singleType;
                        var userType = info.cacheEvent.userType;
                        var _OpenRecord = deviceConfig.event.OpenRecord || {};
                        var _lockTypeName = _OpenRecord[userType] || "";
                        if (userRole != undefined && userRole != "") {
                            if (singleType == true) {
                                tEvent += userRole + "开锁";
                            } else {
                                tEvent += _lockTypeName + "用户" + userNo + "开锁";
                            }
                        } else {
                            tEvent += _lockTypeName + "用户" + userNo + "开锁";
                        }
                    }
                }
                break;
            case "midea.envsensor.001":
            case "jiayun.env.003":
                if (!tName) {
                    tName = info.deviceName || "环境传感器";
                }
                var _hasCurrTemp = false;
                var tempObj = null;
                var humObj = null;
                if (info.endlist != undefined && info.endlist.length > 0) {
                    if (info.endlist.length > 0) {
                        tempObj = info.endlist[0];
                    }
                    if (info.endlist.length > 1) {
                        humObj = info.endlist[1];
                    }
                }
                if (tempObj != null) {
                    tEvent = tEvent + "温度" + (tempObj.cmp == 1 ? '>' : '<') + tempObj.currTemp / 100 + "°";
                    _hasCurrTemp = true;
                }
                if (humObj != null) {
                    if (_hasCurrTemp) {
                        tEvent = tEvent + "，"
                    }
                    tEvent = tEvent + "湿度" + (humObj.cmp == 1 ? '>' : '<') + humObj.currHum / 100 + "%";
                }
                break;
            case "midea.switch.001":
            case "midea.switch.002":
            case "midea.switch.003":
            case "midea.switch.004":
            case "jiayun.switch.001":
            case "jiayun.switch.002":
            case "jiayun.switch.003":
            case "jiayun.switch.004":
            case "laffey.switch.001":
            case "laffey.switch.002":
            case "laffey.switch.003":
            case "laffey.switch.004":
            case "honyar.switch.001":
            case "honyar.switch.002":
            case "honyar.switch.003":
            case "honyar.switch.004":
                if (dataType == "condition") {
                    var endpointName = this.getApplianceNodeEndpointName(info.deviceID, info.endpoint) || (info.endpoint + "路");
                    if (!tName) {
                        tName = info.deviceName || "智能开关";
                    }
                    if (info.event.OnOff == 1) {
                        tEvent = "打开" + endpointName;
                    } else {
                        tEvent = "关闭" + endpointName;
                    }
                } else {
                    if (!tName) {
                        tName = info.taskName || "智能开关";
                    }
                    var isFirst = true;
                    for (var i = 0; i < info.endlist.length; i++) {
                        var endpointName = this.getApplianceNodeEndpointName(info.deviceID, info.endlist[i].endpoint) || (info.endlist[i].endpoint + "路");
                        if (isFirst) {
                            isFirst = false;
                        } else {
                            tEvent += ";";
                        }
                        var OnOff = info.endlist[i].event.OnOff;
                        tEvent += (OnOff == 1 ? "打开" + endpointName : "关闭" + endpointName);
                    }
                }
                break;
            case "jiayun.switch.007":
                if (dataType == "condition") {
                    tEvent = this.getSwitch7EndpointResult(info.endpoint, info.event.OnOff);
                } else {
                    if (!tName) {
                        tName = info.taskName || "水电控制";
                    }
                    var isFirst = true;
                    for (var i = 0; i < info.endlist.length; i++) {
                        var endpointResult = this.getSwitch7EndpointResult(info.endlist[i].endpoint, info.endlist[i].event.OnOff);
                        if (isFirst) {
                            isFirst = false;
                        } else {
                            tEvent += ";";
                        }
                        tEvent += endpointResult;
                    }
                }
                break;
            case "jiayun.switch.008":
                if (dataType == "condition") {
                    tEvent = this.getSwitch8EndpointResult(info.endpoint, info.event.OnOff);
                } else {
                    if (!tName) {
                        tName = info.taskName || "水电控制";
                    }
                    var isFirst = true;
                    for (var i = 0; i < info.endlist.length; i++) {
                        var endpointResult = this.getSwitch8EndpointResult(info.endlist[i].endpoint, info.endlist[i].event.OnOff);
                        if (isFirst) {
                            isFirst = false;
                        } else {
                            tEvent += ";";
                        }
                        tEvent += endpointResult;
                    }
                }
                break;
            case "midea.light.001":
            case "jiayun.light.001":
                if (dataType == "condition") {
                    if (!tName) {
                        tName = info.deviceName || "调光面板";
                    }
                    var endpointName = this.getApplianceNodeEndpointName(info.deviceID, info.endpoint) || (info.endpoint + "路");
                    if (info.event.OnOff == 1) {
                        tEvent = "打开" + endpointName;
                    } else {
                        tEvent = "关闭" + endpointName;
                    }
                } else {
                    if (!tName) {
                        tName = info.taskName || "调光面板";
                    }
                    var level = info.endlist[0].event.Level;
                    var tEvent;
                    if (level > 0) {
                        tEvent = "打开亮度" + level + "%";
                    } else {
                        tEvent = "关闭";
                    }
                }

                break;
            case "midea.light.002":
            case "jiayun.light.002":
                if (dataType == "condition") {
                    if (!tName) {
                        tName = info.deviceName || "调光面板";
                    }
                    var endpointName = this.getApplianceNodeEndpointName(info.deviceID, info.endpoint) || (info.endpoint + "路");
                    if (info.event.OnOff == 1) {
                        tEvent = "打开" + endpointName;
                    } else {
                        tEvent = "关闭" + endpointName;
                    }
                } else {
                    if (!tName) {
                        tName = info.taskName || "调光面板";
                    }
                    var tEvent = "";

                    var isFirst = true;
                    for (var i = 0; i < info.endlist.length; i++) {
                        var endpointName = this.getApplianceNodeEndpointName(info.deviceID, info.endlist[i].endpoint) || (info.endlist[i].endpoint + "路");
                        if (isFirst) {
                            isFirst = false;
                        } else {
                            tEvent += ";";
                        }
                        if (info.endlist[i].endpoint == 1) {
                            var level1 = info.endlist[i].event.Level;
                            if (level1 > 0) {
                                tEvent += "打开" + endpointName + "亮度" + level1 + "%";
                            } else {
                                tEvent += "关闭" + endpointName;
                            }
                        } else if (info.endlist[i].endpoint == 2) {
                            var level2 = info.endlist[i].event.Level;
                            if (level2 > 0) {
                                tEvent += "打开" + endpointName + "亮度" + level2 + "%";
                            } else {
                                tEvent += "关闭" + endpointName;
                            }
                        }
                    }
                }
                break;
            case "jiayun.curtain.001":
            case "laffey.curtain.001":
            case "midea.curtain.001":
            case "honyar.curtain.001":
                if (dataType == "condition") {
                    if (!tName) {
                        tName = info.deviceName || "一路窗帘";
                    }
                    if (info.event.OnOff == 1) {
                        tEvent = "打开窗帘";
                    } else {
                        tEvent = "关闭窗帘";
                    }
                } else {
                    if (!tName) {
                        tName = info.taskName || "一路窗帘";
                    }
                    var OnOff = info.endlist[0].event.OnOff;
                    tEvent = OnOff == 1 ? "打开" : "关闭";
                }
                break;
            case "jiayun.curtain.002":
            case "laffey.curtain.002":
            case "midea.curtain.002":
                if (dataType == "condition") {
                    if (!tName) {
                        tName = info.deviceName || "二路窗帘";
                    }
                    var endpointName = this.getApplianceNodeEndpointName(info.deviceID, info.endpoint) || (info.endpoint + "路窗帘");
                    if (info.event.OnOff == 1) {
                        tEvent = "打开" + endpointName;
                    } else {
                        tEvent = "关闭" + endpointName;
                    }
                } else {
                    if (!tName) {
                        tName = info.taskName || "二路窗帘";
                    }
                    var isFirst = true;
                    for (var i = 0; i < info.endlist.length; i++) {
                        var endpointName = this.getApplianceNodeEndpointName(info.deviceID, info.endlist[i].endpoint) || (info.endlist[i].endpoint + "路窗帘");
                        if (isFirst) {
                            isFirst = false;
                        } else {
                            tEvent += ";";
                        }
                        var OnOff = info.endlist[i].event.OnOff;
                        tEvent += (OnOff == 1 ? "打开" + endpointName : "关闭" + endpointName);
                    }
                }

                break;
            case "dooya.curtain.001":
            case "jeff.curtain.001":
                if (dataType == "condition") {
                    if (!tName) {
                        tName = info.deviceName || "窗帘";
                    }
                    var OnOff = info.event.OnOff;
                    var Level = info.event.Level;
                    if (OnOff != undefined) {
                        tEvent = deviceConfig.event.OnOff[OnOff];
                    } else if (Level != undefined) {
                        tEvent = " 设置电机打开百分比" + Level + "%";
                    }
                } else {
                    if (!tName) {
                        tName = info.taskName || "窗帘";
                    }
                    var OnOff = info.endlist[0].event.OnOff;
                    var Level = info.endlist[0].event.Level;
                    if (OnOff != undefined) {
                        tEvent = deviceConfig.event.OnOff[OnOff];
                    } else if (Level != undefined) {
                        tEvent = " 设置电机打开百分比" + Level + "%";
                    }
                }
                break;
            case "jiayun.ir.002":
                if (!tName) {
                    tName = info.taskName || "红外伴侣";
                }
                var isFirst = true;
                var _endlist = info.endlist;
                //this.getInfraredOrderList(info.deviceID, function (data) {
                //var orderList = data;
                //for (var k = 0; k < orderList.length; k++) {
                for (var i = 0; i < _endlist.length; i++) {
                    var SendInfrared = _endlist[i].event.SendInfrared;
                    //if (parseInt(SendInfrared) == parseInt(orderList[k].orderId)) {
                    if (isFirst) {
                        isFirst = false;
                        tEvent += "触发";
                    } else {
                        tEvent += ",";
                    }
                    tEvent += _endlist[i].event.name;
                    //}
                }
                //}
                //return [tName, tEvent];
                /*}, function (err) {
                 return [tName, ""];
                 });*/
                break;
            case "midea.light.003":
                var OnOff = info.endlist[0].event.OnOff;
                var level = info.endlist[0].event.Level;
                var colorTemp = info.endlist[0].event.ColorTemp;
                if (dataType == "condition") {

                } else {
                    if (!tName) {
                        tName = info.taskName || "照明调光灯";
                    }
                    var tEvent;
                    if (OnOff > 0) {
                        tEvent = "打开";
                        tEvent += level > 0 ? (" 亮度" + level + "%") : "";
                        tEvent += colorTemp > 0 ? (" 冷暖度" + colorTemp + "%") : "";
                    } else {
                        tEvent = "关闭";
                    }
                }
                break;
            case "midea.relay.001":
                if (dataType == "condition") {} else {
                    if (!tName) {
                        tName = info.taskName || "ZigBee中继器";
                    }
                    var isFirst = true;
                    for (var i = 0; i < info.endlist.length; i++) {
                        var endpointName = this.getApplianceNodeEndpointName(info.deviceID, info.endlist[i].endpoint) || (info.endlist[i].endpoint + "路");
                        if (isFirst) {
                            isFirst = false;
                        } else {
                            tEvent += ";";
                        }
                        var OnOff = info.endlist[i].event.OnOff;
                        tEvent += (OnOff == 1 ? "打开" + endpointName : "关闭" + endpointName);
                    }
                }
                break;
            default:
                // statements_def
                break;
        }
        //if(info.modelId!="jiayun.ir.002"){
        return [tName, tEvent, isRemoveDevice];
        //}
    },
    genSceneNodeImg(info, dataType) {
        var deviceConfig = config.deviceMapping[info.modelId];
        var _img = "../lib/img/scene/control_home_device_@2x.png";
        switch (info.modelId) {
            case "lumi.sensor_magnet":
            case "midea.magnet.001":
            case "midea.magnet.002":
            case "jiayun.magnet.001":
                _img = "../lib/img/scene/probe_@2x.png";
                break;
            case "midea.ir.001":
            case "jiayun.ir.001":
                _img = "../lib/img/scene/probe_@2x.png";
                break;
            case "midea.env.001":
            case "jiayun.env.001":
                _img = "../lib/img/scene/probe_@2x.png";
                break;
            case "midea.env.002":
            case "jiayun.env.002":
                _img = "../lib/img/scene/probe_@2x.png";
                break;
            case "jiayun.switch.005":
            case "laffey.switch.005":
            case "midea.switch.005":
                _img = "../lib/img/scene/control_home_device_@2x.png";
                break;
            case "midea.doorlock.001":
                _img = "../lib/img/scene/control_home_device_@2x.png";
                break;
            case "kaadas.doorlock.001":
            case "hutlon.doorlock.001":
            case "yangge.doorlock.001":
                _img = "../lib/img/scene/control_home_device_@2x.png";
                break;
            case "midea.envsensor.001":
            case "jiayun.env.003":
            case "luftmon.alphair.001":
                _img = "../lib/img/scene/probe_@2x.png";
                break;
            case "midea.switch.001":
            case "midea.switch.002":
            case "midea.switch.003":
            case "midea.switch.004":
            case "jiayun.switch.001":
            case "jiayun.switch.002":
            case "jiayun.switch.003":
            case "jiayun.switch.004":
            case "laffey.switch.001":
            case "laffey.switch.002":
            case "laffey.switch.003":
            case "laffey.switch.004":
            case "jiayun.switch.007":
            case "jiayun.switch.008":
            case "honyar.switch.001":
            case "honyar.switch.002":
            case "honyar.switch.003":
                _img = "../lib/img/scene/control_home_device_@2x.png";
                break;
            case "jiayun.light.001":
            case "midea.light.001":
                _img = "../lib/img/scene/control_home_device_@2x.png";
                break;
            case "jiayun.light.002":
            case "midea.light.002":
                _img = "../lib/img/scene/control_home_device_@2x.png";
                break;
            case "jiayun.curtain.001":
            case "laffey.curtain.001":
            case "honyar.curtain.001":
            case "midea.curtain.001":
                _img = "../lib/img/scene/control_home_device_@2x.png";
                break;
            case "jiayun.curtain.002":
            case "laffey.curtain.002":
            case "midea.curtain.002":
                _img = "../lib/img/scene/control_home_device_@2x.png";
                break;
            case "dooya.curtain.001":
            case "jeff.curtain.001":
                _img = "../lib/img/scene/control_home_device_@2x.png";
                break;
            case "jiayun.ir.002":
                _img = "../lib/img/scene/control_home_device_@2x.png";
                break;
            default:
                // statements_def
                break;
        }
        //if(info.modelId!="jiayun.ir.002"){
        return _img;
        //}
    },
    getApplianceNodeName(deviceId) {
        var _deviceList = this.applianceNodeList;
        for (var i = 0; i < _deviceList.length; i++) {
            var _device = _deviceList[i];
            if (deviceId == _device.deviceID) {
                return _device.deviceName;
            }
        }
        return "";
    },
    getApplianceName(deviceId) {
        var _deviceList = this.applianceList;
        for (var i = 0; i < _deviceList.length; i++) {
            var _device = _deviceList[i];
            if (deviceId == _device.deviceID) {
                return _device.deviceName;
            }
        }
        return "";
    },
    getSwitch7EndpointResult(endpoint, OnOff) {
        var name = "";
        if (endpoint == 1) {
            if (OnOff == 1) {
                name = "关闭水阀";
            } else {
                name = "打开水阀";
            }
        } else if (endpoint == 2) {
            if (OnOff == 1) {
                name = "断电";
            } else {
                name = "通电";
            }
        }
        return name;
    },
    getSwitch8EndpointResult(endpoint, OnOff) {
        var name = "";
        if (endpoint == 1) {
            if (OnOff == 1) {
                name = "断电";
            } else {
                name = "通电";
            }
        } else if (endpoint == 2) {
            if (OnOff == 1) {
                name = "关闭水阀";
            } else {
                name = "打开水阀";
            }
        } else if (endpoint == 3) {
            if (OnOff == 1) {
                name = "关闭燃气阀";
            }
        }
        return name;
    },
    getApplianceNodeEndpointName(deviceId, endpoint) {
        var _deviceList = this.applianceNodeList;
        for (var i = 0; i < _deviceList.length; i++) {
            var _device = _deviceList[i];
            if (deviceId == _device.deviceID) {
                if (_device.endlist) {
                    var _endlist = _device.endlist;
                    if (_endlist[endpoint - 1]) {
                        return _endlist[endpoint - 1].name;
                    }
                }
            }
        }
        return "";
    },
    getApplianceNodeList(succFunc, failFunc) {
        if (this.validateScene("applianceId")) {
            var _that = this;
            _that.getDeviceList(function(data) {
                var nodeObjList = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["idType"] == 1) {
                        var subDevice = {
                            nodeid: data[i]["devId"],
                            modelid: (data[i]['devProps'] && data[i]['devProps']["modelid"]) ? data[i]['devProps']["modelid"] : '',
                            nodename: data[i]["devName"] || '',
                            endlist: (data[i]['devProps'] && data[i]['devProps']["endlist"]) ? data[i]['devProps']["endlist"] : []
                        };
                        nodeObjList.push(subDevice);
                    }
                }
                succFunc(nodeObjList);
            }, function() {
                _that.prompAlert("err_callback_data");
            });
        }
    },

    getAllApplianceList(succFunc, failFunc) {
        if (this.applianceList.length > 0) {
            succFunc();
        } else {
            this.refreshAllApplianceList(succFunc, failFunc);
        }
    },
    refreshAllApplianceList(succFunc, failFunc) {

        var _that = this;
        this.nativeGetApplianceList(function(data) {
            //  alert("appliance list:"+JSON.stringify(data));
            var supportItem = config.supportItem;
            var applianceDataList = data;
            var applianceObjList = [];
            var applianceNodeObjList = [];
            for (var i = 0; i < applianceDataList.length; i++) {
                var itemCode = applianceDataList[i].itemCode || '';
                if (itemCode != '' && supportItem[itemCode] != undefined) {
                    //applianceDataList[i].deviceID = applianceDataList[i].deviceID;
                    applianceDataList[i].imgPath = supportItem[itemCode].img;
                    applianceDataList[i].serviceType = supportItem[itemCode].serviceType;
                    applianceDataList[i].type = supportItem[itemCode].type;
                    applianceDataList[i].deviceName = applianceDataList[i].deviceName || supportItem[itemCode].name;
                    applianceDataList[i].deviceSerial = applianceDataList[i].deviceSerial || "";

                    applianceObjList.push(applianceDataList[i]);

                    //场景运行条件添加洗衣机，热水器
                    if (itemCode == "DA" || itemCode == "DB" || itemCode == "E2" || itemCode == "EA" ||
                        itemCode == "E7" || itemCode == "EC" || itemCode == "B7") {
                        var applianceObj = {};
                        applianceObj.modelId = "";
                        applianceObj.serviceType = supportItem[itemCode].serviceType;
                        applianceObj.deviceID = applianceDataList[i].deviceID;
                        applianceObj.deviceName = applianceDataList[i].deviceName;
                        applianceObj.imgPath = supportItem[itemCode].img;
                        applianceObj.type = supportItem[itemCode].type;
                        applianceObj.group = "operation";
                        applianceNodeObjList.push(applianceObj);
                    }
                }
            }



            //获取zigbee设备列表，用来添加场景条件；由于zigbee设备（比如智能开关），是放在任务里的
            //所以这里需要对获取的家电列表和zigbee设备列表做处理；
            //目前是将所有条件的选项放在zigbeeList里，将所有任务的选项放在deviceList里


            //setTimeout(function() {  TODO
            _that.getApplianceNodeList(function(data) {
                // alert("appliance node list:"+JSON.stringify(data));
                var applianceNodeDataList = data;
                for (var key = 0; key < applianceNodeDataList.length; key++) {
                    var applianceObj = {};
                    applianceObj.modelId = applianceNodeDataList[key].modelid;
                    applianceObj.deviceID = applianceNodeDataList[key].nodeid;
                    applianceObj.deviceName = applianceNodeDataList[key].nodename;
                    var modelId = applianceObj.modelId;
                    if (modelId != undefined && config.deviceMapping[modelId] != undefined) {

                        //applianceObj.imgPath = "img/" + config.deviceMapping[modelId].img + ".png";
                        applianceObj.imgPath = _that.getApplianceNodeImgPath(applianceObj.modelId);
                        if (applianceObj.deviceName == modelId) {
                            applianceObj.deviceName = config.deviceMapping[modelId].name;
                        }

                        applianceObj.type = config.deviceMapping[modelId].type;
                        applianceObj.group = config.deviceMapping[modelId].group;
                        applianceObj.endlist = applianceNodeDataList[key].endlist || [];

                        //条件过滤
                        var _deviceConfig = config.deviceMapping[modelId];
                        /*if(_deviceConfig.supportCondition!=false){
                           applianceNodeObjList.push(applianceObj);
                        }*/

                        if (modelId == "jiayun.ir.002") {
                            //applianceObj.imgPath = "img/" + config.deviceMapping[modelId].img + ".png";
                            applianceObj.serviceType = "Light";
                            applianceObj.type = 0x01;
                            applianceObj.itemCode = "Light";
                            applianceObjList.push(applianceObj);
                            applianceNodeObjList.push(applianceObj);
                        } else {
                            applianceNodeObjList.push(applianceObj);
                            if (modelId == "jiayun.switch.007" || modelId == "jiayun.switch.008" || modelId == "jiayun.switch.001" || modelId == "jiayun.switch.002" || modelId == "jiayun.switch.003" || modelId == "jiayun.switch.004" ||
                                modelId == "laffey.switch.001" || modelId == "laffey.switch.002" || modelId == "laffey.switch.003" || modelId == "laffey.switch.004" ||
                                modelId == "midea.switch.001" || modelId == "midea.switch.002" || modelId == "midea.switch.003" || modelId == "midea.switch.004" ||
                                modelId == "honyar.switch.001" || modelId == "honyar.switch.002" || modelId == "honyar.switch.003" || modelId == "midea.relay.001") {
                                //applianceObj.imgPath = "img/" + config.deviceMapping[modelId].img + ".png";
                                applianceObj.serviceType = "Switch";
                                applianceObj.type = 0x01;
                                applianceObj.itemCode = "Switch";
                                applianceObjList.push(applianceObj);
                            } else if (modelId == "midea.light.001" || modelId == "midea.light.002" || modelId == "midea.light.003" || modelId == "jiayun.light.001" || modelId == "jiayun.light.002") {
                                applianceObj.serviceType = "Light";
                                applianceObj.type = 0x01;
                                applianceObj.itemCode = "Light";
                                applianceObjList.push(applianceObj);
                            }
                            //窗帘为zigbee设备，但放在task里
                            else if (modelId == "honyar.curtain.001" || modelId == "midea.curtain.001" || modelId == "midea.curtain.002" || modelId == "jiayun.curtain.001" || modelId == "jiayun.curtain.002" || modelId == "laffey.curtain.001" || modelId == "laffey.curtain.002") {
                                applianceObj.type = 0x01;
                                applianceObj.serviceType = "Curtain-switch";

                                applianceObjList.push(applianceObj);
                            }
                            //
                            else if (modelId == "dooya.curtain.001" || modelId == "jeff.curtain.001") {
                                applianceObj.type = 0x01;
                                applianceObj.serviceType = "Curtain2-switch";
                                applianceObjList.push(applianceObj);
                            } else if (modelId == "485_laffey.RFH.001") {
                                applianceObj.type = 0x01;
                                applianceObj.serviceType = "485_laffey.RFH.001";
                                applianceObjList.push(applianceObj);
                            } else if (modelId == "485_laffey.ventilation.001") {
                                applianceObj.type = 0x01;
                                applianceObj.serviceType = "485_laffey.ventilation.001";
                                applianceObjList.push(applianceObj);
                            } else if (modelId == "485_midea.cac.001") {
                                applianceObj.type = 0x01;
                                applianceObj.serviceType = "485_midea.cac.001";
                                applianceObjList.push(applianceObj);
                            } else if (modelId == "485_daikin.cac.001") {
                                applianceObj.type = 0x01;
                                applianceObj.serviceType = "485_daikin.cac.001";
                                applianceObjList.push(applianceObj);
                            } else if (modelId == "daikin.cac.001") {
                                applianceObj.type = 0x01;
                                applianceObj.serviceType = "daikin.cac.001";
                                applianceObjList.push(applianceObj);
                            } else if (modelId == "midea.cac.001") {
                                applianceObj.type = 0x01;
                                applianceObj.serviceType = "midea.cac.001";
                                applianceObjList.push(applianceObj);
                            } else if (modelId == "midea.bosheng.001" || modelId == "midea.bosheng.002") {
                                applianceObj.type = 0x01;
                                applianceObj.serviceType = modelId;
                                applianceObjList.push(applianceObj);
                            }
                        }
                    }
                }

                _that.applianceList = applianceObjList;
                _that.applianceNodeList = applianceNodeObjList;
                succFunc();
            }, function(msg) {
                failFunc(msg);
            })
            //  }, 0);



        }, function(msg) {
            failFunc(msg);
        });
    },
    searchScenePanel(nodeid, endpoint, succFnc, failFnc) {
        var _that = this;
        this.listScene(function(data) {
            var sceneDataList = data;
            var scene = _that.matchScenePanel(nodeid, endpoint, sceneDataList, true);
            succFnc(scene);
        }, function(err) {
            failFnc(err);
        });
    },
    matchScenePanel(nodeid, endpoint, sceneDataList, containCurrent) {
        for (var i = 0; i < sceneDataList.length; i++) {
            var scene = sceneDataList[i];
            var sceneid = scene.id;
            var conditions = scene.conditions;
            for (var j = 0; j < conditions.length; j++) {
                var _deviceID = conditions[j].deviceID;
                var _endpoint = conditions[j].endpoint;
                if (_deviceID == nodeid && _endpoint == endpoint) {
                    if (containCurrent) {
                        return scene;
                    } else if (sceneid != this.scene.id) {
                        return scene;
                    }
                }
            }
        }
        return null;
    },
    checkConditions() {
        var conditions = this.scene.conditions || [];
        for (var i = 0; i < conditions.length; i++) {
            if (this.validateNodeStandalone(conditions[i])) {
                return false;
            }
        }
        return true;
    },
    checkSpecCondition(condition, callback) {
        var result = true;
        var msg = "";
        if (condition.modelId == 'time') {
            var index = condition.index;
            var conditions = this.scene.conditions;
            for (var i = 0; i < conditions.length; i++) {
                if (conditions[i].index != index) {
                    result = false;
                    msg = "定时为单一条件,不能与其他条件共存!";
                    break;
                }
            }
            callback({ "result": result, "msg": msg });
        } else if (condition.modelId == "jiayun.env.002" || condition.modelId == "midea.env.002") {
            var index = condition.index;
            var conditions = this.scene.conditions;
            for (var i = 0; i < conditions.length; i++) {
                if (conditions[i].index != index) {
                    result = false;
                    msg = "火灾烟感探测器为单一条件,不能与其他条件共存!";
                    break;
                }
            }
            callback({ "result": result, "msg": msg });
        } else if (condition.modelId == "jiayun.env.001" || condition.modelId == "midea.env.001" || condition.modelId == "midea.env.003") {
            var index = condition.index;
            var conditions = this.scene.conditions;
            for (var i = 0; i < conditions.length; i++) {
                if (conditions[i].index != index) {
                    result = false;
                    msg = "可燃气体探测器为单一条件,不能与其他条件共存!";
                    break;
                }
            }
            callback({ "result": result, "msg": msg });
        } else if (condition.modelId == "jiayun.env.004" || condition.modelId == "midea.env.004") {
            var index = condition.index;
            var conditions = this.scene.conditions;
            for (var i = 0; i < conditions.length; i++) {
                if (conditions[i].index != index) {
                    result = false;
                    msg = "水浸探测器为单一条件,不能与其他条件共存!";
                    break;
                }
            }
            callback({ "result": result, "msg": msg });
        } else if (condition.modelId == 'jiayun.switch.006' || condition.modelId == 'midea.switch.006') {
            var index = condition.index;
            var conditions = this.scene.conditions;
            for (var i = 0; i < conditions.length; i++) {
                if (conditions[i].index != index) {
                    result = false;
                    msg = "一键报警器为单一条件,不能与其他条件共存!";
                    break;
                }
            }
            callback({ "result": result, "msg": msg });
        } else if (condition.modelId == 'interval') {
            var index = condition.index;
            var conditions = this.scene.conditions;
            for (var i = 0; i < conditions.length; i++) {
                if (conditions[i].index != index) {
                    result = false;
                    msg = "时间段为单一条件,不能与其他条件共存!";
                    break;
                }
            }
            callback({ "result": result, "msg": msg });
        } else if (condition.modelId == 'midea.switch.005' || condition.modelId == 'jiayun.switch.005' || condition.modelId == 'laffey.switch.005') {
            var index = condition.index;
            var conditions = this.scene.conditions;
            for (var i = 0; i < conditions.length; i++) {
                if (conditions[i].index != index) {
                    result = false;
                    msg = "场景面板为单一条件,不能与其他条件共存!";
                    break;
                }
            }
            if (!result) {
                callback({ "result": result, "msg": msg });
            } else {
                var nodeid = condition.deviceID;
                var endpoint = condition.endpoint;
                if (this.sceneList.length == 0) {
                    var that = this;
                    this.listScene(function(data) {
                        var sceneDataList = data;
                        that.sceneList = sceneDataList;
                        if (that.matchScenePanel(nodeid, endpoint, sceneDataList, false) != null) {
                            callback({ "result": false, "msg": "该场景面板按钮已设置,不能重复设置" });
                        } else {
                            callback({ "result": true, "msg": "" });

                        }
                    }, function(err) {
                        callback({ "result": false, "msg": "网络异常" });
                    });
                } else {
                    if (this.matchScenePanel(nodeid, endpoint, this.sceneList, false) != null) {
                        var result = false;
                        var msg = "该场景面板按钮已设置,不能重复设置";
                    }
                    callback({ "result": result, "msg": msg });
                }
            }
        } else {
            callback({ "result": result, "msg": msg });
        }
    },
    filterForConditionAppliactionNodeList() {
        var _applianceNodeList = [];
        if (!this.validateSceneStandalone()) {
            for (var i = 0; i < this.applianceNodeList.length; i++) {
                for (var j = 0; j < this.scene.conditions.length; j++) {
                    if (this.scene.conditions[j].deviceID == this.applianceNodeList[i].nodeid) {
                        break;
                    } else if (j == this.scene.conditions.length - 1) {
                        _applianceNodeList.push(this.applianceNodeList[j]);
                    }
                }
            }
        }
        return _applianceNodeList;
    },
    filterForTaskAppliactionList() {
        var _applianceList = [];
        for (var i = 0; i < this.applianceList.length; i++) {
            for (var j = 0; j < this.scene.tasks.length; j++) {
                if (this.scene.tasks[j].deviceID == this.applianceList[i].deviceID) {
                    break;
                } else if (j == this.scene.tasks.length - 1) {
                    _applianceList.push(this.applianceList[j]);
                }
            }
        }
        return _applianceNodeList;
    },
    nativeCall(name, params, succFunc, failFunc) {
        //alert("nativeCall name:" + name + "; params:" + JSON.stringify(params));
        nativeService.call(name, params, function(data) {
            //   alert("nativeCall back data:" + JSON.stringify(data));
            //alert("nativeCall back data:");
            if (data.errorCode == 0) {
                succFunc(data.data);
            } else {
                failFunc({ "errorCode": data.errorCode || "unkown", "msg": data.msg, "isTimeout": false });
            }
        }, function() {
            failFunc({ "isTimeout": true });
        });
    },
    nativeGetApplianceList(succFunc, failFunc) {
        if (this.validateScene("applianceId")) {
            var _that = this;
            _that.getDeviceList(function(data) {
                var wifiList = [];
                for (var i = 0; i < data.length; i++) {
                    var applianceType = data[i]['devProps']['applianceType'] || '';
                    applianceType = applianceType.replace('0x', '');
                    if (data[i]["idType"] == 0) {
                        wifiList.push({
                            deviceName: data[i]["devName"] || '',
                            deviceID: data[i]["devId"] || '',
                            itemCode: applianceType
                        });
                    }
                }
                succFunc(wifiList);
            }, function() {
                failFunc({ "isTimeout": true });
            });
        }
    },
    nativeSendCommand(name, param, callback, callbackFail) {
        nativeService.sendCommand(name, param, function() {
            //callback();
        }, function() {
            //callbackFail();
        });
    },
    prompAlert(msg) {

    },
    getTimeIntervalTitle(timeofday, dayofweek) {
        var timeContent = "";
        var repeatContent = "";
        try {
            if (timeofday != undefined && dayofweek != undefined) {
                var fromHour = timeofday.substr(0, 2);
                var fromMinute = timeofday.substr(2, 2);
                var toHour = timeofday.substr(4, 2);
                var toMinute = timeofday.substr(6, 2);
                var timeContent = fromHour + ":" + fromMinute + "至" + toHour + ":" + toMinute;
                var repeatContent = "";
                if (dayofweek == 0) {
                    repeatContent = "一次";
                } else if (dayofweek.length == 7) {
                    repeatContent = "每天";
                } else {
                    for (var j = 0; j < dayofweek.length; j++) {
                        switch (dayofweek[j]) {
                            case 1:
                                repeatContent = repeatContent + "周一 ";
                                break;
                            case 2:
                                repeatContent = repeatContent + "周二 ";
                                break;
                            case 3:
                                repeatContent = repeatContent + "周三 ";
                                break;
                            case 4:
                                repeatContent = repeatContent + "周四 ";
                                break;
                            case 5:
                                repeatContent = repeatContent + "周五 ";
                                break;
                            case 6:
                                repeatContent = repeatContent + "周六 ";
                                break;
                            case 7:
                                repeatContent = repeatContent + "周日 ";
                                break;
                        }
                    }
                    if (repeatContent == "周一 周二 周三 周四 周五 ") {
                        repeatContent = "工作日";
                    } else if (repeatContent == "周六 周日 ") {
                        repeatContent = "周末";
                    }
                }
            }
        } catch (e) {}
        return [timeContent, repeatContent];
    },
    goToAppliaceSelectPage(device) {
        var operation = device.operation;
        if (operation == "condition") {
            var condition = {
                "type": device.type,
                "modelId": device.moduleId,
                "serviceType": device.serviceType,
                "deviceID": device.nodeid,
                "deviceName": device.nodename,
                "event": {},
                "endpoint": 1,
                "cmp": 0,
                "dayofweek": [],
                "timeofday": "",
                "index": 0,
                "eventDesc": ""
            };
            this.goToConditionPage(condition);
        } else if (operation == "task") {
            var task = {
                "type": device.type,
                "modelId": device.moduleId,
                "serviceType": device.serviceType,
                "deviceID": device.nodeid,
                "taskName": device.nodename,
                "event": {},
                "endlist": [],
                "index": 0,
                "eventDesc": "",
                "delaytime": "",
                //"delayrate": 0,
                "delayDesc": ""
            };
            if (device.deviceSerial) {
                task.event.deviceSerial = device.deviceSerial;
            }
            this.goToTaskPage(task);
        }
    },
    goToConditionPage(condition) {
        this.tmpData.condition = condition;
        var page = "";
        if (condition.modelId == "time") {
            page = "select-rulestime-condition";
        } else if (condition.modelId == "interval") {
            page = "select-rulestimeinterval-condition";
        } else {
            page = this.getSceneSelectPage(condition.type, condition.modelId, condition.serviceType, 'condition');
        }
        if (page) {
            nativeService.goMapPath(page);
        }
    },
    goToTaskPage(task, skipAllOnOff) {
        this.tmpData.task = task;
        var page = '';
        if ((task.classType == 'allOn' || task.classType == 'allOff') && skipAllOnOff != true) {
            page = 'select-all-on-off-task';
        } else {
            page = this.getSceneSelectPage(task.type, task.modelId, task.serviceType, 'task');
        }

        if (page) {
            nativeService.goMapPath(page);
        }
    },
    getSceneSelectPage(type, modelId, serviceType, selectPage) {

        if ("scene" == modelId) {
            return "select-scenelist-task";
        } else if ('scene-relate' == modelId) {
            return "select-scenelist-relate-task";
        } else if ("message" == modelId) {
            return "";
        } else if (type == 1 || (modelId == 'midea.cac.001' || modelId == '485_daikin.cac.001' || modelId == '485_midea.cac.001' || modelId == 'midea.bosheng.001' || modelId == 'midea.bosheng.002' || modelId == '485_laffey.RFH.001' || modelId == '485_laffey.ventilation.001')) {
            var _config = config.deviceMapping[modelId];
            if (_config) {
                if (selectPage == 'condition') {
                    return _config.page.condition;
                } else if (selectPage == 'task') {
                    return _config.page.task;
                } else {
                    return "";
                }
            }
        } else {
            for (var item in config.supportItem) {
                var itemCondfig = config.supportItem[item];
                if (itemCondfig.serviceType == serviceType) {
                    if (selectPage == 'condition') {
                        return itemCondfig.page.condition;
                    } else if (selectPage == 'task') {
                        return itemCondfig.page.task;
                    } else {
                        return "";
                    }
                }
            }
        }
        return "";
    },
    getInfraredList(deviceId) {
        this.nativeCall("infraredList", { "nodeid": deviceId }, function() {

        }, function() {

        });
    },
    genTimeTitle(timeofday, dayofweek) {
        var timeContent = "";
        var repeatContent = "";
        try {
            if (timeofday != undefined && dayofweek != undefined) {
                var hour = timeofday.substr(0, 2);
                var minute = timeofday.substr(2, 2);
                //var second = timeofday.substr(4, 2);
                //var timeContent = hour + ":" + minute + ":" + second;
                var timeContent = hour + ":" + minute;
                var repeatContent = "";
                if (dayofweek == 0) {
                    repeatContent = "一次";
                } else if (dayofweek.length == 7) {
                    repeatContent = "每天";
                } else {
                    for (var j = 0; j < dayofweek.length; j++) {
                        switch (dayofweek[j]) {
                            case 1:
                                repeatContent = repeatContent + "周一 ";
                                break;
                            case 2:
                                repeatContent = repeatContent + "周二 ";
                                break;
                            case 3:
                                repeatContent = repeatContent + "周三 ";
                                break;
                            case 4:
                                repeatContent = repeatContent + "周四 ";
                                break;
                            case 5:
                                repeatContent = repeatContent + "周五 ";
                                break;
                            case 6:
                                repeatContent = repeatContent + "周六 ";
                                break;
                            case 7:
                                repeatContent = repeatContent + "周日 ";
                                break;
                        }
                    }
                    if (repeatContent == "周一 周二 周三 周四 周五 ") {
                        repeatContent = "工作日";
                    } else if (repeatContent == "周六 周日 ") {
                        repeatContent = "周末";
                    }
                }
            }
        } catch (e) {}
        return [timeContent, repeatContent];
    },
    getInfraredOrderList(_nodeId, succFunc, failFunc) {
        var callName = "infraredList";
        var callParams = {
            "nodeid": _nodeId
        };
        var _that = this;
        this.nativeCall(callName, callParams, function(data) {
            if (data && data.ordier_list) {
                var orderObjList = [];
                try {
                    var orderList = data.ordier_list;

                    for (var i = 0; i < orderList.length; i++) {
                        var orderId = orderList[i].order_id;
                        var orderName = orderList[i].order_name;
                        var orderObj = {
                            orderId: orderId,
                            orderName: orderName,
                            selected: 0
                        };
                        orderObjList.push(orderObj);
                    }
                } catch (e) {
                    failFunc();
                    //_that.prompAlert("err_callback_data");
                }
                succFunc(orderObjList);
            } else {
                failFunc();
                //_that.prompAlert("err_callback_data");
            }
        }, failFunc);
    },
    message: {
        "emp_sceneId": "场景ID不能为空",
        "emp_sceneType": "场景类型不能为空",
        "emp_sceneName": "场景名称不能为空",
        "err_callback_data": "返回错误的数据"
    },
    getApplianceNodeImgPath(modelid) {
        var imgMapping = config.imgMapping;
        if (imgMapping[modelid] != undefined) {
            return "../lib/img/icon/" + imgMapping[modelid] + ".png";
        } else {
            return "";
        }
    },
    checkLimitChar(_text) {
        //字母数字汉字下划线
        var regx = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
        if (regx.test(_text)) {
            return true;
        } else {
            return false;
        }
    },
    checkDefaultScene(sceneName) {
        if (sceneName == "回家" || sceneName == "离家" || sceneName == "起床" || sceneName == "睡觉") {
            return true;
        }
        return false;
    },
    getIndexPage() {
        var _entryPage = this.tmpData.entryPage;
        if (this.tmpData.task && (this.tmpData.task.classType == 'allOn' || this.tmpData.task.classType == 'allOff') && (this.tmpData.isEdit == '0' || this.tmpData.isEdit == '2')) {
            if (this.tmpData.isEdit == '2') {
                this.tmpData.isEdit = 1;
            }
            return 'select-all-on-off-task';
        } else if (_entryPage == "autoScene") {
            return "detail";
        } else if ((this.tmpData.operation == 'select-task-appliance' || this.tmpData.operation == 'select-task-scenelist') && this.tmpData.isEdit == '0') {
            return "select-task-type";
        } else {
            return 'index';
        }
    },
    mergeTmpTaskData() {
        var titles = this.genTaskTitle(this.tmpData.task);
        this.tmpData.task.taskName = titles[0];
        this.tmpData.task.eventDesc = titles[1];
        this.tmpData.task.deviceImg = this.genTaskImg(this.tmpData.task);

        var indexOf = this.tmpData.task.index;

        if (indexOf == 0) {
            indexOf = this.scene.tasks.length + 1;
            this.tmpData.task.index = indexOf;
            if (this.tmpData.task.serviceType == 'Gateway' && this.tmpData.task.event.switch == 'off') {
                this.scene.tasks.unshift(this.tmpData.task);
            } else {
                this.scene.tasks.push(this.tmpData.task);
            }
        } else {
            this.scene.tasks[indexOf - 1] = this.tmpData.task;
        }




        // this.scene.tasks[indexOf - 1] = this.tmpData.task;

        this.rankSceneTasks();
        this.haveEdit = true;

    },
    mergeTmpConditionData() {
        var titles = this.genConditionTitle(this.tmpData.condition);
        this.tmpData.condition.deviceName = titles[0];
        this.tmpData.condition.eventDesc = titles[1];
        this.tmpData.condition.deviceImg = this.genConditionImg(this.tmpData.condition);

        var indexOf = this.tmpData.condition.index;
        if (indexOf == 0) {
            indexOf = this.scene.conditions.length + 1;
            this.tmpData.condition.index = indexOf;
        }

        this.scene.conditions[indexOf - 1] = this.tmpData.condition;

        this.haveEdit = true;
    },
    rankSceneTasks() {
        var tasksGateway = [];
        var _tasksTemp = [];
        for (var i = 0; i < this.scene.tasks.length; i++) {
            if (this.scene.tasks[i]['serviceType'] == 'Gateway' && this.scene.tasks[i]['event']['switch']) {
                this.scene.tasks[i]['event']['switch'] == 'off' ? tasksGateway.unshift(this.scene.tasks[i]) : tasksGateway.push(this.scene.tasks[i]);
            } else {
                _tasksTemp.push(this.scene.tasks[i]);
            }
        }
        for (var i = 0; i < tasksGateway.length; i++) {
            tasksGateway[i]['event']['switch'] == 'off' ? _tasksTemp.unshift(tasksGateway[i]) : _tasksTemp.push(tasksGateway[i]);
        }
        for (var i = 0; i < _tasksTemp.length; i++) {
            _tasksTemp[i]['index'] = i + 1;
        }
        this.scene.tasks = _tasksTemp;
    },
    getDeviceList(succFunc, failFunc) {
        var _that = this;
        if (_that.deviceList.length > 0) {
            succFunc(_that.deviceList);
        } else {
            nativeService.getHouseId(function(houseId) { 
                var callName = "deviceList";
                var callParams = {
                    data: {
                        "houseId": houseId,
                        "fields": "idType,devId,devName,domain,house,devProps"
                    }
                };
                _that.nativeCall(callName, callParams, function(data) {
                    if (data && data.devices) {
                        var devicesList = data.devices;
                        var list = [];
                        for (var i = 0; i < devicesList.length; i++) {
                            list.push(devicesList[i]);

                        }
                        _that.deviceList = list;
                        succFunc(list);
                    } else {
                        failFunc();
                    }
                }, failFunc);
            })
        }
    },
    getSceneImgPath(modelid) {
        if (typeof modelid == 'string') {
            modelid = modelid.replace('0x', '');
        }
        var imgMapping = config.imgMapping;
        var supportItem = config.supportItem;
        if (imgMapping[modelid] != undefined) {
            return "../lib/img/icon/" + imgMapping[modelid] + ".png";
        } else if (supportItem[modelid] != undefined) {
            return supportItem[modelid]['img'];
        } else if (modelid == 'time') {
            return "../lib/img/scene/list-time_@2x.png";
        } else if (modelid == 'scene' || modelid == 'scene-relate') {
            return "../lib/img/scene/control_scene_@2x.png";
        } else {
            return "";
        }
    },
    checkSupportAllOnOff(modelid) { //监测是否支持全开全关
        var supportFlag = false;
        switch (modelid) {
            case 'midea.switch.001':
            case 'midea.switch.002':
            case 'midea.switch.003':
            case 'midea.switch.004':
            case 'honyar.switch.001':
            case 'honyar.switch.002':
            case 'honyar.switch.003':
            case 'honyar.switch.004':
            case 'jiayun.switch.001':
            case 'jiayun.switch.002':
            case 'jiayun.switch.003':
            case 'jiayun.switch.004':
            case 'laffey.switch.001':
            case 'laffey.switch.002':
            case 'laffey.switch.003':
            case 'laffey.switch.004':
            case 'midea.curtain.001':
            case 'midea.curtain.002':
            case 'honyar.curtain.001':
            case 'honyar.curtain.002':
            case 'jiayun.curtain.001':
            case 'jiayun.curtain.002':
            case 'laffey.curtain.001':
            case 'laffey.curtain.002':
            case 'midea.light.001':
            case 'midea.light.002':
            case 'jiayun.light.001':
            case 'jiayun.light.002':
            case 'midea.cac.001':
            case 'daikin.cac.001':
            case '0xAC':
            case '0xCC':
            case '0xFC':
            case '0xE2':
            case '0xE3':
            case '0xFA':
            case '0xFD':
            case '0xA1':
            case '0xB6':
                supportFlag = true;
                break;
        }

        return supportFlag;

    },
    allOnOffTasksGrouping() {
        var tasks = [];
        var tasksTemp = [];
        var allOnFlag = false;
        var allOffFlag = false;
        var allOnNum = 0;
        var allOffNum = 0;
        var allOnIndex = -1;
        var allOffIndex = -1;

        for (var i = 0; i < this.scene.tasks.length; i++) {
            console.log(this.scene.tasks[i].deviceID);
            var tName = this.getApplianceNodeName(this.scene.tasks[i].deviceID);
            var tName2 = this.getApplianceName(this.scene.tasks[i].deviceID);
            //  alert(tName+'***'+tName2);
            if (tName || tName2) {
                tasks.push(this.scene.tasks[i]);
            }
        }
        this.scene.tasks = tasks;


        for (var i = 0; i < tasks.length; i++) {
            var classType = tasks[i]['classType'];
            classType == 'allOn' && allOnNum++;
            classType == 'allOff' && allOffNum++;
            if (classType != 'allOn' && classType != 'allOff') {
                tasksTemp.push(tasks[i]);
            } else if (classType == 'allOn' && !allOnFlag) {
                allOnIndex = i;
                allOnFlag = true;
                allOnIndex = tasksTemp.length;
                tasksTemp.push(tasks[i]);
            } else if (classType == 'allOff' && !allOffFlag) {
                allOffIndex = i;
                allOffFlag = true;
                allOffIndex = tasksTemp.length;
                tasksTemp.push(tasks[i]);
            }

        }
        if (allOnIndex > -1) {
            tasksTemp[allOnIndex]['eventDescAllOnOff'] = '全开，共' + allOnNum + '个设备';
        }
        if (allOffIndex > -1) {
            tasksTemp[allOffIndex]['eventDescAllOnOff'] = '全关，共' + allOffNum + '个设备';
        }
        //  alert(JSON.stringify(tasksTemp));

        return tasksTemp;
    },
    checkAllOnOffEditSupport(modelid) { //全开全关设备中是否支持编辑属性
        var supportFlag = false;
        switch (modelid) {
            case 'midea.cac.001':
            case 'daikin.cac.001':
            case '0xAC':
            case '0xCC':
            case '0xFC':
            case '0xE2':
            case '0xE3':
                supportFlag = true;
                break;
        }
        return supportFlag;
    },
    setSceneService() {
        nativeService.setItem('nativeService', JSON.stringify(this));
    },
    getSceneService(succFun){  
        let _that = this;
        nativeService.getItem("sceneService", function(data) { 
            if (data.data && data.data != 'undefined') { 
                let sceneServiceTemp = JSON.parse(data.data);
                 for(var item in sceneServiceTemp) {
                    _that.item = sceneServiceTemp[item];
                 }
            } else {
                _that.setSceneService();
            }
            succFun();
        })
    }

} //end return