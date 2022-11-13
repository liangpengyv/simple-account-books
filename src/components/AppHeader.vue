<script setup>
import { useRoute, useRouter } from 'vue-router'
import { NButton, NIcon, NCard } from 'naive-ui'

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
    <n-button
      v-if="route.name !== 'add-bill'"
      class="action-button add-button"
      text
      @click="onAddClick"
    >
      <n-icon size="20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              d="M20.998 6.25A3.25 3.25 0 0 0 17.748 3H6.25A3.25 3.25 0 0 0 3 6.25v11.499a3.25 3.25 0 0 0 3.25 3.25h4.914l.356-1.424l.02-.076H6.25a1.75 1.75 0 0 1-1.75-1.75v-9.25h14.998v2.733c.48-.19.994-.264 1.5-.22V6.25zM6.25 4.5h11.499c.966 0 1.75.783 1.75 1.75V7h-15v-.75c0-.967.784-1.75 1.75-1.75zm12.848 8.169l-5.901 5.901a2.685 2.685 0 0 0-.707 1.248l-.457 1.83c-.2.797.522 1.518 1.318 1.319l1.83-.458a2.685 2.685 0 0 0 1.248-.706L22.33 15.9a2.286 2.286 0 0 0-3.233-3.232z"
              fill="currentColor"
            />
          </g>
        </svg>
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
