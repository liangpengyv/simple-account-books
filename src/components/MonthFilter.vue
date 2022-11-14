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
          viewBox="0 0 256 512"
        >
          <path
            d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
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
          viewBox="0 0 256 512"
        >
          <path
            d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4l-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
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
