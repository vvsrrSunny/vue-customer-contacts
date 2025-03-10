<template>
  <td :class="props.class" class="py-4 text-sm text-gray-500" >
    {{ value }}
  </td>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string | number // The header text to be displayed
  class?: string // The dynamic class for the <th> element
}>(),{
  class: 'px-3'
})

</script>
