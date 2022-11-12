<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import { NSpin, useMessage } from 'naive-ui'
import useCategoryStore from './stores/category'

// 全局挂载
window.$message = useMessage()

// 必要的前提数据初始化
const dataAlready = ref(false)
const categoryStore = useCategoryStore()
categoryStore.init().then(() => (dataAlready.value = true))
</script>

<template>
  <n-spin v-if="!dataAlready" />
  <template v-else>
    <header>
      <AppHeader />
    </header>
    <main>
      <RouterView />
    </main>
  </template>
</template>

<style scoped>

</style>
