<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Customers</h1>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <TheButton label="Create" @click="state.openModal = true" />
      </div>
    </div>
    <TableLayout>
      <TheFilters
        :search="state.search"
        :category="state.category"
        @update:search="updateSearch"
        @update:category="updateCategory"
      />

      <CustomerTable :customers="state.people" />
    </TableLayout>
  </div>
  <CustomerCreateModel v-model:openModal="state.openModal" />
</template>

<script setup lang="ts">
import { onMounted, shallowReactive, watch, provide } from 'vue'
import axios from 'axios'
import TheFilters from './TheFilters.vue'
import CustomerTable from './CustomerTable.vue'
import CustomerCreateModel from './CustomerCreateModel.vue'
import TableLayout from './TableLayout.vue'
import { makeEndPoint } from '../utils/api'
import TheButton from './TheButton.vue'

const state = shallowReactive({
  people: [],
  search: '',
  category: '',
  openModal: false,
})

const refreshCustomers = () => {
  console.log('Refreshing customers')
  fetchCustomers()
}

// Provide the function to the entire subtree
provide('refreshCustomers', refreshCustomers)

onMounted(fetchCustomers)

watch(() => state.search, fetchCustomers)
watch(() => state.category, fetchCustomers)

async function fetchCustomers() {
  const endpoint = makeEndPoint(
    [
      state.search ? { name: 'search', value: state.search } : undefined,
      state.category ? { name: 'category', value: state.category.toLowerCase() } : undefined,
    ].filter((item): item is { name: string; value: string } => !!item),
  )

  try {
    const response = await axios.get(`http://localhost:8000/api/customers${endpoint}`)
    state.people = response.data.customers
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const updateSearch = (search: string) => (state.search = search)
const updateCategory = (category: string) => (state.category = category)
</script>
