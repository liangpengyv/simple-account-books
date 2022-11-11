<script setup>
import { ref } from 'vue';
import listService from '../service/list.service'
import useCategoryStore from '../stores/category';
import { billType } from '../typing/bill.typing'
import MonthFilter from '../components/MonthFilter.vue';
import CategoriesFilter from '../components/CategoriesFilter.vue';
import { NTime, NSkeleton, NNumberAnimation, NEmpty, NButton, statisticProps } from 'naive-ui'
import { getMonthStart, getMonthEnd } from '../utils/date-time.util';
import { useRouter } from 'vue-router';

const router = useRouter()
const categoryStore = useCategoryStore()

const billDateLoading = ref(false)
const currentList = ref(null)

const currentExpenditureTotal = ref(0)
const currentIncomeTotal = ref(0)

const currentMonthAnyTimestamp = ref(Date.now())
const currentCategoryFilterList = ref([])

const updateCurrentTotal = () => {
  currentExpenditureTotal.value = 0
  currentIncomeTotal.value = 0
  currentList.value.forEach(item => {
    if (item.type === 0) {
      currentExpenditureTotal.value += item.amount
    } else {
      currentIncomeTotal.value += item.amount
    }
  })
}
const updateList = () => {
  const params = {
    startTime: getMonthStart(currentMonthAnyTimestamp.value).getTime(),
    endTime: getMonthEnd(currentMonthAnyTimestamp.value).getTime(),
    categoryFilterList: currentCategoryFilterList.value
  }
  billDateLoading.value = true
  listService.getList(params).then(res => {
    billDateLoading.value = false
    currentList.value = res
    updateCurrentTotal()
  })
}
updateList()

const onUpdateMonthFilter = () => updateList()
const onUpdateCategoriesFilter = () => updateList()

const jumpCurrentMonth = () => {
  currentMonthAnyTimestamp.value = Date.now()
  currentCategoryFilterList.value = []
  updateList()
}

const onStatisticsClick = () => {
  router.push({ name: 'statistics', query: { timestamp: currentMonthAnyTimestamp.value } })
}
</script>

<template>
  <MonthFilter v-model:value="currentMonthAnyTimestamp" :disabled="billDateLoading"
    @update:value="onUpdateMonthFilter" />
  <CategoriesFilter v-model:value="currentCategoryFilterList" :disabled="billDateLoading"
    @update:value="onUpdateCategoriesFilter" />

  <br />

  <n-button @click="onStatisticsClick">分析</n-button>

  <br />

  支出：￥
  <n-number-animation :from="0.0" :to="currentExpenditureTotal" :precision="2" :duration="300" />
  收入：￥
  <n-number-animation :from="0.0" :to="currentIncomeTotal" :precision="2" :duration="300" />

  <n-skeleton v-if="billDateLoading" text :repeat="5" />
  <ul v-else-if="currentList && currentList.length > 0">
    <li v-for="(item, index) in currentList" :key="index">
      {{ billType[item.type] }}
      <n-time :time="parseInt(item.time)" format="MM.dd" />
      {{ categoryStore.categoriesDict[item.category].name }}
      {{ item.amount.toFixed(2) }}
    </li>
  </ul>
  <n-empty v-else description="无交易">
    <template #extra>
      <n-button size="small" @click="jumpCurrentMonth">看看本月全部账单</n-button>
    </template>
  </n-empty>
</template>

<style scoped>

</style>