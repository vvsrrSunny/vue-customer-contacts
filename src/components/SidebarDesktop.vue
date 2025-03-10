<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-72 lg:flex-col">
    <TheSidebar :navigation="navigation" />
  </div>
</template>

<script setup lang="ts">
import TheSidebar from './TheSidebar.vue'

defineProps({
  navigation: Array,
})
</script>
