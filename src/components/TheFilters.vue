<template>
  <!-- <div class="mt-8 flow-root"> -->
  <div class="p-4 sm:p-6 flex justify-between">
    <div class="flex flex-row items-center space-x-4">
      <div class="flex flex-row items-center space-x-2">
        <span>Search</span>
        <TheSearch v-model="searchInput" />
      </div>
      <div class="flex flex-row items-center space-x-2">
        <span>Category</span>
        <TheSelect :category="categoryInput" @categorySelected="updateCategory" />
      </div>
    </div>
    <TheButton label="Clear" @click="clearFilters" />
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import TheSearch from './TheSearch.vue'
import TheSelect from './TheSelect.vue'
import TheButton from './TheButton.vue'

const props = defineProps<{ search: string; category: string }>()
const emit = defineEmits(['update:search', 'update:category'])

const searchInput = ref(props.search)
const categoryInput = ref(props.category)

watch(searchInput, (newValue) => emit('update:search', newValue))
watch(categoryInput, (newValue) => emit('update:category', newValue))

const updateCategory = (category: string) => (categoryInput.value = category)
const clearFilters = () => {
  searchInput.value = ''
  categoryInput.value = ''
}
</script>
