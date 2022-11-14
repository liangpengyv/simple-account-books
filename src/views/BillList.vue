<script setup>
import { ref } from 'vue'
import listService from '../service/list.service'
import useCategoryStore from '../stores/category'
import { billType } from '../typing/bill.typing'
import MonthFilter from '../components/MonthFilter.vue'
import CategoriesFilter from '../components/CategoriesFilter.vue'
import BillStatisticsIcon from '../components/icons/BillStatisticsIcon.vue'
import { NEl, NSkeleton, NNumberAnimation, NEmpty, NButton, NIcon, NCard, NSpace, NList, NListItem, NThing, NTag, NEllipsis } from 'naive-ui'
import { getMonthStart, getMonthEnd } from '../utils/date-time.util'
import { useRouter } from 'vue-router'

const router = useRouter()
const categoryStore = useCategoryStore()

const billDataLoading = ref(false)
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
  billDataLoading.value = true
  listService.getList(params).then(res => {
    billDataLoading.value = false
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
  router.push({ name: 'bill-statistics', query: { timestamp: currentMonthAnyTimestamp.value } })
}
</script>

<template>
  <div class="bill-list">
    <n-el class="action-bar">
      <MonthFilter
        v-model:value="currentMonthAnyTimestamp"
        :disabled="billDataLoading"
        @update:value="onUpdateMonthFilter"
      />
      <CategoriesFilter
        v-model:value="currentCategoryFilterList"
        :disabled="billDataLoading"
        @update:value="onUpdateCategoriesFilter"
      />
    </n-el>

    <div class="list-wrapper">
      <n-card
        class="list-container"
        embedded
        size="small"
        segmented
      >
        <template #header>
          <div class="list-header">
            <div class="row row-month">
              <span class="month-text">
                <span class="month-number">{{ new Date(currentMonthAnyTimestamp).getMonth() + 1 }}</span>
                <span>月</span>
              </span>
              <n-button
                secondary
                type="primary"
                round
                size="large"
                @click="onStatisticsClick"
              >
                <template #icon>
                  <n-icon>
                    <BillStatisticsIcon />
                  </n-icon>
                </template>
                统计
              </n-button>
            </div>
            <div class="row row-total">
              <span class="total-text">
                <span>支出</span>
                <span class="total-number">
                  <span>￥</span>
                  <n-number-animation
                    :from="0.0"
                    :to="currentExpenditureTotal"
                    :precision="2"
                    show-separator
                    :duration="300"
                  />
                </span>
              </span>
              <span class="total-text">
                <span>收入</span>
                <span class="total-number">
                  <span>￥</span>
                  <n-number-animation
                    :from="0.0"
                    :to="currentIncomeTotal"
                    :precision="2"
                    show-separator
                    :duration="300"
                  />
                </span>
              </span>
            </div>
          </div>
        </template>
        <template #default>
          <div class="list-content">
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
            <n-list v-else-if="currentList && currentList.length > 0">
              <n-list-item
                v-for="(item, index) in currentList"
                :key="index"
              >
                <template #suffix>
                  <n-el>
                    <n-tag
                      round
                      :color="{
                        borderColor: item.type ? 'var(--error-color)' : 'var(--success-color)',
                        textColor: item.type ? 'var(--error-color)' : 'var(--success-color)'
                      }"
                    >
                      {{ billType[item.type] }}
                    </n-tag>
                    <n-tag
                      :bordered="false"
                      :color="{ color: 'transparent' }"
                    >
                      <n-ellipsis style="max-width: 140px">
                        <span>￥</span>
                        <n-number-animation
                          :active="false"
                          :from="item.amount"
                          :precision="2"
                          show-separator
                        />
                      </n-ellipsis>
                    </n-tag>
                  </n-el>
                </template>
                <n-thing
                  :title="categoryStore.categoriesDict[item.category].name"
                  :description="new Date(parseInt(item.time)).getDate() + '日'"
                />
              </n-list-item>
            </n-list>
            <n-empty
              v-else
              class="empty-data"
              description="无交易"
            >
              <template #extra>
                <n-button
                  size="small"
                  @click="jumpCurrentMonth"
                >
                  看看本月全部账单
                </n-button>
              </template>
            </n-empty>
          </div>
        </template>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
.bill-list {
  --action-bar-height: 42px;
}

.action-bar {
  background-color: var(--card-color);
  width: 100%;
  height: var(--action-bar-height);
  display: flex;
  justify-content: space-between;
  padding: 4px 12px;
}

.list-wrapper {
  height: calc(100vh - var(--app-header-height) - var(--action-bar-height));
  overflow: auto;
  padding: 32px 16px 24px;
}

.list-container {
  border-radius: 6px;
}

.list-container :deep(.n-card-header) {
  border-radius: 6px 6px 0 0;
  background-color: var(--n-border-color);
}

.list-header .row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.list-header .row-month {
  margin-top: -40px;
  margin-bottom: 16px;
}

.list-header .month-text {
  font-size: 32px;
  line-height: 1.2;
}

.list-header .month-number {
  font-size: 72px;
}

.list-header .row-total {
  align-items: flex-start;
}

.list-header .total-text {
  font-size: 14px;
}

.list-header .total-text:nth-child(2) {
  margin-left: 32px;
}

.list-header .total-number {
  font-size: 20px;
  display: block;
}

.list-content .n-list {
  background-color: transparent;
}

.list-content :deep(.n-list-item__suffix) {
  flex: none;
}

.list-content :deep(.n-list-item__suffix .n-element) {
  display: flex;
}

.list-content :deep(.n-list-item__suffix .n-tag:first-child) {
  font-size: 12px;
  transform: scale(.8);
}

.list-content :deep(.n-list-item__suffix .n-tag:last-child) {
  font-size: 20px;
}

.list-content .empty-data {
  padding: 100px 0;
}
</style>
