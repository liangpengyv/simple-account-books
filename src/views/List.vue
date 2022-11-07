<script setup>
import { ref } from 'vue';
import listService from '../service/list.service'
import useCategoryStore from '../stores/category';
import { billType } from '../typing/bill.typing'
import FilterHeader from '../components/FilterHeader.vue';
import { NTime, NSkeleton } from 'naive-ui'
import { getMonthStart, getMonthEnd } from '../utils/date-time.util';

const categoryStore = useCategoryStore()

const billDateLoading = ref(false)
const currentList = ref(null)

const updateList = (currentMonthAnyTimestamp) => {
  const params = {
    startTime: getMonthStart(currentMonthAnyTimestamp).getTime(),
    endTime: getMonthEnd(currentMonthAnyTimestamp).getTime(),
  }
  billDateLoading.value = true
  listService.getList(params).then(res => {
    billDateLoading.value = false
    currentList.value = res
  })
}

if (categoryStore.categories) {
  updateList(Date.now())
} else {
  billDateLoading.value = true
  categoryStore.init().then(() => {
    updateList(Date.now())
  })
}
</script>

<template>
  <FilterHeader :disabled="billDateLoading" :timestamp="Date.now()" @date-change="updateList" />
  <n-skeleton v-if="billDateLoading" text :repeat="5" />
  <ul v-else>
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