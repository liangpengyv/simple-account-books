<script setup>
import { NDatePicker, NButton, NIcon } from 'naive-ui'
import { getPrevMonthCurrent, getNextMonthCurrent } from '../utils/date-time.util'
import { computed } from 'vue'

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
      :disabled="props.disabled || prevMonthCurrent < EARLIEST_DATE.getTime()"
      @click="emit('update:value', prevMonthCurrent)"
    >
      <n-icon :size="16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <path
            d="M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2S2 6.48 2 12zm10-2.79V11h3c.55 0 1 .45 1 1s-.45 1-1 1h-3v1.79c0 .45-.54.67-.85.35l-2.79-2.79c-.2-.2-.2-.51 0-.71l2.79-2.79a.5.5 0 0 1 .85.36z"
            fill="currentColor"
          />
        </svg>
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
      :disabled="props.disabled || nextMonthCurrent > Date.now()"
      @click="emit('update:value', nextMonthCurrent)"
    >
      <n-icon :size="16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <path
            d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10s10-4.48 10-10zm-10 2.79V13H9c-.55 0-1-.45-1-1s.45-1 1-1h3V9.21c0-.45.54-.67.85-.35l2.79 2.79c.2.2.2.51 0 .71l-2.79 2.79a.5.5 0 0 1-.85-.36z"
            fill="currentColor"
          />
        </svg>
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

.n-date-picker :deep(.n-input__suffix) {
  display: none;
}

.n-date-picker :deep(.n-input__border) {
  display: none;
}

.n-date-picker :deep(.n-input__state-border) {
  display: none;
}

.jump-button {
  vertical-align: middle;
  height: 34px;
  padding: 0 4px;
}
</style>
