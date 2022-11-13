<script setup>
import { ref, computed, watch } from 'vue'
import { NDrawer, NDrawerContent, NButton, NCheckboxGroup, NCheckbox, NIcon, NEl } from 'naive-ui'
import useCategoryStore from '../stores/category'

const props = defineProps({
  value: {
    type: Array,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits([
  'update:value'
])

const categoryStore = useCategoryStore()
const categoriesIdOfExpenditure = computed(() => categoryStore.categoriesOfExpenditure.map(item => item.id))
const categoriesIdOfIncome = computed(() => categoryStore.categoriesOfIncome.map(item => item.id))

let checkedExpenditureListCopy = []
let checkedIncomeListCopy = []
const checkedExpenditureList = ref([])
const checkedIncomeList = ref([])

const revertList = () => {
  checkedExpenditureList.value = checkedExpenditureListCopy
  checkedIncomeList.value = checkedIncomeListCopy
}

watch(() => props.value, () => {
  checkedExpenditureListCopy = props.value.filter(item => categoriesIdOfExpenditure.value.includes(item))
  checkedIncomeListCopy = props.value.filter(item => categoriesIdOfIncome.value.includes(item))
  revertList()
})

const active = ref(false)
const onDrawerAfterLeave = () => {
  revertList()
}

const onResetClick = () => {
  checkedExpenditureList.value = []
  checkedIncomeList.value = []
}
const onCompleteClick = () => {
  emit('update:value', [...checkedExpenditureList.value, ...checkedIncomeList.value])
  active.value = false
}
</script>

<template>
  <n-button
    class="open-button"
    text
    icon-placement="right"
    :disabled="props.disabled"
    :type="props.value.length > 0 ? 'primary' : ''"
    @click="active = true"
  >
    <template #icon>
      <n-icon :size="16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 320 512"
        >
          <path
            d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4l96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
            fill="currentColor"
          />
        </svg>
      </n-icon>
    </template>
    筛选<span v-show="props.value.length > 0">...</span>
  </n-button>

  <n-drawer
    v-model:show="active"
    class="categories-filter"
    display-directive="show"
    :auto-focus="false"
    placement="bottom"
    default-height="80%"
    @after-leave="onDrawerAfterLeave"
  >
    <n-drawer-content title="选择分类条件">
      <template #footer>
        <n-button
          :disabled="props.disabled"
          text
          @click="onResetClick"
        >
          重置
        </n-button>
        <n-button
          class="complete-button"
          round
          :disabled="props.disabled"
          @click="onCompleteClick"
        >
          完成
        </n-button>
      </template>
      <n-el>
        <h4 class="type-title">
          支出
        </h4>

        <n-checkbox
          :checked="checkedExpenditureList.length === categoryStore.categoriesOfExpenditure.length"
          :indeterminate="checkedExpenditureList.length > 0 && checkedExpenditureList.length < categoryStore.categoriesOfExpenditure.length"
          :disabled="props.disabled"
          @update:checked="value => checkedExpenditureList = value ? categoriesIdOfExpenditure : []"
        >
          全部支出
        </n-checkbox>

        <n-checkbox-group
          v-model:value="checkedExpenditureList"
          :disabled="props.disabled"
        >
          <n-checkbox
            v-for="item in categoryStore.categoriesOfExpenditure"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </n-checkbox>
          <n-checkbox
            v-for="item in ((3 - (categoryStore.categoriesOfExpenditure.length % 3)) % 3)"
            :key="item"
            class="checkbox-placeholder"
          />
        </n-checkbox-group>

        <h4 class="type-title">
          收入
        </h4>

        <n-checkbox
          :checked="checkedIncomeList.length === categoryStore.categoriesOfIncome.length"
          :indeterminate="checkedIncomeList.length > 0 && checkedIncomeList.length < categoryStore.categoriesOfIncome.length"
          :disabled="props.disabled"
          @update:checked="value => checkedIncomeList = value ? categoriesIdOfIncome : []"
        >
          全部收入
        </n-checkbox>

        <n-checkbox-group
          v-model:value="checkedIncomeList"
          :disabled="props.disabled"
        >
          <n-checkbox
            v-for="item in categoryStore.categoriesOfIncome"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </n-checkbox>
          <n-checkbox
            v-for="item in ((3 - (categoryStore.categoriesOfIncome.length % 3)) % 3)"
            :key="item"
            class="checkbox-placeholder"
          />
        </n-checkbox-group>
      </n-el>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.open-button {
  vertical-align: middle;
  padding: 2px 4px;
}

.open-button:focus,
.open-button:hover {
  color: var(--n-text-color);
}
</style>

<style>
.categories-filter .n-drawer-header__main {
  margin: 0 auto;
}

.categories-filter .type-title {
  color: var(--text-color-3);
}

.categories-filter .type-title:nth-of-type(2) {
  margin-top: 32px;
}

.categories-filter .n-checkbox {
  width: 30%;
  font-size: 15px;
  padding: 4px;
  margin-top: 12px;
  background-color: var(--button-color-2);
  border: 1px solid var(--button-color-2);
  border-radius: 4px;
  justify-content: center;
}

.categories-filter .n-checkbox-box-wrapper {
  display: none;
}

.categories-filter .n-checkbox--checked {
  border-color: var(--border-color);
}

.categories-filter .n-checkbox--checked .n-checkbox__label {
  color: var(--primary-color);
}

.categories-filter .checkbox-placeholder {
  visibility: hidden;
}

.categories-filter .n-checkbox-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.categories-filter .n-drawer-content .n-drawer-footer {
  justify-content: space-between;
}

.categories-filter .complete-button {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
