import { AxiosResponse } from "axios";
import { GetByIdBranchResponse } from "../models/branch/responses/getByIdBranchResponse";
import { BaseService } from "./baseService";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { GetByIdCarResponse } from "../models/car/responses/getByIdCarResponse";
import { GetAllBranchesResponse } from "../models/branch/responses/getAllBranchesResponse";
import { AddBranchRequest } from "../models/branch/requests/addBranchRequest";
import { AddBranchResponse } from "../models/branch/responses/addBranchResponse";
import { UpdateBranchRequest } from "../models/branch/requests/updateBranchRequest";
import { UpdateBranchResponse } from "../models/branch/responses/updateBranchResponse";

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
