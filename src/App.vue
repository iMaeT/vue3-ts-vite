<template>
  <router-view />
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
  }
})
</script>
<style lang="less">
.size {
  min-width: @minWidth;
  width: 100;
  height: 100%;
}
html,body {
  .size;
  margin: 0;
  padding: 0;
}
#app {
  .size;
  background: @appBg;
}
</style>
