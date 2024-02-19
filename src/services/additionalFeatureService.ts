import { AxiosResponse } from "axios";
import { GetAllAdditionalFeaturesResponse } from "../models/additionalFeature/responses/getAllAdditionalFeaturesResponse";
import { BaseService } from "./baseService";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { GetByIdAdditionalFeatureResponse } from "../models/additionalFeature/responses/getByIdAdditionalFeatureResponse";
import { AddAdditionalFeatureRequest } from "../models/additionalFeature/requests/addAdditionalFeatureRequest";
import { AddAdditionalFeatureResponse } from "../models/additionalFeature/responses/addAdditionalFeatureResponse";
import { UpdateAdditionalFeatureRequest } from "../models/additionalFeature/requests/updateAdditionalFeatureRequest";
import { UpdateAdditionalFeatureResponse } from "../models/additionalFeature/responses/updateAdditionalFeatureResponse";
import { AdditionalRequest } from "../models/additionalFeature/requests/additionalRequest";

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
