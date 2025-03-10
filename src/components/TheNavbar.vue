<template>
  <div
    class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden"
  >
    <button type="button" class="-m-2.5 p-2.5 text-gray-400 lg:hidden" @click="handleClick">
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="size-6" aria-hidden="true" />
    </button>
    <div class="flex-1 text-sm/6 font-semibold text-white">Customers</div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['toggleSidebar'])

const handleClick = () => {
  emit('toggleSidebar') // Emit the toggleSidebar event to the parent
}
</script>
