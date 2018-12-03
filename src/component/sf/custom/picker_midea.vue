<template>
    <div>
        <midea-scroll-picker :listArray="listArray" :listItem="listItem" :target="target"   @onChange="changeValue"></midea-scroll-picker>
    </div>
</template>
 
<script type="text/javascript">
import mideaScrollPicker from '@/midea-component/scrollPicker.vue'
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
    components: {  mideaScrollPicker },
    data() {
        return {
            listArray:[],
            listItem: 10
        }
    },
    created(){
        this.listArray = this.data.list;
        this.listItem = this.data.defaultValue;
    },
    methods: {
        changeValue(e){
            var value = e;
            this.$emit('wxChange', value, this.target);
            //e的格式为 {index:x，value:x}
        }
    },
};
</script>