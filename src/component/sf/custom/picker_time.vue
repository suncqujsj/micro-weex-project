<template>
    <div>
        <am-picker-view
            :listArray="listArray"
            :target="target"
            :pickerIndex="pickerIndex"
            :listItem="listItem"
          
            @change="onChange"
        ></am-picker-view>
    </div>
</template>
 
<script type="text/javascript">
import  AmPickerView  from './base/scrollPicker_one.vue'
// import { AmPickerView } from 'weex-amui'
import nativeService from '@/common/services/nativeService';
 
module.exports = {
      props: {
         visible: {
            type: Boolean,
            default: false
        },
        target: {
            type: String,
            default: ''
        },
        data: {
           type: Object,
            default: function(){
                return {}
            }
        },
        pickerIndex:{
            type: Number,
            default: 0
        }
    },
    components: { AmPickerView },
    data() {
        return {
            listArray:[],
            listItem: 10
        }
    },
    created(){
        this.listArray = this.data.list;
        this.listItem = this.data.defaultValue;
        // nativeService.alert(this.index);
    },
    methods: {
        onChange(e){
            var value = e.value;
            this.$emit('wxChange', value, this.target);
            //e的格式为 {index:x，value:x}
        }
    },
};
</script>