import $api from "@/api/index";
import {Convert} from "@/helpers/convert";
import {IPeriod} from "@/types/period.types";
import {AxiosResponse} from "axios";

enum PeriodRoutes {
	MAIN = "/period"
}

interface IPeriodService {
	getAll: () => Promise<IPeriod[]>;
}

class PeriodService extends Convert implements IPeriodService {

	async getAll(): Promise<IPeriod[]> {
		const response: AxiosResponse<IPeriod[]> = await $api.get(PeriodRoutes.MAIN);
		const data = this.convertToCamel(response.data);
		return Promise.resolve(data);
	}
}

export default new PeriodService();
