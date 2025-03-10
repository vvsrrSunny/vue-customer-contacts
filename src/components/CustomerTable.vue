<template>
  <table class="min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
      <tr>
        <TableHeaderLayout header="Name" class="py-3.5 pl-4" />
        <TableHeaderLayout header="Reference" />
        <TableHeaderLayout header="Category" />
        <TableHeaderLayout header="No of Contacts" />
        <th class="relative py-3.5 pl-3 pr-4 sm:pr-6">
          <span class="sr-only">Edit | Delete</span>
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="person in customers" :key="person.id" class="even:bg-gray-50">
        <TableCell :value="person.name" class="pl-4 pr-3" />
        <TableCell :value="person.reference" />
        <TableCell :value="person.category" />
        <TableCell :value="person.contacts_count as number" />
        <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <div class="">
            <span
              class="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
              @click="customerSelected(person)"
              >Edit</span
            >
            |
            <span
              class="text-red-600 hover:text-red-900 hover:cursor-pointer"
              @click="customerSelectedToDelete(person)"
              >Delete</span
            >
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="customers.length === 0" class="p-5 sm:p-10 text-center">No customers to show!</div>
  <CustomerUpdateModel v-model:openModal="state.openModal" :customer="state.selectedCustomer" />
  <ModelLayout
    heading="Delete Customer"
    v-model="openModelToDeleteCustomer"
    @modelClose="openModelToDeleteCustomer = false"
    @modelSubmit="submitForm"
    submitLabel="Delete"
  >
    <p class="py-4">
      Would you like to delete the Customer named {{ state.selectedCustomer.name }}
    </p>
  </ModelLayout>
</template>

<script setup lang="ts">
import { shallowReactive, ref, inject } from 'vue'
import TableCell from './TableCell.vue'
import TableHeaderLayout from './TableHeaderLayout.vue'
import CustomerUpdateModel from './CustomerUpdateModel.vue'
import { Customer } from '../types'
import ModelLayout from './ModelLayout.vue'
import axios from 'axios'

defineProps<{ customers: Customer[] }>()

const state = shallowReactive({
  openModal: false,
  selectedCustomer: {
    id: -1,
    name: '',
    reference: '',
    category: 'gold',
    start_date: '',
    description: '',
  } as Customer,
})

const refreshCustomers = inject('refreshCustomers') as () => void
const showNotification = inject('showNotification') as (data: {
  message: string
  isSuccess: boolean
  title: string
}) => void

const openModelToDeleteCustomer = ref(false)
const customerSelected = (customer: Customer) => {
  state.selectedCustomer = { ...customer }
  state.openModal = true
}

const customerSelectedToDelete = (customer: Customer) => {
  state.selectedCustomer = { ...customer }
  openModelToDeleteCustomer.value = true
}

const submitForm = async () => {
  try {
    await axios.delete(`http://localhost:8000/api/customers/${state.selectedCustomer.id}`)
    refreshCustomers()
    showNotification({
      title: 'Deleted',
      message: 'Customer deleted successfully!',
      isSuccess: true,
    })
    openModelToDeleteCustomer.value = false
  } catch {
    showNotification({
      title: 'Delete fail',
      message: 'Failed to delete customer!',
      isSuccess: false,
    })
  }
}
</script>
