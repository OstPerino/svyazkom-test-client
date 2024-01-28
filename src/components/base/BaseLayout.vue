<template>
  <div class="base-layout">
    <BaseHeader class="header"/>
    <slot/>
    <BaseFooter class="footer"/>
    <PopupWrapper />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/base/BaseHeader.vue";
import BaseFooter from "@/components/base/BaseFooter.vue";
import BasePopup from "@/components/base/BasePopup.vue";
import PopupWrapper from "@/components/layouts/PopupWrapper.vue";
</script>

<style scoped lang="scss">
.base-layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  z-index: 10;
  top: 0;
}

.sidebar {
  position: fixed;
  left: 0;
  top: var(--header-height)
}
</style>
