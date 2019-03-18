/**
 * Created by sf
 * 2018/10/30
 */

const bridgeModule = weex.requireModule('bridgeModule');
const objectAssign = require('object-assign');
import nativeService from '@/common/services/nativeService';
import languages from '../../mapping/languages';

let commonMixin = {
    data(){
        return {
            wrapHeight: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750,
            state: null,
            stateTime: null,
            count:0
        };
    },
    methods:{
        back: function(){
            nativeService.goBack();
        },
        back2Native(){
            nativeService.backToNative()
        },
        openPage: function(pageName){
            nativeService.goTo(`${pageName}.js`, {animated: true});
        },
        isip9(){
           return  weex && (weex.config.env.deviceModel === 'iPhone9,2');
        },
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

        /**
         * 测试计数
         */
        counts(key){
            this.test = key;
            ++this.count;
        },


        /**
         * 语言包
         */
        getLang(){
            // if (!this.constant.device.lang) this.constant.device.lang = 'cn';
            // return this.constant.device.lang;
            return this.constant.device.lang || 'cn'
        },
        getLanguage(key){
            return languages[key][this.getLang()];
        },
        getLanguages(keys){
            let len = keys.length;
            let space = this.getLang() === 'cn' ? '' : ' ';
            let buffer = '';
            for(let i=0;i<len;i++) {
                buffer += this.getLanguage(keys[i]) + space;
             }
             return buffer;
        },

        /**
         * 警告弹窗设置
         */
        setWarningDialog(content, callback=null, show=true){
            this.warningDialog.show = show;
            this.warningDialog.content = content;
            this.warningDialog.callback = callback;
        },

        hideWarningDialog(){
            this.warningDialog.show = false;
        },

        initWarningDialog(){
            return {
                show: false,
                title: "温馨提示",
                content: "主人，您的水箱缺水了，要及时添加水哦",
                callback: null
            };
        },

        /**
         * 提示弹窗设置
         */
        initHintDialog(){
            return {
                show: false,
                title: "温馨提示",
                content: "请填写",
                confirmText: '确定',
                cancelText: '取消',
                cancelCallback: ()=>{},
                confirmCallback: ()=>{},
            };
        },

        hideHintDialog(){
            this.hintDialog.show = false;
        },

        setHintDialog(config){
            let hintDialog = this.initHintDialog();
            this.hintDialog = objectAssign({}, hintDialog, config)
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
        },

        /**
         * 初始化deviceId
         * */
        async setDeviceId(){
            let deviceInfo = await nativeService.getDeviceInfo();
            if(deviceInfo.result && deviceInfo.result.deviceId ) {
                this.deviceId = deviceInfo.result.deviceId;
            }
        },

        /**
         * 初始化uid
         * */
        async setUid(){
            let userInfo = await nativeService.getUserInfo();
            if(userInfo.uid) {
                this.uid = userInfo.uid;
            }
        },

        /**
         * 状态组件state.vue的显示以及细节
         */
        showState(text,type='loading'){
            this.state  = {
                display: true,
                type,
                text
            };

            if(type === 'success') {
                this.stateTime = setInterval(()=>{
                    this.hideState();
                    clearInterval(this.stateTime);
                }, 2000);
            }
        },

        /**
         * 状态组件state.vue的隐藏
         */
        hideState(){
            this.state  = {
                display: false,
            };
        }
    }
};

export default commonMixin