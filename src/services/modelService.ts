import { AddModelRequest } from "../models/model/requests/addModelRequest";
import { UpdateModelRequest } from "../models/model/requests/updateModelRequest";
import { GetAllModelsResponse } from "../models/model/responses/getAllModelsResponse";
import { GetByIdModelResponse } from "../models/model/responses/getByIdModelResponse";
import { AddModelResponse } from "../models/model/responses/addModelResponse";
import { UpdateModelResponse } from "../models/model/responses/updateModelResponse";
import { BaseService } from "./baseService";

class ModelService extends BaseService<
  GetAllModelsResponse,
  GetByIdModelResponse,
  AddModelRequest,
  AddModelResponse,
  UpdateModelRequest,
  UpdateModelResponse
> {
  constructor() {
    super();
    this.apiUrl = "models";
  }
}

export default new ModelService();
