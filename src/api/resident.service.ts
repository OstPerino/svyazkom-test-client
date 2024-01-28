import $api from "@/api/index";
import { AxiosResponse } from "axios";
import {IConvert, Convert} from "@/helpers/convert";
import {ICreateResidentDto, IUpdateResidentDto, IResident} from "@/types/resident.types";

enum ResidentRoutes {
	MAIN = "/residents"
}

interface IResidentService extends IConvert {
	getAll: () => Promise<IResident[]>;
	getById: (id: number) => Promise<IResident>;
	create: (body: ICreateResidentDto) => Promise<IResident>;
	update: (body: IUpdateResidentDto, id: number) => Promise<IResident>;
	delete: (id: number) => Promise<IResident>;
}

class ResidentService extends Convert implements IResidentService {

	public async getAll(): Promise<IResident[]> {
		const response: AxiosResponse<IResident[]> = await $api.get(ResidentRoutes.MAIN);
		const data = this.convertToCamel(response.data);
		return Promise.resolve(data);
	}

	public async getById(id: number) {
		const response: AxiosResponse<IResident> = await $api.get(`${ResidentRoutes.MAIN}/${id}`);
		const data = this.convertToCamel(response.data);
		return Promise.resolve(data);
	}

	public async create(body: ICreateResidentDto) {
		const requestBody = this.convertToSnake(body);
		const response: AxiosResponse<IResident> = await $api.post(ResidentRoutes.MAIN, requestBody);
		const data = this.convertToCamel(response.data);
		return Promise.resolve(data);
	}

	public async update(body: IUpdateResidentDto, id: number) {
		const requestBody = this.convertToSnake(body);
		const response: AxiosResponse<IResident> = await $api.patch(`${ResidentRoutes.MAIN}/${id}`, requestBody);
		const data = this.convertToCamel(response.data);
		return Promise.resolve(data);
	}

	public async delete(id: number) {
		const response: AxiosResponse<IResident> = await $api.delete(`${ResidentRoutes.MAIN}/${id}`);
		const data = this.convertToCamel(response.data);
		return Promise.resolve(data);
	}
}

export default new ResidentService();
