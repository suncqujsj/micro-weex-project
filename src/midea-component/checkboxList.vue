<template>
  <div>
    <midea-checkbox v-for="(item,i) in list"
                  v-bind="item"
                  :hasTopBorder="(i===0&&needShowTopBorder)?true:false"
                  :hasBottomBorder="(i!=list.length-1||needShowLastBottomBorder)?true:false"
                  v-on:mideaCheckBoxItemChecked="mideaCheckBoxItemChecked"
                  :itemImg="item.itemImg"
                  :key="i"></midea-checkbox>
  </div>
</template>

<style scoped>

</style>

<script>
  import mideaCheckbox from './checkbox.vue';
  export default {
    components: { mideaCheckbox },
    props: {
      list: {
        type: Array,
        default: () => ([])
      },
      needShowTopBorder:{
        type: Boolean,
        default: false
      },
      needShowLastBottomBorder:{
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      checkedList: []
    }),
    created () {
      const { list } = this;
      if (list && list.length > 0) {
        list.forEach((item, i) => {
          item.checked && this.checkedList.push(item.value);
        });
      }
    },
    methods: {
      mideaCheckBoxItemChecked (e) {
        if (e.checked) {
          this.checkedList.push(e.value);
        } else {
          var index = this.checkedList.indexOf(e.value);
          this.checkedList.splice(index, 1);
        }
        this.$emit('mideaCheckBoxListChecked', { checkedList: this.checkedList })
      }
    }
  }
</script>
