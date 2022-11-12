<script setup>
import { ref } from 'vue'
import MonthFilter from '../components/MonthFilter.vue'
import { NSkeleton, NEmpty, NNumberAnimation, NTabs, NTabPane, NProgress } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import listService from '../service/list.service'
import { getMonthStart, getMonthEnd } from '../utils/date-time.util'
import useCategoryStore from '../stores/category'
import { billType } from '../typing/bill.typing'

const route = useRoute()
const router = useRouter()

const categoryStore = useCategoryStore()

const billDateLoading = ref(false)
const currentCategoryStatisticsData = ref([])

const currentMonthAnyTimestamp = ref(parseInt(route.query.timestamp))

const updateStatisticsList = () => {
  const params = {
    startTime: getMonthStart(currentMonthAnyTimestamp.value).getTime(),
    endTime: getMonthEnd(currentMonthAnyTimestamp.value).getTime()
  }
  billDateLoading.value = true
  listService.getCategoryStatisticsData(params).then(res => {
    billDateLoading.value = false
    currentCategoryStatisticsData.value = res
  })
}
updateStatisticsList()

const onUpdateMonthFilter = () => {
  router.replace({ name: 'statistics', query: { timestamp: currentMonthAnyTimestamp.value } })
  updateStatisticsList()
}
</script>

<template>
  <MonthFilter
    v-model:value="currentMonthAnyTimestamp"
    :disabled="billDateLoading"
    @update:value="onUpdateMonthFilter"
  />

  <n-skeleton
    v-if="billDateLoading"
    text
    :repeat="5"
  />
  <n-tabs
    v-else
    type="line"
    animated
    display-directive="show"
  >
    <n-tab-pane
      v-for="(data, index) in currentCategoryStatisticsData"
      :key="index"
      :name="index"
      :tab="billType[index]"
    >
      ￥
      <n-number-animation
        :from="0.0"
        :to="data.total"
        :precision="2"
        :duration="300"
      />
      <ul v-if="data.group.length > 0">
        <li
          v-for="item in data.group"
          :key="item.categoryId"
        >
          {{ categoryStore.categoriesDict[item.categoryId].name }}
          ({{ item.size }}笔):
          【{{ item.total }}】
          [{{ item.percent.toFixed(2) }}%]
          <n-progress
            type="line"
            :percentage="item.percent"
            :show-indicator="false"
          />
        </li>
      </ul>
      <n-empty
        v-else
        description="本月暂时没有交易"
      />
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped>

</style>
