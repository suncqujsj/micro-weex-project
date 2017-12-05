export default {
    paddingZero:function(str,len){
	  len = len || 8;
	  str = str + "";
	  var strLen = str.length;
	  if(strLen >= len) return str;
	  return new Array(len - strLen + 1).join('0') + str;
	},
	limitCharDesc : "只支持输入数字、字母、汉字、下划线!",
	checkLimitChar : function(_text){
	  var regx = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
	  if(regx.test(_text))
	  {
		  return true;
	  } else {
		  return false;
	  }
	},
	parseCurrentStatus: function(modelId,result,deviceMapping,nameArr){
          var status=result.status;
		  var endlist=result.endlist;
		  var guard=result.guard;

		  var content="";
		  if(status==1){
			   switch (modelId)
			  {
				case 'jiayun.env.003':
					var info=endlist[0]||{};
					var event=info.event||{};
					if(event.currHum!=undefined){
						content+="湿度"+
						(event.currHum/100)+"%";
					} 
					if(event.currTemp!=undefined){
						if(event.currHum!=undefined){
							 content+=" ";
						}
						content+="温度"+parseInt(event.currTemp)/100+"°";
					} 
                    if(content==""){
						content+="在线";
					} 
					break;
				case 'luftmon.alphair.001':
					var info=endlist[0]||{};
					var event=info.event||{};
					var haveContent=false;
					if(event.Pm25Value!=undefined){
						haveContent=true;
						if(event.Pm25Value<=50){
							content+="PM2.5低";
						}else if(event.Pm25Value>50&&event.Pm25Value<=175){
							content+="PM2.5中";
						}else{
							content+="PM2.5高";
						}
					} 
					if(event.currHum!=undefined){
						haveContent=true;
						if(haveContent==true){
							content+=" ";
						}
						content+="湿度"+parseInt(event.currHum/100)+"%";
					} 
					if(event.currTemp!=undefined){
						haveContent=true;
						if(haveContent==true){
							 content+=" ";
						}
						var currTemp=event.currTemp;
                        if(currTemp>38221){
                            currTemp=(currTemp-65536)/100;
						}else{
							currTemp=currTemp/100;
						}
						content+="温度"+parseInt(currTemp)+"°";
					}
					if(event.VocLevel!=undefined){
						haveContent=true;
						if(haveContent==true){
							 content+=" ";
						}
						if(event.VocLevel<=33){
							content+="有机污染物浓度低";
						}else if(event.VocLevel>33&&event.VocLevel<=66){
							content+="有机污染物浓度中";
						}else{
							content+="有机污染物浓度高";
						}
					}
					if(event.Illuminance!=undefined){
						haveContent=true;
						if(haveContent==true){
							 content+=" ";
						}
						if(event.Illuminance<=60){
							content+="亮度弱";
						}else if(event.Illuminance>60&&event.Illuminance<=500){
							content+="亮度正常";
						}else{
							content+="亮度强";
						}
					} 
					if(content==""){
						content+="在线";
					} 
					break;
                
                //485大金空调
				case '485_daikin.cac.001':
				    var info=endlist[0]||{};
					var event=info.event||{};
					if (event.OnOff == 1) {
                        content = "打开,";
                        if (event.operationMode !=undefined) {
                        	content +=" ";
                        	if (event.operationMode == 1) {
                        		content += "自动模式,";
                        	}
                        	if (event.operationMode == 2) {
                        		content += "制冷模式,";
                        	}
                        	if (event.operationMode == 3) {
                        		content += "除湿模式,";
                        	}
                        	if (event.operationMode == 4) {
                        		content += "制热模式,";
                        	}
                        	if (event.operationMode == 5) {
                        		content += "送风模式,";
                        	}
                        }
                        if (event.targetTemp != undefined) {
                            content += " "+event.targetTemp+"°C,";
                        }
                        if (event.windSpeed != undefined) {
                            content += " "+"风速"+event.windSpeed;
                        }
					}
					if (event.OnOff==0) {
						content="关闭";
					}
                    if(content==""){
						content+="在线";
					} 
					break;

                //拉菲地暖
				case '485_laffey.RFH.001':
				    var info=endlist[0]||{};
					var event=info.event||{};
					if (event.OnOff == 1) {
                        content = "打开,";
                        if (event.operationMode !=undefined) {
                        	content +=" ";
                        	if (event.operationMode == 0) {
                        		content += "手动模式,";
                        	}
                        	if (event.operationMode == 1) {
                        		content += "自动模式,";
                        	}
                        	if (event.operationMode == 2) {
                        		content += "定时模式,";
                        	}
                        
                        }
                        if (event.targetTemp != undefined) {
                            content += " "+event.targetTemp+"°C";
                        }
                       
					}
					if (event.OnOff==0) {
						content="关闭";
					}
                    if(content==""){
						content+="在线";
					} 
					break;

				//拉菲新风系统
				case '485_laffey.ventilation.001':
				    var info=endlist[0]||{};
					var event=info.event||{};
					if (event.OnOff == 1) {
                        content = "打开,";
                        if (event.operationMode !=undefined) {
                        	content +=" ";
                        	if (event.operationMode == 1) {
                        		content += "换气模式,";
                        	}
                        	if (event.operationMode == 2) {
                        		content += "排风模式,";
                        	}
                        	if (event.operationMode == 3) {
                        		content += "智能模式,";
                        	}
                        	if (event.operationMode == 4) {
                        		content += "强劲模式,";
                        	}
                        	if (event.operationMode == 5) {
                        		content += "省电模式,";
                        	}
                        
                        }
                        if (event.intakeLevel !=undefined) {
                        	content +=" ";
                        	if (event.intakeLevel == 0) {
                        		content += "进风关闭,";
                        	}
                        	if (event.intakeLevel == 1) {
                        		content += "进风低速,";
                        	}
                        	if (event.intakeLevel == 2) {
                        		content += "进风中速,";
                        	}
                        	if (event.intakeLevel == 3) {
                        		content += "进风高速,";
                        	}
                        }
                         if (event.exhaustLevel !=undefined) {
                        	content +=" ";
                        	if (event.exhaustLevel == 0) {
                        		content += "排风关闭";
                        	}
                        	if (event.exhaustLevel == 1) {
                        		content += "排风低速";
                        	}
                        	if (event.exhaustLevel == 2) {
                        		content += "排风中速";
                        	}
                        	if (event.exhaustLevel == 3) {
                        		content += "排风高速";
                        	}
                        }
                       
					}
					if (event.OnOff==0) {
						content="关闭";
					}
                    if(content==""){
						content+="在线";
					} 
					break;

				case 'midea.switch.001':
				case 'midea.switch.002':
				case 'midea.switch.003':
				case 'midea.switch.004':
				case 'midea.curtain.001':
				case 'midea.curtain.002':
				case 'jiayun.switch.001':
				case 'jiayun.switch.002':
				case 'jiayun.switch.003':
				case 'jiayun.switch.004':
				case 'jeff.curtain.001':
				case 'dooya.curtain.001':
				case 'jiayun.curtain.001':
				case 'jiayun.curtain.002':
				case 'laffey.switch.001':
				case 'laffey.switch.002':
				case 'laffey.switch.003':
				case 'laffey.switch.004':
				case 'laffey.curtain.001':
				case 'laffey.curtain.002':
				case 'honyar.switch.001':
				case 'honyar.switch.002':
				case 'honyar.switch.003':
				case 'honyar.curtain.001':
				     for(var i=0;i<endlist.length;i++){
					    var info=endlist[i]||{};
					    if(i>0){
							 content+=" ";
						}
					    var event=info.event||{};
						var endpoint=info.endpoint;
						var name;
						if(nameArr!=undefined){
							nameArr=nameArr||[];
							name=nameArr[endpoint-1].name||"";
						}
						var outputName;
						if(name==undefined || name==""){
							outputName=endpoint+"路";
						}else{
							outputName=name;
						}
						if(event.OnOff==1){
						  content+=outputName+"打开";
						}else{
						  content+=outputName+"关闭";
						}
			     	}
					break;
				case  'jiayun.switch.007':
				case 'jiayun.switch.008':
					for(var i=0;i<endlist.length;i++){
					    var info=endlist[i]||{};
					    if(i>0){
							 content+=" ";
						}
					    var event=info.event||{};
						var endpoint=info.endpoint;
						var name;
						if(nameArr!=undefined){
							nameArr=nameArr||[];
							name=nameArr[endpoint-1].name||"";
						}
						var outputName;
						if(name==undefined || name==""){
							if(i==0){
								if(modelId=="jiayun.switch.007"){
								   outputName="水阀控制";
								}else{
								   outputName="电闸控制"; 
								}
							}
							if(i==1){
								if(modelId=="jiayun.switch.007"){
								   outputName="电闸控制";
								}else{
								   outputName="水阀控制"; 
								}
							}
							if(i==2){
								outputName="气阀控制";
							}
                        }else{
							outputName=name;
						}
						if(event.OnOff==1){
						  content+=outputName+"关闭";
						}else{
						  content+=outputName+"打开";
						}
			     	}
					break;
				case 'jiayun.switch.005':
				case 'laffey.switch.005':
				case 'midea.switch.005':
					/*for(var i=0;i<endlist.length;i++){
					    var info=endlist[i]||{};
					    if(i>0){
							 content+=" ";
						}
					    var event=info.event||{};
						var endpoint=info.endpoint;
						if(event.OnOff==1){
						  content+=endpoint+"路"+"打开";
						}else{
						  content+=endpoint+"路"+"关闭";
						}
			     	}*/
					content="在线"
					break;
				case 'jiayun.light.001':
				case 'jiayun.light.002':
				case 'midea.light.001':
				case 'midea.light.002':
					for(var i=0;i<endlist.length;i++){
					    var info=endlist[i]||{};
					    if(i>0){
							 content+=" ";
						}
					    var event=info.event||{};
						var endpoint=info.endpoint;
                        var name;
						if(nameArr!=undefined){
							nameArr=nameArr||[];
							name=nameArr[endpoint-1].name||"";
						}
						var outputName;
						if(name==undefined || name==""){
							outputName=endpoint+"路";
						}else{
							outputName=name;
						}


						if(event.OnOff==undefined){
							if(event.Level==0){
								content+=outputName+"关闭";
							}else{
							    content+=outputName+"亮度"+event.Level+"%";
							} 
						}else{
							 if(event.OnOff==0){
								content+=outputName+"关闭";
							 }else{
								var level=event.Level;
								if(level!=undefined && level>100){
									level=Math.floor((level/255)*100);
								}
								content+=outputName+"打开,"+"亮度"+(level||20)+"%";
							 } 
						}
			     	}
					break;
				case 'jiayun.ir.002':
					content="在线";
					break;
				case 'midea.env.001':
				case 'midea.env.002':
					 content="在线";
					 break;
				default:
					break;
			  }//end switch
			  if(content=="")
			  {
				var info;
				if(endlist==undefined){
				   info=result;
				}else{
				   info=endlist[0]||{};
				}
				content=this.parseEvent(modelId,info,deviceMapping);
			  }
		  }else{
			  content="离线";
		  }

		  return content;

	},
	parseLog: function(modelId,info,deviceMapping,endlist){
      var content="";
	  switch (modelId)
      {
        case 'jiayun.env.003':
			var event=info.event||{};
	      	if(event.currHum!=undefined){
                content+="湿度"+event.currHum/100+"%";
		    } 
			if(event.currTemp!=undefined){
                if(event.currHum!=undefined){
                     content+=" ";
				}
                content+="温度"+event.currTemp/100+"°";
		    } 
			if(content==""){
				content+="在线";
			} 
            break;
		case 'luftmon.alphair.001':
					var event=info.event||{};
					if(event.Pm25Value!=undefined){
						if(event.Pm25Value<=50){
							content+="PM2.5低";
						}else if(event.Pm25Value>50&&event.Pm25Value<=175){
							content+="PM2.5中";
						}else{
							content+="PM2.5高";
						}
					} 
					if(event.currHum!=undefined){
						content+="湿度"+parseInt(event.currHum/100)+"%";
					} 
					if(event.currTemp!=undefined){
						var currTemp=event.currTemp;
                        if(currTemp>38221){
                            currTemp=(currTemp-65536)/100;
						}else{
							currTemp=currTemp/100;
						}
						content+="温度"+parseInt(currTemp)+"°";
					}
					if(event.VocLevel!=undefined){
						if(event.VocLevel<=33){
							content+="有机污染物浓度低";
						}else if(event.VocLevel>33&&event.VocLevel<=66){
							content+="有机污染物浓度中";
						}else{
							content+="有机污染物浓度高";
						}
					}
					if(event.Illuminance!=undefined){
						if(event.Illuminance<=60){
							content+="亮度弱";
						}else if(event.Illuminance>60&&event.Illuminance<=500){
							content+="亮度正常";
						}else{
							content+="亮度强";
						}
					} 
					if(content==""){
						content+="在线";
					} 
			        break;
	    case 'midea.switch.001':
		case 'midea.switch.002':
		case 'midea.switch.003':
		case 'midea.switch.004':
		case 'midea.switch.005':
		case 'midea.curtain.001':
		case 'midea.curtain.002':
        case 'jiayun.switch.001':
        case 'jiayun.switch.002':
        case 'jiayun.switch.003':
        case 'jiayun.switch.004':
		case  'dooya.curtain.001':
		case  'jeff.curtain.001':
		case  'jiayun.curtain.001':
		case 'jiayun.curtain.002':
		case 'jiayun.switch.005':
		case 'laffey.switch.001':
		case 'laffey.switch.002':
		case 'laffey.switch.003':
		case 'laffey.switch.004':
		case 'laffey.curtain.001':
		case 'laffey.curtain.002':
		case 'laffey.switch.005':
        case 'honyar.switch.001':
		case 'honyar.switch.002':
		case 'honyar.switch.003':
		case 'honyar.curtain.001':
		    var event=info.event||{};
	        var endpoint=parseInt(info.endpoint);
			var name;
			if(endlist!=undefined){
                endlist=endlist||[];
				name=endlist[endpoint-1].name||"";
			}

			if(event.OnOff==1){
			  if(name!=undefined && name!=""){
				   content+=name+"打开";
			  }else{
                content+="("+endpoint+"路)"+"打开";
			  }
			}else{
				 if(name!=undefined && name!=""){
				   content+=name+"关闭";
				 }else{
					content+="("+endpoint+"路)"+"关闭";
				 }
			}
            break;
		case  'jiayun.switch.007':
		case 'jiayun.switch.008':
		    var event=info.event||{};
	        var endpoint=parseInt(info.endpoint);
			var name;
			if(endlist!=undefined){
                endlist=endlist||[];
				name=endlist[endpoint-1].name||"";
			}

			if(event.OnOff==1){
			    /*if(name!=undefined && name!=""){
				   content+=name+"打开";
			    }else{*/
				    if(endpoint==1){
                        if(modelId=="jiayun.switch.007"){
						   content+="水阀关闭";
						}else{
							content+="断电";
						}
					}
					if(endpoint==2){
						if(modelId=="jiayun.switch.007"){
						   content+="断电";
						}else{
							content+="水阀关闭";
						}
					}
					if(endpoint==3){
						content+="气阀控制打开";
					}
              // }
			}else{
				 /*if(name!=undefined && name!=""){
				    content+=name+"打开";
				 }else{*/
				    if(endpoint==1){
						if(modelId=="jiayun.switch.007"){
						   content+="水阀打开";
						}else{
							content+="通电";
						}
					}
					if(endpoint==2){
						if(modelId=="jiayun.switch.007"){
						   content+="通电";
						}else{
							content+="水阀打开";
						}
					}
					if(endpoint==3){
						content+="气阀控制关闭";
					}
                //}
			}
            break;
		/*case 'jiayun.switch.005':
		    var event=info.event||{};
	        var endpoint=info.endpoint;
			if(event.OnOff==1){
              content+="("+endpoint+"路)"+"打开";
			}else{
			  content+="("+endpoint+"路)"+"关闭";
				}
            break;*/

			
		case 'jiayun.light.001':
		case 'jiayun.light.002':
		case 'midea.light.001':
		case 'midea.light.002':
			var event=info.event||{};
		    var endpoint=info.endpoint;
			var name;
			if(endlist!=undefined){
                endlist=endlist||[];
				name=endlist[endpoint-1].name||"";
			}
			var outputName;
			if(name==undefined || name==""){
				outputName=endpoint+"路";
			}else{
				outputName=name;
			}
		    if(event.OnOff==undefined){
				if(event.Level==0){
					content+=outputName+"关闭";
				}else{
					var level=event.Level;
					if(level!=undefined && level>100){
						level=Math.floor((level/255)*100);
					}
				   content+=outputName+"亮度"+(level||20)+"%";
				} 
			}else{
                 if(event.OnOff==0){
					content+=outputName+"关闭";
				 }else{
				    content+=outputName+"打开";
				 } 
			}
            break;
			case '485_daikin.cac.001':
				var event=info.event||{};
				var airConditionMapping = deviceMapping[modelId].event;
			    var endlist=info.endlist||[];
				var onOff = event.OnOff;
				var operationMode = event.operationMode;
				var targetTemp = event.targetTemp / 100;
				var targetWind = event.windSpeed;
				if (onOff == 1) {
					content+= airConditionMapping.OnOff["key" + onOff] + "，" + airConditionMapping.operationMode["key" + operationMode];
					if (operationMode == 5) {
						content += "，温度自动";
					}
					else {
						content += "，" + targetTemp + "℃";
					}
					if (targetWind == 102) {
						content += "，风速自动";
					} else {
						content += "，风速" + targetWind + "档";
					}
				} else {
					content+= airConditionMapping.OnOff["key" + onOff];
				}
			    
			case '485_laffey.RFH.001':
				var event=info.event||{};
			    var rfhMapping = deviceMapping[modelId].event;
			    var onOff = event.OnOff;
				var operationMode = event.operationMode;
				var targetTemp =event.targetTemp;
				if(onOff==0){
					content+="关闭";							    
				}else{
					content+= rfhMapping.OnOff["key" + onOff] + "，" + rfhMapping.operationMode["key" + operationMode]+ "，" + targetTemp + "℃";
				} 
				break;
			  case '485_laffey.ventilation.001':
				var ventilationMapping=deviceMapping[modelId].event;
				var event=info.event||{};
		        var onOff = event.OnOff;
				var operationMode = event.operationMode;
				var intakeLevel =event.intakeLevel;
				var exhaustLevel =event.exhaustLevel;
				if(onOff==0){
					 content+="关闭";		
				 }else{
					 content+= ventilationMapping.OnOff["key" + onOff] + "，" + ventilationMapping.operationMode["key" + operationMode]
									   + "，进风档位" +ventilationMapping.intakeLevel["key" + intakeLevel] 
									   + "，排风档位" +ventilationMapping.exhaustLevel["key" + exhaustLevel];
				} 
			 break;
		default:
            break;
	  }
      if(content!="")
      {
		  return content;
      }else{   
	     return  this.parseEvent(modelId,info,deviceMapping);
	  }
    },
    parseEvent: function(modelId,endpointEvent,deviceMapping,userInfos){
      var tempContent = "";
      if (!deviceMapping[modelId] || !deviceMapping[modelId].event || !endpointEvent || !endpointEvent.event){
        return tempContent;
      }
      var _modelEventConfig = deviceMapping[modelId].event;
      var _zoneStatusConfig = deviceMapping.ZoneStatus||{};
      var _eventObj = endpointEvent.event;
      for (var item in _eventObj) {
      if ((modelId == "kaadas.doorlock.001"||modelId == "hutlon.doorlock.001"||modelId == "yangge.doorlock.001") && item == "OpenRecord") {
            if(_eventObj[item]==0){
                tempContent += "正常";
            }else{
                var intFault = parseInt(_eventObj[item],10);

                var codes = this.paddingZero(intFault.toString(16),4);
                var _user = parseInt(codes.substr(2,2),16);
                var _lockType = parseInt(codes.substr(0,2),16);
				var userRole;
				userInfos=userInfos||[]; 
				for(var j=0;j<userInfos.length;j++){
					var userObj=userInfos[j]||{};
                    if(userObj.userType==_lockType&&userObj.userNo==_user){
                        userRole=userObj.userRole;
						break;
					}
				}
				if(userRole!=undefined&&userRole!=""){
                       tempContent = userRole+"开锁";
				}else{
                  var _OpenRecord = _modelEventConfig.OpenRecord||{};
                  var _lockTypeName =_OpenRecord[_lockType]||"";
                  tempContent = _lockTypeName+"用户"+_user+"开锁";
				}
            }
        }
		else if(item == "BatteryAlarmState"){
			if(_eventObj[item]==1){
				tempContent = "电量低报警";
			}else{
				tempContent = "电量正常";
			}
		}
		else if(item == "ActuatorEnabled"){
			if(_eventObj[item]==0){
				tempContent = "门被反锁";
			}else{
				tempContent = "解除反锁";
			}
		}
        else if(item == "OnOff" || item == "ZoneStatus") {
            if(item == "OnOff"){
                if (_modelEventConfig[item] && _eventObj[item] != undefined) {
                    var _temp = _modelEventConfig[item][_eventObj[item]];
                    if (_temp != undefined && _temp != null && _temp != "") {
                        tempContent += _temp;
                        continue;
                    }
                }
            }
          if(_eventObj[item]==0){
              if(_modelEventConfig.default != undefined){
                  tempContent += _modelEventConfig.default;
              }else{
                tempContent += "正常";
              }
          }else{
            var intFault = parseInt(_eventObj[item],10);
            var codes = this.paddingZero(intFault.toString(2),16);
            for (var i = 0; i < codes.length; i++) {
              if (codes.charAt(i)=="1") {
                  var _temp = "";
                  if (_modelEventConfig && _modelEventConfig.ZoneStatus){
                      _temp = _modelEventConfig.ZoneStatus[codes.length-i-1];
                  }
                  if(!_temp){
                      _temp = _zoneStatusConfig[codes.length-i-1];
                  }
                  if (_temp != undefined && _temp != null && _temp != "") {
					  if (tempContent != undefined && tempContent != null && tempContent != ""){
						   tempContent += ","+_temp;
					  }else{
						   tempContent += _temp;
					  }
                   }
              }
            }
          }
        }else{
          if (_modelEventConfig[item] && _eventObj[item] != undefined) {
            var _temp = _modelEventConfig[item][_eventObj[item]];
            if (_temp != undefined && _temp != null && _temp != "") {
                tempContent += _temp;
            }
          }
        }
      }
      return tempContent;
    },
    parseOnOff : function(modelId,endlist,deviceMapping){
		 console.log(deviceMapping)
       console.log(modelId)
        var _modelEventConfig = deviceMapping[modelId].event;
        var _zoneStatusConfig = deviceMapping.ZoneStatus||{};
      if(modelId=="midea.doorlock.001" || modelId=="kaadas.doorlock.001"||modelId == "hutlon.doorlock.001"||modelId == "yangge.doorlock.001"){
        var tempContent = "";
        if (endlist == undefined || endlist.length ==0) {
          tempContent = "";
        }else{
          for(var i = 0; i < endlist.length; i++) {
            var _eventLog = endlist[i];
            if (_eventLog && _eventLog.event && _eventLog.event.DoorState != undefined) {
              var _modelEventOnOffConfig = _modelEventConfig.DoorState;
              var _temp = _modelEventOnOffConfig[_eventLog.event.DoorState];
              if (_temp != undefined && _temp != null && _temp != "") {
                  tempContent = _temp;
              }
              break;
            }
          }
        }
      }else if(modelId=="jiayun.switch.001"|| modelId=="jiayun.switch.002"|| modelId=="jiayun.switch.003"|| modelId=="jiayun.switch.004"|| modelId=="jiayun.switch.005"
	           || modelId=="midea.switch.001" || modelId=="midea.switch.002" || modelId=="midea.switch.003" || modelId=="midea.switch.004" || modelId=="midea.switch.005"){
          tempContent = "在线";
      }else{
        if (endlist == undefined || endlist.length ==0) {
            if(_modelEventConfig.default != undefined){
                tempContent = _modelEventConfig.default;
            }else{
                tempContent = "正常";
            }
        }else{
          tempContent = "正常";
          for(var i = 0; i < endlist.length; i++) {
            var _eventLog = endlist[i];
            if (_eventLog && _eventLog.event && (_eventLog.event.OnOff != undefined ||_eventLog.event.ZoneStatus != undefined)) {
                var _eventValue = "";
                if(_eventLog.event.OnOff != undefined){
                    _eventValue = _eventLog.event.OnOff;
                    var _modelEventOnOffConfig = _modelEventConfig.OnOff;
                    var _temp = _modelEventOnOffConfig[_eventValue];
                    if (_temp != undefined && _temp != null && _temp != "") {
                        tempContent = _temp;
                        continue;
                    }
                }else{
                    _eventValue = _eventLog.event.ZoneStatus;
                }
                  if(_eventValue==0) {
                      if (_modelEventConfig.default != undefined) {
                          tempContent = _modelEventConfig.default;
                      } else {
                          tempContent = "正常";
                      }
                      continue;
                  }
                  var intFault = parseInt(_eventValue,10);
                  var codes = this.paddingZero(intFault.toString(2),16);
                  for (var i = 0; i < codes.length; i++) {
                      if (codes.charAt(i)=="1") {
                          var _temp = "";
                          if (_modelEventConfig && _modelEventConfig.ZoneStatus){
                              _temp = _modelEventConfig.ZoneStatus[codes.length-i-1];
                          }
                          if(!_temp){
                              _temp = _zoneStatusConfig[codes.length-i-1];
                          }
                          if (_temp != undefined && _temp != null && _temp != "") {
                              tempContent = _temp;
                          }
                      }
                  }
              break;
            }
          }
        }
      }
      return tempContent;
    },
    parseMagnet : function(_event){
      var tempContent = "";
      var currTemp = _event.currTemp||"";
      var currHum = _event.currHum||"";
      if (currTemp!="") {
         tempContent += "温度" + parseInt(currTemp)/100  + "° ";
      }
      if (currHum!="") {
         tempContent += "湿度" + parseInt(currHum)/100  + "% ";
      }
      return tempContent;
    },
    parseOnlineStatus : function(modelId,endlist,deviceMapping,latestEventLog){
      var tempContent = "";
      try {
        if (!deviceMapping[modelId]||!deviceMapping[modelId].event||!deviceMapping[modelId].status) {
            return tempContent;
        }
        var status_online = deviceMapping[modelId].status.online||"";
        if (status_online == 'event' || status_online == 'eventLog') {
          if (status_online == 'eventLog' && latestEventLog) {
            if (typeof latestEventLog === "string") {
              tempContent = latestEventLog;
            }else{
              //TODO
              tempContent = "";
            }
          }else{
            tempContent += this.parseOnOff(modelId,endlist,deviceMapping);
          }
        }else if (status_online == 'currTemp|currHum') {
           if (endlist != undefined && endlist != null && endlist.length >0) {
             if (endlist[0].event != undefined) {
                 tempContent += this.parseMagnet(endlist[0].event);
             }
           }
        }else {
           tempContent = status_online;
        }
      } catch (e) {
        tempContent = "";
      }
      return tempContent;
    },
    parseOnOffStatus:function(modelId,status,endlist,deviceMapping){
      var tempContent = "";
      if (status != undefined && status != null && status == 1) {
        tempContent =  this.parseOnOff(modelId,endlist,deviceMapping);
      }else{
        if (deviceMapping[modelId] != undefined && deviceMapping[modelId].status != undefined && deviceMapping[modelId].status.offline != undefined) {
          tempContent = deviceMapping[modelId].status.offline;
        }else{
          tempContent = "离线";
        }
      }
      return tempContent;
    },
    parseStatus:function(modelId,status,endlist,deviceMapping,latestEventLog){
      var tempContent = "";
      if (status != undefined && status != null && status == 1) {
        tempContent =  this.parseOnlineStatus(modelId,endlist,deviceMapping,latestEventLog);
      }else{
        if (deviceMapping[modelId] != undefined && deviceMapping[modelId].status != undefined && deviceMapping[modelId].status.offline != undefined) {
          tempContent = deviceMapping[modelId].status.offline;
        }else{
          tempContent = "离线";
        }
      }
      return tempContent;
    },
    parseEventLog:function(modelId,eventLog,deviceMapping){
      var tempContent = "";
      try {
        if (!deviceMapping[modelId]||!deviceMapping[modelId].event||!deviceMapping[modelId].status) {
            return tempContent;
        }
        var status_online = deviceMapping[modelId].status.online||"";
        if (status_online == 'eventLog') {
          if (eventLog) {
              tempContent += this.parseEvent(modelId,eventLog,deviceMapping);
          }
        }
      } catch (e) {
        tempContent = "";
      }
      return tempContent;
    }
 }
