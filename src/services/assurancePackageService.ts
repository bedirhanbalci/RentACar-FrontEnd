import { AxiosResponse } from "axios";
import { GetAllAssurancePackagesResponse } from "../models/assurancePackage/responses/GetAllAssurancePackagesResponse";
import { BaseService } from "./baseService";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { GetByIdAssurancePackageResponse } from "../models/assurancePackage/responses/GetByIdAssurancePackageResponse";
import { AddAssurancePackageRequest } from "../models/assurancePackage/requests/AddAssurancePackageRequest";
import { AddAssurancePackageResponse } from "../models/assurancePackage/responses/AddAssurancePackageResponse";
import { UpdateAssurancePackageRequest } from "../models/assurancePackage/requests/UpdateAssurancePackageRequest";
import { UpdateAssurancePackageResponse } from "../models/assurancePackage/responses/UpdateAssurancePackageResponse";
import { AssuranceRequest } from "../models/assurancePackage/requests/AssuranceRequest";

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
