<template>
  <BasePopup>
    <template #header>
      Изменить тариф
    </template>
    <template #main>
      <v-text-field
          label="Цена за месяц"
          v-model.number="changeTariffState.amountRub"
          :error-messages="amountRubError"
      />
      <v-date-picker
          v-model="changeTariffState.startDate"
          :min="minDate"
          max-height="430px"
      />
    </template>
    <template #footer>
      <v-btn :disabled="isSubmitDisabled" @click="changeTariff">
        Изменить
      </v-btn>
    </template>
  </BasePopup>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, numeric, maxLength, minValue, maxValue } from "@vuelidate/validators";
import { useToast } from "vue-toast-notification";
import { usePopupStore } from "@/store/popup.store";
import BasePopup from "@/components/base/BasePopup.vue";
import TariffService from "@/api/tariff.service";
import dayjs from "dayjs";

const $toasts = useToast();
const popupStore = usePopupStore();

const currentDate = new Date();
const minDate: string = dayjs(currentDate, "YYYY-MM-DD", "ru").format();

const changeTariffState = reactive({
  amountRub: 0,
  startDate: null,
});

const rules = {
  startDate: { required },
  amountRub: { required, numeric, maxValue: maxValue(5000) },
};

const $v = useVuelidate(rules, changeTariffState);

const isSubmitDisabled = computed(() => {
  return $v.value.$invalid;
});

const amountRubError = computed(() => {

  switch (true) {
  case $v.value.amountRub.maxValue.$invalid:
    return ["Цена слишком высокая"];

  case $v.value.amountRub.numeric.$invalid:
    return ["Доступен ввод только цифр"];

  case $v.value.amountRub.required.$invalid && $v.value.amountRub.$dirty:
    return ["Обязательное поле"];

  default:
    return "";

  }
});

const changeTariff = async () => {
  try {
    if (!changeTariffState.startDate) {
      $toasts.error("Дата начала действия тарифа не указана");
      return;
    }

    const dayjsDate = dayjs(changeTariffState.startDate);
    const formatted = dayjsDate.format();

    await TariffService.create({
      beginDate: formatted,
      amountRub: changeTariffState.amountRub
    });

    popupStore.closePopup();
  } catch (e: unknown) {
    $toasts.error("Не удалось поменять тариф");
  }
};
</script>

<style scoped>

</style>
