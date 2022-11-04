<script setup>
import { ref } from 'vue';
import listService from '../service/list.service'

let currentList = ref([])

listService.getList({}).then(res => {
  currentList.value = res
})
</script>

<template>
  <ul>
    <li v-for="(item, index) in currentList" :key="index">{{ item.amount }}</li>
  </ul>
</template>

<style scoped>

</style>