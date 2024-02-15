import { AddRentalRequest } from "../models/rental/requests/AddRentalRequest";
import { UpdateRentalRequest } from "../models/rental/requests/UpdateRentalRequest";
import { GetAllRentalsResponse } from "../models/rental/responses/GetAllRentalsResponse";
import { GetByIdRentalResponse } from "../models/rental/responses/GetByIdRentalResponse";
import { AddRentalResponse } from "../models/rental/responses/AddRentalResponse";
import { UpdateRentalResponse } from "../models/rental/responses/UpdateRentalResponse";
import { BaseService } from "./baseService";
import axiosInstance from "../utils/interceptors/axiosInterceptors";

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
}

export default new RentalService();
