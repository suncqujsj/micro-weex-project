<template>
    <div>
        <am-picker-view
            :data="listArray"
            v-model="listItem"
            @change="onChange"
        ></am-picker-view>
    </div>
</template>
 
<script type="text/javascript">
import { AmPickerView } from 'weex-amui'
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
    },
    components: { AmPickerView },
    data() {
        return {
            listArray:[],
            listItem: 10
        }
    },
    created(){
        var newList = [], singleList = [], selectList=[];
        var _list = this.data.list;
        var _listItem = this.data.defaultValue+'';
        for(var i=0; i<_list.length; i++){
            newList.push({
                label: _list[i]+'',
                value: _list[i]+''
            });
        }
        singleList.push(newList);
        this.listArray = singleList;
        selectList.push(_listItem);
        this.listItem = selectList;
        // nativeService.alert(this.listItem);
    },
    methods: {
        onChange(e){
            var value = e[0].value;
            this.$emit('wxChange', value, this.target);
            //e的格式为 {index:x，value:x}
        }
    },
};
</script>