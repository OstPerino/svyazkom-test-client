import { IResident } from "@/types/resident.types";
import { IPeriod } from "@/types/period.types";

export interface IBill {
	id: number;
	residentId: number;
	periodId: number;
	amountRub: number;
	resident: IResident;
	period: IPeriod;
}

export type ICreateBillDto = Pick<IBill, "residentId">;
export type IUpdateBillDto = Omit<IBill, "amountRub" | "resident" | "period">;
