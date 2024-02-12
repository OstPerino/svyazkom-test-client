import $api from "@/api/index";
import { Convert } from "@/helpers/convert";
import { AxiosResponse } from "axios";
import { ICreateRecordDto, IRecord } from "@/types/record.types";

enum RecordRoutes {
	MAIN = "/record"
}

interface IRecordService {
	record: (body: ICreateRecordDto) => Promise<IRecord>;
}

class RecordService extends Convert implements IRecordService {

  public async record(body: ICreateRecordDto) {
    try {
      const requestBody = this.convertToSnake(body);
      const response: AxiosResponse<IRecord> = await $api.post(RecordRoutes.MAIN, requestBody);
      const data = this.convertToCamel(response.data);
      return Promise.resolve(data);
    } catch (e: unknown) {
      return e;
    }
  }
}

export default new RecordService();
