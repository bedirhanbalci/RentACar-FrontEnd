import { AxiosResponse } from "axios";
import { AddBranchRequest } from "../models/branch/requests/AddBranchRequest";
import { UpdateBranchRequest } from "../models/branch/requests/UpdateBranchRequest";
import { AddBranchResponse } from "../models/branch/responses/AddBranchResponse";
import { GetAllBranchesResponse } from "../models/branch/responses/GetAllBranchesResponse";
import { GetByIdBranchResponse } from "../models/branch/responses/GetByIdBranchResponse";
import { UpdateBranchResponse } from "../models/branch/responses/UpdateBranchResponse";
import { BaseService } from "./baseService";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { GetByIdCarResponse } from "../models/car/responses/GetByIdCarResponse";

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
  getCarById(id: number): Promise<AxiosResponse<GetByIdCarResponse, any>> {
    return axiosInstance.get<GetByIdCarResponse>(
      this.apiUrl + "/getCarById/" + id
    );
  }
}

export default new BranchService();
