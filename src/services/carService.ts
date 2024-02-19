import { BaseService } from "./baseService";
import { AxiosResponse } from "axios";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { GetAllCarsResponse } from "../models/car/responses/getAllCarsResponse";
import { GetByIdCarResponse } from "../models/car/responses/getByIdCarResponse";
import { AddCarRequest } from "../models/car/requests/addCarRequest";
import { AddCarResponse } from "../models/car/responses/addCarResponse";
import { UpdateCarRequest } from "../models/car/requests/updateCarRequest";
import { UpdateCarResponse } from "../models/car/responses/updateCarResponse";
import { CarTotalPriceRequest } from "../models/car/requests/carTotalPriceRequest";

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
