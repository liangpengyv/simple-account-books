<script setup>
import { ref } from 'vue'
import { NDatePicker } from 'naive-ui'

const props = defineProps({
  timestamp: {
    type: Number,
    required: true
  },
})
const emit = defineEmits([
  'dateChange',
])

const timestamp = ref(props.timestamp)
const onDateChange = (value) => {
  emit('dateChange', value)
}
</script>

<template>
  <n-date-picker v-model:value="timestamp" type="month" :is-date-disabled="current => current > Date.now()"
    @update:value="onDateChange">
  </n-date-picker>
</template>

<style scoped>

</style>