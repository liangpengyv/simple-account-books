<script setup>
import Header from './components/Header.vue'
</script>

<template>
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
      <li>
        <RouterLink to="/statistics">收支统计</RouterLink>
      </li>
    </ul>
    <RouterView></RouterView>
  </main>
</template>

<style scoped>

</style>
