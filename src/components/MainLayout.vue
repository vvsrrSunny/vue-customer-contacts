<template>
  <div>
    <SidebarMobile
      :navigation="navigation"
      :sidebarOpen="sidebarOpen"
      @close="sidebarOpen = false"
    />
    <SidebarDesktop :navigation="navigation" />
    <TheNavbar @toggleSidebar="toggleSidebar" />

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <slot />
        <!-- Content will be injected here -->
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SidebarMobile from './SidebarMobile.vue'
import SidebarDesktop from './SidebarDesktop.vue'
import TheNavbar from './TheNavbar.vue'

const sidebarOpen = ref(false)
const navigation = [
  { name: 'Customers', href: '#', icon: 'home-icon', current: true },
  // Add other navigation items as needed
]

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>
