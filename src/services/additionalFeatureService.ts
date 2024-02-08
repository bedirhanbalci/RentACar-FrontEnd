import { AxiosResponse } from "axios";
import { AddAdditionalFeatureRequest } from "../models/additionalFeature/requests/AddAdditionalFeatureRequest";
import { AdditionalRequest } from "../models/additionalFeature/requests/AdditionalRequest";
import { UpdateAdditionalFeatureRequest } from "../models/additionalFeature/requests/UpdateAdditionalFeatureRequest";
import { AddAdditionalFeatureResponse } from "../models/additionalFeature/responses/AddAdditionalFeatureResponse";
import { GetAllAdditionalFeaturesResponse } from "../models/additionalFeature/responses/GetAllAdditionalFeaturesResponse";
import { GetByIdAdditionalFeatureResponse } from "../models/additionalFeature/responses/GetByIdAdditionalFeatureResponse";
import { UpdateAdditionalFeatureResponse } from "../models/additionalFeature/responses/UpdateAdditionalFeatureResponse";
import { BaseService } from "./baseService";
import axiosInstance from "../utils/interceptors/axiosInterceptors";

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
