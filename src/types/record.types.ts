import { IPeriod } from "@/types/period.types";

export interface IRecord {
	id: number;
	period: IPeriod;
	amountRub: number;
}

export interface ICreateRecordDto {
	amountVolume: number;
	endDate?: string;
	beginDate?: string;
}
