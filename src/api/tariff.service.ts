import $api from "@/api/index";
import { IConvert, Convert } from "@/helpers/convert";
import { ICreateTariffDto, ITariff } from "@/types/tariff.types";
import { AxiosResponse } from "axios";

enum TariffRoutes {
	MAIN = "/tariff"
}

interface ITariffService {
	create: (body: ICreateTariffDto) => Promise<void>;
	getCurrentTariff: () => Promise<ITariff>;
}

class TariffService extends Convert implements ITariffService {

  async create(body: ICreateTariffDto) {
    const requestBody = this.convertToSnake(body);
    const response: AxiosResponse<ITariff> = await $api.post(TariffRoutes.MAIN, requestBody);
    const data = this.convertToCamel(response.data);
    return Promise.resolve(data);
  }

  async getCurrentTariff() {
    const response: AxiosResponse<ITariff> = await $api.get(TariffRoutes.MAIN);
    const data = this.convertToCamel(response.data);
    return Promise.resolve(data);
  }
}

export default new TariffService();
