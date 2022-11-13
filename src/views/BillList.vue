<script setup>
import { ref } from 'vue'
import listService from '../service/list.service'
import useCategoryStore from '../stores/category'
import { billType } from '../typing/bill.typing'
import MonthFilter from '../components/MonthFilter.vue'
import CategoriesFilter from '../components/CategoriesFilter.vue'
import { NEl, NSkeleton, NNumberAnimation, NEmpty, NButton, NIcon, NCard, NSpace, NList, NListItem, NThing, NTag, NEllipsis } from 'naive-ui'
import { getMonthStart, getMonthEnd } from '../utils/date-time.util'
import { useRouter } from 'vue-router'

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
  router.push({ name: 'bill-statistics', query: { timestamp: currentMonthAnyTimestamp.value } })
}
</script>

<template>
  <n-el class="action-bar">
    <MonthFilter
      v-model:value="currentMonthAnyTimestamp"
      :disabled="billDateLoading"
      @update:value="onUpdateMonthFilter"
    />
    <CategoriesFilter
      v-model:value="currentCategoryFilterList"
      :disabled="billDateLoading"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      d="M911.5 700.7a8 8 0 0 0-10.3-4.8L840 718.2V180c0-37.6-30.4-68-68-68H252c-37.6 0-68 30.4-68 68v538.2l-61.3-22.3c-.9-.3-1.8-.5-2.7-.5c-4.4 0-8 3.6-8 8V763c0 3.3 2.1 6.3 5.3 7.5L501 910.1c7.1 2.6 14.8 2.6 21.9 0l383.8-139.5c3.2-1.2 5.3-4.2 5.3-7.5v-59.6c0-1-.2-1.9-.5-2.8zM512 837.5l-256-93.1V184h512v560.4l-256 93.1zM660.6 312h-54.5c-3 0-5.8 1.7-7.1 4.4l-84.7 168.8H511l-84.7-168.8a8 8 0 0 0-7.1-4.4h-55.7c-1.3 0-2.6.3-3.8 1c-3.9 2.1-5.3 7-3.2 10.8l103.9 191.6h-57c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76v39h-76c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76V704c0 4.4 3.6 8 8 8h49.9c4.4 0 8-3.6 8-8v-63.5h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8h-76.3v-39h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8H564l103.7-191.6c.6-1.2 1-2.5 1-3.8c-.1-4.3-3.7-7.9-8.1-7.9z"
                      fill="currentColor"
                    />
                  </svg>
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
            v-if="billDateLoading"
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
                        :duration="300"
                      />
                      <!-- {{ '￥' + item.amount.toFixed(2) }} -->
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

  <n-button
    class="add-button"
    circle
    @click="router.push({ name: 'add-bill' })"
  >
    <template #icon>
      <n-icon size="32">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M256 112v288"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M400 256H112"
          />
        </svg>
      </n-icon>
    </template>
  </n-button>
</template>

<style scoped>
.action-bar {
  position: fixed;
  min-width: var(--app-min-width);
  max-width: var(--app-max-width);
  z-index: 1;
  background-color: var(--card-color);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4px 12px;
}

.list-wrapper {
  padding: 80px 16px 24px;
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

.add-button {
  width: 48px;
  height: 48px;
  box-shadow: 0px 0px 4px var(--n-text-color-disabled);
  position: fixed;
  bottom: 32px;
  right: 24px;
}
</style>
