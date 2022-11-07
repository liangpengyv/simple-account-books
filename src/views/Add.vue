<script setup>
import { ref, computed, watch } from 'vue'
import { NInputNumber, NRadioGroup, NRadioButton, NDatePicker, NButton } from 'naive-ui';
import { billType } from '../typing/bill.typing';
import useCategoryStore from '../stores/category'
import { getDateStart } from '../utils/date-time.util'
import listService from '../service/list.service';
import { useRouter } from 'vue-router';

const router = useRouter()

const categoryStore = useCategoryStore()

const categoryList = computed(() => {
  if (categoryStore.categories) {
    return categoryStore.categories.filter(item => item.type === typeValue.value)
  } else {
    categoryStore.init().then(() => {
      categoryValue.value = categoryStore.categories.filter(item => item.type === typeValue.value)[0].id
    })
    return []
  }
})

const typeValue = ref(0)
const timeValue = ref(getDateStart(Date.now()).getTime())
const categoryValue = ref(categoryList.value[0]?.id)
const amountValue = ref(undefined)

watch(typeValue, () => {
  categoryValue.value = categoryList.value[0].id
})

const confirmButtonLoading = ref(false)
const onConfirmClick = () => {
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
      if (res) {
        $message.success('添加成功')
        router.push({ name: 'list' })
      }
    })
  }
}
</script>

<template>
  交易金额
  <n-input-number v-model:value="amountValue" clearable :precision="2" :min="0" :max="99999999999" placeholder="0.00">
    <template #prefix>
      ￥
    </template>
  </n-input-number>
  <n-radio-group v-model:value="typeValue">
    <n-radio-button v-for="(value, key) in billType" :key="key" :value="parseInt(key)" :label="value" />
  </n-radio-group>
  <br />
  <n-radio-group v-model:value="categoryValue">
    <n-radio-button v-for="item in categoryList" :key="item.id" :value="item.id" :label="item.name" />
  </n-radio-group>
  <n-date-picker v-model:value="timeValue" type="date" />
  <n-button type="primary" :loading="confirmButtonLoading" @click="onConfirmClick">确定添加</n-button>
</template>

<style scoped>

</style>