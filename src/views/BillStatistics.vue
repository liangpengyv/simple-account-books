<script setup>
import { ref } from 'vue'
import MonthFilter from '../components/MonthFilter.vue'
import { NSkeleton, NEmpty, NNumberAnimation, NRadioGroup, NRadioButton, NProgress, NList, NListItem, NThing, NCard, NSpace, NEllipsis } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import listService from '../service/list.service'
import { getMonthStart, getMonthEnd } from '../utils/date-time.util'
import useCategoryStore from '../stores/category'
import { billType } from '../typing/bill.typing'

const route = useRoute()
const router = useRouter()

const categoryStore = useCategoryStore()

const billDataLoading = ref(false)
const currentCategoryStatisticsData = ref([])

const currentMonthAnyTimestamp = ref(parseInt(route.query.timestamp))
const currentShowType = ref(0)

const updateStatisticsList = () => {
  const params = {
    startTime: getMonthStart(currentMonthAnyTimestamp.value).getTime(),
    endTime: getMonthEnd(currentMonthAnyTimestamp.value).getTime()
  }
  billDataLoading.value = true
  listService.getCategoryStatisticsData(params).then(res => {
    billDataLoading.value = false
    currentCategoryStatisticsData.value = res
  })
}
updateStatisticsList()

const onUpdateMonthFilter = () => {
  router.replace({ name: 'bill-statistics', query: { timestamp: currentMonthAnyTimestamp.value } })
  updateStatisticsList()
}
</script>

<template>
  <div class="bill-statistics">
    <div class="action-bar">
      <MonthFilter
        v-model:value="currentMonthAnyTimestamp"
        :disabled="billDataLoading"
        @update:value="onUpdateMonthFilter"
      />
    </div>

    <div class="content-wrapper">
      <div class="content-header">
        <span class="header-total">
          <span>￥</span>
          <n-number-animation
            :from="0.0"
            :to="currentCategoryStatisticsData[currentShowType]?.total"
            :precision="2"
            show-separator
            :duration="300"
          />
        </span>
        <n-radio-group
          v-model:value="currentShowType"
          class="header-type-radio"
        >
          <n-radio-button
            v-for="(value, key) in billType"
            :key="key"
            :value="parseInt(key)"
            :label="value"
          />
        </n-radio-group>
      </div>

      <n-card
        class="content-list"
        size="small"
        embedded
      >
        <n-space
          v-if="billDataLoading"
          vertical
        >
          <n-skeleton
            v-for="item in 7"
            :key="item"
            height="32px"
            :sharp="false"
          />
          <n-skeleton
            height="30px"
            width="60%"
            :sharp="false"
          />
        </n-space>
        <n-list v-else-if="currentCategoryStatisticsData[currentShowType].group.length > 0">
          <n-list-item
            v-for="item in currentCategoryStatisticsData[currentShowType].group"
            :key="item.categoryId"
          >
            <template #suffix>
              <n-ellipsis style="max-width: 120px">
                <span>￥</span>
                <n-number-animation
                  :active="false"
                  :from="item.total"
                  :precision="2"
                  show-separator
                />
              </n-ellipsis>
            </template>
            <n-thing
              :title="categoryStore.categoriesDict[item.categoryId].name"
              :title-extra="'(' + item.percent.toFixed(2) + '%, ' + item.size + '笔)'"
            >
              <n-progress
                type="line"
                :percentage="item.percent"
                :show-indicator="false"
              />
            </n-thing>
          </n-list-item>
        </n-list>
        <n-empty
          v-else
          class="empty-data"
          description="本月暂时没有交易"
        />
      </n-card>
    </div>
  </div>
</template>

<style scoped>
.bill-statistics {
  --action-bar-height: 42px;
}

.action-bar {
  background-color: var(--card-color);
  width: 100%;
  height: var(--action-bar-height);
  padding: 4px 12px;
}

.content-wrapper {
  height: calc(100vh - var(--app-header-height) - var(--action-bar-height));
  overflow: auto;
  padding: 0 16px 24px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-total {
  font-size: 24px;
}

.header-type-radio :deep(.n-radio-button) {
  border-radius: 16px;
  border: 1px solid var(--n-button-border-color);
}

.header-type-radio :deep(.n-radio-button:nth-of-type(n + 2)) {
  margin-left: 16px;
}

.header-type-radio :deep(.n-radio-button__state-border) {
  display: none;
}

.header-type-radio :deep(.n-radio-group__splitor) {
  display: none;
}

.content-list {
  border-radius: 6px;
  margin-top: 24px;
}

.content-list .n-list {
  background-color: transparent;
}

.content-list :deep(.n-list-item__suffix) {
  flex: none;
  font-size: 16px;
  width: 120px;
  text-align: right;
}

.content-list :deep(.n-thing-header) {
  justify-content: flex-start;
}

.content-list :deep(.n-thing-header__extra) {
  margin-left: 8px;
  font-size: 12px;
}

.content-list .empty-data {
  padding: 120px 0;
}
</style>
