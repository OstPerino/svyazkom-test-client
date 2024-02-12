<template>
  <BasePopup>
    <template #header>
      Записать показания
    </template>
    <template #main>
      <v-text-field label="Потрачено воды" v-model.number="amountVolume" />
    </template>
    <template #footer>
      <v-btn @click="record">
        Записать показания
      </v-btn>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { computed, onMounted, reactive, ref } from "vue";
import { minValue, numeric, required } from "@vuelidate/validators";
import { useResidentStore } from "@/store/resident.store";
import { useBillStore } from "@/store/bill.store";
import { usePopupStore } from "@/store/popup.store";
import { useToast } from "vue-toast-notification";
import BasePopup from "@/components/base/BasePopup.vue";
import RecordService from "@/api/record.service";

const state = reactive<{ amountVolume: number }>({
  amountVolume: 0
});

const amountVolume = ref<number>(0);

const isLoading = ref<boolean>(false);

const residentStore = useResidentStore();
const billStore = useBillStore();
const popupStore = usePopupStore();
const $toasts = useToast();

const rules = {
  amountVolume: { required, numeric, minValue: minValue(1) }
};

const $v = useVuelidate(rules, state);

const record = async () => {
  const response = await RecordService.record({ amountVolume: amountVolume.value });

  if (response.amountVolume !== amountVolume.value) {
    $toasts.warning("На данный месяц показания уже занесены.");
  } else {
    $toasts.success("Показания успешно занесены.");
    billStore.fetchBills();
  }

  popupStore.closePopup();
};

onMounted(async () => {
  isLoading.value = true;

  await residentStore.fetchResidents();

  isLoading.value = false;
});
</script>

<style scoped>

</style>
