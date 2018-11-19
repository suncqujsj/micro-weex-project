/**
 * Created by sf
 * 2018/10/30
 */

const bridgeModule = weex.requireModule('bridgeModule');

let commonMixin = {
    data(){
        return {
            wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
        };
    },
    methods:{
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

        statisticsUpload: function(){
            let param = {
                widget_name: '0xAC',
                iot_device_id: 'xxxxxxxx',
                widget_version: '1.0.0',
                pageName: 'airConditionerMainPage',
                actionType: 'plugin',
                subAction: 'page_view',
                extra1: { //浏览页面，如不需设备信息，可不传该字段 ‘key’:’value’,
                     },
                operation: 'burialPoint'
            };

            bridgeModule.commandInterface(JSON.stringify(param), function
                (resData) {
                //成功的回调
            }, function (error) {
                //失败的回调
            });
        }

    }
};

export default commonMixin