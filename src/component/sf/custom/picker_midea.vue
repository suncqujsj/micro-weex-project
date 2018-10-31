<template>
    <div>
        <midea-scroll-picker :listArray="list" :listItem="defaultValue"   @onChange="changeValue"></midea-scroll-picker>
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
        list: {
           type: Array,
            default: function(){
                return []
            }
        },
        defaultValue: {
            type: Number,
            default: 10
        }
    },
    components: {  mideaScrollPicker },
    data() {
        return {
           
        }
    },
    methods: {
        changeValue(e){
            var value = e;
            this.$emit('wxChange', value, this.target);
            //e的格式为 {index:x，value:x}
        }
    },
    created() {
    }
};
</script>