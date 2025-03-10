<template>
  <slot />
  <TheNotification
    v-model="notificationProps.show"
    :title="notificationProps.title"
    :message="notificationProps.message"
    :isSuccess="notificationProps.isSuccess"
  />
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue'
import TheNotification from './TheNotification.vue'

// Define a ref for notification props
const notificationProps = reactive({
  show: false,
  message: '',
  title: '',
  isSuccess: true,
})

const showNotification = ({ message, isSuccess, title }) => {
  notificationProps.title = title
  notificationProps.message = message
  notificationProps.isSuccess = isSuccess
  notificationProps.show = true
  console.log(message)
  console.log(title)
  console.log(isSuccess)
  setTimeout(() => {
    notificationProps.show = false
  }, 3000)
}
// Provide the function to the entire subtree
provide('showNotification', showNotification)
</script>
