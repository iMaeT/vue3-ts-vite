<template>
  <el-dropdown class="avatar-container" trigger="hover">
    <div id="user-container">
      <div class="avatar-wrapper">
        <img :src="getImgSrc('avatar')" class="user-avatar">
        <span class="name-item">管理员</span>
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item key="1">
          <span style="display: block;" @click="toHome">首页</span>
        </el-dropdown-item>
        <el-dropdown-item key="2">
          <span style="display: block;" @click="loginOut">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { resetRouter } from '@/router'
import { useRouter } from 'vue-router'
import { tagsViewStore } from '@/store/modules/tagsView'
export default defineComponent({
  name: 'UserInfo',
  setup() {
    const { replace, push } = useRouter()
    async function loginOut(): Promise<void> {
      await resetRouter() // 重置静态路由表
      await tagsViewStore.delAllViews() // 删除所有的tags标签页
      replace('/login')
    }
    function toHome() {
      push('/')
    }

    // 图片导入
    const getImgSrc = (name: string) => {
      const path = `/src/assets/img/${name}.png`
      const modules = import.meta.globEager('/src/assets/img/*.png')
      return modules[path].default
    }
    return {
      loginOut,
      toHome,
      getImgSrc
    }
  }
})
</script>

<style lang="less" scoped>
.avatar-container {
  margin-right: 30px;
  padding: 0 10px;
  .avatar-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 10px;
    }
    .name-item {
      font-size: 14px;
      font-weight: 600;
      display: inline-block;
      margin-left: 5px;
    }
  }
}
</style>
