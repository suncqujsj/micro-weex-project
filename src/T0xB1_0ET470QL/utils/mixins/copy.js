/**
 * Created by sf
 * 2018/10/30
 */
const clipboard = weex.requireModule('clipboard')
import nativeService from '@/common/services/nativeService';
let commonMixin = {
    data(){
        return {
            testCmd:''
        };
    },
    methods:{
        testCmdFun(cmd){
            this.testCmd = cmd;
        },
        setContent () {
            nativeService.toast("复制成功");
            clipboard.setString(this.testCmd)
        },
    }
};

export default commonMixin