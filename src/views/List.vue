<script setup>
import { ref } from 'vue';
import listService from '../service/list.service'
import useCategoryStore from '../stores/category';
import { billType } from '../typing/bill.typing'
import { getYearByTimeStamp, getMonthByTimeStamp } from '../utils/date-time.util'

const categoryStore = useCategoryStore()
const currentList = ref(null)

function initList() {
  const params = {
    startTime: '',
    endTime: '',
  }
  listService.getList(params).then(res => {
    currentList.value = res
  })
}

if (categoryStore.categories) {
  initList()
} else {
  categoryStore.init().then(() => {
    initList()
  })
}
</script>

<template>
  <ul>
    <li v-for="(item, index) in currentList" :key="index">
      {{ billType[item.type] }}
      {{ getYearByTimeStamp(item.time) + '.' + getMonthByTimeStamp(item.time) }}
      {{ categoryStore.categoriesDict[item.category].name }}
      {{ item.amount.toFixed(2) }}
    </li>
  </ul>
</template>

<style scoped>

</style>