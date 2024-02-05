import { AddAdditionalFeatureRequest } from "../models/additionalFeature/requests/addAdditionalFeatureRequest";
import { UpdateAdditionalFeatureRequest } from "../models/additionalFeature/requests/updateAdditionalFeatureRequest";
import { AddAdditionalFeatureResponse } from "../models/additionalFeature/responses/addAdditionalFeatureResponse";
import { GetAllAdditionalFeaturesResponse } from "../models/additionalFeature/responses/getAllAdditionalFeaturesResponse";
import { GetByIdAdditionalFeatureResponse } from "../models/additionalFeature/responses/getByIdAdditionalFeatureResponse";
import { UpdateAdditionalFeatureResponse } from "../models/additionalFeature/responses/updateAdditionalFeatureResponse";
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
