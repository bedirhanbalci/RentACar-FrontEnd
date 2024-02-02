import { GetByIdBranchResponse } from './../models/branch/responses/GetByIdBranchResponse';
import { GetAllBranchesResponse } from './../models/branch/responses/GetAllBranchesResponse';
import { AxiosResponse } from "axios";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
class BranchService {
  getAll(): Promise<AxiosResponse<GetAllBranchesResponse, any>> {
    return axiosInstance.get<GetAllBranchesResponse>("branches/getAll");
  }

  getById(id: number) {
    return axiosInstance.get<GetByIdBranchResponse>("branches/getById/" + id);
  }

  delete(id: number) {
    return axiosInstance.delete<GetByIdBranchResponse>("branches/delete");
  }
}

export default new BranchService();