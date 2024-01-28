<template>
  <div class="page">
    <div class="actions-title">
      <span class="info">Страница управления дачниками</span>
      <div class="actions">
        <v-btn @click="onAddResident" class="btn">
          Добавить дачника
        </v-btn>
        <v-btn @click="onChangeTariffClick" class="btn">
          Изменить тариф
        </v-btn>
      </div>
    </div>
    <residents-table
      :residents="residentsStore.residents"
      :headers="headers"
      :loading="isDataLoading"
      @update:delete-resident="onDeleteHandler"
      @update:edit-resident="onEditHandler"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useResidentStore} from "@/store/resident.store";
import {IHeader} from "@/types/tables.types";
import {PopupType, usePopupStore} from "@/store/popup.store";
import ResidentsTable from "@/components/widgets/ResidentsTable.vue";
import {IResident} from "@/types/resident.types";

const residentsStore = useResidentStore();
const popupStore = usePopupStore();

const isDataLoading = ref<boolean>(true);

const headers = ref<IHeader[]>([
	{
		title: "ID",
		value: "id"
	},
	{
		title: "ФИО",
		value: "fio"
	},
	{
		title: "Размер участка",
		value: "area"
	},
	{
		title: "С какого числа",
		value: "startDate"
	},
	{
		title: "Действия",
		value: "actions"
	},
]);

const onAddResident = () => {
	popupStore.showPopup(PopupType.addResident);
};

const onChangeTariffClick = () => {
	popupStore.showPopup(PopupType.changeTariff);
};

const initResidents = async () => {
	isDataLoading.value = true;

	await residentsStore.fetchResidents();

	isDataLoading.value = false;
};

const onDeleteHandler = (resident: IResident) => {
	popupStore.showPopup(PopupType.acceptDelete);
	residentsStore.setCurrentResident(resident);
};

const onEditHandler = (resident: IResident) => {
	popupStore.showPopup(PopupType.updateResident);
	residentsStore.setCurrentResident(resident);
};

onMounted(async () => {
	await initResidents();
});
</script>

<style scoped lang="scss">
.actions-title {
  display: flex;
  justify-content: space-between;
}

.btn {
  margin-right: 1rem;

  &:last-child {
    margin-right: 0;
  }
}
</style>
