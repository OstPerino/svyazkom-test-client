import { defineStore } from "pinia";
import { IBill, ICreateBillDto } from "@/types/bill.types";
import BillService from "@/api/bill.service";

export const useBillStore = defineStore("bill", {
  state: () => ({
    bills: [] as IBill[],
  }),
  actions: {
    async fetchBills() {
      try {
        const bills = await BillService.getAll();
        this.bills = [...bills];
      } catch (e: unknown) {
        return e;
      }
    },
    async createBill(body: ICreateBillDto) {
      try {
        await BillService.create(body);
        await this.fetchBills();
      } catch (e: unknown) {
        return e;
      }
    }
  }
});
