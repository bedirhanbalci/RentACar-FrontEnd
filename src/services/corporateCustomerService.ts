import { AddCorporateCustomerRequest } from "../models/corporateCustomer/requests/addCorporateCustomerRequest";
import { UpdateCorporateCustomerRequest } from "../models/corporateCustomer/requests/updateCorporateCustomerRequest";
import { AddCorporateCustomerResponse } from "../models/corporateCustomer/responses/addCorporateCustomerResponse";
import { GetAllCorporateCustomersResponse } from "../models/corporateCustomer/responses/getAllCorporateCustomersResponse";
import { GetByIdCorporateCustomerResponse } from "../models/corporateCustomer/responses/getByIdCorporateCustomerResponse";
import { UpdateCorporateCustomerResponse } from "../models/corporateCustomer/responses/updateCorporateCustomerResponse";
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
