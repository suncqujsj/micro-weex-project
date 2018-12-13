/**
 * Created by sf
 * 2018/10/30
 */

const bridgeModule = weex.requireModule('bridgeModule');
const objectAssign = require('object-assign');
import nativeService from '@/common/services/nativeService';


let commonMixin = {
    data(){
        return {
            wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
        };
    },
    methods:{
        isipx: function () {
            return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
            );
        },
        dList(list, cols){
            var length=list.length;
            var mod=list.length%cols;
            if(mod!=0){
                var appendLen= cols-mod;
                for(var i=0;i<appendLen;i++){
                    list.push('');
                }
            }
            var resultList=[];
            var obj={};
            var index=0;
            // debugger;
            for(var j=0;j<list.length;j++){
                var item=list[j];
                // item.index=index;
                index++;
                if(j%cols==0){
                    obj.items=[];
                }
                obj.items.push(item);
                if(j%cols==cols-1){
                    resultList.push(Object.assign({}, obj));
                }
            }
            return resultList;
        },

        statisticsUpload: function(data={}){

            // nativeService.alert(data);
            // return;
            let param = {
                operation: 'burialPoint',
                actionType: 'plugin',
                pageName: 'homePage',
                subAction: 'pageView',
                widget_name: 'MSO_T0xBx', // constant
                widget_version: '1.0.0', // constant
                extra1: { //浏览页面，如不需设备信息，可不传该字段 ‘key’:’value’,
                     }
            };

            param = objectAssign(param, data);

            bridgeModule.commandInterface(JSON.stringify(param), function
                (resData) {
                //成功的回调
                // nativeService.alert(resData);
            }, function (error) {
                //失败的回调
                // nativeService.alert('upload error');
            });
        }
    }
};

export default commonMixin