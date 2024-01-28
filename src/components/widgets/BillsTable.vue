<template>
  <div class="bills-table">
    <v-data-table
        :headers="headers"
        :items="formattedBills"
        :item-key="(bill: IBill) => bill.id"
        :group-desc="true"
        :items-per-page-options="[5, 10]"
        :loading="loading"
        items-per-page-text=""
        :sort-by="[{ key: 'id', order: 'asc' }]"
        no-data-text="Ни одного счета не выставлено"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import {computed, PropType, ref} from "vue";
import {IHeader} from "@/types/tables.types";
import {useResidentStore} from "@/store/resident.store";
import {IBill} from "@/types/bill.types";

type IFormattedBill = Omit<IBill, "residentId" | "periodId">;

const props = defineProps({
	bills: {
		type: Array as PropType<IBill[]>,
		required: true,
	},
	headers: {
		type: Array as PropType<IHeader[]>,
		required: true,
	},
	loading: {
		type: Boolean,
		default: false,
	}
});

const residentStore = useResidentStore();

const formattedBills = computed(() => {
	const removed: IFormattedBill[] = props.bills.map(({ residentId, periodId, ...rest }) => rest);
	const formatted = removed.map((bill: IFormattedBill) => ({
		...bill,
		period: {
			endDate: new Date(bill.period.endDate).toLocaleDateString(),
			beginDate: new Date(bill.period.beginDate).toLocaleDateString(),
		}
	}));
	return formatted;
});
</script>

<style scoped lang="scss">

</style>
