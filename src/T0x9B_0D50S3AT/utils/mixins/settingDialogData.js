/**
 * Created by sf
 * 2018/10/22
 */
import accordions from "../../config/accordions.js";

const settingDialogMixin = {
    data() {
            return {
                showSettingDialog: false,
                accordions: accordions||[],
                current:{},
                currentItem:{},
                modeText:''
            }
    },
    methods: {
        initAccordions: function(){
            return accordions;
        },
        initCurrentData: function(){
            return {
                time: null,
                temperature: null,
                preheat:false,
                steamAmount:0,
                fireAmount:0,
                recipeId:null
            }
        },
        resetState: function(){
            this.accordions = this.initAccordions();
            this.current = this.initCurrentData();
            this.currentItem = null;
        },
        openDialog(){
            this.showSettingDialog = true;
            this.current.preheat = this.currentItem['preheat'].default;
        },
        _handlePickerChange(_current){
            this.current = _current;
        },
         _foldCallback: function(value){
            this.accordions = value;
        },
        _cancelCallback(){
            this.showSettingDialog = false;
            this.resetState();
        },
        _sureCallback: function(jsonCmd,type){
            this.showSettingDialog = false;
            this.controlDevice(jsonCmd,type);
        },
    }
};

export default settingDialogMixin;