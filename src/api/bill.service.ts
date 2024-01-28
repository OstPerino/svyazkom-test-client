import $api from "@/api/index";
import {IConvert, Convert} from "@/helpers/convert";
import {IBill, ICreateBillDto} from "@/types/bill.types";
import {AxiosResponse} from "axios";

enum BillRoutes {
	MAIN = "/bill"
}

interface IBillService extends IConvert {
	getAll: () => Promise<IBill[]>;
	create: (body: ICreateBillDto) => Promise<ICreateBillDto>;
}

class BillService extends Convert implements IBillService {

	async getAll(): Promise<IBill[]> {
		const response: AxiosResponse<IBill[]> = await $api.get(BillRoutes.MAIN);
		const data = this.convertToCamel(response.data);
		return Promise.resolve(data);
	}

	async create(body: ICreateBillDto): Promise<IBill> {
		const requestBody = this.convertToSnake(body);
		const response: AxiosResponse<IBill> = await $api.post(BillRoutes.MAIN, requestBody);
		const data = this.convertToCamel(response.data);
		return Promise.resolve(data);
	}
}

export default new BillService();
