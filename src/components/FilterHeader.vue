<script setup>
import { ref } from 'vue'
import { NDatePicker, NButton } from 'naive-ui'
import { getPrevMonthCurrent, getNextMonthCurrent } from '../utils/date-time.util'

const props = defineProps({
  timestamp: {
    type: Number,
    required: true
  },
})
const emit = defineEmits([
  'dateChange',
])

const EARLIEST_DATE = new Date('2022.01')
const EARLIEST_DATE_MESSAGE = '更早的账单，忘了他吧'
const LATEST_DATE_MESSAGE = '下个月的账单，下个月再看'

const timestampRef = ref(props.timestamp)
const onDateChange = (timestamp) => {
  emit('dateChange', timestamp)
}
const onPrevMonthClick = () => {
  const prevMonthCurrent = getPrevMonthCurrent(timestampRef.value).getTime()
  if (prevMonthCurrent < EARLIEST_DATE.getTime()) {
    $message.warning(EARLIEST_DATE_MESSAGE)
  } else {
    timestampRef.value = prevMonthCurrent
    emit('dateChange', timestampRef.value)
  }
}
const onNextMonthClick = () => {
  const nextMonthCurrent = getNextMonthCurrent(timestampRef.value).getTime()
  if (nextMonthCurrent > Date.now()) {
    $message.warning(LATEST_DATE_MESSAGE)
  } else {
    timestampRef.value = nextMonthCurrent
    emit('dateChange', timestampRef.value)
  }
}
</script>

<template>
  <n-date-picker v-model:value="timestampRef" type="month"
    :is-date-disabled="current => (current > Date.now() || current < EARLIEST_DATE.getTime())"
    @update:value="onDateChange">
  </n-date-picker>
  <n-button type="primary" @click="onPrevMonthClick">上个月</n-button>
  <n-button type="primary" @click="onNextMonthClick">下个月</n-button>
</template>

<style scoped>

</style>