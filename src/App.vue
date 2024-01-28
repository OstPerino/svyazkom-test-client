<template>
  <v-app>
    <v-main>
      <base-layout>
        <router-view/>
      </base-layout>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import BaseLayout from "@/components/base/BaseLayout.vue";
</script>

<style lang="scss">
@import "@/assets/styles/index";
</style>
