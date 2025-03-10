<template>
  <ModelLayout
    v-model="open"
    @modelClose="handleClose"
    @modelSubmit="submitForm"
    heading="Create Contact"
  >
    <ContactForm :formData="formData" :errors="errors" @updateFormData="updateFormData" />
  </ModelLayout>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, reactive, shallowReactive, inject } from 'vue'
import axios from 'axios'
import ModelLayout from './ModelLayout.vue'
import ContactForm from './ContactForm.vue'
import { Errors } from '../types'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  customer: {
    type: Object,
    default: () => ({}),
  },
})

// Inject the provided function from the grandparent
// Declare the function type explicitly
const refreshCustomers = inject('refreshCustomers') as () => void
const refreshContacts = inject('refreshContacts') as () => void
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

const handleClose = () => {
  setToInitialState()
  emit('update:openModal', false)
  open.value = false
}

const formData = reactive({
  first_name: '',
  last_name: '',
})

const updateFormData = (newFormData: object) => {
  Object.assign(formData, newFormData)
}
const setToInitialState = () => {
  formData.first_name = ''
  formData.last_name = ''
  errors.errorList = {}
}

const submitForm = async () => {
  try {
    const requestBody = {
      first_name: formData.first_name,
      last_name: formData.last_name,
    }

    await axios.post(
      `http://localhost:8000/api/customers/${props.customer.id}/contacts`,
      requestBody,
    )
    refreshContacts()
    refreshCustomers()
    showNotification({
      title: 'Updated Contact',
      message: 'Contact updated successfully!',
      isSuccess: true,
    })
    handleClose()
  } catch (error) {
    console.error('Error:', error)
    errors.errorList = error.response.data.errors
    showNotification({
      title: 'Update fail',
      message: 'Failed to update contact!',
      isSuccess: false
    })
  }
}
</script>
