<template>
    <div class="wrapper" ref="wrapper">
        
    </div>
</template>
<style scoped>
.wrapper {
  position: relative;
}
</style>
<script>
import nativeService from '../common/services/nativeService'

module.exports = {
    components: {
    },
    data: () => ({
    }),
    created () {
      nativeService.runGo("http://10.8.81.38:8080/dist/sample/index.js?ip=10.8.81.38")
    }
};
</script>