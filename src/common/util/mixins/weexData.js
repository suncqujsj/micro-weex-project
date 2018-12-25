/**
 * Created by parker
 * 2018/11/1
 * 用于解析待机页面
 */
var numberRecord = 0; //记录跳页面的次数
import cmdFun from "../command/util.js"; //解析指令
import nativeService  from '@/common/services/nativeService';
let workingModalMixin  = {
    data(){
        return {
            // tabs:[
                //     {
                //         name:'自动菜单',
                //         active:true,
                //         rows:autoMenu
                //     },
                //     {
                //         name:'加热模式',
                //         active:false,
                //         rows:modes
                //     }
                // ],
                warningDialog: this.initWarningDialog(),
                modeText:'',
                srcollPaddingBottom:'',
                cmdObj: cmdFun.initAnalysisObj(),
        };
    },
    methods: {
        analysisFun(analysisObj,tabs) {                
            // nativeService.alert(JSON.stringify(analysisObj));
            //this.show = false;
            this.cmdObj = analysisObj;
            if(analysisObj.displaySign.isError){
                this.setWarningDialog("设备故障，请联系售后人员");
            }
            if(analysisObj.displaySign.lackWater){
                this.setWarningDialog("主人，您的水箱缺水了，要及时添加水哦");
            }
            if(analysisObj.displaySign.waterBox){
                this.setWarningDialog("缺水盒");

            }
            if(analysisObj.displaySign.doorSwitch){
                this.setWarningDialog("炉门开了");
            }

            if(analysisObj.displaySign.lock){
                let context = this;
                this.setWarningDialog("你需要关闭童锁吗？", function(){
                    context.childLock(false);
                });
            }

            if (analysisObj.workingState.value == 3 || analysisObj.workingState.value == 4 || analysisObj.workingState.value == 6) {
                numberRecord++;
                if(numberRecord==1){ //防止多次获取设备状态，多次跳转
                    this.goTo("working");
                }
            }
        },
    }
};

export default workingModalMixin;