<script setup>
import { ref, computed, watch } from 'vue'
import { NInputNumber, NRadioGroup, NRadioButton, NDatePicker, NButton, NCard } from 'naive-ui'
import { billType } from '../typing/bill.typing'
import useCategoryStore from '../stores/category'
import { getDateStart } from '../utils/date-time.util'
import listService from '../service/list.service'
import { useRouter } from 'vue-router'

const router = useRouter()
const categoryStore = useCategoryStore()

const categoryList = computed(() => {
  if (typeValue.value === 0) {
    return categoryStore.categoriesOfExpenditure
  } else {
    return categoryStore.categoriesOfIncome
  }
})

const typeValue = ref(0)
const timeValue = ref(getDateStart(Date.now()).getTime())
const categoryValue = ref(categoryList.value[0].id)
const amountValue = ref(null)

watch(typeValue, () => {
  categoryValue.value = categoryList.value[0].id
})

const confirmButtonLoading = ref(false)
const handleSubmit = (isAgain) => {
  if (!amountValue.value) {
    $message.warning('金额必须大于0.00元')
  } else {
    const params = {
      type: typeValue.value,
      time: timeValue.value.toString(),
      category: categoryValue.value,
      amount: amountValue.value
    }
    confirmButtonLoading.value = true
    listService.addItem(params).then(res => {
      confirmButtonLoading.value = false
      $message.success('添加成功')
      if (isAgain) {
        typeValue.value = 0
        timeValue.value = getDateStart(Date.now()).getTime()
        categoryValue.value = categoryList.value[0].id
        amountValue.value = null
      } else {
        router.push({ name: 'bill-list' })
      }
    })
  }
}
const onConfirmClick = () => {
  handleSubmit(false)
}
const onConfirmAndAgainClick = () => {
  handleSubmit(true)
}
</script>

<template>
  <div class="add-bill">
    <div class="main-wrapper">
      <n-card
        class="amount-input"
        title="交易金额"
        size="small"
        :bordered="false"
        embedded
      >
        <n-input-number
          v-model:value="amountValue"
          clearable
          :precision="2"
          :min="0"
          :max="99999999999"
          placeholder="0.00"
        >
          <template #prefix>
            ￥
          </template>
        </n-input-number>
      </n-card>

      <n-card
        size="small"
        :bordered="false"
        embedded
      >
        <n-radio-group v-model:value="typeValue">
          <n-radio-button
            v-for="(value, key) in billType"
            :key="key"
            :value="parseInt(key)"
            :label="value"
          />
        </n-radio-group>
      </n-card>

      <n-card
        class="category-radio-list"
        size="small"
        :bordered="false"
        embedded
      >
        <n-radio-group v-model:value="categoryValue">
          <n-radio-button
            v-for="item in categoryList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
          <n-radio-button
            v-for="item in ((3 - (categoryList.length % 3)) % 3)"
            :key="item"
            class="radio-placeholder"
          />
        </n-radio-group>
      </n-card>

      <n-date-picker
        v-model:value="timeValue"
        class="date-picker"
        type="date"
        input-readonly
        :is-date-disabled="timestamp => timestamp > Date.now()"
      />
    </div>

    <n-card
      class="action-bar"
      size="small"
      :bordered="false"
      embedded
    >
      <n-button
        text
        :loading="confirmButtonLoading"
        @click="onConfirmAndAgainClick"
      >
        再记一笔
      </n-button>
      <n-button
        class="confirm-button"
        type="primary"
        round
        :loading="confirmButtonLoading"
        @click="onConfirmClick"
      >
        确定添加
      </n-button>
    </n-card>
  </div>
</template>

<style scoped>
.add-bill {
  --action-bar-height: 58px;
}

.main-wrapper {
  height: calc(100vh - var(--app-header-height) - var(--action-bar-height));
  overflow: auto;
  padding-bottom: 24px;
}

.amount-input {
  margin-bottom: 16px;
}

.amount-input :deep(.n-input) {
  font-size: 36px;
  background-color: transparent;
}

.amount-input :deep(.n-input-wrapper) {
  padding-left: 0;
  padding-right: 0;
}

.amount-input :deep(.n-input__prefix) {
  font-size: 1.2em;
}

.amount-input :deep(.n-input__suffix),
.amount-input :deep(.n-input__border),
.amount-input :deep(.n-input__state-border) {
  display: none;
}

.category-radio-list {
  margin-top: 1px;
}

.category-radio-list :deep(.n-radio-group) {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: auto;
}

.category-radio-list :deep(.n-radio-button) {
  width: 30%;
  margin: 8px 0;
  padding: 0;
  border-radius: 4px;
  text-align: center;
  border: 1px solid var(--n-button-border-color);
}

.category-radio-list .radio-placeholder {
  visibility: hidden;
}

.category-radio-list :deep(.n-radio-button--checked) {
  border-color: var(--n-button-text-color-active);
}

.category-radio-list :deep(.n-radio__label) {
  line-height: 32px;
}

.category-radio-list :deep(.n-radio-button__state-border),
.category-radio-list :deep(.n-radio-button:first-child .n-radio-button__state-border),
.category-radio-list :deep(.n-radio-button:last-child .n-radio-button__state-border) {
  border-radius: 4px;
}

.category-radio-list :deep(.n-radio-group__splitor) {
  display: none;
}

.date-picker {
  border-radius: 10px;
  text-align: center;
  width: 120px;
  margin-left: 16px;
  margin-top: 24px;
  --border-radius: 17px;
}

.date-picker :deep(.n-input) {
  cursor: pointer;
  border-radius: var(--border-radius);
}

.date-picker :deep(.n-input__input-el) {
  cursor: pointer;
}

.date-picker :deep(.n-input__suffix) {
  display: none;
}

.date-picker :deep(.n-input__state-border) {
  border-radius: var(--border-radius);
}

.action-bar {
  height: var(--action-bar-height);
}

.action-bar :deep(.n-card__content) {
  display: flex;
  justify-content: space-between;
}

.action-bar .confirm-button {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
