import { AddBrandRequest } from "../models/brand/requests/addBrandRequest";
import { UpdateBrandRequest } from "../models/brand/requests/updateBrandRequest";
import { AddBrandResponse } from "../models/brand/responses/addBrandResponse";
import { GetAllBrandsResponse } from "../models/brand/responses/getAllBrandsResponse";
import { GetByIdBrandResponse } from "../models/brand/responses/getByIdBrandResponse";
import { UpdateBrandResponse } from "../models/brand/responses/updateBrandResponse";
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
