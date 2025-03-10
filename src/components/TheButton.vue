<template>
  <button
    type="button"
    @click="$emit('click')"
    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:cursor-pointer"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{ label: string }>()

defineEmits<{
  (event: 'click'): void
}>()
</script>
