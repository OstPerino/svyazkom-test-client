<template>
  <BasePopup>
    <template #header>
      Добавить счет
    </template>
    <template #main>
      <v-select
          :items="residentStore.residents"
          :loading="isLoading"
          item-title="fio"
          item-value="id"
          label="Дачники"
          v-model="state.value"
      ></v-select>
    </template>
    <template #footer>
      <v-btn :disabled="isSubmitDisabled" @click="createBill">
        Записать показания
      </v-btn>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { computed, onMounted, reactive, ref } from "vue";
import { numeric, required } from "@vuelidate/validators";
import { useResidentStore } from "@/store/resident.store";
import { useBillStore } from "@/store/bill.store";
import { usePopupStore } from "@/store/popup.store";
import { useToast } from "vue-toast-notification";
import BasePopup from "@/components/base/BasePopup.vue";

const state = reactive<{ title: string, value: string | number }>({
  title: "Не выбрано",
  value: "Не выбрано"
});

const isLoading = ref<boolean>(false);

const residentStore = useResidentStore();
const billStore = useBillStore();
const popupStore = usePopupStore();
const $toasts = useToast();

const rules = {
  title: { required },
  value: { required, numeric }
};

const $v = useVuelidate(rules, state);

const isSubmitDisabled = computed<boolean>(() => {
  return $v.value.$invalid;
});

const onSelectHandler = (id: number) => {
  state.value = id;
};

const createBill = async () => {
  if (typeof state.value === "number") {
    await billStore.createBill({ residentId: state.value });
    popupStore.closePopup();
  }

  $toasts.error("Что-то пошло не так");
};

onMounted(async () => {
  isLoading.value = true;

  await residentStore.fetchResidents();

  isLoading.value = false;
});
</script>

<style scoped>

</style>
