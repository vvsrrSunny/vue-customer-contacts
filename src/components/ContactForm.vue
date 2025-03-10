<template>
  <div class="mt-2 py-5 sm:py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <TheTextInput
          label="First Name"
          name="first_name"
          v-model="localFormData.first_name"
          :errorMessage="errors.errorList?.first_name?.[0]"
          placeholder="First Name"
          wrapperClass=""
        />

        <TheTextInput
          label="Last Name"
          name="last_name"
          v-model="localFormData.last_name"
          :errorMessage="errors.errorList?.last_name?.[0]"
          placeholder="Last Name"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import TheTextInput from './TheTextInput.vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['updateCategory', 'updateFormData'])

const localFormData = ref({ ...props.formData })

// Watch for prop changes and update localFormData accordingly
watch(
  () => props.formData,
  (newFormData) => {
    localFormData.value = { ...newFormData }
  },
)

// Emit the updated formData back to the parent when it changes
watch(
  localFormData,
  (newData) => {
    emit('updateFormData', newData)
  },
  { deep: true },
)
</script>
