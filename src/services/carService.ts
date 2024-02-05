import { GetAllCarsResponse } from "../models/car/responses/getAllCarsResponse";
import { GetByIdCarResponse } from "../models/car/responses/getByIdCarResponse";
import { AddCarRequest } from "../models/car/requests/addCarRequest";
import { AddCarResponse } from "../models/car/responses/addCarResponse";
import { UpdateCarRequest } from "../models/car/requests/updateCarRequest";
import { UpdateCarResponse } from "../models/car/responses/updateCarResponse";
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
