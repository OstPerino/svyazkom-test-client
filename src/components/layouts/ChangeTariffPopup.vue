<template>
  <base-popup>
    <template #header>
      Изменить тариф
    </template>
    <template #main>
      <v-text-field
          label="Цена за месяц"
          v-model.number="changeTariffState.amountRub"
      />
      <v-date-picker
          v-model="changeTariffState.startDate"
      />
    </template>
    <template #footer>
      <v-btn :disabled="isSubmitDisabled" @click="changeTariff">
        Изменить
      </v-btn>
    </template>
  </base-popup>
</template>

<script setup lang="ts">
import {computed, reactive} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {required, numeric,} from "@vuelidate/validators";
import {useToast} from "vue-toast-notification";
import {usePopupStore} from "@/store/popup.store";
import BasePopup from "@/components/base/BasePopup.vue";
import TariffService from "@/api/tariff.service";
import dayjs from "dayjs";
import {useDate} from "vuetify";

// TODO: Date picker validation (only first day of month from next month)

const $toasts = useToast();
const popupStore = usePopupStore();

const changeTariffState = reactive({
	amountRub: 0,
	startDate: null,
});

const rules = {
	startDate: {required},
	amountRub: {required, numeric},
};

const $v = useVuelidate(rules, changeTariffState);

const isSubmitDisabled = computed(() => {
	return $v.value.$invalid;
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
