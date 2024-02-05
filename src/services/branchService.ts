import { AddBranchRequest } from "../models/branch/requests/addBranchRequest";
import { UpdateBranchRequest } from "../models/branch/requests/updateBranchRequest";
import { AddBranchResponse } from "../models/branch/responses/addBranchResponse";
import { GetAllBranchesResponse } from "../models/branch/responses/getAllBranchesResponse";
import { GetByIdBranchResponse } from "../models/branch/responses/getByIdBranchResponse";
import { UpdateBranchResponse } from "../models/branch/responses/updateBranchResponse";
import { BaseService } from "./baseService";

class BranchService extends BaseService<
  GetAllBranchesResponse,
  GetByIdBranchResponse,
  AddBranchRequest,
  AddBranchResponse,
  UpdateBranchRequest,
  UpdateBranchResponse
> {
  constructor() {
    super();
    this.apiUrl = "branches";
  }
}

export default new BranchService();
