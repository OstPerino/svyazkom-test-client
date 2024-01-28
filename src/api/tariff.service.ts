import $api from "@/api/index";
import {IConvert, Convert} from "@/helpers/convert";
import {ICreateTariffDto, ITariff} from "@/types/tariff.types";
import {AxiosResponse} from "axios";

enum TariffRoutes {
	MAIN = "/tariff"
}

interface ITariffService {
	create: (body: ICreateTariffDto) => Promise<void>;
}

class TariffService extends Convert implements ITariffService {

	async create(body: ICreateTariffDto) {
		const requestBody = this.convertToSnake(body);
		const response: AxiosResponse<ITariff> = await $api.post(TariffRoutes.MAIN, requestBody);
		const data = this.convertToCamel(response.data);
		return Promise.resolve(data);
	}
}

export default new TariffService();
