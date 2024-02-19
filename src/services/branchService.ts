import { AxiosResponse } from "axios";
import { GetByIdBranchResponse } from "../models/branch/responses/GetByIdBranchResponse";
import { BaseService } from "./baseService";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { GetByIdCarResponse } from "../models/car/responses/GetByIdCarResponse";
import { GetAllBranchesResponse } from "../models/branch/responses/GetAllBranchesResponse";
import { AddBranchRequest } from "../models/branch/requests/AddBranchRequest";
import { AddBranchResponse } from "../models/branch/responses/AddBranchResponse";
import { UpdateBranchRequest } from "../models/branch/requests/UpdateBranchRequest";
import { UpdateBranchResponse } from "../models/branch/responses/UpdateBranchResponse";

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

  getByCity(city: any): Promise<AxiosResponse<GetAllBranchesResponse[]>> {
    return axiosInstance.get<GetAllBranchesResponse[]>(
      this.apiUrl + "/getByCity",
      {
        params: {
          city: city,
        },
      }
    );
  }
}

export default new BranchService();
