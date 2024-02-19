import { AxiosResponse } from "axios";
import { GetAllAdditionalFeaturesResponse } from "../models/additionalFeature/responses/GetAllAdditionalFeaturesResponse";
import { BaseService } from "./baseService";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { GetByIdAdditionalFeatureResponse } from "../models/additionalFeature/responses/GetByIdAdditionalFeatureResponse";
import { AddAdditionalFeatureRequest } from "../models/additionalFeature/requests/AddAdditionalFeatureRequest";
import { AddAdditionalFeatureResponse } from "../models/additionalFeature/responses/AddAdditionalFeatureResponse";
import { UpdateAdditionalFeatureRequest } from "../models/additionalFeature/requests/UpdateAdditionalFeatureRequest";
import { UpdateAdditionalFeatureResponse } from "../models/additionalFeature/responses/UpdateAdditionalFeatureResponse";
import { AdditionalRequest } from "../models/additionalFeature/requests/AdditionalRequest";

class AdditionalFeatureService extends BaseService<
  GetAllAdditionalFeaturesResponse,
  GetByIdAdditionalFeatureResponse,
  AddAdditionalFeatureRequest,
  AddAdditionalFeatureResponse,
  UpdateAdditionalFeatureRequest,
  UpdateAdditionalFeatureResponse
> {
  constructor() {
    super();
    this.apiUrl = "additionalFeatures";
  }

  addAdditionalPrice(
    request: AdditionalRequest
  ): Promise<AxiosResponse<any, any>> {
    return axiosInstance.post<any>(this.apiUrl + "/addById", request);
  }
}

export default new AdditionalFeatureService();
