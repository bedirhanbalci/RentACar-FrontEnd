import { AxiosResponse } from "axios";
import { GetAllAssurancePackagesResponse } from "../models/assurancePackage/responses/getAllAssurancePackagesResponse";
import { BaseService } from "./baseService";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { GetByIdAssurancePackageResponse } from "../models/assurancePackage/responses/getByIdAssurancePackageResponse";
import { AddAssurancePackageRequest } from "../models/assurancePackage/requests/addAssurancePackageRequest";
import { AddAssurancePackageResponse } from "../models/assurancePackage/responses/addAssurancePackageResponse";
import { UpdateAssurancePackageRequest } from "../models/assurancePackage/requests/updateAssurancePackageRequest";
import { UpdateAssurancePackageResponse } from "../models/assurancePackage/responses/updateAssurancePackageResponse";
import { AssuranceRequest } from "../models/assurancePackage/requests/assuranceRequest";

class AssurancePackageService extends BaseService<
  GetAllAssurancePackagesResponse,
  GetByIdAssurancePackageResponse,
  AddAssurancePackageRequest,
  AddAssurancePackageResponse,
  UpdateAssurancePackageRequest,
  UpdateAssurancePackageResponse
> {
  constructor() {
    super();
    this.apiUrl = "assurancePackages";
  }

  addAssurancePrice(
    request: AssuranceRequest
  ): Promise<AxiosResponse<any, any>> {
    return axiosInstance.post<any>(this.apiUrl + "/addById", request);
  }
}

export default new AssurancePackageService();
