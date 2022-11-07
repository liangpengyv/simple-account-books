<script setup>
import { ref, watch } from 'vue'
import { NDatePicker, NButton } from 'naive-ui'
import { getPrevMonthCurrent, getNextMonthCurrent } from '../utils/date-time.util'

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

const EARLIEST_DATE = new Date('2022.01')
const EARLIEST_DATE_MESSAGE = '更早的账单，忘了他吧'
const LATEST_DATE_MESSAGE = '下个月的账单，下个月再看'

const timestampValue = ref(props.timestamp)
watch(timestampValue, () => {
  emit('dateChange', timestampValue.value)
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
</script>

<template>
  <n-date-picker v-model:value="timestampValue" :disabled="props.disabled" type="month"
    :is-date-disabled="current => (current > Date.now() || current < EARLIEST_DATE.getTime())" />

  <n-button type="primary" :disabled="props.disabled" @click="onPrevMonthClick">上个月</n-button>
  <n-button type="primary" :disabled="props.disabled" @click="onNextMonthClick">下个月</n-button>
</template>

<style scoped>

</style>