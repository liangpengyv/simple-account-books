<script setup>
import { NDatePicker, NButton, NIcon } from 'naive-ui'
import { getPrevMonthCurrent, getNextMonthCurrent } from '../utils/date-time.util'
import { computed } from 'vue'
import AngleLeftIcon from './icons/AngleLeftIcon.vue'
import AngleRightIcon from './icons/AngleRightIcon.vue'

const props = defineProps({
  value: {
    type: Number,
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

const EARLIEST_DATE = new Date('2022.01')

const prevMonthCurrent = computed(() => getPrevMonthCurrent(props.value).getTime())
const nextMonthCurrent = computed(() => getNextMonthCurrent(props.value).getTime())
</script>

<template>
  <div class="month-filter">
    <n-button
      class="jump-button"
      text
      title="上个月"
      :disabled="props.disabled || prevMonthCurrent < EARLIEST_DATE.getTime()"
      @click="emit('update:value', prevMonthCurrent)"
    >
      <n-icon :size="16">
        <AngleLeftIcon />
      </n-icon>
    </n-button>

    <n-date-picker
      :value="props.value"
      :disabled="props.disabled"
      type="month"
      input-readonly
      :is-date-disabled="current => (current > Date.now() || current < EARLIEST_DATE.getTime())"
      @update:value="value => emit('update:value', value)"
    />

    <n-button
      class="jump-button"
      text
      title="下个月"
      :disabled="props.disabled || nextMonthCurrent > Date.now()"
      @click="emit('update:value', nextMonthCurrent)"
    >
      <n-icon :size="16">
        <AngleRightIcon />
      </n-icon>
    </n-button>
  </div>
</template>

<style scoped>
.month-filter {
  display: inline-block;
}

.n-date-picker {
  width: 60px;
  display: inline-block;
  vertical-align: middle;
}

.n-date-picker :deep(.n-input) {
  cursor: pointer;
  background-color: transparent;
}

.n-date-picker :deep(.n-input-wrapper) {
  padding: 0;
}

.n-date-picker :deep(.n-input__input-el) {
  cursor: pointer;
  text-align: center;
}

.n-date-picker :deep(.n-input__suffix),
.n-date-picker :deep(.n-input__state-border),
.n-date-picker :deep(.n-input__border) {
  display: none;
}

.jump-button {
  vertical-align: middle;
  height: 34px;
  padding: 0 4px;
}
</style>
