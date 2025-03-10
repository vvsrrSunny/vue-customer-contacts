<template>
  <input
    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
    type="text"
    placeholder="Search"
    v-bind:value="modelValue"
    @input="updateSearch"
  />
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

// Define the `modelValue` prop to accept the value passed from the parent
defineProps({
  modelValue: String,
})

// Define the emit to pass the search value back to the parent
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
let timeout: ReturnType<typeof setTimeout> | null = null

// Emit the updated value to the parent on input event
const updateSearch = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(() => {

    emit('update:modelValue', input.value.trim())
  }, 1000) // 1-second debounce
}
</script>
