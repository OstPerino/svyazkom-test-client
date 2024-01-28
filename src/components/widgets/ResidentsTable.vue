<template>
  <div class="residents-table">
    <v-data-table
        :headers="headers"
        :items="formattedResidents"
        :item-key="(resident: IResident) => resident.id"
        :group-desc="true"
        :items-per-page-options="[5, 10]"
        :loading="loading"
        items-per-page-text=""
        :sort-by="[{ key: 'area', order: 'asc' }]"
        no-data-text="Ни одного дачника не добавлено"
        @click:row.stop="chooseResident"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            size="small"
            class="me-2"
            @click="onEdit(item)"
        >
          mdi-delete
        </v-icon>
        <v-icon
            size="small"
            @click="onDelete(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import {computed, PropType, ref} from "vue";
import {IResident} from "@/types/resident.types";
import {IHeader} from "@/types/tables.types";
import {useResidentStore} from "@/store/resident.store";

const page = ref<number>(1);

const emits = defineEmits([
	"update:chooseResident",
	"update:editResident",
	"update:deleteResident",
]);

const props = defineProps({
	residents: {
		type: Array as PropType<IResident[]>,
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

const formattedResidents = computed(() => {
	return props.residents.map((resident) => ({
		...resident,
		startDate: new Date(resident.startDate).toLocaleDateString()
	}));
});

const onDelete = (resident: IResident) => {
	emits("update:editResident", resident);
};

const onEdit = (resident: IResident) => {
	emits("update:deleteResident", resident);
};

const chooseResident = (event: HTMLElement, resident: IResident) => {
	emits("update:chooseResident", resident);
};
</script>

<style scoped lang="scss">

</style>
