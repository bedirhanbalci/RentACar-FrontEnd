import { AddAssurancePackageRequest } from "../models/assurancePackage/requests/addAssurancePackageRequest";
import { UpdateAssurancePackageRequest } from "../models/assurancePackage/requests/updateAssurancePackageRequest";
import { AddAssurancePackageResponse } from "../models/assurancePackage/responses/addAssurancePackageResponse";
import { GetAllAssurancePackagesResponse } from "../models/assurancePackage/responses/getAllAssurancePackagesResponse";
import { GetByIdAssurancePackageResponse } from "../models/assurancePackage/responses/getByIdAssurancePackageResponse";
import { UpdateAssurancePackageResponse } from "../models/assurancePackage/responses/updateAssurancePackageResponse";
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
