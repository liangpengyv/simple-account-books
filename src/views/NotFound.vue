<script setup>
import { NResult, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.replace({ name: 'home' })
}
</script>

<template>
  <n-result
    class="not-found"
    status="404"
    title="来到了一片荒芜"
  >
    <template #footer>
      <n-button @click="goHome">
        返回首页
      </n-button>
    </template>
  </n-result>
</template>

<style scoped>
.not-found {
  padding: 48px 16px;
}
</style>
