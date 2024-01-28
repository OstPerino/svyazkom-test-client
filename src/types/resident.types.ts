export interface IResident {
	id: number;
	fio: string;
	area: number;
	startDate: Date;
}

export type ICreateResidentDto = Omit<IResident, "id" | "startDate">;
export type IUpdateResidentDto = Partial<IResident>;
