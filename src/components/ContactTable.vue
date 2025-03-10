<template>
  <table class="min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
      <tr>
        <TableHeaderLayout header="First Name" class="py-3.5 pl-4" />
        <TableHeaderLayout header="Last Name" />
        <th class="relative py-3.5 pl-3 pr-4 sm:pr-6">
          <span class="sr-only">Edit | Delete</span>
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="person in contacts" :key="person.id" class="even:bg-gray-50">
        <TableCell :value="person.first_name" class="pl-4 pr-3" />
        <TableCell :value="person.last_name" />
        <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <div class="">
            <span
              class="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
              @click="contactSelected(person)"
              >Edit</span
            >
            |
            <span
              class="text-red-600 hover:text-red-900 hover:cursor-pointer"
              @click="contactSelectedToDelete(person)"
              >Delete</span
            >
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="contacts.length === 0" class="p-5 sm:p-10 text-center">No contacts to show!</div>
</template>

<script setup lang="ts">
import TableCell from './TableCell.vue'
import TableHeaderLayout from './TableHeaderLayout.vue'
import { Contact, Contacts, Customer } from '../types'
import { shallowReactive, ref } from 'vue'

defineProps<{ contacts: Contacts; customer: Customer }>()

const state = shallowReactive({
  openModal: false,
  selectedContact: {
    id: -1,
    first_name: '',
    last_name: '',
  } as Contact,
})

const openModelToDeleteContact = ref(false)

const contactSelected = (contact: Contact) => {
  state.selectedContact = { ...contact }
  state.openModal = true
}

const contactSelectedToDelete = (contact: Contact) => {
  state.selectedContact = { ...contact }
  openModelToDeleteContact.value = true
}

</script>
