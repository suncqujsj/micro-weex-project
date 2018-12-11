<template>
  <div>
    <midea-radio v-for="(item,i) in updateList"
               v-bind="item"
               :hasTopBorder="(i===0&&needShowTopBorder)?true:false"
               :hasBottomBorder="(i!=updateList.length-1||needShowLastBottomBorder)?true:false"
               v-on:mideaRadioItemChecked="mideaRadioItemChecked(i,$event)"
               :key="i"></midea-radio>
  </div>
</template>

<style scoped>

</style>

<script>
  import mideaRadio from './radio.vue';
  export default {
    components: { mideaRadio },
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
      checkedIndex: -1
    }),
    computed: {
      updateList () {
        const { checkedIndex, list } = this;
        const updateList = [];
        list && list.forEach((item, i) => {
          item.checked = i === checkedIndex;
          updateList.push(item);
        });
        return updateList;
      }
    },
    created () {
      const { list } = this;
      if (list && list.length > 0) {
        list.forEach((item, i) => {
          item.checked && (this.checkedIndex = i);
        });
      }
    },
    methods: {
      mideaRadioItemChecked (i, e) {
        const oldIndex = this.checkedIndex;
        const { value, title } = this.list[i];
        this.checkedIndex = i;
        this.$emit('mideaRadioItemChecked', { value, title, oldIndex, index: i })
      }
    }
  }
</script>
