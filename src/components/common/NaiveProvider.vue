<script setup>
import App from '../../App.vue'
import { computed } from 'vue'
import { NConfigProvider, zhCN, dateZhCN, useOsTheme, darkTheme, NGlobalStyle, NMessageProvider, NLoadingBarProvider } from 'naive-ui'

const osThemeRef = useOsTheme()
const theme = computed(() => osThemeRef.value === 'dark' ? darkTheme : null)
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="theme"
  >
    <n-global-style />
    <n-message-provider>
      <n-loading-bar-provider>
        <App />
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>
