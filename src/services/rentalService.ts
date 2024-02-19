import { BaseService } from "./baseService";
import axiosInstance from "../utils/interceptors/axiosInterceptors";
import { AxiosResponse } from "axios";
import { GetAllRentalsResponse } from "../models/rental/responses/GetAllRentalsResponse";
import { GetByIdRentalResponse } from "../models/rental/responses/GetByIdRentalResponse";
import { AddRentalRequest } from "../models/rental/requests/AddRentalRequest";
import { AddRentalResponse } from "../models/rental/responses/AddRentalResponse";
import { UpdateRentalRequest } from "../models/rental/requests/UpdateRentalRequest";
import { UpdateRentalResponse } from "../models/rental/responses/UpdateRentalResponse";

class RentalService extends BaseService<
  GetAllRentalsResponse,
  GetByIdRentalResponse,
  AddRentalRequest,
  AddRentalResponse,
  UpdateRentalRequest,
  UpdateRentalResponse
> {
  constructor() {
    super();
    this.apiUrl = "rentals";
  }

  dateValid(addRentalRequest: AddRentalRequest) {
    return axiosInstance.post(this.apiUrl + "/dateValid", addRentalRequest);
  }

  getByUserId(id: number): Promise<AxiosResponse<any, any>> {
    return axiosInstance.get<any>(this.apiUrl + "/getByUserId/" + id);
  }
}

export default new RentalService();
