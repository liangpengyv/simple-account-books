<script setup>
import { ref } from 'vue';
import listService from '../service/list.service'
import useCategoryStore from '../stores/category';
import { billType } from '../typing/bill.typing'
import FilterHeader from '../components/FilterHeader.vue';
import { NTime, NSkeleton, NNumberAnimation } from 'naive-ui'
import { getMonthStart, getMonthEnd } from '../utils/date-time.util';

const categoryStore = useCategoryStore()

const billDateLoading = ref(false)
const currentList = ref(null)
const currentExpenditure = ref(0)
const currentIncome = ref(0)

const updateList = (currentMonthAnyTimestamp, categoryFilterList) => {
  const params = {
    startTime: getMonthStart(currentMonthAnyTimestamp).getTime(),
    endTime: getMonthEnd(currentMonthAnyTimestamp).getTime(),
    categoryFilterList
  }
  billDateLoading.value = true
  listService.getList(params).then(res => {
    billDateLoading.value = false
    currentList.value = res
    currentExpenditure.value = 0
    currentIncome.value = 0
    currentList.value.forEach(item => {
      if (item.type === 0) {
        currentExpenditure.value += item.amount
      } else {
        currentIncome.value += item.amount
      }
    })
  })
}
updateList(Date.now())
</script>

<template>
  <FilterHeader :disabled="billDateLoading" :timestamp="Date.now()" @date-change="updateList" />

  <br />

  支出：￥
  <n-number-animation ref="numberAnimationInstRef" :from="0.0" :to="currentExpenditure" :precision="2"
    :duration="300" />
  收入：￥
  <n-number-animation ref="numberAnimationInstRef" :from="0.0" :to="currentIncome" :precision="2" :duration="300" />

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