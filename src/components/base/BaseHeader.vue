<template>
  <header class="base-header">
    <div class="logo">VODOKACHKA+</div>
    <NavBar />
  </header>
</template>

<script setup lang="ts">
import NavBar from "@/components/widgets/NavBar.vue";
</script>

<style scoped lang="scss">
.base-header {
  height: var(--header-height);
  background-color: var(--primary-blue);
  color: var(--primary-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.logo {
  font-weight: 700;
  font-size: 28px;
}
</style>
