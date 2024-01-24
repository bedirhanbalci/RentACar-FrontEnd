import { AxiosResponse } from "axios";
import { GetAllCarsResponse } from "../models/car/responses/GetAllCarsResponse";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { GetByIdCarResponse } from "../models/car/responses/GetByIdCarResponse";

class CarService {
  getAll(): Promise<AxiosResponse<GetAllCarsResponse, any>> {
    return axiosInstance.get<GetAllCarsResponse>("cars/getAll");
  }

  getById(id: number) {
    return axiosInstance.get<GetByIdCarResponse>("cars/getById/" + id);
  }

  delete(id: number) {
    return axiosInstance.delete<GetByIdCarResponse>("cars/delete");
  }
}

export default new CarService();
