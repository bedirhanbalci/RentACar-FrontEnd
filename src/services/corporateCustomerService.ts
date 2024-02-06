import { AddCorporateCustomerRequest } from "../models/corporateCustomer/requests/AddCorporateCustomerRequest";
import { UpdateCorporateCustomerRequest } from "../models/corporateCustomer/requests/UpdateCorporateCustomerRequest";
import { AddCorporateCustomerResponse } from "../models/corporateCustomer/responses/AddCorporateCustomerResponse";
import { GetAllCorporateCustomersResponse } from "../models/corporateCustomer/responses/GetAllCorporateCustomersResponse";
import { GetByIdCorporateCustomerResponse } from "../models/corporateCustomer/responses/GetByIdCorporateCustomerResponse";
import { UpdateCorporateCustomerResponse } from "../models/corporateCustomer/responses/UpdateCorporateCustomerResponse";
import { BaseService } from "./baseService";

class CorporateCustomerService extends BaseService<
  GetAllCorporateCustomersResponse,
  GetByIdCorporateCustomerResponse,
  AddCorporateCustomerRequest,
  AddCorporateCustomerResponse,
  UpdateCorporateCustomerRequest,
  UpdateCorporateCustomerResponse
> {
  constructor() {
    super();
    this.apiUrl = "corporateCustomers";
  }
}

export default new CorporateCustomerService();
