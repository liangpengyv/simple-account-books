<script setup>
import App from './App.vue'
import { computed } from '@vue/reactivity';
import { NConfigProvider, zhCN, dateZhCN, useOsTheme, darkTheme } from 'naive-ui'
import { NGlobalStyle } from 'naive-ui';
import { NMessageProvider } from 'naive-ui';

const osThemeRef = useOsTheme()
const theme = computed(() => osThemeRef.value === 'dark' ? darkTheme : null)
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="theme">
    <n-global-style />
    <n-message-provider>
      <App />
    </n-message-provider>
  </n-config-provider>
</template>
