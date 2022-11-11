<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue'
import { NSpin } from 'naive-ui';
import { useMessage } from 'naive-ui';
import useCategoryStore from './stores/category'

// 全局挂载
window.$message = useMessage()

// 必要的前提数据初始化
const dataAlready = ref(false)
const categoryStore = useCategoryStore()
categoryStore.init().then(() => dataAlready.value = true)
</script>

<template>
  <n-spin v-if="!dataAlready"></n-spin>
  <template v-else>
    <header>
      <Header />
    </header>
    <main>
      <ul>
        <li>
          <RouterLink to="/list">收支</RouterLink>
        </li>
        <li>
          <RouterLink to="/add">记一笔</RouterLink>
        </li>
      </ul>
      <RouterView />
    </main>
  </template>
</template>

<style scoped>

</style>
