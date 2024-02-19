import { AddModelRequest } from "../models/model/requests/AddModelRequest";
import { UpdateModelRequest } from "../models/model/requests/UpdateModelRequest";
import { GetAllModelsResponse } from "../models/model/responses/GetAllModelsResponse";
import { GetByIdModelResponse } from "../models/model/responses/GetByIdModelResponse";
import { AddModelResponse } from "../models/model/responses/AddModelResponse";
import { UpdateModelResponse } from "../models/model/responses/UpdateModelResponse";
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
