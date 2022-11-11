<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <button v-if="route.name !== 'list'" @click="router.back">返回</button>
  <h1>{{ route.meta.title }}</h1>
</template>

<style scoped>

</style>