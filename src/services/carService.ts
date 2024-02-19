import { BaseService } from "./baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { GetAllCarsResponse } from "../models/car/responses/GetAllCarsResponse";
import { GetByIdCarResponse } from "../models/car/responses/GetByIdCarResponse";
import { AddCarRequest } from "../models/car/requests/AddCarRequest";
import { AddCarResponse } from "../models/car/responses/AddCarResponse";
import { UpdateCarRequest } from "../models/car/requests/UpdateCarRequest";
import { UpdateCarResponse } from "../models/car/responses/UpdateCarResponse";
import { CarTotalPriceRequest } from "../models/car/requests/CarTotalPriceRequest";

class CarService extends BaseService<
  GetAllCarsResponse,
  GetByIdCarResponse,
  AddCarRequest,
  AddCarResponse,
  UpdateCarRequest,
  UpdateCarResponse
> {
  constructor() {
    super();
    this.apiUrl = "cars";
  }
  addTotalPrice(
    request: CarTotalPriceRequest
  ): Promise<AxiosResponse<any, any>> {
    return axiosInstance.post<any>(this.apiUrl + "/totalPrice", request);
  }
}

export default new CarService();
