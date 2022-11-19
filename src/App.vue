<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import { NSpin, useMessage, useLoadingBar } from 'naive-ui'
import useCategoryStore from './stores/category'
import RouterTransition from './components/common/RouterTransition.vue'

// 全局挂载公共工具组件
window.$message = useMessage()
window.$loadingBar = useLoadingBar()

// 必要的前提数据初始化
const dataAlready = ref(false)
const categoryStore = useCategoryStore()
categoryStore.init().then(() => (dataAlready.value = true))
</script>

<template>
  <div id="app-root">
    <n-spin
      v-if="!dataAlready"
      class="loading"
    />
    <template v-else>
      <header class="app-header">
        <AppHeader />
      </header>
      <main class="app-main">
        <RouterView v-slot="{ Component }">
          <RouterTransition>
            <component :is="Component" />
          </RouterTransition>
        </RouterView>
      </main>
    </template>
  </div>
</template>

<style scoped>
#app-root {
  --app-header-height: 48px;
  position: relative;
  overflow: hidden;
}

.loading {
  display: block;
  text-align: center;
  padding-top: 32px;
}

.app-header {
  height: var(--app-header-height);
}

.app-main {
  height: calc(100vh - var(--app-header-height));
  overflow: auto;
}
</style>
