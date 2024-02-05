import { AddAssurancePackageRequest } from "../models/assurancePackage/requests/AddAssurancePackageRequest";
import { UpdateAssurancePackageRequest } from "../models/assurancePackage/requests/UpdateAssurancePackageRequest";
import { AddAssurancePackageResponse } from "../models/assurancePackage/responses/AddAssurancePackageResponse";
import { GetAllAssurancePackagesResponse } from "../models/assurancePackage/responses/GetAllAssurancePackagesResponse";
import { GetByIdAssurancePackageResponse } from "../models/assurancePackage/responses/GetByIdAssurancePackageResponse";
import { UpdateAssurancePackageResponse } from "../models/assurancePackage/responses/UpdateAssurancePackageResponse";
import { BaseService } from "./baseService";

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
}

export default new AssurancePackageService();
