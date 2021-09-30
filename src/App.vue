<template>
  <div>
    <HelloWorld />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { key } from './store'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'Page',
  components: { HelloWorld },
  setup() {
    const store = useStore(key)
    console.log(store.state.count)
  }
})
</script>
