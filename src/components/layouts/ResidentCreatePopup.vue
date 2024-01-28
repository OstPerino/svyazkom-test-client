<template>
  <base-popup class="resident-action-popup">
    <template #header>
      Добавить дачника
    </template>
    <template #main>
      <v-text-field label="ФИО" v-model="addResidentState.fio"/>
      <v-text-field label="Размер участка" v-model.number="addResidentState.area"/>
    </template>
    <template #footer>
      <v-btn :disabled="isSubmitDisabled" @click="createResident">
        Создать
      </v-btn>
    </template>
  </base-popup>
</template>

<script setup lang="ts">
import {computed, reactive} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {usePopupStore} from "@/store/popup.store";
import {useResidentStore} from "@/store/resident.store";
import {required, numeric, maxLength} from "@vuelidate/validators";
import BasePopup from "@/components/base/BasePopup.vue";

const residentStore = useResidentStore();
const popupStore = usePopupStore();

const addResidentState = reactive({
	fio: "",
	area: 0,
});

const rules = {
	fio: {required},
	area: {required, numeric},
};

const $v = useVuelidate(rules, addResidentState);

const isSubmitDisabled = computed(() => {
	return $v.value.$invalid;
});

const createResident = async () => {
	await residentStore.addResident({
		fio: addResidentState.fio,
		area: addResidentState.area
	});
	popupStore.closePopup();
};
</script>

<style scoped lang="scss">
.resident-action-popup {
  width: 600px;
}
</style>
