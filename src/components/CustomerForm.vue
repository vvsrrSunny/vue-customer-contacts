<template>
  <div class="mt-2">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <TheTextInput
          label="Name"
          name="name"
          v-model="localFormData.name"
          :errorMessage="errors.errorList?.name?.[0]"
          placeholder="Name"
          wrapperClass=""
        />

        <TheTextInput
          label="Reference"
          name="reference"
          v-model="localFormData.reference"
          :errorMessage="errors.errorList?.reference?.[0]"
          placeholder="Reference"
        />

        <div class="mt-4">
          <label for="category" class="block text-sm/6 font-medium text-gray-900"
            >Category <span class="text-red-600"> * </span></label
          >
          <TheSelect
            :category="localFormData.category"
            @categorySelected="updateCategory"
            :errorMessage="errors.errorList?.category?.[0]"
          />
        </div>
      </div>

      <div>
        <TheTextInput
          label="Start Date"
          name="start_date"
          v-model="localFormData.start_date"
          :errorMessage="errors.errorList?.start_date?.[0]"
          placeholder="dd/mm/yyyy"
        />

        <div class="mt-4">
          <label for="description" class="block text-sm/6 font-medium text-gray-900"
            >Description</label
          >
          <div class="mt-2">
            <textarea
              type="textarea"
              name="description"
              id="description"
              v-model="localFormData.description"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="Enter description"
              required
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import TheTextInput from './TheTextInput.vue'
import TheSelect from './TheSelect.vue'

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

const updateCategory = (category: string) => {
  localFormData.value.category = category
}

// Emit the updated formData back to the parent when it changes
watch(
  localFormData,
  (newData) => {
    emit('updateFormData', newData)
  },
  { deep: true },
)
</script>
