<template>
  <div class="popup-wrapper" v-if="popupStore.isVisiblePopup">
    <div class="popup-container" ref="popupContainer">
      <!--  Popups are here  -->
      <resident-action-popup v-if="popupStore.popupType === PopupType.addResident" />
      <make-sure-delete v-if="popupStore.popupType === PopupType.acceptDelete" />
      <change-tariff-popup v-if="popupStore.popupType === PopupType.changeTariff" />
      <create-bill-popup v-if="popupStore.popupType === PopupType.addBill" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {PopupType, usePopupStore} from "@/store/popup.store";
import {onClickOutside} from "@vueuse/core";
import ResidentActionPopup from "@/components/layouts/ResidentCreatePopup.vue";
import MakeSureDelete from "@/components/layouts/MakeSureDelete.vue";
import ChangeTariffPopup from "@/components/layouts/ChangeTariffPopup.vue";
import CreateBillPopup from "@/components/layouts/CreateBillPopup.vue";

const popupStore = usePopupStore();
const popupContainer = ref<null>(null);

onClickOutside(popupContainer, (event: PointerEvent) => {
	popupStore.closePopup();
});
</script>

<style scoped lang="scss">
.popup-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
}
</style>
