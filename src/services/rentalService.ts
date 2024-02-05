import { AddRentalRequest } from "../models/rental/requests/addRentalRequest";
import { UpdateRentalRequest } from "../models/rental/requests/updateRentalRequest";
import { AddRentalResponse } from "../models/rental/responses/addRentalResponse";
import { GetAllRentalsResponse } from "../models/rental/responses/getAllRentalsResponse";
import { GetByIdRentalResponse } from "../models/rental/responses/getByIdRentalResponse";
import { UpdateRentalResponse } from "../models/rental/responses/updateRentalResponse";
import { BaseService } from "./baseService";

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
}

export default new RentalService();
