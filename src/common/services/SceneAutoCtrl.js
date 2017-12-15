define([],
    function() {
        function SceneAutoCtrl($rootScope, $scope, nativeService, sceneService, businessService) {
            $scope.sName = "";
            $scope.conditions = [];
            $scope.tasks = [];
            $scope.isMyHouse = true;
            $scope.isDefaultScene = 0;
            $scope.isEdit = 0;

            function init() {

                if (sceneService.tmpData.navigate == "init") {
                    if (sceneService.tmpData.entryPage != "autoScene") {
                        if (sceneService.stype == 1) {
                            sceneService.initAutoScene();
                        } else {
                            sceneService.initCommScene();
                        }
                    }
                    $scope.sName = sceneService.scene.name || "";
                    $scope.conditions = sceneService.scene.conditions || [];
                    $scope.tasks = sceneService.allOnOffTasksGrouping();
                    $scope.activeTimeDesc = "全天(每天重复)";
                    var ua = navigator.userAgent.toLowerCase();
                    if ((/iphone|ipad|ipod/.test(ua) || /android/.test(ua))) {
                        //alert("get applianceID:");
                        bridge.getApplianceID(function(applianceID) {
                                //alert("applianceID:" + applianceID);
                                if (!applianceID) {
                                    $scope.alertRetryInit("获取不到网关信息,是否已删除?");
                                } else {
                                    window.deviceId = applianceID;
                                    nativeService.setWindowHouseType(function(houseType) {
                                            $scope.isMyHouse = nativeService.isMyHouse();
                                            $scope.initSwidel();
                                        },
                                        function(err) {
                                            $scope.isMyHouse = nativeService.isMyHouse();
                                            $scope.initSwidel();
                                        });

                                    $rootScope.showLoading();
                                    sceneService.getAllApplianceList(function() {
                                            sceneService.getDeviceList(function(data) {
                                                    if (sceneService.tmpData.entryPage == "editAuto" || sceneService.tmpData.entryPage == "editScene") {

                                                        $scope.loadScene();
                                                    } else {
                                                        $rootScope.hideLoading();
                                                    }
                                                },
                                                function(err) {
                                                    $rootScope.hideLoading();
                                                    $scope.alertRetryInit("控制超时");
                                                });
                                        },
                                        function(err) {

                                            $rootScope.hideLoading();
                                            $scope.alertRetryInit("控制超时");
                                        });

                                }
                                //alert("get houseId:");
                            },
                            function(err) {
                                $scope.alertRetryInit("控制超时");
                            });
                    } else {
                        window.deviceId = "";
                        if (sceneService.tmpData.entryPage == "editAuto" || sceneService.tmpData.entryPage == "editScene") {
                            $scope.loadScene();
                        }

                    }
                } else {
                    $scope.haveEdit = sceneService.haveEdit;
                    var sceneName = sceneService.scene.name || "";
                    var activeTime = sceneService.tmpData.activeTime || {};
                    if (activeTime.begin != undefined) {

                        var beginTime = parseInt(activeTime.begin);
                        var endTime = parseInt(activeTime.end);
                        if (beginTime < 10) {
                            beginTime = "0" + beginTime;
                        }
                        if (endTime < 10) {
                            endTime = "0" + endTime;
                        }
                        var activeTimeDesc = "";
                        if (beginTime == 0 && endTime == 0) {
                            activeTimeDesc = "全天"
                        } else {
                            activeTimeDesc = beginTime + ":00-" + endTime + ":00";
                        }
                        var week = activeTime.week || [];
                        if (week.length == 7) {
                            activeTimeDesc += "(每天重复)";
                        } else {
                            var repeatContent = ""
                            for (i = 0; i < week.length; i++) {
                                switch (week[i]) {
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
                            repeatContent = repeatContent.substring(0, repeatContent.length - 1);
                            if (repeatContent == "周一 周二 周三 周四 周五") {
                                repeatContent = "工作日重复";
                            } else if (repeatContent == "周六 周日") {
                                repeatContent = "周末重复";
                            }
                            activeTimeDesc += "(" + repeatContent + ")";
                        }
                        $scope.activeTimeDesc = activeTimeDesc;

                    } else {
                        $scope.activeTimeDesc = "全天(每天重复)";
                    }
                    if (!sceneService.checkConditions()) {
                        $scope.activeTimeDesc = "不可设置";
                    }
                    $rootScope.applyScopeObj($scope, "sName", sceneName);
                    $rootScope.applyScopeObj($scope, "conditions", sceneService.scene.conditions || []);
                    $rootScope.applyScopeObj($scope, "tasks", sceneService.allOnOffTasksGrouping() || []);
                    $rootScope.applyScopeObj($scope, "isMyHouse", nativeService.isMyHouse());
                    if (sceneService.tmpData.entryPage == "editScene") {
                        var isDefaultScene = 0;
                        if (sceneService.checkDefaultScene(sceneName)) {
                            isDefaultScene = 1;
                        }
                        $rootScope.applyScopeObj($scope, "isDefaultScene", isDefaultScene);
                    }

                    $scope.initSwidel();
                }

                businessService.checkGwSupport(3);
                //alert("init" + JSON.stringify(sceneService.scene));
                //$scope.sName = sceneService.scene.name || "";

                //alert("init:"+JSON.stringify(sceneService.scene.conditions));
            }

            $scope.genActiveTime = function(activeTime) {
                if (activeTime.begin != undefined) {
                    var beginTime = parseInt(activeTime.begin);
                    var endTime = parseInt(activeTime.end);
                    var activeTimeDesc = "全天(每天重复)";
                    if (beginTime < 10) {
                        beginTime = "0" + beginTime;
                    }
                    if (endTime < 10) {
                        endTime = "0" + endTime;
                    }
                    if (beginTime == 0 && endTime == 0) {
                        activeTimeDesc = "全天"
                    } else {
                        activeTimeDesc = beginTime + ":00-" + endTime + ":00";
                    }

                    var week = activeTime.week || [];
                    if (week.length == 7) {
                        activeTimeDesc += "(每天重复)";
                    } else {
                        var repeatContent = ""
                        for (i = 0; i < week.length; i++) {
                            switch (week[i]) {
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
                        repeatContent = repeatContent.substring(0, repeatContent.length - 1);
                        if (repeatContent == "周一 周二 周三 周四 周五") {
                            repeatContent = "工作日重复";
                        } else if (repeatContent == "周六 周日") {
                            repeatContent = "周末重复";
                        }
                        activeTimeDesc += "(" + repeatContent + ")";
                    }
                    $scope.activeTimeDesc = activeTimeDesc;

                } else {
                    $scope.activeTimeDesc = "全天(每天重复)";
                }
                if (!sceneService.checkConditions()) {
                    $scope.activeTimeDesc = "不可设置";
                }
            }

            $scope.loadScene = function() {
                bridge.getSceneId(function(sceneId) {
                        window.sceneId = sceneId;
                        sceneService.scene.id = sceneId;
                        // alert("sceneId:" + sceneId);
                        //$rootScope.showLoading();
                        sceneService.getScene(function(data) {
                                $rootScope.hideLoading();
                                //  alert("getScene:" + JSON.stringify(data));
                                sceneService.scene = data;
                                var activeTime = sceneService.scene.activeTime;
                                if (activeTime != undefined) {
                                    $scope.genActiveTime(activeTime);
                                    sceneService.tmpData.activeTime = activeTime;
                                }
                                $rootScope.applyScopeObj($scope, "conditions", sceneService.scene.conditions || []);
                                $rootScope.applyScopeObj($scope, "tasks", sceneService.allOnOffTasksGrouping() || []);

                                if (sceneService.tmpData.entryPage == "editScene") {
                                    var sceneName = sceneService.scene.name || "";
                                    $rootScope.applyScopeObj($scope, "sName", sceneName);
                                    var isDefaultScene = 0;
                                    if (sceneService.checkDefaultScene(sceneName)) {
                                        isDefaultScene = 1;
                                    }
                                    $rootScope.applyScopeObj($scope, "isDefaultScene", isDefaultScene);
                                }
                            },
                            function(err) {
                                $rootScope.hideLoading();
                                $scope.alertRetryInit("控制超时");
                            });
                    },
                    function(err) {
                        $scope.alertRetryInit("控制超时");
                    });
            }

            $scope.addScene = function() {
                //alert("保存");
                console.log(JSON.stringify(sceneService.scene));

                if (sceneService.stype == 1) {
                    if (!$scope.checkSaveCondition()) {
                        return;
                    }
                } else if (sceneService.stype == 2) {
                    if (!$scope.checkSaveSceneName()) {
                        return;
                    }
                }

                if (!$scope.checkSaveTask()) {
                    return;
                }

                $rootScope.showLoading();
                sceneService.addScene(function(data) {
                        $rootScope.hideLoading();
                        $rootScope.showTimeout("保存成功");
                        if (sceneService.stype == 2) {
                            try {
                                sceneService.nativeSendCommand("b2bAddScene", {
                                        sceneId: data.sceneID,
                                        sceneName: sceneService.scene.name
                                    },
                                    function() {},
                                    function(err) {
                                        if (err != undefined) {
                                            $rootScope.showTimeout(JSON.stringify(err));
                                        }
                                    })
                            } catch (e) {}
                        }
                        $scope.toHome();
                    },
                    function(err) {
                        $rootScope.hideLoading();
                        $scope.alertText("控制超时");
                    })
            }

            $scope.updateScene = function() {
                if ($scope.haveEdit != true && sceneService.stype == 1) {
                    $scope.deleteScene();
                    return;
                }

                //alert("保存");
                //alert(JSON.stringify(sceneService.scene));
                if (sceneService.stype == 1) {
                    if (!$scope.checkSaveCondition()) {
                        return;
                    }
                } else if (sceneService.stype == 2) {
                    if (!$scope.checkSaveSceneName()) {
                        return;
                    }
                }

                if (!$scope.checkSaveTask()) {
                    return;
                }
                $rootScope.showLoading();
                sceneService.updateScene(function(data) {
                        $rootScope.hideLoading();
                        $rootScope.showTimeout("保存成功");
                        if (sceneService.stype == 2) {
                            try {
                                sceneService.nativeSendCommand("b2bUpdScene", {
                                        sceneId: sceneService.scene.id,
                                        sceneName: sceneService.scene.name
                                    },
                                    function() {

                                    },
                                    function(err) {
                                        if (err != undefined) {
                                            $rootScope.showTimeout(JSON.stringify(err));
                                        }
                                    })
                            } catch (e) {

                            }
                        }
                        $scope.toHome();
                        /*if (data != null && data.sceneID) {
                         sceneService.scene.id = data.sceneID;
                         }*/
                    },
                    function(err) {
                        $rootScope.hideLoading();
                        $scope.alertText("控制超时");
                    })
            }

            $scope.checkSaveCondition = function() {
                var conditions = sceneService.scene.conditions;
                if (sceneService.scene.conditions.length == 0) {
                    $scope.alertText("请先选择触发条件");
                    return false;
                }
                for (i = 0; i < conditions.length; i++) {
                    var conditionObj = conditions[i];
                    if (conditionObj.isRemoveDevice) {
                        $scope.alertText("请移除已删除设备关联的触发条件再编辑");
                        return false;
                    }
                }


                $scope.moveSetCount = 0;
                $scope.notMoveDiffTime = false;
                $scope.staticTime = undefined;
                for (var i = 0; i < conditions.length; i++) {
                    if (conditions[i].modelId == 'midea.ir.001') {
                        var event = conditions[i].event || {};
                        if (event.staticTime != undefined) {
                            // alert($scope.staticTime + '&&&' + event.staticTime);
                            if ($scope.staticTime != undefined && $scope.staticTime != event.staticTime) {
                                $scope.notMoveDiffTime = true;
                            }
                            $scope.staticTime = event.staticTime;
                            $scope.irSetAlreadyCount++;
                            $scope.staticTime = event.staticTime;
                        } else {
                            $scope.moveSetCount++;
                        }
                    }
                }
                alert($scope.notMoveDiffTime);
                if ($scope.moveSetCount > 1) {
                    $scope.alertText('触发条件不能同时设置多个红外人体探测器"有人移动"');
                    return false;
                }
                if ($scope.notMoveDiffTime == true) {
                    $scope.alertText('触发条件中多个红外人体探测器"无人移动"选择的时间要保持一致');
                    return false;
                }

                return true;
            }

            $scope.checkSaveTask = function() {
                if (sceneService.scene.tasks.length == 0) {
                    $scope.alertText("请先选择运行结果");
                    return false;
                }
                for (i = 0; i < sceneService.scene.tasks.length; i++) {

                    var taskObj = sceneService.scene.tasks[i];
                    if (taskObj.isRemoveDevice) {
                        console.log('=============');
                        console.log(taskObj);
                        $scope.alertText("请移除已删除设备关联的运行结果再编辑");
                        return false;
                    }
                }
                return true;
            }

            $scope.checkSaveSceneName = function() {
                sceneService.scene.name = $("#sceneName").val();
                var sceneName = sceneService.scene.name;
                if (sceneName == "") {
                    $scope.alertText("请输入场景名称");
                    return false;
                } else if (sceneService.checkDefaultScene(sceneName)) {
                    //$rootScope.showTimeout("自定义场景名称不能与默认场景重名");
                    if (!(sceneService.tmpData.entryPage == "editScene" && $scope.isDefaultScene == 1)) {
                        $scope.alertText("自定义场景名称不能与默认场景重名");
                        return false;
                    }
                }
                if (sceneName.length > 12) {
                    $scope.alertText("名称只能输入十二位");
                    return false;
                }
                if (!sceneService.checkLimitChar(sceneName)) {
                    $scope.alertText("只支持输入数字、字母、汉字、下划线！");
                    return false;
                }
                return true;
            }

            $scope.deleteScene = function() {
                $scope.alertConfirm("确认删除此场景?",
                    function() {
                        $scope.deleteSceneConfirm();
                    });
            }

            $scope.deleteSceneConfirm = function() {
                $rootScope.showLoading();
                sceneService.delScene(function() {
                        $rootScope.hideLoading();
                        $rootScope.showTimeout("删除成功");
                        if (sceneService.stype == 2) {
                            try {
                                sceneService.nativeSendCommand("b2bDelScene", {
                                        sceneId: sceneService.scene.id
                                    },
                                    function() {

                                    },
                                    function(err) {
                                        if (err != undefined) {
                                            $rootScope.showTimeout(JSON.stringify(err));
                                        }
                                    })
                            } catch (e) {

                            }
                        }
                        $scope.toHome();
                    },
                    function(err) {
                        $rootScope.hideLoading();
                        /*if (err != undefined) {
                         $rootScope.showTimeout(JSON.stringify(err));
                         }*/
                        $scope.hideAlert();

                        $scope.alertConfirm("控制超时",
                            function() {
                                $scope.deleteSceneConfirm();
                            });
                    })
            }

            $scope.toConditionTypeSel = function() {
                if (!sceneService.checkConditions()) {
                    $scope.alertText("定时为单一条件,不能与其他条件共存");
                    return false;
                }
                var conditions = sceneService.scene.conditions;
                if (conditions.length > 0) {
                    var condition = conditions[0];
                    if (condition.modelId == "jiayun.switch.006" || condition.modelId == "midea.switch.006") {
                        $scope.alertText("一键报警器为单一条件,不能与其他条件共存");
                        return false;
                    } else if (condition.modelId == "jiayun.env.002" || condition.modelId == "midea.env.002") {
                        $scope.alertText("火灾烟感探测器为单一条件,不能与其他条件共存");
                        return false;
                    } else if (condition.modelId == "jiayun.env.001" || condition.modelId == "midea.env.001" || condition.modelId == "midea.env.003") {
                        $scope.alertText("可燃气体探测器为单一条件,不能与其他条件共存");
                        return false;
                    } else if (condition.modelId == "jiayun.env.004") {
                        $scope.alertText("水浸探测器为单一条件,不能与其他条件共存");
                        return false;
                    }
                }



                if (sceneService.tmpData.navigate != 'conditions') {
                    sceneService.currentDomainId = 0;
                }
                sceneService.tmpData.navigate = "conditions";
                if (sceneService.stype == 2) {
                    sceneService.scene.name = $("#sceneName").val();
                }
                $rootScope.go('select-condition-type', 'slideLeft')
            }

            $scope.toTaskTypeSel = function() {
                if (sceneService.tmpData.navigate != 'tasks') {
                    sceneService.currentDomainId = 0;
                }
                sceneService.tmpData.navigate = "tasks";
                if (sceneService.stype == 2) {
                    sceneService.scene.name = $("#sceneName").val();
                }
                $rootScope.go('select-task-type', 'slideLeft');
            }

            $scope.showCondition = function(condition) {
                // alert("condition alert")
                if (typeof condition == 'undefined') {
                    return false;
                }
                if (condition.isRemoveDevice == true) {
                    return;
                }
                if (!$scope.isMyHouse) {
                    return;
                }
                sceneService.tmpData.isEdit = 1;
                sceneService.tmpData.navigate = "condition";
                if (sceneService.stype == 2) {
                    sceneService.scene.name = $("#sceneName").val();
                }
                sceneService.goToConditionPage($scope, $rootScope, condition);
            }

            $scope.showTask = function(task) {
                window.classType = undefined;
                if (task.isRemoveDevice == true) {
                    return;
                }
                if (!$scope.isMyHouse) {
                    return;
                }
                sceneService.tmpData.isEdit = 1;
                sceneService.tmpData.navigate = "task";
                if (sceneService.stype == 2) {
                    sceneService.scene.name = $("#sceneName").val();
                }


                sceneService.goToTaskPage($scope, $rootScope, task);
            }

            $scope.showDelay = function(task, $event) {
                //alert("task alert")
                if (!$scope.isMyHouse) {
                    return;
                }
                sceneService.tmpData.navigate = "delay";
                if (sceneService.stype == 2) {
                    sceneService.scene.name = $("#sceneName").val();
                }
                sceneService.tmpData.task = task;
                event.stopPropagation();
                $rootScope.go({
                        name: "select-delaytime-task",
                        params: {
                            "data": ""
                        }
                    },
                    'slideLeft');
            }

            $scope.initSwidel = function() {
                if ($scope.isMyHouse) {
                    setTimeout(function() {
                            new Swidel('#conditionList', {
                                slideItem: '.del',
                                slideWidth: 90,
                                slideFun: function() {
                                    var _deviceID = $(this).closest("li").attr("ss");
                                    var _index = $(this).closest("li").attr("xx");
                                    $scope.removeConditionRow(_deviceID, _index);
                                    //console.log(this.innerHTML);
                                }
                            });

                            new Swidel('#taskList', {
                                slideItem: '.del',
                                slideWidth: 90,
                                slideFun: function() {
                                    //alert("1")
                                    var _deviceID = $(this).closest("li").attr("ss");
                                    var _index = $(this).closest("li").attr("xx");
                                    //var _yy = $(this).closest("li").attr("yy");
                                    //alert("idx:"+_indexOf);
                                    $scope.removeTaskRow(_deviceID, _index);
                                    //console.log(this.innerHTML);
                                }
                            });
                        },
                        500);
                }
            }

            $scope.onHammer = function(operation, condition) {
                if (!$scope.isMyHouse) {
                    return;
                }
                if ($rootScope.platform != 'ios') {
                    $scope.showDelWrapper(operation, condition.deviceID, condition.index);
                }
            };

            setTimeout(function() {
                    $rootScope.$broadcast('test' + '::init::toggle::switch', {
                        'currentVal': 1
                    });
                },
                100);

            $scope.closeWrapper = function() {
                //alert("closeWrapper");
                document.querySelector(".loadingMask").style.display = "none";
                document.querySelector(".del-wrapper").style.display = "none";
            };

            $scope.showDelWrapper = function(operation, deviceId, indexOf) {
                //alert("showDelWrapper");
                $scope.selectionParams = [operation, deviceId, indexOf];
                document.querySelector(".loadingMask").style.display = "block";
                document.querySelector(".del-wrapper").style.display = "block";

            };

            $scope.deleteRecord = function() {
                //alert("deleteRecord");
                $scope.closeWrapper();
                var selectionParams = $scope.selectionParams;
                if (selectionParams) {
                    var _operation = selectionParams[0];
                    var _deviceId = selectionParams[1];
                    var _indexOf = selectionParams[2];
                    if (_operation == "condition") {
                        $scope.removeConditionRow(_deviceId, _indexOf);
                    } else if (_operation == "task") {
                        $scope.removeTaskRow(_deviceId, _indexOf);
                    }
                }
            };

            $scope.removeConditionRow = function(_deviceID, _index) {
                if (!$scope.isMyHouse) {
                    return;
                }
                var _conditions = $scope.conditions;
                var _newConditions = [];
                var idx = 1;
                for (var i = 0; i < _conditions.length; i++) {
                    if (_conditions[i].deviceID != _deviceID || _conditions[i].index != _index) {
                        var _condition = _conditions[i];
                        _condition.index = idx;
                        _newConditions.push(_condition);
                        idx++;
                    }
                }
                sceneService.haveEdit = true;
                $scope.haveEdit = true;
                if (_newConditions.length == 0 && $scope.activeTimeDesc == "不可设置") {
                    $scope.activeTimeDesc = "";
                }
                $rootScope.applyScopeObj($scope, "conditions", _newConditions);
                sceneService.scene.conditions = _newConditions;

                if (sceneService.stype == 1 && sceneService.tmpData.entryPage == "editAuto") {
                    bridge.updateTitle("编辑自运行", true, nativeService.isMyHouse(), sceneService.haveEdit == true ? '确定' : '删除');
                    window.leftBtnClick = $scope.toHome;
                    window.rightBtnClick = $scope.updateScene;
                }

            }

            $scope.removeTaskRow = function(_deviceID, _index) {
                if (!$scope.isMyHouse) {
                    return;
                }
                //alert("idx2:"+_indexOf);
                var _tasks = $scope.tasks;
                var _newTasks = [];
                var idx = 1;
                var classType = '';
                for (var i = 0; i < _tasks.length; i++) {
                    if (_tasks[i].deviceID != _deviceID || _tasks[i].index != _index) {
                        var _task = _tasks[i];
                        _task.index = idx;
                        _newTasks.push(_task);
                        idx++;
                    } else {
                        classType = _tasks[i].classType;
                    }
                }


                //alert("newTask:"+JSON.stringify(_newTasks));
                sceneService.haveEdit = true;
                $scope.haveEdit = true;
                $rootScope.applyScopeObj($scope, "tasks", _newTasks);

                if (classType == 'allOn' || classType == 'allOff') {
                    var tasksTemp = [];
                    for (var i = 0; i < sceneService.scene.tasks.length; i++) {
                        if (sceneService.scene.tasks[i].classType != classType) {
                            tasksTemp.push(sceneService.scene.tasks[i]);
                        }
                    }
                    sceneService.scene.tasks = tasksTemp;
                } else {
                    sceneService.scene.tasks = _newTasks;
                }


                if (sceneService.stype == 1 && sceneService.tmpData.entryPage == "editAuto") {
                    bridge.updateTitle("编辑自运行", true, nativeService.isMyHouse(), sceneService.haveEdit == true ? '确定' : '删除');
                    window.leftBtnClick = $scope.toHome;
                    window.rightBtnClick = $scope.updateScene;
                }

            }

            $scope.toHome = function() {
                //alert("1111");
                nativeService.goBack();
            }

            $scope.toBack = function() {
                //alert("1111");
                //nativeService.goBack();
                $rootScope.goBack();
            }

            $scope.toActiveTimeSelector = function() {
                if (nativeService.isMyHouse() === false) {
                    return false;
                }
                if (!sceneService.checkConditions()) {
                    $scope.alertText("定时条件下生效时间段不可设置");
                    return false;
                }

                var conditions = sceneService.scene.conditions || [];
                if (conditions.length > 0) {
                    var condition = conditions[0];
                    if (condition.modelId == "jiayun.switch.006" || condition.modelId == "midea.switch.006") {
                        $scope.alertText("一键报警器条件下生效时间段不可设置");
                        return false;
                    } else if (condition.modelId == "jiayun.env.002" || condition.modelId == "midea.env.002") {
                        $scope.alertText("火灾烟感探测器条件下生效时间段不可设置");
                        return false;
                    } else if (condition.modelId == "jiayun.env.001" || condition.modelId == "midea.env.001" || condition.modelId == "midea.env.003") {
                        $scope.alertText("可燃气体探测器条件下生效时间段不可设置");
                        return false;
                    } else if (condition.modelId == "jiayun.env.004") {
                        $scope.alertText("水浸探测器条件下生效时间段不可设置");
                        return false;
                    }
                }

                sceneService.tmpData.navigate = "activeTime";
                $rootScope.go('select-active-time', 'slideLeft');
            }

            $scope.alertRetryInit = function(message) {
                $rootScope.showAlertConfirm($scope, {
                    confirm: "重试",
                    content: message,
                    clickCancel: function() {
                        $scope.toHome();
                    },
                    clickConfirm: function() {
                        init();
                    }
                });
            }

            $scope.alertText = function(message) {
                $rootScope.showAlertText($scope, {
                    content: message
                });
            }

            $scope.alertConfirm = function(message, callback) {
                $rootScope.showAlertConfirm($scope, {
                    content: message,
                    clickConfirm: function() {
                        if (typeof callback == "function") {
                            callback();
                        }
                    }
                });
            }


            $scope.getImgPath = function(task) {
                var modelId = task.modelId || task;
                if (task != undefined && (task.classType == 'allOn' || task.classType == 'allOff')) {
                    return '../lib/img/control-home-device_@2x.png';
                } else {
                    return sceneService.getSceneImgPath(modelId);
                }
            }

            $scope.getTaskName = function(task) {
                if (task.classType == 'allOn') {
                    return '设备全开';
                } else if (task.classType == 'allOff') {
                    return '设备全关';
                } else {
                    return task.taskName;
                }
            }

            if ((window.houseid && window.houseid > 0) || (nativeService.isMobile() == false)) {
                init();
            } else {
                bridge.getHouseId(function(houseid) {
                        window.houseid = houseid;
                        init();
                    },
                    function() {
                        init();
                    });
            }

            //设置原生title
            if (sceneService.stype == 1) {
                //自运行
                if (sceneService.tmpData.entryPage == "addAuto") {
                    bridge.updateTitle("添加自运行", true, nativeService.isMyHouse(), '确定');
                    window.leftBtnClick = $scope.toHome;
                    window.rightBtnClick = $scope.addScene;

                } else if (sceneService.tmpData.entryPage == "editAuto") {
                    bridge.updateTitle("编辑自运行", true, nativeService.isMyHouse(), sceneService.haveEdit == true ? '确定' : '删除');
                    window.leftBtnClick = $scope.toHome;
                    window.rightBtnClick = $scope.updateScene;
                }
            } else if (sceneService.stype == 2) {
                //普通场景和面板场景
                if (sceneService.tmpData.entryPage == "addScene") {
                    bridge.updateTitle("添加场景", true, nativeService.isMyHouse(), '确定');
                    window.leftBtnClick = $scope.toHome;
                    window.rightBtnClick = $scope.addScene;
                } else if (sceneService.tmpData.entryPage == "editScene") {
                    bridge.updateTitle("编辑场景", true, nativeService.isMyHouse(), '确定');
                    window.leftBtnClick = $scope.toHome;
                    window.rightBtnClick = $scope.updateScene;
                } else if (sceneService.tmpData.entryPage == "editSceneForPanel") {
                    bridge.updateTitle("编辑面板场景", true, nativeService.isMyHouse(), '确定');
                    window.leftBtnClick = $scope.toBack;
                    window.rightBtnClick = $scope.saveScene;
                }
            }
        }

        return SceneAutoCtrl;
    });