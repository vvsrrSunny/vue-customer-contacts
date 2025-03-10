<template>
  <div class="mt-10 px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Contacts</h1>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <TheButton label="Create" @click="state.openModal = true" />
      </div>
    </div>
    <TableLayout>
      <ContactTable :contacts="state.contacts" :customer="props.customer" />
    </TableLayout>
  </div>
  <ContactCreateModel v-model:openModal="state.openModal" :customer="props.customer" />
</template>

<script setup lang="ts">
import { onMounted, shallowReactive, provide } from 'vue'
import axios from 'axios'
import ContactCreateModel from './ContactCreateModel.vue'
import TableLayout from './TableLayout.vue'
import TheButton from './TheButton.vue'
import ContactTable from './ContactTable.vue'
import { Customer } from '../types'

const state = shallowReactive({
  contacts: [],
  openModal: false,
})

const refreshContacts = () => {
  fetchContacts()
}

// Provide the function to the entire subtree
provide('refreshContacts', refreshContacts)

onMounted(fetchContacts)

const props = defineProps<{ customer: Customer }>()

async function fetchContacts() {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/customers/${props.customer.id}/contacts`,
    )
    state.contacts = response.data.contacts
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>
