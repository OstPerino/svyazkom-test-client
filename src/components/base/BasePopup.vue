<template>
  <div class="base-popup">
    <div class="base-popup-header">
      <h3 class="base-popup-header-text"><slot name="header"/></h3>
      <v-btn size="small" icon="$close" @click="onClose"/>
    </div>
    <div class="base-popup-main">
      <slot name="main"/>
    </div>
    <div class="base-popup-footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePopupStore} from "@/store/popup.store";

const popupStore = usePopupStore();

const onClose = () => {
	popupStore.closePopup();
};
</script>

<style scoped lang="scss">
.base-popup {
  background-color: var(--primary-white);
  border-radius: 12px;
  padding: 1.5rem;
  min-width: 600px;
  max-height: 700px;
  overflow-y: scroll;
}

.base-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  &-text {
    font-size: 24px;
  }
}

.base-popup-main {
  margin-bottom: 1rem;
}
</style>
