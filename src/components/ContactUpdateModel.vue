<template>
  <ModelLayout
    v-model="open"
    @modelClose="handleClose"
    @modelSubmit="submitForm"
    heading="Update Contact"
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
    required: true,
  },
  contact: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:openModal'])

const refreshContacts = inject('refreshContacts') as () => void
const showNotification = inject('showNotification') as (data: {
  message: string
  isSuccess: boolean
  title: string
}) => void

const open = ref(props.openModal)

const errors = shallowReactive<Errors>({
  errorList: {},
})

watch(
  () => props.openModal,
  (newValue) => (open.value = newValue),
)

watch(
  () => props.contact,
  (newContact) => {
    formData.first_name = newContact.first_name
    formData.last_name = newContact.last_name
  },
)

const handleClose = () => {
  setToInitialState()
  emit('update:openModal', false)
  open.value = false
}

const formData = reactive({
  first_name: props.contact.first_name,
  last_name: props.contact.last_name,
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

    await axios.put(
      `http://localhost:8000/api/customers/${props.customer.id}/contacts/${props.contact.id}`,
      requestBody,
    )
    refreshContacts()
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
      isSuccess: false,
    })
  }
}
</script>
