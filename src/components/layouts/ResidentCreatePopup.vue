<template>
  <base-popup class="resident-action-popup">
    <template #header>
      {{ setTitle }}
    </template>
    <template #main>
      <v-text-field label="ФИО" v-model="residentState.fio"/>
      <v-text-field label="Размер участка" v-model.number="residentState.area"/>
    </template>
    <template #footer>
      <v-btn :disabled="isSubmitDisabled" @click="residentAction">
        Создать
      </v-btn>
    </template>
  </base-popup>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { usePopupStore } from "@/store/popup.store";
import { useResidentStore } from "@/store/resident.store";
import { required, numeric } from "@vuelidate/validators";
import BasePopup from "@/components/base/BasePopup.vue";

const residentStore = useResidentStore();
const popupStore = usePopupStore();

const residentState = reactive({
  fio: "",
  area: 0,
});

const rules = {
  fio: { required },
  area: { required, numeric },
};

const $v = useVuelidate(rules, residentState);

const isSubmitDisabled = computed(() => {
  return $v.value.$invalid;
});

const createResident = async () => {
  await residentStore.addResident({
    fio: residentState.fio,
    area: residentState.area
  });
  popupStore.closePopup();
};

const updateResident = async () => {
  if (!residentStore.currentResident?.id) {
    return;
  }

  await residentStore.updateResident(residentStore.currentResident?.id, {
    fio: residentState.fio,
    area: residentState.area
  });
  popupStore.closePopup();
};

const residentAction = async () => {
  if (residentStore.currentResident?.id) {
    await updateResident();
  } else {
    await createResident();
  }
};

const setTitle = computed(() => {
  if (!residentStore.currentResident) {
    return "Добавить дачника";
  }
  return "Обновить информацию о дачнике";
});

const init = () => {
  if (residentStore.currentResident) {
    residentState.fio = residentStore.currentResident.fio;
    residentState.area = residentStore.currentResident.area;
  }
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss">
.resident-action-popup {
  width: 600px;
}
</style>
