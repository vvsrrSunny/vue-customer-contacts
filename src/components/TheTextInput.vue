<template>
  <div :class="wrapperClass">
    <label :for="name" class="block text-sm/6 font-medium text-gray-900">
      {{ label }} <span class="text-red-600"> * </span>
    </label>
    <div class="mt-2">
      <input
        :type="type"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        required
      />
      <p v-if="errorMessage" class="text-red-500 text-sm mt-1">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

withDefaults(
  defineProps<{
    label: string
    name: string
    modelValue: string
    placeholder?: string
    errorMessage?: string
    type?: string
    wrapperClass?: string // Allows dynamic spacing, default is "mt-4"
  }>(),
  {
    type: 'text',
    wrapperClass: 'mt-4',
  },
)
</script>
