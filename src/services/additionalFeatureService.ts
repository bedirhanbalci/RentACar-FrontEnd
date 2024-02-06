import { AddAdditionalFeatureRequest } from "../models/additionalFeature/requests/AddAdditionalFeatureRequest";
import { UpdateAdditionalFeatureRequest } from "../models/additionalFeature/requests/UpdateAdditionalFeatureRequest";
import { AddAdditionalFeatureResponse } from "../models/additionalFeature/responses/AddAdditionalFeatureResponse";
import { GetAllAdditionalFeaturesResponse } from "../models/additionalFeature/responses/GetAllAdditionalFeaturesResponse";
import { GetByIdAdditionalFeatureResponse } from "../models/additionalFeature/responses/GetByIdAdditionalFeatureResponse";
import { UpdateAdditionalFeatureResponse } from "../models/additionalFeature/responses/UpdateAdditionalFeatureResponse";
import { BaseService } from "./baseService";

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
}

export default new AdditionalFeatureService();
