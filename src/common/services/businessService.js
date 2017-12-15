const modal = weex.requireModule('modal');
import nativeService from './nativeService'
export default {
    initGwVersion(succFun) {
        if(typeof succFun == 'undefined') {
            succFun = function(){}
        }
        nativeService.getItem("currentVersion", function(data) {
            if (data.data) { //网关版本号已存在
                succFun(data.data);
            } else { //向原生获取版本号
                nativeService.getGatewayCurrentVersion(function(data) {
                    if (data.currentVersion != undefined) {
                        nativeService.setItem('currentVersion', data.currentVersion);
                        succFun(data.currentVersion);
                    }
                });
            }

        })

    },
    checkGwSupport(type) {
        this.initGwVersion(function(currentVersion) {
            var versionNeed = '0';
            switch (type) {
                case 0:
                    versionNeed = '0'; //预查询网关版本号
                    break;
                case 1:
                    versionNeed = '326'; //门锁支持密码有效时间自定义
                    break;
                case 2:
                    versionNeed = '328'; //网关信息备份还原
                    break;
                case 3:
                    versionNeed = '325'; //支持电风扇、电热水器、加湿器作为联动运行结果
                    break;
                case 4:
                    versionNeed = '325'; //支持洗衣机、热水器作为联动触发条件
                    break;
                case 5:
                    versionNeed = '325'; //网关报警音可设置
                    break;
                case 6:
                    versionNeed = '325'; //门磁、红外传感器联动优化
                    break;
                case 7:
                    versionNeed = '324'; //开关面板关联控制   
                    break;
                case 8:
                    versionNeed = '324'; //自运行支持生效时间段设置         
                    break;
                case 9:
                    versionNeed = '324'; //门锁账号管理&联动
                    break;
                case 10:
                    versionNeed = '323'; //场景或自运行，运行结果选择 【网关“开启布防模式”或关闭布防模式】
                    break;
                case 11:
                    versionNeed = '327'; //空气盒子选择PM2.5作为触发条件
                    break;
                case 12:
                    versionNeed = '327'; //运行结果选择扫地机器人执行动作
                    break;
                case 13:
                    versionNeed = '327'; //运行结果选择支持执行场景  
                    break;
                case 14:
                    versionNeed = '328'; //电饭煲 作为运行条件
                    break;
                case 15:
                    versionNeed = '328'; //电压力锅 作为运行条件
                    break;
                case 16:
                    versionNeed = '328'; //灶具 作为运行条件
                    break;
                case 17:
                    versionNeed = '328'; //除湿器 作为运行结果
                    break;
            }
            nativeService.alert(versionNeed);
            if(parseInt(currentVersion) >= parseInt(versionNeed)) {
                return true;
            } else {
                modal.alert({
                    okTitle : '更新',
                    message: '当前网关版本过低，不支持此功能，请及时更新',
                    duration: 0.3
                }, function (value) {
                    var path = "device/check-update.js";
                    nativeService.goTo(path);
                })
               return false;
            }
        });




    }



}