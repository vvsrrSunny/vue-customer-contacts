<template>
  <ModelLayout
    v-model="open"
    @modelClose="handleClose"
    @modelSubmit="submitForm"
    heading="Update Customer"
  >
    <CustomerForm :formData="formData" :errors="errors" @updateFormData="updateFormData" />

    <TheContact :customer="props.customer" />
  </ModelLayout>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, reactive, shallowReactive, inject } from 'vue'
import axios from 'axios'
import ModelLayout from './ModelLayout.vue'
import CustomerForm from './CustomerForm.vue'
import TheContact from './TheContact.vue'
import { Errors } from '../types'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  customer: {
    type: Object,
    required: true,
  },
})

// Inject the provided function from the grandparent
// Declare the function type explicitly
const refreshCustomers = inject('refreshCustomers') as () => void
const showNotification = inject('showNotification') as (data: {
  message: string
  isSuccess: boolean
  title: string
}) => void

const emit = defineEmits(['update:openModal'])

const open = ref(props.openModal)

const errors = shallowReactive<Errors>({
  errorList: {},
})

watch(
  () => props.openModal,
  (newValue) => (open.value = newValue),
)

watch(
  () => props.customer,
  (newCustomer) => {
    formData.name = newCustomer.name
    formData.reference = newCustomer.reference
    formData.category = newCustomer.category.charAt(0).toUpperCase() + newCustomer.category.slice(1)
    formData.start_date = newCustomer.start_date
    formData.description = newCustomer.description
  },
)

const handleClose = () => {
  setToInitialState()
  emit('update:openModal', false)
  open.value = false
}

const formData = reactive({
  name: props.customer.name,
  reference: props.customer.reference,
  category: props.customer.category.charAt(0).toUpperCase() + props.customer.category.slice(1),
  start_date: props.customer.start_date,
  description: props.customer.description,
})

const updateFormData = (newFormData: object) => {
  Object.assign(formData, newFormData)
}
const setToInitialState = () => {
  formData.name = ''
  formData.reference = ''
  formData.category = ''
  formData.start_date = ''
  formData.description = ''
  errors.errorList = {}
}

const submitForm = async () => {
  try {
    const requestBody = {
      name: formData.name,
      reference: formData.reference,
      category: formData.category.toLocaleLowerCase(),
      start_date: formData.start_date,
      description: formData.description,
    }

    await axios.put(`http://localhost:8000/api/customers/${props.customer.id}`, requestBody)
    refreshCustomers()
    handleClose()
    showNotification({
      title: 'Updated',
      message: 'Customer updated successfully!',
      isSuccess: true,
    })
  } catch (error) {
    console.error('Error:', error)
    errors.errorList = error.response.data.errors
    showNotification({
      title: 'Update fail',
      message: 'Failed to update customer!',
      isSuccess: false,
    })
  }
}
</script>
