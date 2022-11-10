<script setup>
import { NDatePicker, NButton } from 'naive-ui'
import { getPrevMonthCurrent, getNextMonthCurrent } from '../utils/date-time.util'
import { computed } from '@vue/reactivity';

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true
  },
})
const emit = defineEmits([
  'update:value'
])

const EARLIEST_DATE = new Date('2022.01')

const prevMonthCurrent = computed(() => getPrevMonthCurrent(props.value).getTime())
const nextMonthCurrent = computed(() => getNextMonthCurrent(props.value).getTime())
</script>

<template>
  <n-date-picker :value="props.value" :disabled="props.disabled" type="month"
    :is-date-disabled="current => (current > Date.now() || current < EARLIEST_DATE.getTime())"
    @update:value="value => emit('update:value', value)" />

  <n-button type="primary" :disabled="props.disabled || prevMonthCurrent < EARLIEST_DATE.getTime()"
    @click="emit('update:value', prevMonthCurrent)">
    上个月
  </n-button>

  <n-button type="primary" :disabled="props.disabled || nextMonthCurrent > Date.now()"
    @click="emit('update:value', nextMonthCurrent)">
    下个月
  </n-button>
</template>

<style scoped>

</style>