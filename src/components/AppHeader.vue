<script setup>
import { useRoute, useRouter } from 'vue-router'
import { NButton, NIcon, NCard } from 'naive-ui'
import HeaderBackIcon from './icons/HeaderBackIcon.vue'
import HeaderAddIcon from './icons/HeaderAddIcon.vue'

const route = useRoute()
const router = useRouter()

const onBackClick = () => {
  router.back()
}

const onAddClick = () => {
  router.push({ name: 'add-bill' })
}
</script>

<template>
  <n-card
    class="app-header"
    embedded
  >
    <n-button
      v-if="route.name !== 'bill-list'"
      class="action-button back-button"
      text
      title="返回"
      @click="onBackClick"
    >
      <n-icon size="20">
        <HeaderBackIcon />
      </n-icon>
    </n-button>
    <span class="title">{{ route.meta.title }}</span>
    <n-button
      v-if="route.name !== 'add-bill'"
      class="action-button add-button"
      text
      title="记一笔"
      @click="onAddClick"
    >
      <n-icon size="20">
        <HeaderAddIcon />
      </n-icon>
    </n-button>
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

.title {
  font-size: 20px;
  line-height: 48px;
}

.action-button {
  position: absolute;
  width: 48px;
  height: 48px;
}

.back-button {
  left: 0;
}

.add-button {
  right: 0;
}
</style>
