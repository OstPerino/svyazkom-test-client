<template>
  <footer class="base-footer">
    Текущий тарифф: {{ amountRub }}
  </footer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";
import TariffService from "@/api/tariff.service";

const $toasts = useToast();
const amountRub = ref<number>(0);

const initCurrentTariff = async () => {
  try {
    const response = await TariffService.getCurrentTariff();
    amountRub.value = response.amountRub;
  } catch (e: unknown) {
    $toasts.error("Ошибка при получении тарифа");
  }
};

onMounted(async () => {
  await initCurrentTariff();
});
</script>

<style scoped>
.base-footer {
  height: var(--header-height);
  background-color: var(--primary-blue);
  color: var(--primary-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}
</style>
