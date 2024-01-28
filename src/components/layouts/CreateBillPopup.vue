<template>
  <base-popup>
    <template #header>
      Добавить счет
    </template>
    <template #main>
      <!--      <v-text-field-->
      <!--          label="Цена за месяц"-->
      <!--          v-model.number="changeTariffState.amountRub"-->
      <!--      />-->
      <!--      <v-date-picker-->
      <!--          v-model="changeTariffState.startDate"-->
      <!--      />-->
    </template>
    <template #footer>
<!--      <v-btn :disabled="isSubmitDisabled" @click="changeTariff">-->
<!--        Изменить-->
<!--      </v-btn>-->
    </template>
  </base-popup>
</template>

<script setup lang="ts">
import BasePopup from "@/components/base/BasePopup.vue";
</script>

<style scoped>

</style>
