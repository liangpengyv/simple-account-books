<script setup>
import { ref } from 'vue'
import { NDatePicker, NButton, NCheckboxGroup, NCheckbox } from 'naive-ui'
import { getPrevMonthCurrent, getNextMonthCurrent } from '../utils/date-time.util'
import useCategoryStore from '../stores/category'
import { computed } from '@vue/reactivity';

const props = defineProps({
  disabled: {
    type: Boolean,
    required: true
  },
})
const emit = defineEmits([
  'dateChange',
])

const categoryStore = useCategoryStore()

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