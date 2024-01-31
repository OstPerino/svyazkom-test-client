<template>
  <BasePopup>
    <template #header>
      Уверены что хотите удалить?
    </template>
    <template #footer>
      <div class="submit-actions">
        <v-btn class="mr-4" @click="submit">Да</v-btn>
        <v-btn @click="popupStore.closePopup()">Нет</v-btn>
      </div>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import { usePopupStore } from "@/store/popup.store";
import { useResidentStore } from "@/store/resident.store";
import BasePopup from "@/components/base/BasePopup.vue";

const popupStore = usePopupStore();
const residentStore = useResidentStore();

const submit = () => {
  const residentId = residentStore.currentResident?.id;
  residentStore.deleteResident(residentId);
  popupStore.closePopup();
};
</script>

<style scoped lang="scss">
.submit-actions {
  display: flex;
  justify-content: center;

  &:first-child {
    margin-right: 2rem;
  }
}
</style>
