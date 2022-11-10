<script setup>
import { ref, watch } from 'vue'
import { NDatePicker, NButton, NCheckboxGroup, NCheckbox } from 'naive-ui'
import { getPrevMonthCurrent, getNextMonthCurrent } from '../utils/date-time.util'
import useCategoryStore from '../stores/category'
import { computed } from '@vue/reactivity';

const props = defineProps({
  disabled: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
})
const emit = defineEmits([
  'dateChange',
])

const categoryStore = useCategoryStore()

const EARLIEST_DATE = new Date('2022.01')
const EARLIEST_DATE_MESSAGE = '更早的账单，忘了他吧'
const LATEST_DATE_MESSAGE = '下个月的账单，下个月再看'

const timestampValue = ref(props.timestamp)
watch(timestampValue, () => {
  emit('dateChange', timestampValue.value, resultFilterList.value)
})

const onPrevMonthClick = () => {
  const prevMonthCurrent = getPrevMonthCurrent(timestampValue.value).getTime()
  if (prevMonthCurrent < EARLIEST_DATE.getTime()) {
    $message.warning(EARLIEST_DATE_MESSAGE)
  } else {
    timestampValue.value = prevMonthCurrent
  }
}
const onNextMonthClick = () => {
  const nextMonthCurrent = getNextMonthCurrent(timestampValue.value).getTime()
  if (nextMonthCurrent > Date.now()) {
    $message.warning(LATEST_DATE_MESSAGE)
  } else {
    timestampValue.value = nextMonthCurrent
  }
}

const isAllExpenditure = ref(false)
const isAllIncome = ref(false)
const checkedExpenditureList = ref([])
const checkedIncomeList = ref([])
const resultFilterList = computed(() => {
  const computedExpenditureList = isAllExpenditure.value ? categoryStore.categoriesOfExpenditure.map(item => item.id) : checkedExpenditureList.value
  const computedIncomeList = isAllIncome.value ? categoryStore.categoriesOfIncome.map(item => item.id) : checkedIncomeList.value
  return [...computedExpenditureList, ...computedIncomeList]
})
const onResetFilterClick = () => {
  isAllExpenditure.value = false
  isAllIncome.value = false
  checkedExpenditureList.value = []
  checkedIncomeList.value = []
}
const onCompleteFilterClick = () => {
  emit('dateChange', timestampValue.value, resultFilterList.value)
}
</script>

<template>
  <n-date-picker v-model:value="timestampValue" :disabled="props.disabled" type="month"
    :is-date-disabled="current => (current > Date.now() || current < EARLIEST_DATE.getTime())" />

  <n-button type="primary" :disabled="props.disabled" @click="onPrevMonthClick">上个月</n-button>
  <n-button type="primary" :disabled="props.disabled" @click="onNextMonthClick">下个月</n-button>

  <br />

  <n-checkbox v-model:checked="isAllExpenditure" :disabled="props.disabled"
    @update:checked="checkedExpenditureList = []">
    全部支出
  </n-checkbox>
  <n-checkbox-group v-model:value="checkedExpenditureList" :disabled="props.disabled"
    @update:value="isAllExpenditure = false">
    <n-checkbox v-for="item in categoryStore.categoriesOfExpenditure" :key="item.id" :value="item.id">
      {{ item.name }}
    </n-checkbox>
  </n-checkbox-group>

  <br />

  <n-checkbox v-model:checked="isAllIncome" :disabled="props.disabled" @update:checked="checkedIncomeList = []">
    全部收入
  </n-checkbox>
  <n-checkbox-group v-model:value="checkedIncomeList" :disabled="props.disabled" @update:value="isAllIncome = false">
    <n-checkbox v-for="item in categoryStore.categoriesOfIncome" :key="item.id" :value="item.id">
      {{ item.name }}
    </n-checkbox>
  </n-checkbox-group>

  <br />

  <n-button :disabled="props.disabled" @click="onResetFilterClick">重置</n-button>
  <n-button :disabled="props.disabled" @click="onCompleteFilterClick">完成</n-button>
</template>

<style scoped>

</style>