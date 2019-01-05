/**
 * Created by parker
 * 2018/11/1
 * 用于解析待机页面
 */
var numberRecord = 0; //记录跳页面的次数
import cmdFun from "../../command/multiCavity/util.js"; //解析指令
import nativeService  from '@/common/services/nativeService';
let workingModalMixin  = {
    data(){
        return {
            warningDialog: this.initWarningDialog(),
            modeText:'',
            srcollPaddingBottom:'',
            cmdObj: {'down_cavity':cmdFun.initAnalysisObj(),'up_cavity':cmdFun.initAnalysisObj()},
            isDownCavityWorking:false,//烤箱
            isUpCavityWorking:false,//蒸汽炉
        };
    },
    methods: {
        analysisFun(analysisObj) {                
            //this.show = false;
            this.cmdObj = analysisObj;
           // nativeService.alert(analysisObj);
            this.setWarningDialog("",null,false);
            if(analysisObj.down_cavity.displaySign.isError|| analysisObj.up_cavity.displaySign.isError){
                this.setWarningDialog("设备故障，请联系售后人员");
            }
            if(analysisObj.down_cavity.displaySign.lackWater||analysisObj.up_cavity.displaySign.lackWater){
                this.setWarningDialog("主人，您的水箱缺水了，要及时添加水哦");
            }
            if(analysisObj.down_cavity.displaySign.waterBox||analysisObj.up_cavity.displaySign.waterBox){
                this.setWarningDialog("缺水盒");

            }
            if(analysisObj.down_cavity.displaySign.doorSwitch||analysisObj.up_cavity.displaySign.doorSwitch){
                this.setWarningDialog("炉门开了");
            }

            if(analysisObj.down_cavity.displaySign.lock||analysisObj.up_cavity.displaySign.lock){
                // let context = this;
                // this.setWarningDialog("你需要关闭童锁吗？", function(){
                //     context.childLock(false);
                // });
                !this.modalVisibility && this.showModal();
            } else {
                this.modalVisibility && this.closeModal();
            }

            this.isUpCavityWorking = false;
            this.isDownCavityWorking = false;
            let downCavityStatus = analysisObj.down_cavity.workingState.value;
            let upCavityStatus = analysisObj.up_cavity.workingState.value;
            if(this.index==0 && (upCavityStatus==3||upCavityStatus==4||upCavityStatus==6)){
                this.isUpCavityWorking = true;
                this.analysisWorkingFun(analysisObj.up_cavity,this.pages[0].tabs);
            }
             if(this.index==1 && (downCavityStatus==3||downCavityStatus==4||downCavityStatus==6)){
                this.isDownCavityWorking = true;
                this.analysisWorkingFun(analysisObj.down_cavity,this.pages[1].tabs);
            }

            // if (analysisObj.workingState.value == 3 || analysisObj.workingState.value == 4 || analysisObj.workingState.value == 6) {
            //     numberRecord++;
            //     if(numberRecord==1){ //防止多次获取设备状态，多次跳转
            //         this.goTo("working");
            //     }
            // }
        },
    }
};

export default workingModalMixin;