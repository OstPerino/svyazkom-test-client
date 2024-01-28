export interface ITariff {
	id: number;
	beginDate: Date;
	amountRub: number;
}

type ChangeBeginDateToString<T> = {
	[K in keyof T]: K extends "beginDate" ? string : T[K];
};

export type ICreateTariffDto = ChangeBeginDateToString<Omit<ITariff, "id">>;
export type IUpdateTariffDto = Omit<ITariff, "id">;
