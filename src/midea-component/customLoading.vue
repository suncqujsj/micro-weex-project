<template>
  <div class="loading-wrapper">
    <div class="loading-item"></div>
  </div>
</template>

<script>
export default {
  props: {
    loadingColor: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {};
  },
  methods: {}
}
</script>

<style scoped>
  .loading-wrapper {
    width: 750px;
  }
  .loading-item {
    width: 10px;
    height: 10px;
    border-radius: 50px;
  }
</style>
