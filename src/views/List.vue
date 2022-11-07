<script setup>
import { ref } from 'vue';
import listService from '../service/list.service'
import useCategoryStore from '../stores/category';
import { billType } from '../typing/bill.typing'
import FilterHeader from '../components/FilterHeader.vue';
import { NTime } from 'naive-ui'
import { getMonthStart, getMonthEnd } from '../utils/date-time.util';

const categoryStore = useCategoryStore()
const currentList = ref(null)

function initList(currentMonthAnyTimestamp) {
  const params = {
    startTime: getMonthStart(currentMonthAnyTimestamp).getTime(),
    endTime: getMonthEnd(currentMonthAnyTimestamp).getTime(),
  }
  listService.getList(params).then(res => {
    currentList.value = res
  })
}

if (categoryStore.categories) {
  initList(Date.now())
} else {
  categoryStore.init().then(() => {
    initList(Date.now())
  })
}

function onDateChange(timestamp) {
  initList(timestamp)
}
</script>

<template>
  <FilterHeader :timestamp="Date.now()" @date-change="onDateChange" />
  <ul>
    <li v-for="(item, index) in currentList" :key="index">
      {{ billType[item.type] }}
      <n-time :time="parseInt(item.time)" format="MM.dd" />
      {{ categoryStore.categoriesDict[item.category].name }}
      {{ item.amount.toFixed(2) }}
    </li>
  </ul>
</template>

<style scoped>

</style>