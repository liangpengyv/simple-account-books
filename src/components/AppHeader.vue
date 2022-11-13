<script setup>
import { useRoute, useRouter } from 'vue-router'
import { NButton, NIcon, NCard } from 'naive-ui'

const route = useRoute()
const router = useRouter()

const onBackClick = () => {
  router.back()
}
</script>

<template>
  <n-card
    class="app-header"
    embedded
  >
    <n-button
      v-if="route.name !== 'bill-list'"
      class="back-button"
      text
      @click="onBackClick"
    >
      <n-icon size="20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <path
            d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"
            fill="currentColor"
          />
        </svg>
      </n-icon>
    </n-button>
    <span class="title">{{ route.meta.title }}</span>
  </n-card>
</template>

<style scoped>
.app-header {
  width: 100%;
  height: 48px;
  text-align: center;
  position: relative;
  border-top: none;
  border-left: none;
  border-right: none;
}

.app-header :deep(.n-card__content) {
  padding: 0;
}

.back-button {
  position: absolute;
  left: 0;
  width: 48px;
  height: 48px;
}

.title {
  font-size: 20px;
  line-height: 48px;
}
</style>
