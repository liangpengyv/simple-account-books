<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import { NSpin } from 'naive-ui'
import useCategoryStore from './stores/category'

// 必要的前提数据初始化
const dataAlready = ref(false)
const categoryStore = useCategoryStore()
categoryStore.init().then(() => (dataAlready.value = true))
</script>

<template>
  <n-spin
    v-if="!dataAlready"
    class="loading"
  />
  <template v-else>
    <header class="app-header">
      <AppHeader />
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </template>
</template>

<style scoped>
.loading {
  display: block;
  text-align: center;
  padding-top: 32px;
}

.app-header {
  position: fixed;
  top: 0;
  z-index: 1;
}

.app-main {
  padding-top: 48px;
}
</style>
