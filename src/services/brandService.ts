import { AddBrandRequest } from "../models/brand/requests/AddBrandRequest";
import { UpdateBrandRequest } from "../models/brand/requests/UpdateBrandRequest";
import { AddBrandResponse } from "../models/brand/responses/AddBrandResponse";
import { GetAllBrandsResponse } from "../models/brand/responses/GetAllBrandsResponse";
import { GetByIdBrandResponse } from "../models/brand/responses/GetByIdBrandResponse";
import { UpdateBrandResponse } from "../models/brand/responses/UpdateBrandResponse";
import { BaseService } from "./baseService";

class BrandService extends BaseService<
  GetAllBrandsResponse,
  GetByIdBrandResponse,
  AddBrandRequest,
  AddBrandResponse,
  UpdateBrandRequest,
  UpdateBrandResponse
> {
  constructor() {
    super();
    this.apiUrl = "brands";
  }
}

export default new BrandService();
