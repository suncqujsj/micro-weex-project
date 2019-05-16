<template>
   <div class="container">
        <div class="midea-body">
            <div style="width:750px">
                <title-bar title="重复周期"></title-bar> 
                <midea-radio-list :list="repeatList" :needShowTopBorder="true" :needShowLastBottomBorder="true" @mideaRadioItemChecked="repeatSelect"></midea-radio-list>   
                <option-list-circle v-if="currentSelectedType=='4'"  :cols="cols" :customStyles="customStyles" :list="dayList"  @optionClick="dayChange" ></option-list-circle>
            </div>
        </div>
   </div>
</template>

<style>
    .midea-body {
        padding-top: 24px;
        background-color: #F9F9F9;
        flex: 1;
    }
</style>

<script>
    const picker = weex.requireModule('picker')
    import nativeService from '@/common/services/nativeService.js'
    import titleBar from '@/midea-component/title-bar.vue'
    import mideaRadioList from '@/midea-component/radioList.vue'
    import optionListCircle from '@/midea-component/optionListCircle.vue'

    export default {
        components:{ titleBar, mideaRadioList, optionListCircle},
        mixins: [],
        props: {
	        repeatType: {
	            type: String,
            	default: "4"
	        },
	        selectedDays: {
	        	type:String,
	        	default: "0000000"
	        }
	    },
        data(){
            return {
            	cols: 7,
            	customStyles: {
            		width: "58px",
			        height: "58px",
			        borderRadius: "58px",
			        borderRadius: "58px",
			        marginRight: "46px",
			        paddingTop: "300px",
			        backgroundColor: "#C7C7CC",
			        overflow: "hidden",
			        display: "flex",
			        alignItems: "center",
			        justifyContent:"center",
            	},
            	currentSelectedType:this.repeatType,
                repeatList: [
                    { title: '每天', value: 1 , checked: true,data:"1111111"},
                    { title: '工作日', value: 2 ,data:"1111100"},
                    { title: '周末', value: 3 ,data:"0000011"},
                    { title: '自定义', value: 4 ,data:"-1"}
                ],
                dayList: [
                    { title: '一', value: 1,checked:false},
                    { title: '二', value: 2,checked:false},
                    { title: '三', value: 3,checked:false },
                    { title: '四', value: 4,checked:false},
                    { title: '五', value: 5,checked:false },
                    { title: '六', value: 6,checked:false },
                    { title: '日', value: 7,checked:false }
                ],
                checkedList:[]
            }
        },
        computed:{
        },
        methods: {
            repeatSelect(e) {
            	const {repeatType} = this;
            	this.currentSelectedType = e.value;
                this.$emit('onRepeatSelect', {value:e.value})
            },
            dayChange(e) {
               this.checkedList=e.checkedList;
               this.$emit('onDayChange', {value:this.checkedList})
            },
            init(){
              const {repeatType,selectedDays} = this;
              this.currentSelectedType = repeatType;
              let currentDayList = selectedDays.split("");
              let isFindItem = false;
              this.repeatList.forEach(item=>{
                   if(item.value==repeatType){
                       item.checked=true;
                       isFindItem = true;
                   }else{
                       item.checked=false;
                   }
               })
               if(!isFindItem){
                   this.repeatList[3].checked=true;
                   this.currentSelectedType="4";
               }
               this.dayList.forEach((item,idx)=>{
                    if(currentDayList[idx]==1){
                       item.checked=true;  
                    }else{
                       item.checked=false;  
                    }
               })
            },
        },
        created(){
            this.init();
        }
    }
</script>

