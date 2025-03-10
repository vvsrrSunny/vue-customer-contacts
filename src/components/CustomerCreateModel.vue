<template>
  <ModelLayout v-model="open" @modelClose="handleClose" @modelSubmit="submitForm">
    <CustomerForm :formData="formData" :errors="errors" @updateFormData="updateFormData" />
  </ModelLayout>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, reactive, shallowReactive, inject } from 'vue'
import axios from 'axios'
import ModelLayout from './ModelLayout.vue'
import CustomerForm from './CustomerForm.vue'
import { Errors } from '../types'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:openModal'])

const open = ref(props.openModal)

const errors = shallowReactive<Errors>({
  errorList: {},
})

// Inject the provided function from the grandparent
// Declare the function type explicitly
const refreshCustomers = inject('refreshCustomers') as () => void
const showNotification = inject('showNotification') as (data: {
  message: string
  isSuccess: boolean
  title: string
}) => void

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
  name: '',
  reference: '',
  category: '',
  start_date: '',
  description: '',
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

    await axios.post('http://localhost:8000/api/customers', requestBody)
    refreshCustomers()
    showNotification({
      title: 'Created',
      message: 'Customer created successfully!',
      isSuccess: true,
    })
    handleClose()
  } catch (error) {
    console.error('Error:', error)
    errors.errorList = error.response.data.errors
    showNotification({
      title: 'Failed',
      message: 'Failed to create Customer!',
      isSuccess: false,
    })
  }
}
</script>
