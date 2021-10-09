<template>
  <router-link class="app-logo" to="/" :class="{'app-logo--Top': layout !== 'Classic'}">
    <img :src="getImgSrc('logo')">
    <div v-if="show" class="sidebar-title">{{ title }}</div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType, computed } from 'vue'
import { appStore } from '@/store/modules/app'

export default defineComponent({
  name: 'Logo',
  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  setup(props) {
    const show = ref<boolean>(true)
    const title = computed(() => appStore.logoTitle)
    const layout = computed(() => appStore.layout)

    // 图片导入
    const getImgSrc = (name: string) => {
      const path = `/src/assets/img/${name}.png`
      const modules = import.meta.globEager('/src/assets/img/*.png')
      return modules[path].default
    }

    watch(
      () => props.collapsed,
      (collapsed: boolean) => {
        if (layout.value !== 'Classic') {
          show.value = true
        } else {
          if (!collapsed) {
            setTimeout(() => {
              show.value = !collapsed
            }, 400)
          } else {
            show.value = !collapsed
          }
        }
      }
    )
    return {
      show,
      title,
      layout,
      getImgSrc
    }
  }
})
</script>

<style lang="less" scoped>
.app-logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: @topSiderHeight;
  width: 100%;
  background-color: @menuBg;
  img {
    width: 37px;
    height: 37px;
    margin-left: 14px;
  }
  .sidebar-title {
    font-size: 14px;
    font-weight: 700;
    transition: .5s;
    margin-left: 12px;
  }
  .sidebar-title {
    color: @menuActiveText;
  }
}
.app-logo--Top {
  width: auto;
  background-color: @topMenuBg;
  transition: background 0.2s;
  padding: 0 5px;
  &:hover {
    background: #f6f6f6;
  }
  img {
    margin-left: 0;
  }
  .sidebar-title {
    color: @topMenuText;
  }
}
</style>
