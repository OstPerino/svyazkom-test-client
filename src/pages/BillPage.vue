<template>
  <div class="page">
    <div class="actions-title">
      <span class="info">Страница счетов за воду</span>
      <div class="actions">
        <v-btn @click="onAddBill" class="btn">
          Внести показания
        </v-btn>
        <v-btn @click="onChangeTariffClick" class="btn">
          Изменить тариф
        </v-btn>
      </div>
    </div>
    <bills-table :headers="headers" :bills="billStore.bills" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { IHeader } from "@/types/tables.types";
import { onMounted, ref } from "vue";
import { useBillStore } from "@/store/bill.store";
import { PopupType, usePopupStore } from "@/store/popup.store";
import BillsTable from "@/components/widgets/BillsTable.vue";

const loading = ref<boolean>(false);
const headers = ref<IHeader[]>([
  {
    title: "ID",
    value: "id"
  },
  {
    title: "Сумма",
    value: "amountRub"
  },
  {
    title: "С какого числа",
    value: "period.beginDate"
  },
  {
    title: "По какое число",
    value: "period.endDate"
  },
  {
    title: "Дачник",
    value: "resident.fio"
  },
]);

const billStore = useBillStore();
const popupStore = usePopupStore();

const onAddBill = () => {
  popupStore.showPopup(PopupType.addBill);
};

const onChangeTariffClick = () => {
  popupStore.showPopup(PopupType.changeTariff);
};

const initBills = async () => {
  loading.value = true;

  await billStore.fetchBills();

  loading.value = false;
};

onMounted(async () => {
  await initBills();
});
</script>

<style scoped>
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
