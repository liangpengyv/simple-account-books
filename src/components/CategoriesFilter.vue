<script setup>
import { ref } from 'vue'
import { NDrawer, NDrawerContent, NButton, NCheckboxGroup, NCheckbox } from 'naive-ui'
import useCategoryStore from '../stores/category'
import { computed } from '@vue/reactivity';

const props = defineProps({
  disabled: {
    type: Boolean,
    required: true
  },
})
const emit = defineEmits([
  'change'
])

const categoryStore = useCategoryStore()

let isAllExpenditureCopy = false
let isAllIncomeCopy = false
let checkedExpenditureListCopy = []
let checkedIncomeListCopy = []

const isAllExpenditure = ref(false)
const isAllIncome = ref(false)
const checkedExpenditureList = ref([])
const checkedIncomeList = ref([])

const resetFilterByInit = () => {
  isAllExpenditure.value = false
  isAllIncome.value = false
  checkedExpenditureList.value = []
  checkedIncomeList.value = []
}
const updateCopyByFilter = () => {
  isAllExpenditureCopy = isAllExpenditure.value
  isAllIncomeCopy = isAllIncome.value
  checkedExpenditureListCopy = checkedExpenditureList.value
  checkedIncomeListCopy = checkedIncomeList.value
}
const revertFilterByCopy = () => {
  isAllExpenditure.value = isAllExpenditureCopy
  isAllIncome.value = isAllIncomeCopy
  checkedExpenditureList.value = checkedExpenditureListCopy
  checkedIncomeList.value = checkedIncomeListCopy
}

const resultFilterList = computed(() => {
  const computedExpenditureList = isAllExpenditure.value ? categoryStore.categoriesOfExpenditure.map(item => item.id) : checkedExpenditureList.value
  const computedIncomeList = isAllIncome.value ? categoryStore.categoriesOfIncome.map(item => item.id) : checkedIncomeList.value
  return [...computedExpenditureList, ...computedIncomeList]
})

const active = ref(false)
const hasFilter = ref(false)
const onDrawerAfterLeave = () => {
  revertFilterByCopy()
}

const onCompleteFilterClick = () => {
  updateCopyByFilter()
  hasFilter.value = resultFilterList.value.length > 0
  active.value = false
  emit('change', resultFilterList.value)
}
</script>

<template>
  <n-button :disabled="props.disabled" :type="hasFilter ? 'primary' : ''" @click="active = true">
    展开
  </n-button>
  <n-drawer v-model:show="active" display-directive="show" :auto-focus="false" placement="bottom"
    @after-leave="onDrawerAfterLeave">
    <n-drawer-content title="选择分类条件">
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
      <n-checkbox-group v-model:value="checkedIncomeList" :disabled="props.disabled"
        @update:value="isAllIncome = false">
        <n-checkbox v-for="item in categoryStore.categoriesOfIncome" :key="item.id" :value="item.id">
          {{ item.name }}
        </n-checkbox>
      </n-checkbox-group>

      <br />

      <n-button :disabled="props.disabled" @click="resetFilterByInit">重置</n-button>
      <n-button type="primary" :disabled="props.disabled" @click="onCompleteFilterClick">完成</n-button>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>