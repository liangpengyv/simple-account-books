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
.n-spin-body {
  display: block;
  text-align: center;
  padding-top: 32px;
}
</style>
