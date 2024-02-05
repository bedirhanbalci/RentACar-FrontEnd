import { AddCarRequest } from "../models/car/requests/AddCarRequest";
import { UpdateCarRequest } from "../models/car/requests/UpdateCarRequest";
import { GetAllCarsResponse } from "../models/car/responses/GetAllCarsResponse";
import { GetByIdCarResponse } from "../models/car/responses/GetByIdCarResponse";
import { AddCarResponse } from "../models/car/responses/AddCarResponse";
import { UpdateCarResponse } from "../models/car/responses/UpdateCarResponse";
import { BaseService } from "./baseService";

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
}

export default new CarService();
