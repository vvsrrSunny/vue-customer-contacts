<template>
  <th class="text-left text-sm font-semibold text-gray-900" :class="props.class">
    {{ header }}
  </th>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  header: string // The header text to be displayed
  class?: string // The dynamic class for the <th> element
}>(),{
  class: 'px-3 py-3.5'
})

</script>
