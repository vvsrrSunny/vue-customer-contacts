<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog class="relative z-10">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6"
            >
              <div class="">
                <div class="sm:flex">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <div class="sm:flex sm:justify-between">
                      <div class="sm:flex-auto">
                        <h1 class="text-2xl font-semibold text-gray-900">{{ heading }}</h1>
                      </div>
                      <button
                        type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer sm:mt-0 sm:w-auto"
                        @click="() => emit('model-close', true)"
                        ref="cancelButtonRef"
                      >
                        Cancel
                      </button>
                      <div class="mt-2 sm:ml-16 sm:mt-0 sm:flex-none">
                        <TheButton :label="submitLabel" @click="() => emit('model-submit', true)" />
                      </div>
                    </div>
                    <slot />
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import TheButton from './TheButton.vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  submitLabel: {
    type: String,
    default: 'Save',
  },
  heading: {
    type: String,
    default: 'Create Customer',
  },
})
const emit = defineEmits<{
  (event: 'model-close', value: boolean): void
  (event: 'model-submit', value: boolean): void
}>()
</script>
