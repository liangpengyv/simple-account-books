<script setup>
import { NDatePicker, NButton } from 'naive-ui'
import { getPrevMonthCurrent, getNextMonthCurrent } from '../utils/date-time.util'
import { computed } from '@vue/reactivity';

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true
  },
})
const emit = defineEmits([
  'update:modelValue'
])

const EARLIEST_DATE = new Date('2022.01')

const prevMonthCurrent = computed(() => getPrevMonthCurrent(props.modelValue).getTime())
const nextMonthCurrent = computed(() => getNextMonthCurrent(props.modelValue).getTime())
</script>

<template>
  <n-date-picker :value="props.modelValue" :disabled="props.disabled" type="month"
    :is-date-disabled="current => (current > Date.now() || current < EARLIEST_DATE.getTime())"
    @update:value="value => emit('update:modelValue', value)" />

  <n-button type="primary" :disabled="props.disabled || prevMonthCurrent < EARLIEST_DATE.getTime()"
    @click="emit('update:modelValue', prevMonthCurrent)">
    上个月
  </n-button>

  <n-button type="primary" :disabled="props.disabled || nextMonthCurrent > Date.now()"
    @click="emit('update:modelValue', nextMonthCurrent)">
    下个月
  </n-button>
</template>

<style scoped>

</style>