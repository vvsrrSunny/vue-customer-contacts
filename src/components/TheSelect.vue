<template>
  <div>
    <div class="grid grid-cols-1">
      <select
        id="category"
        name="category"
        v-model="selectedCategory"
        @change="emitCategoryChange"
        class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      >
        <option class="opacity-50" value="" selected>No select</option>
        <option value="Gold">Gold</option>
        <option value="Silver">Silver</option>
        <option value="Bronze">Bronze</option>
      </select>
      <ChevronDownIcon
        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        aria-hidden="true"
      />
      <p v-if="errorMessage" class="text-red-500 text-sm mt-1">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
import { ref, watch } from 'vue'

// Define the `modelValue` prop to accept the value passed from the parent
const props = defineProps({
  category: String,
  errorMessage: String,
})

const selectedCategory = ref<string>(props.category || '')
const emit = defineEmits<{
  (event: 'category-selected', value: string): void
}>()

// Watch the `category` prop to update the internal selected category whenever the parent changes the `category`
watch(
  () => props.category, // Watch the `category` prop
  (newCategory) => {
    selectedCategory.value = newCategory as string // Update internal selectedCategory when parent changes category
  },
  { immediate: true }, // Ensure it runs immediately to set the initial value when the component mounts
)

// Emit the selected value
const emitCategoryChange = () => {
  emit('category-selected', selectedCategory.value)
}
</script>
